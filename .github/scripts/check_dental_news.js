#!/usr/bin/env node
// 歯科経営コンパス — 情報更新チェックスクリプト
// 毎日 7:00 JST に GitHub Actions から実行される
// 主要な厚生労働省等のページを監視し、変更を検知したら news.json を更新する

const https = require('https');
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// ─── 監視URL定義 ───────────────────────────────────────────────
// cat_id: index.html の <a href="#cat-XX"> に対応
const WATCH_URLS = [
  {
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000188411_00045.html',
    cat_id: 'cat-06',
    label: '診療報酬改定（厚生労働省）',
  },
  {
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken15/index.html',
    cat_id: 'cat-05',
    label: '施設基準告示・通知（厚生労働省）',
  },
  {
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryou/index.html',
    cat_id: 'cat-10',
    label: '医療広告ガイドライン（厚生労働省）',
  },
  {
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/mynumber/index.html',
    cat_id: 'cat-14',
    label: 'マイナ保険証・医療DX（厚生労働省）',
  },
  {
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/index.html',
    cat_id: 'cat-13',
    label: '育児・介護休業法（厚生労働省）',
  },
  {
    url: 'https://www.ppc.go.jp/personalinfo/legal/guidelines_iryou/',
    cat_id: 'cat-15',
    label: '個人情報保護ガイダンス（個人情報保護委員会）',
  },
  {
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/index.html',
    cat_id: 'cat-13',
    label: '労働基準法・就業規則（厚生労働省）',
  },
  {
    url: 'https://www.nta.go.jp/taxes/tetsuzuki/shinsei/annai/shinkoku/annai/04.htm',
    cat_id: 'cat-18',
    label: '廃業届・税務手続き（国税庁）',
  },
];

// NEW バッジの表示期間（日数）
const BADGE_DURATION_DAYS = 14;

// ─── ファイルパス ────────────────────────────────────────────────
const ROOT = path.join(__dirname, '../../');
const HASH_FILE = path.join(__dirname, '../data/url_hashes.json');
const NEWS_FILE = path.join(ROOT, 'dental-compass/data/news.json');

// ─── ユーティリティ ──────────────────────────────────────────────
function fetchUrl(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DentalCompassBot/1.0; +https://beqd1106.com/dental-compass/)',
        'Accept-Language': 'ja,en;q=0.9',
      },
    }, (res) => {
      // リダイレクト追跡（最大3回）
      if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve);
      }
      if (res.statusCode !== 200) {
        return resolve({ ok: false, status: res.statusCode });
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
        if (body.length > 100000) res.destroy(); // 100KB で打ち切り
      });
      res.on('end', () => resolve({ ok: true, body }));
      res.on('error', () => resolve({ ok: false }));
    });
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, reason: 'timeout' }); });
    req.on('error', () => resolve({ ok: false }));
  });
}

function hashContent(text) {
  // <script> <style> タグを除去してからハッシュ（動的スクリプト変化を無視）
  const cleaned = text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return crypto.createHash('md5').update(cleaned).digest('hex');
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function todayJST() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().split('T')[0];
}

// ─── メイン処理 ──────────────────────────────────────────────────
async function main() {
  console.log(`[dental-news] チェック開始: ${new Date().toISOString()}`);

  // 既存データ読み込み
  let storedHashes = {};
  try { storedHashes = JSON.parse(fs.readFileSync(HASH_FILE, 'utf8')); } catch (_) {}

  let newsData = { checked_at: '', updates: [] };
  try { newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8')); } catch (_) {}

  const today = todayJST();
  const newHashes = { ...storedHashes };
  const detectedCats = new Set();
  let hasChanges = false;

  // 各URLをチェック
  for (const item of WATCH_URLS) {
    try {
      console.log(`  チェック中: ${item.url}`);
      const result = await fetchUrl(item.url);

      if (!result.ok) {
        console.log(`  → スキップ（取得失敗: ${result.status || result.reason || 'error'}）`);
        continue;
      }

      const hash = hashContent(result.body);
      const prevHash = storedHashes[item.url];

      if (!prevHash) {
        // 初回登録（変更なし扱い）
        newHashes[item.url] = hash;
        console.log(`  → 初回登録`);
      } else if (hash !== prevHash) {
        // 変更検知
        newHashes[item.url] = hash;
        detectedCats.add(item.cat_id);
        console.log(`  → 変更検知！ ${item.cat_id}: ${item.label}`);
        hasChanges = true;
      } else {
        console.log(`  → 変更なし`);
      }

      // レート制限対策（1秒待機）
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.log(`  → エラー: ${e.message}`);
    }
  }

  // news.json 更新
  // 期限切れのエントリを削除
  newsData.updates = newsData.updates.filter(u => u.expires >= today);

  // 新しい変更を追加（既存エントリがあれば期限を延長）
  for (const catId of detectedCats) {
    const items = WATCH_URLS.filter(w => w.cat_id === catId);
    const label = items[0]?.label || catId;
    const expires = addDays(today, BADGE_DURATION_DAYS);

    const existing = newsData.updates.find(u => u.cat_id === catId);
    if (existing) {
      existing.detected_at = today;
      existing.expires = expires;
      existing.label = label;
    } else {
      newsData.updates.push({ cat_id: catId, label, detected_at: today, expires });
    }
  }

  newsData.checked_at = new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace('Z', '+09:00');

  // 書き込み
  fs.writeFileSync(HASH_FILE, JSON.stringify(newHashes, null, 2) + '\n');
  fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2) + '\n');

  if (hasChanges) {
    console.log(`[dental-news] ${detectedCats.size}件のカテゴリで変更を検知しました`);
  } else {
    console.log('[dental-news] 変更なし');
  }
}

main().catch(e => { console.error(e); process.exit(1); });

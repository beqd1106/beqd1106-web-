/**
 * beqd1106-web — Cloudflare Worker
 * 静的アセット配信 + Claude AI API プロキシ
 */

// ── モデル設定 ────────────────────────────────────────────
// 2026-06-12 更新: llama-3.1-8b-instruct が廃止対象（2026-05-30）のため移行
const MODEL_QUALITY = "@cf/meta/llama-3.3-70b-instruct-fp8-fast"; // 書類生成・複雑な分析（70B・日本語高品質）
const MODEL_FAST    = "@cf/zai-org/glm-4.7-flash";                // 加算チェック・簡易タスク（100+言語・131kコンテキスト）
// 障害時のフォールバック順（プライマリ失敗時に順に試行）
const MODEL_FALLBACKS = [MODEL_QUALITY, MODEL_FAST];

// ── 各機能のシステムプロンプト ────────────────────────────
const SYSTEM_PROMPTS = {

  // ① 個別支援計画書（就労継続支援A型・B型）
  plan_shuro: `あなたは10年以上の経験を持つ障害福祉サービスの専門家（サービス管理責任者）です。
就労継続支援A型・B型の個別支援計画書を作成してください。

【準拠する法令・指針】
- 障害者総合支援法基準省令第58条・59条
- 障害者の日常生活及び社会生活を総合的に支援するための法律
- ICF（国際生活機能分類）の視点

【必ず守ること】
1. 本人の意向・言葉をそのまま活かした記述（ストレングスベース）
2. SMART原則（具体的・測定可能・達成可能・関連性・期限）に基づく目標設定
3. 長期目標（6〜12ヶ月）と短期目標（〜3ヶ月）を必ず分けて設定
4. 支援内容は「誰が・何を・どのくらいの頻度で」を明記
5. 課題には優先順位をつけて記述
6. 本人の強みを活かした記述（課題だけでなく強みを必ず盛り込む）
7. 専門用語と温かみのある文体を両立

【出力形式】
マークダウン形式で以下の構成で出力：
## 生活全般の解決すべき課題（優先順位順）
## 長期目標（6〜12ヶ月）
## 短期目標（〜3ヶ月）
## 支援内容・サービスの内容と量
## 本人の強みと活用方針
## 関係機関との連携・医療との連携
## 留意事項・配慮事項`,

  // ② 個別支援計画書（居宅介護・同行援護・行動援護・重度訪問介護）
  plan_kyotaku: `あなたは10年以上の経験を持つ障害福祉の専門家（サービス提供責任者）です。
居宅介護・同行援護・行動援護・重度訪問介護の個別支援計画書を作成してください。

【準拠する法令】
- 指定障害福祉サービスの事業等の人員・設備及び運営に関する基準第24条
- サービス提供の都度の記録義務（基準省令第17条）

【必ず守ること】
1. 本人の意向を最優先（「本人が望む生活」から逆算して支援を設計）
2. 身体介護・家事援助・通院等介助など種別を明確に分けて記述
3. リスク管理（転倒・誤薬・誤嚥等）を必ず含める
4. 緊急時の対応手順を具体的に記述
5. 家族・介護者への支援・指導内容も含める
6. 本人同意欄の必要性を明記（法令必須）

【出力形式】
マークダウン形式で以下の構成で出力：
## 本人の意向・生活の希望
## 生活全般の課題（ニーズ）
## 長期目標・短期目標
## 提供するサービス内容（種別・頻度・時間・担当者）
## リスク管理・緊急時対応
## 家族・関係機関との連携
## 留意事項`,

  // ③ アセスメントシート
  assessment: `あなたは障害福祉の専門家です。ICF（国際生活機能分類）の視点を活用したアセスメントシートを作成してください。

【アセスメントの原則】
- ストレングスベース（課題だけでなく強み・できることを必ず評価）
- 本人・家族の主観的な意向と客観的な評価を分けて記述
- 環境因子（家族・住環境・地域資源）も評価
- 「問題」ではなく「ニーズ」として表現
- 利用者の尊厳を尊重した言葉づかい

【必ず含める評価領域】
1. 障害の状況と特性（強みも含む）
2. 健康・医療状況
3. ADL（日常生活動作）の詳細
4. IADL（手段的日常生活動作）
5. 就労・日中活動能力
6. 対人関係・コミュニケーション
7. 家族・居住環境・支援体制
8. 経済状況・制度利用状況
9. 本人の強み・活用できるリソース
10. 支援の方向性（ニーズの優先順位）

【出力形式】
各評価領域について「現状」「課題」「強み」の3点セットで記述してください。`,

  // ④ モニタリング報告書
  monitoring: `あなたは障害福祉の専門家（サービス管理責任者）です。
個別支援計画のモニタリング報告書を作成してください。

【モニタリングの目的】
- 計画目標の達成状況を客観的に評価
- 利用者の意向・満足度を把握
- 計画の変更の要否を判断
- 次期の支援方針を明確にする

【必ず守ること】
1. 目標ごとに「達成度の根拠・具体的な状況」を必ず記述（○×だけでなく）
2. 本人の言葉（主観）と支援者の観察（客観）を分けて記述
3. 前回モニタリングとの比較（改善・維持・低下）を明記
4. 計画変更が必要な場合はその理由と内容を具体的に記述
5. 家族・関係機関からの意見も反映
6. 次期の優先課題・目標の方向性を提示

【出力形式】
マークダウン形式で以下の構成：
## 目標達成状況の評価（目標ごとに詳述）
## 出席・活動状況（就労系のみ）
## 本人の意向・満足度
## 健康・生活状況の変化
## 家族・関係機関からの意見
## 課題と今後の支援方針
## 計画変更の要否と内容`,

  // ⑤ 訪問看護報告書
  nursing_report: `あなたは10年以上の経験を持つ訪問看護師（管理者）です。
主治医（指示を行った医師）への訪問看護報告書を作成してください。

【法令・作成要件】
- 健康保険法第88条・指定訪問看護の事業の人員及び運営に関する基準
- 保医発0327第6号（令和6年3月27日）の記載要領に準拠
- 毎月、主治医へ必ず提出する法定書類

【必ず含める事項】
1. 当月の訪問回数・緊急訪問回数
2. バイタルサインの月間経過（変動・傾向）
3. 病状・症状の変化（改善・悪化・不変）
4. 実施した看護・リハビリテーションの内容
5. ADLの変化（前月比較）
6. 医療機器・処置の管理状況
7. 精神状態・意欲・生活状況
8. 家族への指導・支援内容
9. 主治医への要連絡事項・相談事項
10. 今後の看護の方向性・計画

【文体】
- 医師が読む専門的な医療文書として記述
- 客観的事実と看護師のアセスメントを分けて記述
- 「〜と思われる」より「〜が観察された」等の客観表現を使用`,

  // ⑥ 加算算定チェッカー
  kasan_check: `あなたは障害福祉サービスの報酬・加算に精通した専門家です。
事業所の状況を分析し、算定できる加算と改善機会を診断してください。

【分析の観点】
- 2024年度（令和6年度）の報酬改定後の算定基準を使用
- 算定できているはずなのに取得していない加算を優先して指摘
- 加算要件に「あと一歩」の状態も具体的に示す
- 年間収益への影響額も計算して示す

【必ず出力すること】
1. ✅ 現在算定中（または確実に算定可能）の加算
2. ⚠️ 要件の一部を満たしていない加算（何が不足か）
3. 🎯 取得を検討すべき加算（優先度・難易度・効果額）
4. ❌ 明らかに算定不可の加算
5. 📊 加算取得による年間収益改善の試算
6. 🔧 すぐにできる改善アクション（優先度順）

【重要な加算（京都府・2024年度）】
訪問看護：24時間対応体制加算（6,520円/月）、特別管理加算I・II、処遇改善加算I（13.7%）
就労継続支援：目標工賃達成加算（109単位/日）、就労移行支援体制加算、福祉専門職員配置等加算、処遇改善加算
居宅介護：特定事業所加算I〜IV（5〜20%）、処遇改善加算
相談支援：初回加算、要医療児者支援体制加算、処遇改善加算`,

  // ⑦ 請求ミスAI事前チェック
  claim_check: `あなたは障害福祉サービスの国保連請求に精通した専門家です。
月次レセプト提出前の事前チェックを行い、エラーや疑義を指摘してください。

【チェックの観点（実地指導・返戻で頻出のもの）】
1. 体制届の有無と算定開始月の整合性
2. 加算の算定要件充足の確認
3. 訪問回数・支援時間と算定単位の整合性
4. 利用者の支給量・支給決定期間との整合性
5. 複数サービス利用時の給付調整
6. 月額上限管理の必要性
7. 同一建物減算の適用漏れ・過誤
8. 特別管理加算等の対象利用者の確認
9. 緊急訪問加算の要件（24時間体制加算との関係）
10. 処遇改善加算の計画書・実績報告の有効性

【出力形式】
🔴 エラー（返戻・過誤確実）：原因と修正方法
🟡 警告（要確認）：根拠と確認事項
🟢 問題なし：簡潔に確認済みと明記
📋 提出前チェックリスト（確認事項の要約）`,

  // ⑧ 法令改正・通知の要点まとめ
  law_summary: `あなたは障害福祉・医療制度の専門家です。
厚生労働省・京都府等の通知・法令改正文書を、現場の事業所管理者が理解しやすいように要点整理してください。

【要約の原則】
- 「うちの事業所に関係あること」だけを抽出
- 官僚的な文体を現場の言葉に変換
- 対応が必要なことと参考情報を分けて記載
- 期限のあるものは必ず期限を強調

【必ず出力すること】
## 📌 一言でいうと（3行要約）
## ✅ 事業所が対応すべきこと（具体的・期限付き）
## 📅 対応期限一覧
## 💡 実務上の注意点・よくある誤り
## ❓ 問い合わせ先
## 📖 関連する既存の制度・規定との関係`,

  // ⑨ 事故・苦情 対応文書AI生成
  incident_docs: `あなたは障害福祉事業所の危機管理・コンプライアンスの専門家です。
事故・苦情発生時に必要な文書を、法的・倫理的に適切な形式で作成してください。

【作成する文書の原則】
- 事実に基づく客観的記述（推測・主観を分けて明記）
- 法的責任を適切に認めつつ、事業所の誠実な対応を示す
- 再発防止への本気度が伝わる具体的な内容
- 行政報告は速報（24時間以内）と詳細報告を分けて記述

【必ず出力すること】
## 🚨 行政への速報（24時間以内）
## 📋 詳細事故報告書
## ✉️ 利用者家族への報告・謝罪文
## 🔍 原因分析（M-SHELモデル準拠：Man/Software/Hardware/Environment/Liveware）
## 🛡️ 再発防止策（担当者・期限・確認方法付き）
## 📞 関係機関への連絡事項一覧

【文体の注意】
- 謝罪文は誠実さを示しつつ、法的に問題のない表現を使用
- 「全面的に悪い」等の過度な認定表現は避ける
- 家族向けは専門用語を避けた温かみのある文体`,

  // ⑩ 工賃向上計画書 作成支援
  wage_plan: `あなたは就労継続支援B型の工賃向上に精通した専門家です。
工賃向上計画書（京都府提出用・毎年4月15日締切）を作成してください。

【法令根拠】
- 就労継続支援B型事業所の工賃向上計画（障害者総合支援法）
- 目標工賃達成加算（109単位/日）の算定に直結

【計画書の評価ポイント（実地指導・加算審査）】
1. 達成可能かつ挑戦的な目標額の設定
2. 具体的な取り組み内容（販路開拓・作業効率化・IT活用等）
3. 担当者・実施時期の明確化
4. 前年度比での改善を示す計画

【必ず出力すること】
## 前年度実績の評価・分析
## 当年度の目標工賃月額（設定根拠）
## 工賃向上のための具体的取り組み（優先度順・担当者・時期付き）
## 生産活動の改善計画
## 販路開拓・売上増加の計画
## 職業訓練・スキルアップの計画
## モニタリング方法・進捗確認の仕組み
## 工賃向上が困難な場合のリスクと対策`,

  // ⑪ 利用者むけ「かんたん説明文」生成
  easy_read: `あなたは障害福祉のコミュニケーション支援の専門家です。
複雑な書類・制度をわかりやすい言葉に変換してください。

【やさしい日本語の原則（合理的配慮義務化に対応）】
1. 一文一義（1つの文に1つの情報）
2. 全ての漢字にふりがなを付ける
3. 難しい言葉は使わない（使う場合は「〜つまり〜」で説明）
4. 具体的な例を使う
5. 箇条書きを活用
6. 大切なことは繰り返す
7. 絵文字・視覚的な区切りを活用

【障害種別に応じた配慮】
- 知的障碍：より短く・具体的に・ひらがな多め
- 精神障碍：落ち着いたトーン・プレッシャーを与えない表現
- 視覚障碍（音読対応）：視覚的な情報を言葉で補足
- 聴覚障碍：書き言葉で完全に伝わる表現

【出力形式】
📝 やさしい日本語版（ふりがな付き）
✅ 大事なポイント（3つ以内）
❓ よくある質問と答え`,

  // ⑫ スタッフ配置シミュレーター
  staff_sim: `あなたは障害福祉サービスの人員基準・労務管理の専門家です。
スタッフ情報を分析し、人員基準の充足状況と改善策を提示してください。

【確認する人員基準（2024年度）】
訪問看護：看護師等2.5人以上（常勤換算）、管理者（常勤専従）
就労継続支援A型：サビ管1名、職業指導員+生活支援員（利用者10名に1名以上・常勤換算）
就労継続支援B型：サビ管1名、職業指導員+生活支援員（利用者10名に1名以上）
居宅介護：サービス提供責任者（利用者40名に1名）、常勤換算2.5名以上の介護職員
相談支援：相談支援専門員1名以上（常勤換算）

【常勤換算の計算方法】
常勤換算 = 各スタッフの週勤務時間 ÷ 事業所の常勤所定労働時間（週○時間）

【必ず出力すること】
## 📊 常勤換算数の計算（スタッフ別・合計）
## ✅/❌ 各人員基準の充足状況
## ⚠️ リスクのある基準（あと少しで違反になる状況）
## 加算要件との照合（特定事業所加算・福祉専門職員配置等加算等）
## 🔧 改善提案（採用・シフト変更・資格取得など）
## 📅 次回確認すべき時期・タイミング`,
};

// ── 機能ごとのモデル・トークン設定 ────────────────────
const FEATURE_CONFIG = {
  plan_shuro:      { model: MODEL_QUALITY, max_tokens: 3000 },
  plan_kyotaku:    { model: MODEL_QUALITY, max_tokens: 3000 },
  assessment:      { model: MODEL_QUALITY, max_tokens: 3000 },
  monitoring:      { model: MODEL_QUALITY, max_tokens: 2500 },
  nursing_report:  { model: MODEL_QUALITY, max_tokens: 2500 },
  kasan_check:     { model: MODEL_QUALITY, max_tokens: 3000 },
  claim_check:     { model: MODEL_FAST,    max_tokens: 2000 },
  law_summary:     { model: MODEL_QUALITY, max_tokens: 2500 },
  incident_docs:   { model: MODEL_QUALITY, max_tokens: 3500 },
  wage_plan:       { model: MODEL_QUALITY, max_tokens: 2500 },
  easy_read:       { model: MODEL_FAST,    max_tokens: 2000 },
  staff_sim:       { model: MODEL_QUALITY, max_tokens: 2500 },
};

// ── メインハンドラー ────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS プリフライト
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // AI API ルート
    if (url.pathname === "/api/ai/generate" && request.method === "POST") {
      return handleAIGenerate(request, env);
    }

    // オーラス条件トレーナー：AI解説（Gemini優先→Workers AIフォールバック・キャッシュ）
    if (url.pathname === "/api/oorasu/comment" && request.method === "POST") {
      return handleOorasuComment(request, env, ctx);
    }

    // 静的アセット配信
    return env.ASSETS.fetch(request);
  },
};

// ── AI 生成ハンドラー（Cloudflare Workers AI）───────────
async function handleAIGenerate(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('リクエストボディが不正です', 400);
  }

  const feature = body.feature;

  if (!feature || !SYSTEM_PROMPTS[feature]) {
    return jsonError('不明な機能です: ' + feature, 400);
  }

  const config      = FEATURE_CONFIG[feature];
  const systemPrompt = SYSTEM_PROMPTS[feature];
  const userMessage  = buildUserMessage(feature, body);

  // Cloudflare Workers AI を呼び出す（ストリーミング・フォールバック付き）
  // 設定モデル → MODEL_FALLBACKS の順に試行し、モデル廃止・障害時も継続稼働させる
  const candidates = [config.model, ...MODEL_FALLBACKS.filter((m) => m !== config.model)];
  let aiResponse = null;
  let lastErr = null;
  for (const model of candidates) {
    try {
      aiResponse = await env.AI.run(model, {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userMessage  },
        ],
        stream:     true,
        max_tokens: config.max_tokens,
      });
      break;
    } catch (err) {
      lastErr = err;
    }
  }
  if (!aiResponse) {
    return jsonError('AI の呼び出しに失敗しました: ' + String(lastErr), 502);
  }

  // Cloudflare Workers AI のストリームをそのまま返す
  // フロント側は data: {response:...} 形式で受信する
  return new Response(aiResponse, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// ── オーラス条件トレーナー：AI解説 ─────────────────────────
// 計算はアプリ側で確定済み。AIは「確定した条件の言語化」だけを担当（数値は変えない）。
// Gemini（無料枠・高品質）→ Cloudflare Workers AI（¥0）の順でフォールバック。同条件はキャッシュ。
async function handleOorasuComment(request, env, ctx) {
  let body;
  try { body = await request.json(); } catch { return jsonError('リクエストボディが不正です', 400); }
  // 一時診断：キー有無とGeminiの応答ステータスを返す（キー値は出さない）
  if (body.debug === 'gemini') {
    const k = env.GEMINI_API_KEY;
    const m = env.GEMINI_MODEL || 'gemini-2.5-flash';
    let status = 'no-key', detail = '';
    if (k) {
      try {
        const rr = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + m + ':generateContent?key=' + k, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'こんにちは' }] }] }),
        });
        status = String(rr.status);
        detail = (await rr.text()).slice(0, 300);
      } catch (e) { status = 'throw'; detail = String(e).slice(0, 200); }
    }
    return new Response(JSON.stringify({ hasKey: !!k, keyLen: k ? k.length : 0, model: m, status, detail }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const facts = (body.facts || '').toString().slice(0, 1500);
  if (!facts.trim()) return jsonError('facts が空です', 400);

  const system = 'あなたは麻雀のコーチです。次の「計算済みの逆転条件」を読み、初心者にも分かるよう100〜160字で“定性的に”助言してください。\n厳守:\n・具体的な点数（例：2600点）や「どの方法で何点必要か」は書かないこと。正確な数値はアプリ画面に表示済みで、文章で復唱すると取り違える恐れがあるためです。\n・代わりに、その条件がどれくらい現実的か、どんな手・役（タンヤオ・リーチ・ドラ等）を狙うとよいか、押し引きや（親番があれば）連荘の方針を助言する。\n・実現率のパーセント（約X%）には触れてよい。\n・盤面や点数状況の復唱、前置きはしない。助言本文だけを書く。';

  // キャッシュ（同じ条件は再利用してAPI呼び出しを減らす）
  const cache = caches.default;
  const hash = await sha256(system + '\n' + facts);
  const cacheKey = new Request('https://cache.oorasu.local/comment/' + hash);
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  let comment = null, source = null;

  // 1) Gemini（無料枠・高品質）。モデル提供終了に備え複数候補を順に試行。
  const key = env.GEMINI_API_KEY;
  if (key) {
    const models = [env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite']
      .filter(Boolean);
    for (const model of models) {
      try {
        const r = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + key,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: system }] },
              contents: [{ role: 'user', parts: [{ text: facts }] }],
              generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.6,
                thinkingConfig: { thinkingBudget: 256 }, // 軽い思考で取り違えを抑制
              },
            }),
          }
        );
        if (r.ok) {
          const j = await r.json();
          const parts = j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
          const t = Array.isArray(parts) ? parts.map((p) => p.text || '').join('') : '';
          if (t.trim()) { comment = t.trim(); source = 'gemini'; break; }
        }
      } catch (e) { /* 次のモデルへ */ }
    }
  }

  // 2) Cloudflare Workers AI（¥0フォールバック・キー不要）
  if (!comment) {
    for (const model of [MODEL_FAST, MODEL_QUALITY]) {
      try {
        const ai = await env.AI.run(model, {
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: facts },
          ],
          max_tokens: 300,
        });
        const t = (ai && (ai.response || (ai.result && ai.result.response))) || '';
        if (t.trim()) { comment = t.trim(); source = 'workers-ai'; break; }
      } catch (e) { /* 次のモデルへ */ }
    }
  }

  if (!comment) return jsonError('AI解説の生成に失敗しました', 502);

  const res = new Response(JSON.stringify({ comment, source }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=2592000', // 30日キャッシュ
    },
  });
  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ── ユーザーメッセージ構築 ──────────────────────────────
function buildUserMessage(feature, d) {
  const arr = (v) => Array.isArray(v) ? v.join('、') : (v || '未記入');
  const str = (v) => v || '未記入';
  const opt = (v) => v || '特になし';

  switch (feature) {
    case "plan_shuro":
      return `以下の情報をもとに個別支援計画書（${str(d.serviceType)}）を作成してください。

【利用者基本情報】
- 年齢・性別：${str(d.age)}
- 障害種別・診断名：${arr(d.disabilities)}（${str(d.diagnosis)}）
- 障害支援区分：${str(d.level)}
- 計画期間：${str(d.period)}

【本人の意向・希望（本人の言葉で）】
${str(d.hope)}

【本人の強み・できること】
${opt(d.strengths)}

【生活状況・ADL】
${opt(d.adl)}

【現在の就労状況・作業能力】
${opt(d.work)}

【主な課題・支援ニーズ】
${opt(d.issues)}

【医療・服薬状況】
${opt(d.medical)}

【家族・生活環境】
${opt(d.family)}

上記をもとに、法令（基準省令第58条・ICF視点・SMART原則）に準拠した個別支援計画書を作成してください。`;

    case "plan_kyotaku":
      return `以下の情報をもとに居宅介護系の個別支援計画書を作成してください。

【利用サービス種別】
${arr(d.services)}

【基本情報】
- 年齢・性別：${str(d.age)}
- 障害支援区分：${str(d.level)}
- 障害の状況・診断名：${str(d.diagnosis)}

【本人の意向・希望する生活】
${str(d.hope)}

【ADL・必要な介護内容】
${arr(d.adl)}

【リスク・注意事項】
${arr(d.risks)}
${opt(d.riskDetail)}

【サービス提供スケジュール】
${opt(d.schedule)}

【医療連携・服薬】
${opt(d.medical)}

【家族・緊急連絡先の状況】
${opt(d.family)}

基準省令第24条に準拠し、リスク管理・緊急対応手順を必ず含む個別支援計画書を作成してください。`;

    case "assessment":
      return `以下の情報をもとにICF準拠のアセスメントシートを作成してください。

【利用サービス】${str(d.service)}
【基本情報（年齢・性別・障害種別）】${str(d.basic)}

【心身機能・身体構造（診断・症状・服薬）】
${str(d.body)}

【活動（ADL・IADL・コミュニケーション）】
${str(d.activity)}

【参加（社会参加・就労・余暇）】
${opt(d.participation)}

【環境因子（住環境・家族・支援体制）】
${opt(d.environment)}

【本人の強み・関心・大切にしていること】
${opt(d.strengths)}

【本人・家族の主訴（困っていること・希望）】
${str(d.complaint)}

【現在利用中の他サービス】
${opt(d.other)}

ストレングスベースで「現状」「課題」「強み」の3点セットで各領域を評価したアセスメントシートを作成してください。`;

    case "monitoring":
      return `以下の情報をもとにモニタリング報告書を作成してください。

【基本情報】
- サービス種別：${str(d.service)}
- モニタリング期間：${opt(d.period)}

【長期目標の達成状況】
${str(d.longGoal)}

【短期目標の達成状況】
${str(d.shortGoal)}

【生活全体の変化・気になること】
${opt(d.lifeChange)}

【本人の意向・現状の気持ち】
${opt(d.hope)}

【家族・関係者からの意見】
${opt(d.familyOpinion)}

【今後の課題・方針変更の有無】
${opt(d.nextPlan)}

目標ごとに達成度の根拠・具体的な状況を記述し、次期の支援方針が明確な専門的モニタリング報告書を作成してください。`;

    case "nursing_report":
      return `以下の情報をもとに${str(d.recordType)}を作成してください。

【対象者】${str(d.patient)}

【バイタルサイン】
- 血圧：${opt(d.bp)}
- 脈拍：${opt(d.pulse)}
- 体温：${opt(d.temp)}
- SpO2：${opt(d.spo2)}

【今回の訪問での主な観察・処置（O情報）】
${str(d.observation)}

【本人・家族の訴え・様子（S情報）】
${opt(d.subj)}

【看護問題・評価・次回の計画（A・P）】
${opt(d.plan)}

【利用中サービス・処方薬】
${opt(d.meds)}

医師・他職種が読む専門的な記録として、SOAP形式または指定形式で作成してください。`;

    case "kasan_check":
      return `以下の事業所情報をもとに加算算定チェックを行ってください。

【事業所種別】
${arr(d.services)}

【スタッフ・資格体制】
${opt(d.staff)}

【保有資格・専門職】
${arr(d.qualifications)}

【現在の取り組み】
${arr(d.initiatives)}

【利用者状況】
${opt(d.users)}

【その他・特記事項】
${opt(d.other)}

算定可能な加算・未算定の加算・算定要件の不足点を詳細に分析し、年間収益への影響額も試算してください。`;

    case "claim_check":
      return `以下の月次請求内容を国保連審査の観点から事前チェックしてください。

【サービス種別】${str(d.service)}
【対象月】${opt(d.month)}

【算定した加算・単位数の内容】
${str(d.claims)}

【人員体制・算定根拠】
${opt(d.basis)}

【気になる点・エラーが出た内容】
${opt(d.concern)}

返戻・過誤になりそうな箇所を優先的に指摘し、修正方法を具体的に示してください。`;

    case "law_summary":
      return `以下の障害福祉・訪問看護に関する法令・実務的な質問に答えてください。

【質問の種類】${str(d.qtype)}
【関係する分野】${arr(d.areas)}

【質問内容】
${str(d.question)}

現場の事業所管理者が実際に使えるレベルで、根拠となる法令・通知名も示しながら具体的に回答してください。`;

    case "incident_docs":
      return `以下の事故について必要な文書を作成してください。

【事故の種類】${str(d.incidentType)}
【重傷度】${str(d.level)}
【発生日時・場所】${opt(d.when)}

【発生時のスタッフ状況】
${opt(d.staffStatus)}

【事故の状況・経緯（5W1H）】
${str(d.situation)}

【初期対応の内容】
${opt(d.response)}

【当事者の障害・リスク状況】
${opt(d.person)}

【作成が必要な文書】
${arr(d.purpose)}

法的・倫理的に適切な形式で、再発防止への本気度が伝わる具体的な内容で作成してください。M-SHELモデルで原因分析も行ってください。`;

    case "wage_plan":
      return `以下の情報をもとに就労継続B型の工賃向上計画書を作成してください。

【事業所の作業種別】
${arr(d.workTypes)}

【現在の工賃状況】
- 現在の平均月額工賃：${str(d.wageNow)}
- 目標月額工賃：${str(d.wageTarget)}
- 対象年度：${opt(d.year)}

【利用者・稼働状況】
${opt(d.users)}

【現在の取り組み・販路】
${opt(d.current)}

【課題と強み】
${opt(d.challenges)}

京都府提出用（毎年4月15日締切）の工賃向上計画書として、具体的・実現可能な取り組み内容を担当者・時期付きで作成してください。目標工賃達成加算（109単位/日）の算定要件も満たす内容にしてください。`;

    case "easy_read":
      return `以下の内容をわかりやすい言葉に変換してください。

【変換の目的】${str(d.purpose)}
【対象読者】${str(d.reader)}

【変換したい内容】
${str(d.content)}

【追加の要望】
${opt(d.request)}

やさしい日本語の原則（一文一義・ふりがな・具体例・箇条書き・絵文字活用）に従って変換してください。`;

    case "staff_sim":
      return `以下のスタッフ情報をもとに人員基準の充足状況を診断してください。

【事業所種別】
${arr(d.services)}

【登録利用者数】${str(d.users)}名
【日平均利用者数】${opt(d.daily)}名
【定員】${opt(d.capacity)}名

【管理者・責任者体制】
${str(d.manager)}

【直接支援スタッフ】
${str(d.staff)}

【今後の見通し・課題】
${opt(d.future)}

常勤換算数を計算し、2024年度の法定人員基準の充足状況・不足リスク・加算取得可否・採用計画のアドバイスを具体的に提示してください。`;

    default:
      return JSON.stringify(d);
  }
}

// ── ヘルパー ────────────────────────────────────────────
function jsonError(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

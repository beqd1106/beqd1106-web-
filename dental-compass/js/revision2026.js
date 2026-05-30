// =====================================================
// 令和8年度（2026年）歯科診療報酬改定 完全データ
// 出典：厚生労働省告示・中医協答申（2026年2月13日）
//       青本2026・赤本2026（歯科保険研究会）
// 施行日：2026年6月1日
// =====================================================

const REVISION2026 = {
  施行日: '2026年6月1日',
  改定率: {
    本体2年平均: '+3.09%（30年ぶりの高水準）',
    令和8年度: '+2.41%',
    令和9年度: '+3.77%',
    内訳賃上げ: '+1.70%',
    内訳物価: '+0.76%'
  },

  基本診療料: [
    { 項目: '歯科初診料', 現行: 267, 改定: 272, 増減: '+5', 備考: '届出不要・自動適用' },
    { 項目: '歯科再診料', 現行: 58, 改定: 59, 増減: '+1', 備考: '同上' },
    { 項目: '地域歯科診療支援病院歯科初診料', 現行: 291, 改定: 296, 増減: '+5', 備考: '病院のみ' },
    { 項目: '地域歯科診療支援病院歯科再診料', 現行: 75, 改定: 76, 増減: '+1', 備考: '同上' },
  ],

  新設項目: [
    { 項目: '歯科外来物価対応料（初診時）', 点数: '3点（R9.6〜6点）', 届出: '不要', 備考: '段階的に2倍に引き上げ' },
    { 項目: '歯科外来物価対応料（再診時）', 点数: '1点（R9.6〜2点）', 届出: '不要', 備考: '同上' },
    { 項目: '歯科技工所ベースアップ支援料', 点数: '15点/装置', 届出: '要', 備考: '委託先技工所の賃上げ前提' },
    { 項目: '口腔機能実地指導料', 点数: '46点（月1回）', 届出: '要（衛生士研修修了）', 備考: 'B001-2-2として独立' },
    { 項目: '小児保隙装置（可撤式）', 点数: '1,200点（新設）', 届出: '不要', 備考: '両側性乳臼歯早期喪失等5パターン' },
    { 項目: '歯科口腔リハビリテーション料1（保隙）', 点数: '180点/月1回', 届出: '不要', 備考: '' },
    { 項目: '歯周病継続支援治療（1〜9歯）', 点数: '170点', 届出: '要', 備考: 'SPT+P重防を統合' },
    { 項目: '歯周病継続支援治療（10〜19歯）', 点数: '200点', 届出: '要', 備考: '同上' },
    { 項目: '歯周病継続支援治療（20歯以上）', 点数: '350点', 届出: '要', 備考: '20歯以上は増点' },
    { 項目: '重症化予防連携強化加算', 点数: '100点', 届出: '要', 備考: '糖尿病患者等・医科紹介ベース' },
    { 項目: '3次元プリント有床義歯', 点数: '4,000点/1顎', 届出: '要（3Dプリンター保有）', 備考: 'SLA/DLP方式のみ' },
    { 項目: '歯科技工士連携加算1（対面）', 点数: '60点', 届出: '要', 備考: '技工士が来院して連携' },
    { 項目: '歯科技工士連携加算2（ICT）', 点数: '80点', 届出: '要', 備考: 'ICT活用が対面より高評価' },
    { 項目: '歯科医療機関連携強化加算', 点数: '60点', 届出: '要', 備考: '糖尿病患者内科紹介連携' },
    { 項目: '医科連携訪問加算', 点数: '500点', 届出: '要', 備考: '病院依頼で入院患者に訪問' },
    { 項目: '在宅療養支援歯科診療所加算1', 点数: '100点', 届出: '要', 備考: '評価体系を3段階に再編' },
    { 項目: '在宅療養支援歯科診療所加算2', 点数: '50点', 届出: '要', 備考: '同上' },
    { 項目: '地域歯科医療加算', 点数: '100点', 届出: '要', 備考: '自治体と連携した巡回診療' },
    { 項目: '周術期等口腔機能管理計画策定料1', 点数: '300点', 届出: '要', 備考: '入院前の口腔管理強化' },
    { 項目: '回復期等口腔機能管理計画策定料1', 点数: '300点', 届出: '要', 備考: '回復期連携' },
    { 項目: '電子的歯科診療情報連携体制整備加算（初診）', 点数: '9点 or 4点', 届出: '要', 備考: 'DX推進加算の再編版' },
    { 項目: '電子的歯科診療情報連携体制整備加算（再診）', 点数: '2点', 届出: '要', 備考: '同上' },
  ],

  変更項目: [
    { 項目: '歯科疾患管理料', 現行: '100点（初診月80%）', 改定: '90点（初診月も同一）', 増減: '-10点', 備考: '初診月の逓減廃止' },
    { 項目: '口腔機能管理料（検査あり）', 現行: '60点', 改定: '90点', 増減: '+30点', 備考: '検査有無で分化' },
    { 項目: '口腔機能管理料（検査なし）', 現行: '60点', 改定: '50点', 増減: '-10点', 備考: '検査実施を推奨' },
    { 項目: '小児口腔機能管理料（3項目以上）', 現行: '60点', 改定: '90点', 増減: '+30点', 備考: '2段階評価に再編' },
    { 項目: '小児口腔機能管理料（2項目）', 現行: '60点', 改定: '50点', 増減: '-10点', 備考: '同上' },
    { 項目: '光学印象（1歯）', 現行: '100点', 改定: '150点', 増減: '+50点', 備考: 'CAD/CAM冠にも適用可能に' },
    { 項目: 'CAD/CAMインレー', 現行: '750点', 改定: '770点', 増減: '+20点', 備考: '乳歯への適用拡大' },
    { 項目: '小児保隙装置（固定式）', 現行: '600点', 改定: '850点', 増減: '+250点', 備考: '適応条件を明確化' },
    { 項目: '新製有床義歯管理料', 現行: '1口腔単位', 改定: '140点/1装置', 増減: '算定単位変更', 備考: '局部・総義歯とも同点数' },
    { 項目: '歯科外来ベースアップ評価料Ⅰ（初診）', 現行: '10点', 改定: '21点', 増減: '+11点', 備考: '段階区分拡充・賃上げ実施が前提' },
    { 項目: '歯科外来ベースアップ評価料Ⅰ（再診）', 現行: '2点', 改定: '4点', 増減: '+2点', 備考: '同上' },
  ],

  廃止項目: [
    { 項目: 'SPT（歯周病安定期治療）', 備考: '→ 歯周病継続支援治療に統合' },
    { 項目: 'P重防（歯周病重症化予防治療）', 備考: '→ 同上' },
    { 項目: '口腔細菌定量検査の施設基準', 備考: '施設基準撤廃（要件なし）' },
    { 項目: '咀嚼能力検査の施設基準', 備考: '同上' },
    { 項目: '咬合圧検査の施設基準', 備考: '同上' },
  ],

  施設基準変更: [
    {
      名称: '歯科外来診療医療安全対策加算（外来環から分離）',
      変更内容: '従来の「外来環」から独立。AED・医療安全研修2回/年等が主要要件。',
      アクション: '新体系の要件確認後、改めて届出が必要'
    },
    {
      名称: '歯科外来診療感染対策加算（外来環から分離）',
      変更内容: '感染防止対策研修2回/年等。医療安全と分離して評価。',
      アクション: '同上'
    },
    {
      名称: '口腔管理体制強化加算',
      変更内容: '口腔機能管理（低下症・発達不全症）の管理実績要件を新規追加（過去1年間12回以上）。歯周病継続支援治療の算定実績30回/年・訪問診療5回/年に要件変更。',
      アクション: '口腔機能管理の月次実績を記録・管理する体制を整備'
    },
    {
      名称: '在宅療養支援歯科診療所（歯援診）',
      変更内容: '実績要件の評価期間が「過去1年」から「直近1か月」に変更。',
      アクション: '月次の訪問診療実績のモニタリングが必要'
    },
    {
      名称: '光学印象の施設基準',
      変更内容: '歯科補綴治療3年以上経験の歯科医師+院内デジタル印象採得装置保有が要件。',
      アクション: '機器購入・経験年数の確認後に届出'
    },
    {
      名称: '3次元プリント有床義歯の施設基準',
      変更内容: '液槽光重合方式（SLA/DLP等）の3Dプリンター保有が要件。',
      アクション: '機器導入後に届出'
    },
  ],

  重要スケジュール: [
    { 日付: '2026年2月13日', 内容: '中医協答申（点数確定）' },
    { 日付: '2026年3月5日', 内容: '告示・通知発出' },
    { 日付: '2026年4月1日', 内容: '薬価改定施行' },
    { 日付: '2026年5月7〜6月1日', 内容: '施設基準届出受付期間（6月算定希望の場合）' },
    { 日付: '2026年6月1日', 内容: '診療報酬本体施行（主な改定が全面適用）' },
    { 日付: '2027年6月', 内容: '歯科外来物価対応料が2倍に自動引き上げ' },
  ],

  優先アクション: [
    { 優先度: '最高', アクション: 'ベースアップ評価料の届出区分を試算・届出（賃上げ実施が前提）', 期限: '2026年5月31日' },
    { 優先度: '最高', アクション: 'レセコン/電カルのSPT→歯周病継続支援治療マスタ変更対応', 期限: '2026年5月31日' },
    { 優先度: '高', アクション: '施設基準の新旧比較と届出漏れ自己点検（歯科診療所チェックリスト使用）', 期限: '2026年5月31日' },
    { 優先度: '高', アクション: '口腔機能実地指導料：衛生士研修の受講・届出準備', 期限: '2026年5月31日' },
    { 優先度: '中', アクション: '光学印象加算の算定検討（スキャナー保有医院）', 期限: '随時' },
    { 優先度: '中', アクション: '医科歯科連携強化（重症化予防連携強化加算・歯科医療機関連携強化加算）の体制構築', 期限: '随時' },
    { 優先度: '中', アクション: '3次元プリント義歯（3Dプリンター）の導入検討', 期限: '随時' },
  ],

  出典: [
    '厚生労働省「令和8年度診療報酬改定の概要【歯科】」（令和8年3月5日版）',
    '中央社会保険医療審議会 答申（令和8年2月13日）',
    '青本2026「歯科保険請求2026年 診療報酬改定 青本」',
    '赤本2026「歯科保険研究会」',
    '近畿厚生局「施設基準等の届出について（令和8年度診療報酬改定）」',
    'デンタルネット「2026年歯科診療報酬改定 歯科関連抜粋」',
  ]
};

// =====================================================
// 令和8年度改定ページのレンダリング
// =====================================================
function renderRevision2026Section() {
  const container = document.getElementById('revision2026-container');
  if (!container) return;

  const data = REVISION2026;

  // 点数対照表
  const renderTable = (rows, headers) => `
    <div class="table-wrap fade-up">
      <table class="data-table">
        <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r => `<tr>${Object.values(r).map((v, i) => {
          const isChange = String(v).startsWith('+');
          const isMinus = String(v).startsWith('-');
          return `<td class="${isChange ? 'td-highlight' : isMinus ? 'td-danger' : ''}">${v}</td>`;
        }).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>`;

  container.innerHTML = `
    <!-- 改定概要バナー -->
    <div style="background:linear-gradient(135deg,#0d2137,#1a3a5c);border-radius:16px;padding:2rem;margin-bottom:2rem;color:white;position:relative;overflow:hidden;" class="fade-up">
      <div style="position:absolute;top:-20px;right:-20px;font-size:8rem;opacity:0.05;">📋</div>
      <div class="revision-badge" style="margin-bottom:1rem;background:rgba(0,201,167,0.15);border-color:rgba(0,201,167,0.4);color:var(--teal);">
        令和8年度 診療報酬改定 ― 施行日：2026年6月1日
      </div>
      <h3 style="font-size:1.3rem;margin-bottom:1rem;font-family:'Noto Serif JP',serif;">改定率：本体 <span style="color:var(--teal);font-size:1.8rem;">+2.41%</span>（令和8年度）/ <span style="color:var(--gold);">30年ぶりの高水準</span></h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1rem;">
        <div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:1rem;text-align:center;">
          <div style="font-size:1.5rem;font-weight:700;color:var(--teal);">+5点</div>
          <div style="font-size:0.78rem;opacity:0.7;margin-top:0.2rem;">初診料（267→272点）</div>
        </div>
        <div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:1rem;text-align:center;">
          <div style="font-size:1.5rem;font-weight:700;color:var(--teal);">+1点</div>
          <div style="font-size:0.78rem;opacity:0.7;margin-top:0.2rem;">再診料（58→59点）</div>
        </div>
        <div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:1rem;text-align:center;">
          <div style="font-size:1.5rem;font-weight:700;color:var(--gold);">21項目</div>
          <div style="font-size:0.78rem;opacity:0.7;margin-top:0.2rem;">主要新設項目数</div>
        </div>
      </div>
    </div>

    <!-- 新設・物価対応料 -->
    <div class="info-card fade-up" style="margin-bottom:1.5rem;">
      <h4>🆕 新設：歯科外来物価対応料（届出不要・自動適用）</h4>
      <p>物価高騰への対応として新設。令和9年6月以降は自動で2倍に引き上げ。</p>
      <div class="table-wrap" style="margin-top:0.75rem;">
        <table class="data-table">
          <thead><tr><th>区分</th><th>令和8年6月〜</th><th>令和9年6月〜（自動）</th></tr></thead>
          <tbody>
            <tr><td>初診時</td><td class="td-highlight">3点</td><td class="td-highlight">6点</td></tr>
            <tr><td>再診時</td><td class="td-highlight">1点</td><td class="td-highlight">2点</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 基本診療料 点数表 -->
    <h4 style="color:var(--navy);margin-bottom:0.75rem;">📊 基本診療料 改定点数一覧</h4>
    ${renderTable(data.基本診療料, ['項目', '現行（点）', '改定後（点）', '増減', '備考'])}

    <!-- 主要変更項目 -->
    <h4 style="color:var(--navy);margin:1.5rem 0 0.75rem;">🔄 主要点数変更（新旧対照）</h4>
    <div class="alert alert-warn fade-up">
      <span class="alert-icon">⚠️</span>
      <span><strong>注意：</strong>歯科疾患管理料は100点→90点に減点。一方、口腔機能管理料は60点→90点と大幅増点。口腔機能管理の算定強化が収益維持の鍵です。</span>
    </div>
    ${renderTable(data.変更項目, ['項目', '現行', '改定後', '増減', '備考'])}

    <!-- 新設項目一覧 -->
    <h4 style="color:var(--navy);margin:1.5rem 0 0.75rem;">✨ 主要新設項目一覧</h4>
    ${renderTable(data.新設項目, ['項目', '点数', '届出', '備考'])}

    <!-- 廃止項目 -->
    <h4 style="color:var(--navy);margin:1.5rem 0 0.75rem;">🗑️ 廃止・統合項目</h4>
    <div class="content-grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:0.75rem;">
      ${data.廃止項目.map(i => `
        <div style="background:#fdecea;border:1px solid #f5c6cb;border-radius:8px;padding:0.9rem;">
          <div style="font-weight:700;font-size:0.88rem;color:#c0392b;">${i.項目}</div>
          <div style="font-size:0.8rem;color:#7b2121;margin-top:0.3rem;">${i.備考}</div>
        </div>`).join('')}
    </div>

    <!-- 施設基準の変更 -->
    <h4 style="color:var(--navy);margin:1.5rem 0 0.75rem;">🏥 施設基準の主要変更</h4>
    <div class="content-grid" style="grid-template-columns:1fr;gap:0.75rem;">
      ${data.施設基準変更.map(s => `
        <div class="info-card" style="border-left:4px solid var(--teal);">
          <h4 style="font-size:0.95rem;">${s.名称}</h4>
          <p style="margin-bottom:0.5rem;">${s.変更内容}</p>
          <div style="background:var(--off-white);border-radius:6px;padding:0.5rem 0.75rem;font-size:0.82rem;color:var(--teal-dark);font-weight:600;">
            📌 対応アクション：${s.アクション}
          </div>
        </div>`).join('')}
    </div>

    <!-- 優先アクション -->
    <h4 style="color:var(--navy);margin:1.5rem 0 0.75rem;">⚡ 院長の優先アクションリスト</h4>
    <div class="point-list">
      ${data.優先アクション.map((a, i) => `
        <div class="point-item">
          <div class="pi-num ${a.優先度 === '最高' ? '' : a.優先度 === '高' ? 'teal' : ''}"
               style="${a.優先度 === '最高' ? 'background:var(--gold);color:var(--navy);' : ''}">
            ${i+1}
          </div>
          <div class="pi-text">
            <span class="tag ${a.優先度 === '最高' ? 'red' : a.優先度 === '高' ? 'green' : 'gold'}" style="margin-right:0.5rem;">${a.優先度}</span>
            <strong>${a.アクション}</strong>
            ${a.期限 !== '随時' ? `<span style="font-size:0.78rem;color:var(--text-muted);display:block;margin-top:0.2rem;">期限：${a.期限}</span>` : ''}
          </div>
        </div>`).join('')}
    </div>

    <!-- 重要スケジュール -->
    <h4 style="color:var(--navy);margin:1.5rem 0 0.75rem;">📅 改定スケジュール</h4>
    <div class="schedule-table">
      ${data.重要スケジュール.map(s => `
        <div class="schedule-row ${s.日付.includes('6月1日') ? 'style="background:rgba(0,201,167,0.06);padding:0.65rem 0.5rem;border-radius:8px;"' : ''}">
          <div class="schedule-month">${s.日付}</div>
          <div class="schedule-tasks">${s.内容}</div>
        </div>`).join('')}
    </div>

    <!-- 出典 -->
    <div class="alert alert-info fade-up" style="margin-top:1.5rem;">
      <span class="alert-icon">📚</span>
      <div>
        <strong>出典・参考資料</strong><br>
        ${data.出典.map(s => `<small>・${s}</small>`).join('<br>')}
      </div>
    </div>
  `;

  // td-dangerのスタイル（インライン追加）
  if (!document.getElementById('revision-style')) {
    const style = document.createElement('style');
    style.id = 'revision-style';
    style.textContent = '.td-danger { color: #e74c3c; font-weight: 700; }';
    document.head.appendChild(style);
  }
}

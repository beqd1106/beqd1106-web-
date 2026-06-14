// =====================================================
// 歯科経営コンパス — 情報品質メタデータ
// 全カードの情報種別・検証状況・注記を一元管理する。
//
// type:
//   legal    … 法令・告示に直接根拠がある情報
//   official … 公的機関（厚労省・JFC・日歯等）の公式データ
//   estimate … 市場相場・業界目安（変動する参考値）
//   guidance … 実務的アドバイス・ベストプラクティス
//
// volatility:
//   high   … 毎年〜数ヶ月ごとに変化しうる（金利・診療報酬点数等）
//   medium … 2〜3年に1回変化しうる（施設基準・法改正等）
//   low    … 5年以上安定している（一般的な経営原則等）
//
// verified:
//   'YYYY-MM-DD' … その日付にオリジナルソースと照合した
//   null         … 未照合（出典要確認）
//
// ★ 更新手順: このファイルの verified / note を更新してコミットする。
//   cat-06（診療報酬改定）・cat-02（JFC金利）は改定・金利変動のたびに更新すること。
// =====================================================

const CARD_META = {

  // ── Cat.01 開業準備 ────────────────────────────────────────
  'cat-01-0': {
    type: 'guidance', volatility: 'low', verified: null,
    note: '開業スケジュール期間は目安。業者・立地・融資状況により変動します',
  },
  'cat-01-1': {
    type: 'guidance', volatility: 'low', verified: null,
    note: 'ユニット台数と月商の関係は業界目安値。診療科目・地域により差あり',
  },
  'cat-01-2': {
    type: 'estimate', volatility: 'medium', verified: null,
    note: '機器費用はメーカー・ディーラー・購入時期により変動する参考値です',
  },
  'cat-01-3': {
    type: 'legal', volatility: 'medium', verified: null,
    note: '届出期限は医療法等の法令根拠あり。様式は都道府県ごとに異なる場合があります',
  },

  // ── Cat.02 事業計画・融資 ──────────────────────────────────
  'cat-02-0': {
    type: 'official', volatility: 'high', verified: '2026-06-14',
    note: '2026-06-14照合：JFC基準利率は令和8年6月時点で有担保2.5〜4.8%/無担保3.5〜5.2%。旧記載0.65〜2.45%（ゼロ金利期）を現行値へ修正済み。融資限度7,200万円・設備20年/運転7年は国民生活事業の条件で整合。金利は変動型のため毎月公式確認が必要',
  },
  'cat-02-1': {
    type: 'estimate', volatility: 'high', verified: null,
    note: '民間銀行・信用金庫の金利は市況・交渉・保証協会利用の有無で変動します',
  },
  'cat-02-2': {
    type: 'official', volatility: 'low', verified: null,
    note: '公庫「創業計画書」の書式は随時改訂される場合があります。公式サイトの最新様式を使用してください',
  },
  'cat-02-3': {
    type: 'official', volatility: 'medium', verified: null,
    note: '経営指標の目安値は厚労省「医療経済実態調査」（偶数年発表）の全国平均を参考にしています。地域・規模・診療科目で大きく異なります',
  },

  // ── Cat.03 物件・診療圏調査 ────────────────────────────────
  'cat-03-0': {
    type: 'guidance', volatility: 'low', verified: null,
    note: '診療圏の適正密度（人口あたり歯科院数）は日本歯科医師会統計等を参考にした目安値です',
  },
  'cat-03-1': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-03-2': {
    type: 'estimate', volatility: 'medium', verified: null,
    note: '保証金・テナント条件は地域・物件・貸主により大きく異なります。個別の契約内容をご確認ください',
  },
  'cat-03-3': {
    type: 'guidance', volatility: 'low', verified: null,
  },

  // ── Cat.04 行政届出・保健所対応 ───────────────────────────
  'cat-04-0': {
    type: 'legal', volatility: 'medium', verified: null,
    note: '医療法第8条（開設届の提出義務）に根拠。様式・添付書類は管轄保健所に確認してください',
  },
  'cat-04-1': {
    type: 'legal', volatility: 'medium', verified: null,
    note: '医療法人設立の受付期間・手続きは都道府県によって異なります。最新情報は都道府県担当窓口で確認を',
  },
  'cat-04-2': {
    type: 'legal', volatility: 'medium', verified: null,
    note: '医療法施行規則・放射線障害防止法に根拠。改正の可能性があるため管轄保健所・規制当局に確認してください',
  },
  'cat-04-3': {
    type: 'legal', volatility: 'medium', verified: null,
  },

  // ── Cat.05 保険医療機関・施設基準 ─────────────────────────
  'cat-05-0': {
    type: 'legal', volatility: 'high', verified: null,
    note: '令和8年度診療報酬改定（2026年6月施行）後の要件です。施設基準は改定のたびに変更されます',
  },
  'cat-05-1': {
    type: 'official', volatility: 'high', verified: null,
    note: '令和8年度施設基準の概要です。算定要件の詳細は告示・通知原文と地方厚生局への確認が必須です',
  },
  'cat-05-2': {
    type: 'official', volatility: 'high', verified: null,
    note: '令和8年度改定後の施設基準です。特に点数・要件の数値は告示原文で必ず確認してください',
  },
  'cat-05-3': {
    type: 'guidance', volatility: 'medium', verified: null,
  },

  // ── Cat.06 診療報酬改定（令和8年度）──────────────────────
  'cat-06-0': {
    type: 'official', volatility: 'high', verified: '2026-06-12',
    note: '改定率+2.41%・告示第69号（2026年3月5日）・施行2026年6月1日・疑義解釈その1〜7（3/23〜5/29）を確認済み',
  },
  'cat-06-1': {
    type: 'official', volatility: 'high', verified: '2026-06-12',
    note: '初診272点・再診59点・物価対応料3/1点・歯周病継続支援治療170/200/350点（旧SPT200/250/350から再設定）・口腔機能実地指導料46点・技工連携加算1:60点/2:80点・3DFD4000点・医科連携500点・小児保隙装置1200点を告示第69号ベースの複数ソースで照合完了',
  },
  'cat-06-2': {
    type: 'official', volatility: 'high', verified: '2026-06-12',
    note: '技工士連携加算1=60点・2=80点・3次元プリント有床義歯=4000点・光学印象150点（CAD/CAM冠にも適用拡大）・光学印象歯科技工士連携加算50点を確認。投資シミュレーションは参考値',
  },
  'cat-06-3': {
    type: 'official', volatility: 'high', verified: '2026-06-12',
    note: '管理料1（検査あり）=90点・管理料2（検査なし）=50点・実地指導料46点確認。旧記載「口腔機能精密検査280点」は告示で確認できず削除→口腔粘膜湿潤度検査130点（3月に1回・新設）に訂正',
  },

  // ── Cat.07 自費診療・収益改善 ─────────────────────────────
  'cat-07-0': {
    type: 'estimate', volatility: 'medium', verified: null,
    note: '自費診療価格・粗利率は地域・術者・設備・技工所によって大きく異なります。経営判断の参考値としてご活用ください',
  },
  'cat-07-1': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-07-2': {
    type: 'estimate', volatility: 'medium', verified: null,
    note: 'リコール率の「全国平均」は調査元・調査年・集計方法により異なります。自院の実績データと比較する際は参考値としてください',
  },
  'cat-07-3': {
    type: 'guidance', volatility: 'low', verified: null,
  },

  // ── Cat.08 医療広告規制 ────────────────────────────────────
  'cat-08-0': {
    type: 'legal', volatility: 'medium', verified: null,
    note: '医療広告ガイドラインに根拠。ガイドラインは随時改訂されます。最新版は厚生労働省HPで確認してください',
  },
  'cat-08-1': {
    type: 'legal', volatility: 'medium', verified: null,
  },
  'cat-08-2': {
    type: 'legal', volatility: 'medium', verified: null,
  },
  'cat-08-3': {
    type: 'guidance', volatility: 'medium', verified: null,
    note: 'SNS・口コミに関するガイドラインや法令（景表法等）は変化します。最新の薬機法・医療広告規制をご確認ください',
  },

  // ── Cat.09 ウェブ・マーケティング ─────────────────────────
  'cat-09-0': {
    type: 'guidance', volatility: 'high', verified: null,
    note: 'Googleのアルゴリズム・MEO仕様は頻繁に変化します。最新の公式ガイドラインをご確認ください',
  },
  'cat-09-1': {
    type: 'guidance', volatility: 'high', verified: null,
    note: 'SEOのベストプラクティスはGoogleのアルゴリズム変更により変化します',
  },
  'cat-09-2': {
    type: 'guidance', volatility: 'medium', verified: null,
  },
  'cat-09-3': {
    type: 'guidance', volatility: 'medium', verified: null,
    note: 'SNS・動画プラットフォームの機能・仕様は頻繁に変化します',
  },

  // ── Cat.10 採用・人事 ──────────────────────────────────────
  'cat-10-0': {
    type: 'estimate', volatility: 'high', verified: null,
    note: '採用市場の状況・給与相場は時期・地域・景気により変動します。最新の求人情報や日本歯科衛生士会の調査等を参照してください',
  },
  'cat-10-1': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-10-2': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-10-3': {
    type: 'guidance', volatility: 'low', verified: null,
  },

  // ── Cat.11 予約・オペレーション ───────────────────────────
  'cat-11-0': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-11-1': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-11-2': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-11-3': {
    type: 'guidance', volatility: 'low', verified: null,
  },

  // ── Cat.12 感染対策・安全管理 ─────────────────────────────
  'cat-12-0': {
    type: 'official', volatility: 'medium', verified: null,
    note: '標準予防策はWHO・CDC・厚労省通知に根拠。最新の感染対策指針をご確認ください',
  },
  'cat-12-1': {
    type: 'official', volatility: 'medium', verified: null,
    note: '滅菌管理基準はWHO・厚労省通知に根拠。機器メーカーの最新マニュアルもあわせて参照してください',
  },
  'cat-12-2': {
    type: 'official', volatility: 'medium', verified: null,
    note: 'AED設置・緊急対応のガイドラインは日本救急医学会等により更新されることがあります',
  },
  'cat-12-3': {
    type: 'official', volatility: 'medium', verified: null,
  },

  // ── Cat.13 個人情報・コンプライアンス ─────────────────────
  'cat-13-0': {
    type: 'legal', volatility: 'medium', verified: null,
    note: '個人情報保護法は令和4年（2022年）改正に基づきます。今後の改正に注意してください',
  },
  'cat-13-1': {
    type: 'legal', volatility: 'low', verified: null,
    note: '診療録の保管期間は医療法施行規則第20条に根拠（5年）',
  },
  'cat-13-2': {
    type: 'guidance', volatility: 'medium', verified: null,
    note: 'デジタルツールの利用規約・セキュリティポリシーは各サービスにより異なります',
  },
  'cat-13-3': {
    type: 'guidance', volatility: 'low', verified: null,
  },

  // ── Cat.14 DX・IT ──────────────────────────────────────────
  'cat-14-0': {
    type: 'official', volatility: 'high', verified: null,
    note: 'マイナ保険証・オンライン資格確認の制度は変化が続いています。厚労省の最新通知を確認してください',
  },
  'cat-14-1': {
    type: 'estimate', volatility: 'medium', verified: null,
    note: 'レセコン・電子カルテの費用は製品・契約形態・サポート内容により変動します。各社の最新見積もりをご確認ください',
  },
  'cat-14-2': {
    type: 'official', volatility: 'medium', verified: null,
    note: '厚労省「医療情報システムの安全管理に関するガイドライン第6.0版（2023年）」に基づきます',
  },
  'cat-14-3': {
    type: 'official', volatility: 'high', verified: null,
    note: 'サイバーセキュリティの脅威・対策は急速に変化します。厚労省・IPAの最新情報を参照してください',
  },

  // ── Cat.15 経営管理・財務 ──────────────────────────────────
  'cat-15-0': {
    type: 'official', volatility: 'medium', verified: null,
    note: 'KPI目標値は厚労省「医療経済実態調査」等の全国平均を参考にした目安です。地域・規模により差があります',
  },
  'cat-15-1': {
    type: 'legal', volatility: 'high', verified: '2026-06-02',
    note: 'iDeCo上限68,000→75,000円（2026年12月拠出分から）。少額償却特例30万→40万円（令和8年4月1日以後取得）令和11年3月まで延長。税率は毎年変わるため税理士に要確認',
  },
  'cat-15-2': {
    type: 'legal', volatility: 'high', verified: null,
    note: '電子帳簿保存法・インボイス制度は令和5〜6年に大幅改正。最新の国税庁通達をご確認ください',
  },
  'cat-15-3': {
    type: 'guidance', volatility: 'low', verified: null,
  },

  // ── Cat.16 法人化・組織 ────────────────────────────────────
  'cat-16-0': {
    type: 'legal', volatility: 'medium', verified: null,
    note: '医療法・税法に根拠。法人化のメリット・デメリットは税制改正により変わることがあります',
  },
  'cat-16-1': {
    type: 'estimate', volatility: 'medium', verified: null,
    note: '法人化の「損益分岐となる年収目安」は社会保険料率・税率の変動により変わります。税理士に試算を依頼してください',
  },
  'cat-16-2': {
    type: 'legal', volatility: 'medium', verified: null,
    note: 'MS法人の活用方法は税務調査リスクを含みます。必ず税理士・行政書士に相談してください',
  },
  'cat-16-3': {
    type: 'guidance', volatility: 'low', verified: null,
    note: '分院展開の数値目安（月商・黒字化月数等）は参考値です',
  },

  // ── Cat.17 事業承継・M&A ────────────────────────────────────
  'cat-17-0': {
    type: 'estimate', volatility: 'medium', verified: null,
    note: '医院評価額・M&A倍率は市場動向・ブローカー・買い手の状況で変動します',
  },
  'cat-17-1': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-17-2': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-17-3': {
    type: 'guidance', volatility: 'low', verified: null,
  },

  // ── Cat.18 閉院・廃止 ──────────────────────────────────────
  'cat-18-0': {
    type: 'legal', volatility: 'low', verified: null,
    note: '各届出期限は医療法（第9条等）・保険医療機関規則に根拠。廃止届の様式は管轄保健所・厚生局で確認してください',
  },
  'cat-18-1': {
    type: 'guidance', volatility: 'low', verified: null,
  },
  'cat-18-2': {
    type: 'legal', volatility: 'low', verified: null,
    note: '診療録の保管義務は医療法施行規則第20条（5年）に根拠。歯科技工指示書は歯科技工士法に根拠（2年）',
  },
  'cat-18-3': {
    type: 'legal', volatility: 'low', verified: null,
    note: '解雇予告30日前の要件は労働基準法第20条に根拠',
  },
};

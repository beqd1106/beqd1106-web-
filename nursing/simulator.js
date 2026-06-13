/* ================================================================
   障碍者福祉 運営ガイド — 加算シミュレーター
   2024年6月改定後の参考単価をもとに月間収益を概算計算
================================================================ */
(function () {
  'use strict';

  // ── 単価定数（2024年度参考値） ─────────────────────────────────
  const RATE = {
    // 訪問看護（医療保険）※2024年6月改定後の参考額
    VN_BASE:        5550,   // 基本療養費(I)イ 週3日まで
    VN_24H:         6520,   // 24時間対応体制加算（ロ）/月/人
    VN_TOKUKANⅡ:   2500,   // 特別管理加算Ⅱ/月/人
    VN_TOKUKANⅠ:   5000,   // 特別管理加算Ⅰ/月/人
    VN_TERMINAL:   25000,   // 訪問看護ターミナルケア療養費/件
    // ※医療保険の訪問看護に「処遇改善加算」は存在しない。
    //   賃金改善は「訪問看護ベースアップ評価料(Ⅰ) 1,050円/月/人」で評価する。
    VN_BASEUP:      1050,   // ベースアップ評価料(Ⅰ)/月/人（2026年6月改定で780→1,050）

    // 就労継続A型（1単位10.18円 京都府 2024年度参考）
    A_UNIT:         10.18,
    A_BASE_UNIT:    584,    // 基本報酬（定員20名以下・7〜8時間）単位/日
    A_SHURO_UNIT:   22,     // 就労移行支援体制加算（1名就労）単位/日
    A_FUKUSHI1:     15,     // 福祉専門職員配置等加算Ⅰ 単位/日
    A_FOOD:         34,     // 食事提供体制加算 単位/日

    // 就労継続B型（1単位10.18円 京都府 2024年度参考）
    B_UNIT:         10.18,
    // 基本報酬（平均工賃月額による7段階）単位/日
    B_BASE: {
      45000: 624, 35000: 596, 27000: 568,
      22000: 543, 18000: 519, 14000: 497, 0: 476
    },
    B_MOKUHYO:      10,   // 目標工賃達成加算 単位/日（令和6年度新設）
    B_SHURO_UNIT:   27,   // 就労移行支援体制加算（1名就労）単位/日
    B_FUKUSHI1:     15,   // 福祉専門職員配置等加算Ⅰ 単位/日
    B_FOOD:         30,   // 食事提供体制加算 単位/日

    SHORYO_RATE: 0.137,   // 処遇改善加算Ⅰ共通率
  };

  // ── ヘルパー ─────────────────────────────────────────────────────
  function num(id)     { return parseFloat(document.getElementById(id)?.value) || 0; }
  function checked(id) { return document.getElementById(id)?.checked || false; }
  function fmt(n)      { return Math.round(n).toLocaleString('ja-JP'); }
  function setVal(id, v) {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  }

  // ── 訪問看護シミュレーター ──────────────────────────────────────
  function calcVN() {
    const users    = num('vn-users');
    const visits   = num('vn-visits');     // 月間訪問回数/人
    const toku1    = num('vn-toku1');      // 特別管理加算Ⅰ対象者数
    const toku2    = num('vn-toku2');      // 特別管理加算Ⅱ対象者数
    const terminal = num('vn-terminal');   // ターミナル件数/月
    const add24h    = checked('vn-24h');
    const addBaseup = checked('vn-baseup');

    const basicIncome = users * visits * RATE.VN_BASE;
    const income24h   = add24h ? users * RATE.VN_24H : 0;
    const incomeToku1 = toku1 * RATE.VN_TOKUKANⅠ;
    const incomeToku2 = toku2 * RATE.VN_TOKUKANⅡ;
    const incomeTerminal = terminal * RATE.VN_TERMINAL;
    const subtotal = basicIncome + income24h + incomeToku1 + incomeToku2 + incomeTerminal;
    // 医療保険の訪問看護はベースアップ評価料(Ⅰ)=1,050円/月/人で賃金改善を評価
    const baseup   = addBaseup ? users * RATE.VN_BASEUP : 0;
    const total    = subtotal + baseup;

    setVal('vn-res-basic',    '¥' + fmt(basicIncome));
    setVal('vn-res-24h',      '¥' + fmt(income24h));
    setVal('vn-res-toku1',    '¥' + fmt(incomeToku1));
    setVal('vn-res-toku2',    '¥' + fmt(incomeToku2));
    setVal('vn-res-terminal', '¥' + fmt(incomeTerminal));
    setVal('vn-res-baseup',   '¥' + fmt(baseup));
    setVal('vn-res-total',    '¥' + fmt(total));
    const yearEl = document.getElementById('vn-res-year');
    if (yearEl) yearEl.textContent = '年間概算: ¥' + fmt(total * 12);
  }

  // ── 就労継続A型シミュレーター ───────────────────────────────────
  function calcA() {
    const users    = num('a-users');
    const days     = num('a-days');      // 月間利用日数
    const shuroN   = num('a-shuro');     // 就労移行実績（人数）
    const addFukushi = checked('a-fukushi');
    const addFood    = checked('a-food');
    const addShoryo  = checked('a-shoryo');

    const baseUnit = RATE.A_BASE_UNIT;
    const shuroUnit = shuroN > 0 ? Math.min(shuroN * 5, 100) + RATE.A_SHURO_UNIT : 0; // 簡易計算
    const fukushiUnit = addFukushi ? RATE.A_FUKUSHI1 : 0;
    const foodUnit    = addFood    ? RATE.A_FOOD : 0;
    const totalUnit   = baseUnit + shuroUnit + fukushiUnit + foodUnit;

    const baseIncome = users * days * baseUnit * RATE.A_UNIT;
    const shuroIncome = users * days * shuroUnit * RATE.A_UNIT;
    const fukushiIncome = users * days * fukushiUnit * RATE.A_UNIT;
    const foodIncome    = users * days * foodUnit * RATE.A_UNIT;
    const subtotal = baseIncome + shuroIncome + fukushiIncome + foodIncome;
    const shoryo   = addShoryo ? subtotal * RATE.SHORYO_RATE : 0;
    const total    = subtotal + shoryo;

    setVal('a-res-base',    '¥' + fmt(baseIncome));
    setVal('a-res-shuro',   '¥' + fmt(shuroIncome));
    setVal('a-res-fukushi', '¥' + fmt(fukushiIncome));
    setVal('a-res-food',    '¥' + fmt(foodIncome));
    setVal('a-res-shoryo',  '¥' + fmt(shoryo));
    setVal('a-res-total',   '¥' + fmt(total));
    const yearEl = document.getElementById('a-res-year');
    if (yearEl) yearEl.textContent = '年間概算: ¥' + fmt(total * 12);
  }

  // ── 就労継続B型シミュレーター ───────────────────────────────────
  function getBaseUnitB(avgWage) {
    const thresholds = [45000, 35000, 27000, 22000, 18000, 14000, 0];
    for (const t of thresholds) {
      if (avgWage >= t) return RATE.B_BASE[t];
    }
    return RATE.B_BASE[0];
  }

  function calcB() {
    const users    = num('b-users');
    const days     = num('b-days');
    const avgWage  = num('b-wage');     // 平均工賃月額
    const addMokuhyo = checked('b-mokuhyo');
    const addShuro   = checked('b-shuro');
    const addFukushi = checked('b-fukushi');
    const addFood    = checked('b-food');
    const addShoryo  = checked('b-shoryo');

    const baseUnit    = getBaseUnitB(avgWage);
    const mokuhyoUnit = addMokuhyo ? RATE.B_MOKUHYO : 0;
    const shuroUnit   = addShuro   ? RATE.B_SHURO_UNIT : 0;
    const fukushiUnit = addFukushi ? RATE.B_FUKUSHI1 : 0;
    const foodUnit    = addFood    ? RATE.B_FOOD : 0;

    const baseIncome    = users * days * baseUnit    * RATE.B_UNIT;
    const mokuhyoIncome = users * days * mokuhyoUnit * RATE.B_UNIT;
    const shuroIncome   = users * days * shuroUnit   * RATE.B_UNIT;
    const fukushiIncome = users * days * fukushiUnit * RATE.B_UNIT;
    const foodIncome    = users * days * foodUnit    * RATE.B_UNIT;
    const subtotal = baseIncome + mokuhyoIncome + shuroIncome + fukushiIncome + foodIncome;
    const shoryo   = addShoryo ? subtotal * RATE.SHORYO_RATE : 0;
    const total    = subtotal + shoryo;

    setVal('b-res-baseunit', baseUnit + '単位/日');
    setVal('b-res-base',     '¥' + fmt(baseIncome));
    setVal('b-res-mokuhyo',  '¥' + fmt(mokuhyoIncome));
    setVal('b-res-shuro',    '¥' + fmt(shuroIncome));
    setVal('b-res-fukushi',  '¥' + fmt(fukushiIncome));
    setVal('b-res-food',     '¥' + fmt(foodIncome));
    setVal('b-res-shoryo',   '¥' + fmt(shoryo));
    setVal('b-res-total',    '¥' + fmt(total));
    const yearEl = document.getElementById('b-res-year');
    if (yearEl) yearEl.textContent = '年間概算: ¥' + fmt(total * 12);
  }

  // ── イベントバインド ─────────────────────────────────────────────
  function bindAll(prefix, fn) {
    const el = document.getElementById('sim-' + prefix);
    if (!el) return;
    el.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input',  fn);
      inp.addEventListener('change', fn);
    });
    fn(); // 初期計算
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    bindAll('vn', calcVN);
    bindAll('a',  calcA);
    bindAll('b',  calcB);
  }

  window._simCalcVN = calcVN;
  window._simCalcA  = calcA;
  window._simCalcB  = calcB;
})();

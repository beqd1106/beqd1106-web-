// 操作トレーニング（WinActor）— シナリオ編集画面と同じ考え方（開始→ノードを上から下へ→終了、パレット・プロパティ・変数一覧）の練習用画面。
// 他社の画像・ロゴは使わず、資格noteのデザインで作っている。お題 → ノードを置く → プロパティを設定 → 実行で自動採点。

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => Math.random().toString(36).slice(2, 8);

/* ---------- パレット（WinActorのカテゴリ名に合わせる） ---------- */
const PAL = [
  { tab: "ノード", cat: "フロー", items: ["分岐", "繰り返し", "例外処理", "グループ"] },
  { tab: "ノード", cat: "アクション", items: ["画像マッチング"] },
  { tab: "ノード", cat: "ユーザ", items: ["待機ボックス", "インプットボックス"] },
  { tab: "ノード", cat: "変数", items: ["変数値設定", "四則演算"] },
  { tab: "ライブラリ", cat: "Excel", items: ["Excel操作（値の取得）", "Excel操作（値の設定）"] },
];
const COLOR = { 分岐: "#0E9F9A", 繰り返し: "#0E9F9A", 例外処理: "#0E9F9A", グループ: "#0E9F9A", 画像マッチング: "#6B5BE2", 待機ボックス: "#F39220", インプットボックス: "#F39220", 変数値設定: "#2D7FF0", 四則演算: "#2D7FF0", "Excel操作（値の取得）": "#16A34A", "Excel操作（値の設定）": "#16A34A" };
// 中に枝（ノード列）を持つノードと、その枝の名前
const BRANCHES = { 分岐: ["真", "偽"], 繰り返し: ["繰り返す処理"], 例外処理: ["正常系", "異常系"], グループ: ["グループの中"] };
const OPS = ["＝", "≠", "＞", "≧", "＜", "≦"];

function newNode(type) {
  const n = { id: "w_" + uid(), type, p: {} };
  if (BRANCHES[type]) n.kids = BRANCHES[type].map(() => []);
  if (type === "分岐") n.p = { var: "", op: "＞", value: "" };
  if (type === "繰り返し") n.p = { mode: "回数", count: "", var: "", op: "＜", value: "" };
  if (type === "グループ") n.p = { name: "グループ" };
  if (type === "画像マッチング") n.p = { image: "登録ボタン" };
  if (type === "待機ボックス") n.p = { message: "" };
  if (type === "インプットボックス") n.p = { message: "", var: "" };
  if (type === "変数値設定") n.p = { var: "", value: "" };
  if (type === "四則演算") n.p = { var: "", left: "", op: "＋", right: "" };
  if (type.startsWith("Excel")) n.p = { file: "売上.xlsx", sheet: "Sheet1", cell: "", var: "", value: "" };
  return n;
}

/* ---------- お題 ---------- */
const TASKS = [
  {
    id: "w1", title: "変数とカウンタ（繰り返し）",
    goal: "変数「合計」を0から始めて、繰り返しで10回「1」を足すシナリオを作ります。",
    steps: [
      "「変数一覧」で変数「合計」を追加する",
      "フローチャートの「＋」から、変数カテゴリの「変数値設定」を置き、合計に 0 を設定する",
      "その下にフローカテゴリの「繰り返し」を置き、判定を「回数」10回にする",
      "繰り返しの中に「四則演算」を置き、合計 ＝ 合計 ＋ 1 にする",
      "「実行」で確かめる（実行後の合計が10になれば成功）",
    ],
    env: () => ({}),
    checks: (S, run) => {
      const loop = find(S.flow, (n) => n.type === "繰り返し");
      const set0 = S.flow.findIndex((n) => n.type === "変数値設定" && n.p.var === "合計" && n.p.value.trim() === "0");
      const calc = loop && find(loop.kids[0], (n) => n.type === "四則演算");
      return [
        { ok: S.vars.some((v) => v.name === "合計"), label: "変数一覧に「合計」がある", hint: "画面上の「変数一覧」タブで「＋変数」から「合計」を追加します。" , target: ["#wa-vadd", "[data-ft=\"vars\"]"], learn: "変数は、値を一時的にしまっておく「箱」です。画面下の「変数一覧」タブを開き、「変数追加」を押して変数名に 合計 と入れます。" },
        { ok: set0 >= 0, label: "変数値設定で 合計 に 0 を入れている", hint: "変数カテゴリの「変数値設定」を置き、プロパティで変数「合計」、値「0」にします。" , target: ["PROP:変数値設定:value", ".wa-node[data-type=\"変数値設定\"]", ".wa-item[data-t=\"変数値設定\"]", "[data-pt=\"ノード\"]"], learn: "「変数値設定」は、箱（変数）に値を入れるノードです。左のパレットの「変数」の中から選ぶと、フローチャートに入ります。右のプロパティで変数名「合計」、値「0」にします。" },
        { ok: !!loop && set0 >= 0 && S.flow.indexOf(loop) > set0, label: "その下に繰り返しがある", hint: "0を入れてから繰り返すので、変数値設定の下に繰り返しを置きます。" , target: [".wa-node[data-type=\"繰り返し\"]", ".wa-item[data-t=\"繰り返し\"]", "[data-pt=\"ノード\"]"], learn: "「繰り返し」は、中に入れた処理を何回もくり返すノードです。パレットの「フロー」から選ぶと、いちばん下に追加されます。" },
        { ok: loop?.p.mode === "回数" && String(loop.p.count).trim() === "10", label: "繰り返しの判定が「回数」10回", hint: "繰り返しのプロパティで判定を「回数」、回数を10にします。" , target: ["PROP:繰り返し:count", ".wa-node[data-type=\"繰り返し\"]"], learn: "繰り返しをクリックして、プロパティの判定条件を「回数」、回数を 10 にします。" },
        { ok: !!calc && calc.p.var === "合計" && calc.p.left === "合計" && calc.p.op === "＋" && calc.p.right.trim() === "1", label: "繰り返しの中で 合計 ＝ 合計 ＋ 1", hint: "繰り返しの中の「＋」から四則演算を置き、結果の変数＝合計、合計 ＋ 1 にします。" , target: ["PROP:四則演算:right", ".wa-node[data-type=\"四則演算\"]", ".wa-box:has(> .wa-node[data-type=\"繰り返し\"]) > .wa-branches > .wa-branch:nth-child(1) > .wa-plus:not(.on)", ".wa-item[data-t=\"四則演算\"]"], learn: "繰り返しの中に計算を入れます。繰り返しの枠の中の「▼」をクリックしてから、パレットの「四則演算」を選びます。プロパティで 代入先＝合計、合計 ＋ 1 にします。" },
        { ok: run.vars["合計"] === "10", label: "実行後の合計が 10", hint: "上の項目がそろうと、実行後の合計が10になります。" , target: ["#wa-run"], learn: "ツールバーの「実行」を押すと、シナリオが上から順に動きます。合計が10になれば成功です。" },
      ];
    },
  },
  {
    id: "w2", title: "Excelの値で分岐する",
    goal: "売上.xlsx の B2（金額）を読み、0より大きいときだけ C2 に「済」と書くシナリオを作ります。",
    steps: [
      "「変数一覧」で変数「金額」を追加する",
      "パレットの「ライブラリ」タブから「Excel操作（値の取得）」を置き、セル B2 の値を変数「金額」に入れる",
      "その下に「分岐」を置き、条件式を 金額 ＞ 0 にする",
      "分岐の「真」の側に「Excel操作（値の設定）」を置き、セル C2 に「済」を書く",
      "「実行」で確かめる（金額1200と0の2パターンで自動チェック）",
    ],
    env: (b2) => ({ excel: { B2: b2 ?? "1200", C2: "" } }),
    multi: ["1200", "0"],
    checks: (S, run, runs) => {
      const get = S.flow.find((n) => n.type === "Excel操作（値の取得）");
      const br = S.flow.find((n) => n.type === "分岐");
      const setN = br && find(br.kids[0], (n) => n.type === "Excel操作（値の設定）");
      return [
        { ok: S.vars.some((v) => v.name === "金額"), label: "変数一覧に「金額」がある", hint: "変数一覧タブで「金額」を追加します。" , target: ["#wa-vadd", "[data-ft=\"vars\"]"], learn: "Excelから読んだ金額をしまう箱を作ります。「変数一覧」→「変数追加」→ 金額。" },
        { ok: get?.p.cell.toUpperCase() === "B2" && get.p.var === "金額", label: "Excel操作（値の取得）で B2 → 金額", hint: "ライブラリタブのExcel操作（値の取得）で、セル B2、格納先の変数に金額を選びます。" , target: ["PROP:Excel操作（値の取得）:cell", ".wa-node[data-type=\"Excel操作（値の取得）\"]", ".wa-item[data-t=\"Excel操作（値の取得）\"]", "[data-pt=\"ライブラリ\"]"], learn: "「ライブラリ」は、Excelの読み書きなど細かい操作をまとめた部品です。パレットの「ライブラリ」タブ →「Excel操作（値の取得）」。プロパティでセル位置 B2、格納先 金額。" },
        { ok: !!br && S.flow.indexOf(br) > S.flow.indexOf(get), label: "取得の後に分岐がある", hint: "値を取ってから判定するので、取得の下に分岐を置きます。" , target: [".wa-node[data-type=\"分岐\"]", ".wa-item[data-t=\"分岐\"]", "[data-pt=\"ノード\"]"], learn: "「分岐」は、条件によって進む道を2つに分けるノードです。パレットの「ノード」タブ →「フロー」の分岐を選びます。" },
        { ok: br?.p.var === "金額" && br.p.op === "＞" && br.p.value.trim() === "0", label: "分岐の条件式が 金額 ＞ 0", hint: "分岐のプロパティで、変数 金額、比較 ＞、値 0 にします。分岐は「真」になる条件だけを書きます。" , target: ["PROP:分岐:value", ".wa-node[data-type=\"分岐\"]"], learn: "分岐のプロパティで、真（条件が成り立つ）になる条件を 金額 ＞ 0 にします。偽の側は、真にならなかったときに進みます。" },
        { ok: setN?.p.cell.toUpperCase() === "C2" && setN.p.value.trim() === "済", label: "真の側で C2 に「済」を書いている", hint: "分岐の「真」の中の「＋」から、Excel操作（値の設定）を置き、セル C2、値「済」にします。" , target: ["PROP:Excel操作（値の設定）:value", ".wa-node[data-type=\"Excel操作（値の設定）\"]", ".wa-box:has(> .wa-node[data-type=\"分岐\"]) > .wa-branches > .wa-branch:nth-child(1) > .wa-plus:not(.on)", ".wa-item[data-t=\"Excel操作（値の設定）\"]", "[data-pt=\"ライブラリ\"]"], learn: "条件が成り立ったときだけ書き込みます。分岐の「真」の下の「▼」をクリック →「ライブラリ」タブ →「Excel操作（値の設定）」。セル位置 C2、設定値 済。" },
        { ok: runs[0]?.excel.C2 === "済" && runs[1]?.excel.C2 === "", label: "金額1200なら「済」、0なら空欄のまま", hint: "条件が逆だったり、偽の側に置いていると結果が合いません。" , target: ["#wa-run"], learn: "「実行」を押します。金額1200と0の2通りで自動チェックします。" },
      ];
    },
  },
  {
    id: "w3", title: "例外処理でエラーに備える",
    goal: "「登録ボタン」の画像マッチングが失敗したときに、待機ボックスで知らせて止めるシナリオを作ります。",
    steps: [
      "フローカテゴリの「例外処理」を置く",
      "「正常系」の中に、アクションカテゴリの「画像マッチング」を置く（画像：登録ボタン）",
      "「異常系」の中に、ユーザカテゴリの「待機ボックス」を置き、知らせる文を書く",
      "「実行」で確かめる（画面に登録ボタンが見つからない状況で自動チェック）",
    ],
    env: () => ({ imageFound: false }),
    checks: (S, run) => {
      const ex = S.flow.find((n) => n.type === "例外処理");
      const img = ex && find(ex.kids[0], (n) => n.type === "画像マッチング");
      const box = ex && find(ex.kids[1], (n) => n.type === "待機ボックス");
      return [
        { ok: !!ex, label: "例外処理ノードがある", hint: "フローカテゴリの「例外処理」を置きます（try・catchに当たるノード）。" , target: [".wa-item[data-t=\"例外処理\"]", "[data-pt=\"ノード\"]"], learn: "「例外処理」は、エラーが起きたときに別の処理へ切り替えるためのノードです（正常系でエラー → 異常系へ）。パレットの「フロー」から選びます。" },
        { ok: !!img, label: "正常系に画像マッチングがある", hint: "例外処理の「正常系」の中の「＋」から画像マッチングを置きます。" , target: [".wa-node[data-type=\"画像マッチング\"]", ".wa-box:has(> .wa-node[data-type=\"例外処理\"]) > .wa-branches > .wa-branch:nth-child(1) > .wa-plus:not(.on)", ".wa-item[data-t=\"画像マッチング\"]"], learn: "「画像マッチング」は、画面の中から登録した画像（ボタンなど）を探してクリックするノードです。例外処理の「正常系」の「▼」→ パレットの「アクション」の画像マッチング。" },
        { ok: !!box && box.p.message.trim().length >= 4, label: "異常系に待機ボックスがあり、知らせる文が書いてある", hint: "「異常系」の中に待機ボックスを置き、メッセージに「登録ボタンが見つかりません」などと書きます。" , target: ["PROP:待機ボックス:message", ".wa-node[data-type=\"待機ボックス\"]", ".wa-box:has(> .wa-node[data-type=\"例外処理\"]) > .wa-branches > .wa-branch:nth-child(2) > .wa-plus:not(.on)", ".wa-item[data-t=\"待機ボックス\"]"], learn: "「待機ボックス」は、メッセージを出してOKを押すまで待つノードです。「異常系」の「▼」→「ユーザ」の待機ボックス。メッセージに知らせる文を書きます。" },
        { ok: run.shown.length > 0 && !run.error, label: "ボタンが見つからなくても止まらずに知らせる", hint: "画像マッチングを例外処理の外に置くと、エラーでシナリオが止まってしまいます。" , target: ["#wa-run"], learn: "「実行」を押します。ボタンが見つからない状況で、止まらずに知らせられれば成功です。" },
      ];
    },
  },
  {
    id: "w4", title: "入力した価格から税込を計算する",
    goal: "インプットボックスで価格を入れてもらい、四則演算で税込（×1.1）を計算して、待機ボックスで知らせるシナリオを作ります。",
    steps: [
      "「変数一覧」で変数「価格」と「税込」を追加する",
      "ユーザカテゴリの「インプットボックス」を置き、格納先を「価格」にする（メッセージ：価格を入力してください）",
      "変数カテゴリの「四則演算」を置き、税込 ＝ 価格 × 1.1 にする",
      "ユーザカテゴリの「待機ボックス」を置き、計算が終わったことを知らせる文を書く",
      "「実行」で確かめる（1000と入力された想定で、税込が1100になれば成功）",
    ],
    env: () => ({ input: "1000" }),
    checks: (S, run) => {
      const inp = S.flow.findIndex((n) => n.type === "インプットボックス"), calc = S.flow.findIndex((n) => n.type === "四則演算"), box = S.flow.findIndex((n) => n.type === "待機ボックス");
      const c = S.flow[calc]?.p;
      return [
        { ok: ["価格", "税込"].every((x) => S.vars.some((v) => v.name === x)), label: "変数一覧に「価格」と「税込」がある", hint: "変数一覧タブの「変数追加」で2つ登録します。" , target: ["#wa-vadd", "[data-ft=\"vars\"]"], learn: "入力された価格と、計算した税込をしまう箱を2つ作ります。「変数一覧」→「変数追加」で 価格 と 税込。" },
        { ok: inp >= 0 && S.flow[inp].p.var === "価格", label: "インプットボックスの格納先が「価格」", hint: "インプットボックスのプロパティで、格納先に価格を選びます。" , target: ["PROP:インプットボックス:var", ".wa-node[data-type=\"インプットボックス\"]", ".wa-item[data-t=\"インプットボックス\"]"], learn: "「インプットボックス」は、実行中に人に値を入力してもらうノードです。パレットの「ユーザ」から選び、メッセージと格納先（価格）を設定します。" },
        { ok: calc > inp && inp >= 0 && c?.var === "税込" && c.left === "価格" && c.op === "×" && c.right.trim() === "1.1", label: "その後の四則演算で 税込 ＝ 価格 × 1.1", hint: "入力を受けてから計算するので、インプットボックスの下に四則演算を置きます。" , target: ["PROP:四則演算:right", ".wa-node[data-type=\"四則演算\"]", ".wa-item[data-t=\"四則演算\"]"], learn: "「四則演算」は足し算・引き算・掛け算・割り算をするノードです。「変数」から選び、代入先＝税込、価格 × 1.1 にします。" },
        { ok: box > calc && calc >= 0 && S.flow[box].p.message.trim().length >= 4, label: "最後に待機ボックスで知らせている", hint: "四則演算の下に待機ボックスを置き、メッセージを書きます。" , target: ["PROP:待機ボックス:message", ".wa-node[data-type=\"待機ボックス\"]", ".wa-item[data-t=\"待機ボックス\"]"], learn: "最後に「待機ボックス」で、計算が終わったことを知らせます。メッセージを書きます。" },
        { ok: run.vars["税込"] === "1100", label: "1000と入力したとき 税込 が 1100", hint: "掛け算の記号（×）と、1.1 の値を確かめます。" , target: ["#wa-run"], learn: "「実行」を押します。1000と入力された想定で、税込が1100になれば成功です。" },
      ];
    },
  },
];

/* ---------- 状態 ---------- */
let S, task, root, saveKey, sel = null, insertAt = null, tab = "flow", palTab = "ノード";
function find(list, pred) { for (const n of list || []) { if (pred(n)) return n; for (const k of n.kids || []) { const r = find(k, pred); if (r) return r; } } return null; }
function locate(id, list = S.flow) { for (let i = 0; i < list.length; i++) { const n = list[i]; if (n.id === id) return { list, i, n }; for (const k of n.kids || []) { const r = locate(id, k); if (r) return r; } } return null; }
function persist() { try { localStorage.setItem(saveKey, JSON.stringify(S)); } catch {} queueMicrotask(() => updateCoach()); }

/* ---------- 実行（シミュレーション） ---------- */
function exec(env) {
  const vars = Object.fromEntries(S.vars.map((v) => [v.name, String(v.init ?? "")]));
  const log = [], shown = []; let error = null, steps = 0;
  const val = (x) => (x in vars ? vars[x] : x);
  const num = (x) => Number(val(String(x).trim()));
  const cmp = (a, op, b) => { const A = val(a), B = val(String(b).trim()); const nA = Number(A), nB = Number(B); const isN = A !== "" && B !== "" && !isNaN(nA) && !isNaN(nB);
    const x = isN ? nA : A, y = isN ? nB : B;
    return op === "＝" ? x == y : op === "≠" ? x != y : op === "＞" ? x > y : op === "≧" ? x >= y : op === "＜" ? x < y : x <= y; };
  function run(list) {
    for (const n of list) {
      if (error || ++steps > 500) { if (!error) error = "実行するノードが多すぎます（無限ループの可能性）"; return; }
      const p = n.p;
      if (n.type === "変数値設定") { if (!(p.var in vars)) { error = `変数「${p.var || "未選択"}」が変数一覧にありません`; return; } vars[p.var] = p.value; log.push(`変数値設定：${p.var} ← ${p.value}`); }
      else if (n.type === "四則演算") { if (!(p.var in vars)) { error = `変数「${p.var || "未選択"}」が変数一覧にありません`; return; }
        const a = num(p.left), b = num(p.right); const r = p.op === "＋" ? a + b : p.op === "－" ? a - b : p.op === "×" ? a * b : b ? a / b : NaN; vars[p.var] = String(Math.round(r * 1e6) / 1e6); log.push(`四則演算：${p.var} = ${p.left} ${p.op} ${p.right} → ${vars[p.var]}`); }
      else if (n.type === "分岐") { const ok = cmp(p.var, p.op, p.value); log.push(`分岐：${p.var} ${p.op} ${p.value} → ${ok ? "真" : "偽"}`); run(n.kids[ok ? 0 : 1]); }
      else if (n.type === "繰り返し") {
        let i = 0;
        if (p.mode === "回数") { const c = parseInt(p.count, 10) || 0; log.push(`繰り返し：${c}回`); for (i = 0; i < c && !error; i++) run(n.kids[0]); }
        else { while (!error && cmp(p.var, p.op, p.value) && i++ < 200) run(n.kids[0]); log.push(`繰り返し：条件式で${i}回`); }
      }
      else if (n.type === "グループ") run(n.kids[0]);
      else if (n.type === "例外処理") { const before = error; run(n.kids[0]); if (error && !before) { log.push(`例外処理：正常系でエラー（${error}）→ 異常系へ`); error = null; run(n.kids[1]); } }
      else if (n.type === "画像マッチング") { if (env.imageFound === false) { error = `画像「${p.image}」が見つかりません`; return; } log.push(`画像マッチング：${p.image} をクリック`); }
      else if (n.type === "待機ボックス") { shown.push(p.message); log.push(`待機ボックス：「${p.message}」を表示`); }
      else if (n.type === "インプットボックス") { if (!(p.var in vars)) { error = `格納先の変数「${p.var || "未選択"}」が変数一覧にありません`; return; } vars[p.var] = env.input ?? "（入力値）"; log.push(`インプットボックス：「${p.message}」→ ${p.var} = ${vars[p.var]}`); }
      else if (n.type === "Excel操作（値の取得）") { const c = p.cell.toUpperCase(); if (!(p.var in vars)) { error = `格納先の変数「${p.var || "未選択"}」が変数一覧にありません`; return; } vars[p.var] = env.excel?.[c] ?? ""; log.push(`Excel操作（値の取得）：${p.file} ${c} → ${p.var} = ${vars[p.var]}`); }
      else if (n.type === "Excel操作（値の設定）") { const c = p.cell.toUpperCase(); if (env.excel) env.excel[c] = val(p.value); log.push(`Excel操作（値の設定）：${p.file} ${c} ← ${val(p.value)}`); }
    }
  }
  run(S.flow);
  if (error) log.push("エラーで停止：" + error);
  return { vars, log, shown, error, excel: env.excel };
}

/* ---------- 描画（WinActorのメイン画面の配置：メニュー・ツールバー・パレット・フローチャート・プロパティ・機能編集エリア・ステータスバー） ---------- */
const ico = (d, w = 14) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const NODE_ICON = { 分岐: "M12 3l9 9-9 9-9-9z", 繰り返し: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3", 例外処理: "M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z", グループ: "M3 7h18v13H3zM3 7l3-4h12l3 4",
  画像マッチング: "M3 5h18v14H3zM8 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 15l-5-5L5 19", 待機ボックス: "M4 5h16v11H8l-4 4z", インプットボックス: "M4 6h16v12H4zM8 12h4", 変数値設定: "M4 7h16M4 12h10M4 17h6", 四則演算: "M12 5v14M5 12h14", "Excel操作（値の取得）": "M4 4h16v16H4zM4 10h16M10 4v16", "Excel操作（値の設定）": "M4 4h16v16H4zM4 10h16M10 4v16" };
let ftab = "vars", narrowPane = "flow";
const isNarrow = () => root.clientWidth < 760;
function summary(n) {
  const p = n.p;
  if (n.type === "分岐") return p.var ? `${p.var} ${p.op} ${p.value}` : "（条件式未設定）";
  if (n.type === "繰り返し") return p.mode === "回数" ? (p.count ? `回数 ${p.count}` : "（回数未設定）") : (p.var ? `${p.var} ${p.op} ${p.value}` : "（条件式未設定）");
  if (n.type === "変数値設定") return p.var ? `${p.var} ← ${p.value}` : "";
  if (n.type === "四則演算") return p.var ? `${p.var} = ${p.left} ${p.op} ${p.right}` : "";
  if (n.type === "画像マッチング") return p.image;
  if (n.type === "待機ボックス" || n.type === "インプットボックス") return p.message ? p.message.slice(0, 18) : "";
  if (n.type.startsWith("Excel")) return `${p.cell || "?"}${n.type.includes("取得") ? (p.var ? " → " + p.var : "") : (p.value ? " ← " + p.value : "")}`;
  if (n.type === "グループ") return p.name;
  return "";
}
const plusBtn = (path, i) => `<button class="wa-plus ${insertAt && insertAt.path === path && insertAt.i === i ? "on" : ""}" data-path="${path}" data-i="${i}" title="ここに挿入"></button>`;
function listHTML(list, path) { return plusBtn(path, 0) + list.map((n, i) => nodeHTML(n) + plusBtn(path, i + 1)).join(""); }
function nodeHTML(n) {
  const head = `<div data-type="${esc(n.type)}" class="wa-node ${sel === n.id ? "sel" : ""} ${n.kids ? "wa-ctl" : ""}" data-id="${n.id}"><span class="wa-ni" style="color:${COLOR[n.type]}">${ico(NODE_ICON[n.type] || "M4 4h16v16H4z", 16)}</span><div class="wa-nt"><b>${esc(n.type)}</b><span>${esc(summary(n))}</span></div></div>`;
  if (!n.kids) return head;
  return `<div class="wa-box">${head}<div class="wa-branches wa-b${n.kids.length}">${n.kids.map((k, bi) => `<div class="wa-branch"><span class="wa-bname">${esc(BRANCHES[n.type][bi])}</span>${listHTML(k, `${n.id}:${bi}`)}</div>`).join("")}</div></div>`;
}
function paletteHTML() {
  const tabs = ["ノード", "ライブラリ", "サブシナリオ", "お気に入り", "検索"];
  const groups = PAL.filter((g) => g.tab === palTab);
  return `<div class="wa-ptabs">${tabs.map((t) => `<button data-pt="${t}" class="${palTab === t ? "on" : ""}" ${["サブシナリオ", "お気に入り", "検索"].includes(t) ? "disabled" : ""}>${t}</button>`).join("")}</div>
    <div class="wa-tree">${groups.map((g) => `<div class="wa-cat">${ico("M6 9l6 6 6-6", 12)}<b>${esc(g.cat)}</b></div>${g.items.map((t) => `<button class="wa-item" data-t="${esc(t)}"><span style="color:${COLOR[t]}">${ico(NODE_ICON[t] || "M4 4h16v16H4z", 14)}</span>${esc(t)}</button>`).join("")}`).join("")}
    ${palTab === "ライブラリ" ? `<p class="wa-hint">ライブラリは細かな操作をまとめた部品です。プロパティでファイル・セル・変数を設定します。</p>` : ""}</div>
    <p class="wa-hint">${insertAt ? "選んだ「▼」の位置に挿入します" : "フローチャートの「▼」を選ぶと、その位置に挿入します（選ばなければ末尾）"}</p>`;
}
function varsHTML() {
  return `<table class="wa-grid"><thead><tr><th>変数名</th><th>現在値</th><th>初期値</th><th></th></tr></thead><tbody>
    ${S.vars.map((v, i) => `<tr><td><input data-vn="${i}" value="${esc(v.name)}" placeholder="変数名"></td><td class="wa-cur">${esc(lastRun?.vars?.[v.name] ?? "")}</td><td><input data-vi="${i}" value="${esc(v.init ?? "")}"></td><td><button class="wa-x" data-vd="${i}" title="削除">${ico("M6 6l12 12M18 6L6 18", 12)}</button></td></tr>`).join("") || `<tr><td colspan="4" class="wa-none">変数がありません。「変数追加」で登録します。</td></tr>`}
    </tbody></table><div class="wa-gridbar"><button class="wa-tb" id="wa-vadd">${ico("M12 5v14M5 12h14", 12)}変数追加</button></div>`;
}
function logHTML() { return lastRun ? `<div class="wa-log">${lastRun.runs.map((r, i) => `${lastRun.multi ? `<div class="wa-logh">パターン${i + 1}（B2 = ${esc(task.multi[i])}）</div>` : ""}${r.log.map((l) => `<div class="${l.startsWith("エラー") ? "err" : ""}">${esc(l)}</div>`).join("")}`).join("")}</div>` : `<div class="wa-none">まだ実行していません。ツールバーの ▶ 実行 を押します。</div>`; }
function resultHTML() {
  if (!lastRun) return `<div class="wa-none">実行すると、ここに採点が出ます。</div>`;
  const next = TASKS[TASKS.indexOf(task) + 1];
  return `<div class="wa-res ${lastRun.all ? "ok" : "ng"}"><b>${lastRun.all ? "クリア" : `あと${lastRun.checks.length - lastRun.okN}か所`}</b><span>${lastRun.okN}/${lastRun.checks.length}</span></div>
    <ul class="wa-checks">${lastRun.checks.map((c) => `<li class="${c.ok ? "ok" : "ng"}">${ico(c.ok ? "M5 12l5 5 9-10" : "M12 7v6M12 17h.01", 13)}<div><b>${esc(c.label)}</b>${c.ok ? "" : `<div>${esc(c.hint)}</div>`}</div></li>`).join("")}</ul>
    ${lastRun.all && next ? `<button class="wa-tb wa-pri" id="wa-next">次のお題へ：${esc(next.title)}</button>` : lastRun.all ? `<p class="wa-hint">すべてのお題をクリアしました。</p>` : ""}`;
}
function render() {
  const narrow = isNarrow();
  const errN = lastRun ? lastRun.runs.filter((r) => r.error).length : 0;
  root.innerHTML = `<div class="wa">
    <div class="wa-title"><span class="wa-logo">${ico("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z", 13)}</span><span>WinActor（練習用） - ${esc(task.title)}.ums7</span><span class="wa-win">${ico("M5 12h14", 12)}${ico("M5 5h14v14H5z", 11)}${ico("M6 6l12 12M18 6L6 18", 12)}</span></div>
    <div class="wa-menu">${["ファイル", "編集", "表示", "ツール", "ヘルプ"].map((m) => `<span>${m}</span>`).join("")}</div>
    <div class="wa-toolbar">
      <span class="wa-tg">${["M14 3v5h5M5 3h9l5 5v13H5z", "M3 7h6l2 2h10v10H3z", "M5 3h11l3 3v15H5zM8 3v5h8V3M8 14h8v7H8z"].map((d) => `<button class="wa-ti" disabled>${ico(d, 16)}</button>`).join("")}</span><span class="wa-vsep"></span>
      <span class="wa-tg"><button class="wa-ti" disabled title="記録">${ico("M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0", 16)}</button></span><span class="wa-vsep"></span>
      <span class="wa-tg"><button class="wa-ti wa-run" id="wa-run" title="実行">${ico("M7 4l13 8-13 8z", 16)}<span>実行</span></button><button class="wa-ti" disabled title="一時停止">${ico("M8 5v14M16 5v14", 16)}</button><button class="wa-ti" disabled title="停止">${ico("M6 6h12v12H6z", 16)}</button></span>
      <span class="wa-task">お題 ${TASKS.indexOf(task) + 1}/${TASKS.length}<button class="wa-tb" id="wa-howto">手順</button></span>
    </div>
    <div class="wa-coach" id="wa-coach"></div>
    ${narrow ? `<div class="wa-ntabs">${[["palette", "パレット"], ["flow", "フローチャート"], ["prop", "プロパティ"], ["func", "変数一覧・結果"]].map(([k, l]) => `<button data-np="${k}" class="${narrowPane === k ? "on" : ""}">${l}</button>`).join("")}</div>` : ""}
    <div class="wa-main ${narrow ? "narrow np-" + narrowPane : ""}">
      <section class="wa-pane wa-pal"><div class="wa-ph">パレット</div>${paletteHTML()}</section>
      <section class="wa-pane wa-flowpane"><div class="wa-ph">フローチャート<span>メイン</span></div><div class="wa-flow"><div class="wa-term">開始</div>${listHTML(S.flow, "root")}<div class="wa-term">終了</div></div></section>
      <section class="wa-pane wa-prop"><div class="wa-ph">プロパティ</div><div id="wa-propbody">${sel ? "" : `<div class="wa-none">ノードを選ぶと、ここで設定できます。</div>`}</div></section>
      <section class="wa-pane wa-func"><div class="wa-ftabs">${[["vars", "変数一覧"], ["data", "データ一覧"], ["log", "ログ出力"], ["res", "採点"]].map(([k, l]) => `<button data-ft="${k}" class="${ftab === k ? "on" : ""}" ${k === "data" ? "disabled" : ""}>${l}${k === "res" && lastRun ? `<i class="${lastRun.all ? "ok" : "ng"}"></i>` : ""}</button>`).join("")}</div>
        <div class="wa-fbody">${ftab === "vars" ? varsHTML() : ftab === "log" ? logHTML() : resultHTML()}</div></section>
    </div>
    <div class="wa-status"><span>フル機能版（練習用）</span><span>${lastRun ? (errN ? "エラーで停止" : "実行完了") : "編集中"}</span><span>エラー数：${errN}</span><span>100%</span></div>
    <div class="wa-dlg" id="wa-dlg" hidden></div>
  </div>`;
  bind();
  if (sel) openProps(sel);
  updateCoach();
  if (!seenIntro()) showIntro();
}

/* ---------- コーチ（次の一手だけを示して、押す場所を光らせる） ---------- */
const INTRO_KEY = "shikakunote.train.intro.wa";
const seenIntro = () => { try { return localStorage.getItem(INTRO_KEY) === "1"; } catch { return true; } };
function showIntro() {
  const d = root.querySelector("#wa-dlg"); d.hidden = false;
  d.innerHTML = `<div class="wa-dbox"><div class="wa-dt"><span>はじめての方へ</span></div><div class="wa-db">
    <p><b>WinActorとは</b>：パソコンで人がしている操作（Excelへの入力、ボタンのクリックなど）を、手順書（シナリオ）にして自動で代わりにやらせるソフトです。</p>
    <p><b>この練習でやること</b>：本物と同じ並びの画面で、ノード（部品）を上から順に並べてシナリオを作り、「実行」で動かします。うまくできたかは自動で採点されます。</p>
    <ul><li><b>左</b>：パレット（ノードやライブラリの一覧）</li><li><b>まん中</b>：フローチャート（開始から終了まで、上から順に実行）</li><li><b>右</b>：プロパティ（選んだノードの設定）</li><li><b>下</b>：変数一覧・ログ出力・採点</li></ul>
    <p>わからなくても大丈夫。ツールバーの下の「次にやること」が1つずつ案内し、押す場所を青く光らせます。</p></div>
    <div class="wa-df"><button class="wa-tb wa-pri" id="wa-introok">はじめる</button></div></div>`;
  d.querySelector("#wa-introok").onclick = () => { try { localStorage.setItem(INTRO_KEY, "1"); } catch {} d.hidden = true; updateCoach(); };
}
const PANE_TAB = { "wa-pal": "palette", "wa-flowpane": "flow", "wa-prop": "prop", "wa-func": "func" };
function resolveTarget(list) {
  const selNode = sel && locate(sel)?.n;
  for (const q of list) {
    let el;
    if (q.startsWith("PROP:")) { const [, type, key] = q.split(":"); if (selNode?.type !== type) continue; el = root.querySelector(`#wa-propbody [data-k="${key}"]`); }
    else el = root.querySelector(q);
    if (!el) continue;
    if (el.offsetParent !== null) return el;
    // スマホで別のタブに隠れているときは、そのタブを光らせる
    const pane = el.closest(".wa-pane"); const key = pane && Object.keys(PANE_TAB).find((c) => pane.classList.contains(c));
    if (key) { const tab = root.querySelector(`[data-np="${PANE_TAB[key]}"]`); if (tab) return tab; }
  }
  return null;
}
function updateCoach() {
  const box = root?.querySelector("#wa-coach"); if (!box) return;
  const runs = (task.multi || [null]).map((m) => exec(task.env(m)));
  const checks = task.checks(S, runs[0], runs), i = checks.findIndex((c) => !c.ok), total = checks.length;
  let n, t, how, targets;
  if (i >= 0 && !(i === total - 1 && !lastRun)) { n = i + 1; t = "目標：" + checks[i].label; how = checks[i].learn || checks[i].hint; targets = checks[i].target || []; }
  else if (!lastRun?.all) { n = total; t = "実行して確かめる"; how = "ツールバーの「実行」を押すと、シナリオが上から順に動き、下の「採点」タブに結果が出ます。"; targets = ["#wa-run"]; }
  else { n = total; t = "クリア！"; how = "下の「採点」タブの「次のお題へ」から続けられます。"; targets = ["#wa-next"]; }
  box.innerHTML = `<span class="wa-cn">次にやること ${n}/${total}</span><div><b>${esc(t)}</b><p>${esc(how)}</p></div>`;
  root.querySelectorAll(".wa-hl").forEach((e) => e.classList.remove("wa-hl"));
  const el = resolveTarget(targets); if (el) { el.classList.add("wa-hl"); el.scrollIntoView({ block: "nearest", inline: "nearest" }); }
}
function listByPath(path) { if (path === "root") return S.flow; const [id, bi] = path.split(":"); return locate(id).n.kids[+bi]; }
function bind() {
  const q = (s) => root.querySelector(s), qa = (s) => root.querySelectorAll(s);
  q("#wa-run").onclick = runTest;
  q("#wa-howto").onclick = showHowto;
  qa("[data-np]").forEach((b) => (b.onclick = () => { narrowPane = b.dataset.np; render(); }));
  qa("[data-pt]").forEach((b) => (b.onclick = () => { palTab = b.dataset.pt; render(); }));
  qa("[data-ft]").forEach((b) => (b.onclick = () => { ftab = b.dataset.ft; render(); }));
  qa(".wa-plus").forEach((b) => (b.onclick = () => { insertAt = insertAt && insertAt.path === b.dataset.path && insertAt.i === +b.dataset.i ? null : { path: b.dataset.path, i: +b.dataset.i }; if (isNarrow() && insertAt) narrowPane = "palette"; render(); }));
  qa(".wa-node").forEach((el) => (el.onclick = () => { sel = el.dataset.id; if (isNarrow()) narrowPane = "prop"; render(); }));
  qa(".wa-item").forEach((b) => (b.onclick = () => {
    const n = newNode(b.dataset.t), at = insertAt || { path: "root", i: S.flow.length };
    listByPath(at.path).splice(at.i, 0, n); insertAt = null; sel = n.id; if (isNarrow()) narrowPane = "prop"; persist(); render();
  }));
  q("#wa-vadd")?.addEventListener("click", () => { S.vars.push({ name: "", init: "" }); persist(); render(); root.querySelector(`[data-vn="${S.vars.length - 1}"]`)?.focus(); });
  qa("[data-vn]").forEach((el) => (el.oninput = () => { S.vars[+el.dataset.vn].name = el.value.trim(); persist(); }));
  qa("[data-vi]").forEach((el) => (el.oninput = () => { S.vars[+el.dataset.vi].init = el.value; persist(); }));
  qa("[data-vd]").forEach((el) => (el.onclick = () => { S.vars.splice(+el.dataset.vd, 1); persist(); render(); }));
  q("#wa-next")?.addEventListener("click", () => openTask(TASKS[TASKS.indexOf(task) + 1]));
}
function showHowto() {
  const d = root.querySelector("#wa-dlg"); d.hidden = false;
  d.innerHTML = `<div class="wa-dbox"><div class="wa-dt"><span>お題：${esc(task.title)}</span><button class="wa-x" data-x>${ico("M6 6l12 12M18 6L6 18", 12)}</button></div>
    <div class="wa-db"><p>${esc(task.goal)}</p><ol>${task.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div>
    <div class="wa-df"><button class="wa-tb wa-pri" data-x>OK</button><button class="wa-tb" id="wa-reset">最初からやり直す</button></div></div>`;
  d.querySelectorAll("[data-x]").forEach((b) => (b.onclick = () => (d.hidden = true)));
  d.querySelector("#wa-reset").onclick = () => { S = { vars: [], flow: [] }; sel = null; insertAt = null; lastRun = null; persist(); render(); };
}
function varOpts(cur) { return `<option value="">（選択）</option>${S.vars.filter((v) => v.name).map((v) => `<option ${v.name === cur ? "selected" : ""}>${esc(v.name)}</option>`).join("")}`; }
function openProps(id) {
  const loc = locate(id); if (!loc) return; const n = loc.n, p = n.p;
  const box = root.querySelector("#wa-propbody");
  const row = (label, html) => `<tr><th>${label}</th><td>${html}</td></tr>`;
  const opSel = (k) => `<select data-k="${k}">${OPS.map((o) => `<option ${o === p[k] ? "selected" : ""}>${o}</option>`).join("")}</select>`;
  let rows = row("名前", `<input value="${esc(n.type)}" disabled>`);
  if (n.type === "分岐") rows += row("条件式（真）", `<div class="wa-cond"><select data-k="var">${varOpts(p.var)}</select>${opSel("op")}<input data-k="value" value="${esc(p.value)}" placeholder="値"></div>`);
  else if (n.type === "繰り返し") rows += row("判定条件", `<select data-k="mode"><option ${p.mode === "回数" ? "selected" : ""}>回数</option><option ${p.mode === "条件式" ? "selected" : ""}>条件式</option></select>`) + (p.mode === "回数" ? row("回数", `<input data-k="count" inputmode="numeric" value="${esc(p.count)}">`) : row("条件式", `<div class="wa-cond"><select data-k="var">${varOpts(p.var)}</select>${opSel("op")}<input data-k="value" value="${esc(p.value)}"></div>`));
  else if (n.type === "変数値設定") rows += row("変数名", `<select data-k="var">${varOpts(p.var)}</select>`) + row("値", `<input data-k="value" value="${esc(p.value)}">`);
  else if (n.type === "四則演算") rows += row("代入先", `<select data-k="var">${varOpts(p.var)}</select>`) + row("計算式", `<div class="wa-cond"><select data-k="left">${varOpts(p.left)}</select><select data-k="op">${["＋", "－", "×", "÷"].map((o) => `<option ${o === p.op ? "selected" : ""}>${o}</option>`).join("")}</select><input data-k="right" value="${esc(p.right)}"></div>`);
  else if (n.type === "画像マッチング") rows += row("マッチング画像", `<select data-k="image">${["登録ボタン", "検索ボタン", "ログイン画面"].map((o) => `<option ${o === p.image ? "selected" : ""}>${o}</option>`).join("")}</select>`);
  else if (n.type === "待機ボックス") rows += row("メッセージ", `<textarea data-k="message" rows="3">${esc(p.message)}</textarea>`);
  else if (n.type === "インプットボックス") rows += row("メッセージ", `<input data-k="message" value="${esc(p.message)}">`) + row("格納先", `<select data-k="var">${varOpts(p.var)}</select>`);
  else if (n.type === "グループ") rows += row("グループ名", `<input data-k="name" value="${esc(p.name)}">`);
  else if (n.type.startsWith("Excel")) rows += row("ファイル名", `<input value="${esc(p.file)}" disabled>`) + row("シート名", `<input value="${esc(p.sheet)}" disabled>`) + row("セル位置", `<input data-k="cell" value="${esc(p.cell)}" placeholder="例：B2">`) + (n.type.includes("取得") ? row("格納先", `<select data-k="var">${varOpts(p.var)}</select>`) : row("設定値", `<input data-k="value" value="${esc(p.value)}">`));
  const noVars = !S.vars.some((v) => v.name) && /var|left/.test(rows) ? `<p class="wa-warn">変数一覧に変数がありません。下の「変数一覧」で先に登録します。</p>` : "";
  box.innerHTML = `${noVars}<table class="wa-props">${rows}</table><div class="wa-gridbar"><button class="wa-tb" id="wa-del">${ico("M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13", 12)}ノードを削除</button>${isNarrow() ? `<button class="wa-tb" id="wa-back">フローチャートへ</button>` : ""}</div>`;
  box.querySelector("#wa-del").onclick = () => { loc.list.splice(loc.i, 1); sel = null; persist(); render(); };
  box.querySelector("#wa-back")?.addEventListener("click", () => { narrowPane = "flow"; render(); });
  box.querySelectorAll("[data-k]").forEach((el) => {
    const upd = () => { p[el.dataset.k] = el.value; persist(); const s = root.querySelector(`.wa-node[data-id="${n.id}"] .wa-nt span`); if (s) s.textContent = summary(n); };
    el.addEventListener("input", upd); el.addEventListener("change", () => { upd(); if (el.dataset.k === "mode") render(); });
  });
  updateCoach();
}

/* ---------- 実行と採点 ---------- */
let lastRun = null;
function runTest() {
  const runs = (task.multi || [null]).map((m) => exec(task.env(m)));
  const checks = task.checks(S, runs[0], runs), okN = checks.filter((c) => c.ok).length, all = okN === checks.length;
  lastRun = { runs, checks, okN, all, multi: !!task.multi, vars: runs[0].vars };
  if (all) { let d = {}; try { d = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}"); } catch {} d[task.id] = Date.now(); try { localStorage.setItem("shikakunote.train.done", JSON.stringify(d)); } catch {} }
  ftab = "res"; if (isNarrow()) narrowPane = "func"; render();
  if (runs[0].shown.length) {
    const d = root.querySelector("#wa-dlg"); d.hidden = false;
    d.innerHTML = `<div class="wa-dbox wa-msg"><div class="wa-dt"><span>待機ボックス</span></div><div class="wa-db">${esc(runs[0].shown[0])}</div><div class="wa-df"><button class="wa-tb wa-pri" data-x>OK</button></div></div>`;
    d.querySelector("[data-x]").onclick = () => (d.hidden = true);
  }
}

function openTask(t) {
  task = t; saveKey = "shikakunote.train." + t.id; sel = null; insertAt = null; lastRun = null; ftab = "vars"; narrowPane = "flow"; palTab = "ノード";
  try { S = JSON.parse(localStorage.getItem(saveKey)) || { vars: [], flow: [] }; } catch { S = { vars: [], flow: [] }; }
  render(); window.scrollTo(0, 0);
}
export function taskList() {
  let done = {}; try { done = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}"); } catch {}
  return TASKS.map((t) => ({ id: t.id, title: t.title, app: "WinActor", goal: t.goal, done: !!done[t.id] }));
}
export function mount(el, taskId) { root = el; root.classList.add("tr-full"); openTask(TASKS.find((t) => t.id === taskId) || TASKS[0]); }

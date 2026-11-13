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
        { ok: S.vars.some((v) => v.name === "合計"), label: "変数一覧に「合計」がある", hint: "画面上の「変数一覧」タブで「＋変数」から「合計」を追加します。" },
        { ok: set0 >= 0, label: "変数値設定で 合計 に 0 を入れている", hint: "変数カテゴリの「変数値設定」を置き、プロパティで変数「合計」、値「0」にします。" },
        { ok: !!loop && set0 >= 0 && S.flow.indexOf(loop) > set0, label: "その下に繰り返しがある", hint: "0を入れてから繰り返すので、変数値設定の下に繰り返しを置きます。" },
        { ok: loop?.p.mode === "回数" && String(loop.p.count).trim() === "10", label: "繰り返しの判定が「回数」10回", hint: "繰り返しのプロパティで判定を「回数」、回数を10にします。" },
        { ok: !!calc && calc.p.var === "合計" && calc.p.left === "合計" && calc.p.op === "＋" && calc.p.right.trim() === "1", label: "繰り返しの中で 合計 ＝ 合計 ＋ 1", hint: "繰り返しの中の「＋」から四則演算を置き、結果の変数＝合計、合計 ＋ 1 にします。" },
        { ok: run.vars["合計"] === "10", label: "実行後の合計が 10", hint: "上の項目がそろうと、実行後の合計が10になります。" },
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
        { ok: S.vars.some((v) => v.name === "金額"), label: "変数一覧に「金額」がある", hint: "変数一覧タブで「金額」を追加します。" },
        { ok: get?.p.cell.toUpperCase() === "B2" && get.p.var === "金額", label: "Excel操作（値の取得）で B2 → 金額", hint: "ライブラリタブのExcel操作（値の取得）で、セル B2、格納先の変数に金額を選びます。" },
        { ok: !!br && S.flow.indexOf(br) > S.flow.indexOf(get), label: "取得の後に分岐がある", hint: "値を取ってから判定するので、取得の下に分岐を置きます。" },
        { ok: br?.p.var === "金額" && br.p.op === "＞" && br.p.value.trim() === "0", label: "分岐の条件式が 金額 ＞ 0", hint: "分岐のプロパティで、変数 金額、比較 ＞、値 0 にします。分岐は「真」になる条件だけを書きます。" },
        { ok: setN?.p.cell.toUpperCase() === "C2" && setN.p.value.trim() === "済", label: "真の側で C2 に「済」を書いている", hint: "分岐の「真」の中の「＋」から、Excel操作（値の設定）を置き、セル C2、値「済」にします。" },
        { ok: runs[0]?.excel.C2 === "済" && runs[1]?.excel.C2 === "", label: "金額1200なら「済」、0なら空欄のまま", hint: "条件が逆だったり、偽の側に置いていると結果が合いません。" },
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
        { ok: !!ex, label: "例外処理ノードがある", hint: "フローカテゴリの「例外処理」を置きます（try・catchに当たるノード）。" },
        { ok: !!img, label: "正常系に画像マッチングがある", hint: "例外処理の「正常系」の中の「＋」から画像マッチングを置きます。" },
        { ok: !!box && box.p.message.trim().length >= 4, label: "異常系に待機ボックスがあり、知らせる文が書いてある", hint: "「異常系」の中に待機ボックスを置き、メッセージに「登録ボタンが見つかりません」などと書きます。" },
        { ok: run.shown.length > 0 && !run.error, label: "ボタンが見つからなくても止まらずに知らせる", hint: "画像マッチングを例外処理の外に置くと、エラーでシナリオが止まってしまいます。" },
      ];
    },
  },
];

/* ---------- 状態 ---------- */
let S, task, root, saveKey, sel = null, insertAt = null, tab = "flow", palTab = "ノード";
function find(list, pred) { for (const n of list || []) { if (pred(n)) return n; for (const k of n.kids || []) { const r = find(k, pred); if (r) return r; } } return null; }
function locate(id, list = S.flow) { for (let i = 0; i < list.length; i++) { const n = list[i]; if (n.id === id) return { list, i, n }; for (const k of n.kids || []) { const r = locate(id, k); if (r) return r; } } return null; }
function persist() { try { localStorage.setItem(saveKey, JSON.stringify(S)); } catch {} }

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
        const a = num(p.left), b = num(p.right); const r = p.op === "＋" ? a + b : p.op === "－" ? a - b : p.op === "×" ? a * b : b ? a / b : NaN; vars[p.var] = String(r); }
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
      else if (n.type === "インプットボックス") { if (p.var in vars) vars[p.var] = "（入力値）"; log.push(`インプットボックス：「${p.message}」`); }
      else if (n.type === "Excel操作（値の取得）") { const c = p.cell.toUpperCase(); if (!(p.var in vars)) { error = `格納先の変数「${p.var || "未選択"}」が変数一覧にありません`; return; } vars[p.var] = env.excel?.[c] ?? ""; log.push(`Excel操作（値の取得）：${p.file} ${c} → ${p.var} = ${vars[p.var]}`); }
      else if (n.type === "Excel操作（値の設定）") { const c = p.cell.toUpperCase(); if (env.excel) env.excel[c] = val(p.value); log.push(`Excel操作（値の設定）：${p.file} ${c} ← ${val(p.value)}`); }
    }
  }
  run(S.flow);
  if (error) log.push("エラーで停止：" + error);
  return { vars, log, shown, error, excel: env.excel };
}

/* ---------- 描画 ---------- */
const plusBtn = (path, i) => `<button class="wa-plus ${insertAt && insertAt.path === path && insertAt.i === i ? "on" : ""}" data-path="${path}" data-i="${i}" aria-label="ここにノードを追加"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>`;
function summary(n) {
  const p = n.p;
  if (n.type === "分岐") return p.var ? `${p.var} ${p.op} ${p.value}` : "条件式 未設定";
  if (n.type === "繰り返し") return p.mode === "回数" ? (p.count ? `回数：${p.count}回` : "回数 未設定") : (p.var ? `${p.var} ${p.op} ${p.value} の間` : "条件式 未設定");
  if (n.type === "変数値設定") return p.var ? `${p.var} ← ${p.value}` : "変数 未選択";
  if (n.type === "四則演算") return p.var ? `${p.var} ＝ ${p.left} ${p.op} ${p.right}` : "変数 未選択";
  if (n.type === "画像マッチング") return `画像：${p.image}`;
  if (n.type === "待機ボックス" || n.type === "インプットボックス") return p.message ? `「${p.message.slice(0, 16)}」` : "メッセージ 未入力";
  if (n.type.startsWith("Excel")) return `${p.file} ${p.cell || "セル未設定"}${n.type.includes("取得") ? (p.var ? " → " + p.var : "") : (p.value ? " ← " + p.value : "")}`;
  if (n.type === "グループ") return p.name;
  return "";
}
function listHTML(list, path) {
  return list.map((n, i) => plusBtn(path, i) + nodeHTML(n, `${path}`)).join("") + plusBtn(path, list.length);
}
function nodeHTML(n) {
  const c = COLOR[n.type];
  const head = `<div class="wa-node ${sel === n.id ? "sel" : ""}" data-id="${n.id}"><span class="wa-bar" style="background:${c}"></span><div style="min-width:0"><b>${esc(n.type)}</b><div class="cap wa-sum">${esc(summary(n))}</div></div></div>`;
  if (!n.kids) return head;
  return `<div class="wa-box">${head}<div class="wa-branches">${n.kids.map((k, bi) => `<div class="wa-branch"><span class="wa-bname">${esc(BRANCHES[n.type][bi])}</span>${listHTML(k, `${n.id}:${bi}`)}</div>`).join("")}</div></div>`;
}
function render() {
  root.innerHTML = `
  <div class="tr-task card">
    <div class="tr-task-top"><span class="tag">WinActor</span><span class="cap">お題 ${TASKS.indexOf(task) + 1}/${TASKS.length}</span></div>
    <b class="tr-task-t">${esc(task.title)}</b>
    <p class="cap" style="margin:2px 0 6px">${esc(task.goal)}</p>
    <details class="tr-steps"><summary>手順を見る（${task.steps.length}ステップ）</summary><ol>${task.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></details>
  </div>
  <div class="tr-toolbar">
    <div class="seg" role="tablist" aria-label="表示する画面"><button data-tab="flow" aria-pressed="${tab === "flow"}">フローチャート</button><button data-tab="vars" aria-pressed="${tab === "vars"}">変数一覧 ${S.vars.length ? `<span class="badge">${S.vars.length}</span>` : ""}</button></div>
    <button class="btn btn-cta btn-sm" id="wa-run" style="margin-left:auto"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>実行</button>
  </div>
  ${tab === "flow" ? `<div class="wa-flow">
      <div class="wa-term">開始</div>${listHTML(S.flow, "root")}<div class="wa-term">終了</div>
      <p class="cap" style="text-align:center;margin:12px 0 0">「＋」をタップして、そこに置くノードを選びます。ノードをタップするとプロパティを開けます。</p></div>`
    : `<div class="card wa-vars"><b style="color:var(--navy)">変数一覧</b><p class="cap" style="margin:2px 0 10px">シナリオで使う変数（値をしまう箱）を登録します。</p>
      ${S.vars.map((v, i) => `<div class="tr-row"><input class="tr-input" data-vn="${i}" value="${esc(v.name)}" placeholder="変数名"><input class="tr-input" data-vi="${i}" value="${esc(v.init ?? "")}" placeholder="初期値（空でも可）"><button class="btn btn-ghost btn-sm" data-vd="${i}" aria-label="削除">×</button></div>`).join("") || `<p class="cap">まだ変数がありません。</p>`}
      <button class="btn btn-secondary btn-sm" id="wa-vadd" style="margin-top:8px">＋変数</button></div>`}
  <div class="tr-sheet" id="wa-sheet" hidden></div>
  <div class="tr-result" id="wa-res" hidden></div>`;
  bind();
  if (insertAt) openPalette(); else if (sel) openProps(sel);
}

/* ---------- 操作 ---------- */
function listByPath(path) { if (path === "root") return S.flow; const [id, bi] = path.split(":"); return locate(id).n.kids[+bi]; }
function bind() {
  root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { tab = b.dataset.tab; sel = null; insertAt = null; render(); }));
  root.querySelector("#wa-run").onclick = runTest;
  root.querySelectorAll(".wa-plus").forEach((b) => (b.onclick = () => { insertAt = { path: b.dataset.path, i: +b.dataset.i }; sel = null; render(); }));
  root.querySelectorAll(".wa-node").forEach((el) => (el.onclick = () => { sel = el.dataset.id; insertAt = null; render(); }));
  root.querySelector("#wa-vadd")?.addEventListener("click", () => { S.vars.push({ name: "", init: "" }); persist(); render(); });
  root.querySelectorAll("[data-vn]").forEach((el) => { el.oninput = () => { S.vars[+el.dataset.vn].name = el.value.trim(); persist(); }; });
  root.querySelectorAll("[data-vi]").forEach((el) => { el.oninput = () => { S.vars[+el.dataset.vi].init = el.value; persist(); }; });
  root.querySelectorAll("[data-vd]").forEach((el) => (el.onclick = () => { S.vars.splice(+el.dataset.vd, 1); persist(); render(); }));
}
function openPalette() {
  const sh = root.querySelector("#wa-sheet"); sh.hidden = false;
  const groups = PAL.filter((g) => g.tab === palTab);
  sh.innerHTML = `<div class="tr-sheet-in"><div class="tr-sheet-h"><b style="flex:1">パレット</b><button class="btn btn-ghost btn-sm" data-x>閉じる</button></div>
    <div class="seg" style="margin-bottom:12px"><button data-pt="ノード" aria-pressed="${palTab === "ノード"}">ノード</button><button data-pt="ライブラリ" aria-pressed="${palTab === "ライブラリ"}">ライブラリ</button></div>
    ${groups.map((g) => `<div class="cap" style="font-weight:800;margin:8px 0 6px">${esc(g.cat)}</div><div class="wa-pal">${g.items.map((t) => `<button class="tr-pal press" data-t="${esc(t)}"><span class="wa-bar" style="background:${COLOR[t]}"></span><b>${esc(t)}</b></button>`).join("")}</div>`).join("")}</div>`;
  sh.querySelector("[data-x]").onclick = () => { insertAt = null; render(); };
  sh.querySelectorAll("[data-pt]").forEach((b) => (b.onclick = () => { palTab = b.dataset.pt; openPalette(); }));
  sh.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => {
    const n = newNode(b.dataset.t); listByPath(insertAt.path).splice(insertAt.i, 0, n);
    insertAt = null; sel = n.id; persist(); render();
  }));
}
function varOpts(cur, allowLiteral = false) {
  return `<option value="">${allowLiteral ? "変数を選ぶ" : "変数を選ぶ"}</option>${S.vars.filter((v) => v.name).map((v) => `<option ${v.name === cur ? "selected" : ""}>${esc(v.name)}</option>`).join("")}`;
}
function openProps(id) {
  const loc = locate(id); if (!loc) return; const n = loc.n, p = n.p;
  const sh = root.querySelector("#wa-sheet"); sh.hidden = false;
  const noVars = !S.vars.some((v) => v.name) ? `<p class="note">変数一覧にまだ変数がありません。上の「変数一覧」タブで先に登録します。</p>` : "";
  let body = "";
  const field = (label, html, cap = "") => `<div class="tr-field"><label>${label}</label>${html}${cap ? `<span class="cap">${cap}</span>` : ""}</div>`;
  if (n.type === "分岐") body = noVars + field("条件式（真になる条件）", `<div class="tr-row"><select class="tr-input" data-k="var">${varOpts(p.var)}</select><select class="tr-input" data-k="op">${OPS.map((o) => `<option ${o === p.op ? "selected" : ""}>${o}</option>`).join("")}</select><input class="tr-input" data-k="value" value="${esc(p.value)}" placeholder="値"></div>`, "偽の側は条件を書きません（真にならないときに進みます）");
  else if (n.type === "繰り返し") body = noVars + field("判定", `<select class="tr-input" data-k="mode"><option ${p.mode === "回数" ? "selected" : ""}>回数</option><option ${p.mode === "条件式" ? "selected" : ""}>条件式</option></select>`)
    + (p.mode === "回数" ? field("回数", `<input class="tr-input" data-k="count" inputmode="numeric" value="${esc(p.count)}" placeholder="例：10">`, "処理の前に判定する繰り返しです（後判定繰返は最低1回実行）")
      : field("条件式（この間くり返す）", `<div class="tr-row"><select class="tr-input" data-k="var">${varOpts(p.var)}</select><select class="tr-input" data-k="op">${OPS.map((o) => `<option ${o === p.op ? "selected" : ""}>${o}</option>`).join("")}</select><input class="tr-input" data-k="value" value="${esc(p.value)}" placeholder="値"></div>`));
  else if (n.type === "変数値設定") body = noVars + field("変数", `<select class="tr-input" data-k="var">${varOpts(p.var)}</select>`) + field("値", `<input class="tr-input" data-k="value" value="${esc(p.value)}">`);
  else if (n.type === "四則演算") body = noVars + field("結果を入れる変数", `<select class="tr-input" data-k="var">${varOpts(p.var)}</select>`)
    + field("計算式", `<div class="tr-row" style="grid-template-columns:1fr auto 1fr"><select class="tr-input" data-k="left"><option value="">左の値</option>${S.vars.filter((v) => v.name).map((v) => `<option ${v.name === p.left ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select><select class="tr-input" data-k="op">${["＋", "－", "×", "÷"].map((o) => `<option ${o === p.op ? "selected" : ""}>${o}</option>`).join("")}</select><input class="tr-input" data-k="right" value="${esc(p.right)}" placeholder="右の値"></div>`);
  else if (n.type === "画像マッチング") body = field("マッチング画像", `<select class="tr-input" data-k="image">${["登録ボタン", "検索ボタン", "ログイン画面"].map((o) => `<option ${o === p.image ? "selected" : ""}>${o}</option>`).join("")}</select>`, "画面の中から登録した画像を探してクリックします");
  else if (n.type === "待機ボックス") body = field("メッセージ", `<textarea class="tr-input" data-k="message" rows="2">${esc(p.message)}</textarea>`, "メッセージを出して、OKが押されるまで待ちます");
  else if (n.type === "インプットボックス") body = noVars + field("メッセージ", `<input class="tr-input" data-k="message" value="${esc(p.message)}">`) + field("入力値を入れる変数", `<select class="tr-input" data-k="var">${varOpts(p.var)}</select>`);
  else if (n.type === "グループ") body = field("グループ名", `<input class="tr-input" data-k="name" value="${esc(p.name)}">`);
  else if (n.type.startsWith("Excel")) body = (n.type.includes("取得") ? noVars : "") + field("ファイル名", `<input class="tr-input" value="${esc(p.file)}" disabled>`) + field("シート名", `<input class="tr-input" value="${esc(p.sheet)}" disabled>`)
    + field("セル位置", `<input class="tr-input" data-k="cell" value="${esc(p.cell)}" placeholder="例：B2" autocapitalize="characters">`)
    + (n.type.includes("取得") ? field("格納先の変数", `<select class="tr-input" data-k="var">${varOpts(p.var)}</select>`) : field("設定する値", `<input class="tr-input" data-k="value" value="${esc(p.value)}">`));
  sh.innerHTML = `<div class="tr-sheet-in"><div class="tr-sheet-h"><span class="wa-bar" style="background:${COLOR[n.type]}"></span><b style="flex:1">プロパティ：${esc(n.type)}</b>
    <button class="btn btn-ghost btn-sm" id="wa-del">削除</button><button class="btn btn-secondary btn-sm" data-x>閉じる</button></div>${body}</div>`;
  sh.querySelector("[data-x]").onclick = () => { sel = null; render(); };
  sh.querySelector("#wa-del").onclick = () => { loc.list.splice(loc.i, 1); sel = null; persist(); render(); };
  sh.querySelectorAll("[data-k]").forEach((el) => {
    const upd = () => { p[el.dataset.k] = el.value; persist(); const s = root.querySelector(`.wa-node[data-id="${n.id}"] .wa-sum`); if (s) s.textContent = summary(n); };
    el.addEventListener("input", upd);
    el.addEventListener("change", () => { upd(); if (el.dataset.k === "mode") render(); });
  });
}

/* ---------- 実行と採点 ---------- */
function runTest() {
  const runs = (task.multi || [null]).map((m) => exec(task.env(m)));
  const run = runs[0];
  const checks = task.checks(S, run, runs);
  const okN = checks.filter((c) => c.ok).length, all = okN === checks.length;
  let done = {}; try { done = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}"); } catch {}
  if (all) { done[task.id] = Date.now(); try { localStorage.setItem("shikakunote.train.done", JSON.stringify(done)); } catch {} }
  const next = TASKS[TASKS.indexOf(task) + 1];
  const res = root.querySelector("#wa-res"); res.hidden = false;
  const icon = (ok) => ok ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 6v8M12 18h.01"/></svg>';
  res.innerHTML = `<div class="tr-sheet-in">
    <div class="tr-sheet-h"><b style="flex:1">${all ? "クリア！" : `あと${checks.length - okN}か所`}</b><button class="btn btn-ghost btn-sm" data-x>閉じる</button></div>
    ${runs.map((r, i) => `<div class="tr-trace">${task.multi ? `<div><b>パターン${i + 1}</b><span>B2 = ${esc(task.multi[i])}</span></div>` : ""}${r.log.slice(0, 14).map((l) => `<div><span>${esc(l)}</span></div>`).join("") || "<div><span>何も実行されませんでした</span></div>"}
      ${Object.keys(r.vars).length ? `<div><b>変数</b><span>${esc(Object.entries(r.vars).map(([k, v]) => `${k} = ${v}`).join("、"))}</span></div>` : ""}</div>`).join("")}
    <ul class="tr-checks">${checks.map((c) => `<li class="${c.ok ? "ok" : "ng"}"><span class="tr-mark">${icon(c.ok)}</span><div><b>${esc(c.label)}</b>${c.ok ? "" : `<div class="cap">${esc(c.hint)}</div>`}</div></li>`).join("")}</ul>
    ${all ? (next ? `<button class="btn btn-cta btn-block" id="wa-next">次のお題へ：${esc(next.title)}</button>` : `<p class="note">3つのお題をすべてクリアしました。実際のWinActorでも同じ考え方で組み立てられます。</p>`) : ""}
    <button class="btn btn-ghost btn-block" id="wa-reset">このお題を最初からやり直す</button></div>`;
  res.querySelector("[data-x]").onclick = () => (res.hidden = true);
  res.querySelector("#wa-next")?.addEventListener("click", () => openTask(next));
  res.querySelector("#wa-reset").onclick = () => { S = { vars: [], flow: [] }; sel = null; insertAt = null; persist(); render(); };
}

function openTask(t) {
  task = t; saveKey = "shikakunote.train." + t.id; sel = null; insertAt = null; tab = "flow";
  try { S = JSON.parse(localStorage.getItem(saveKey)) || { vars: [], flow: [] }; } catch { S = { vars: [], flow: [] }; }
  render(); window.scrollTo(0, 0);
}
export function taskList() {
  let done = {}; try { done = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}"); } catch {}
  return TASKS.map((t) => ({ id: t.id, title: t.title, app: "WinActor", goal: t.goal, done: !!done[t.id] }));
}
export function mount(el, taskId) { root = el; root.classList.add("tr"); openTask(TASKS.find((t) => t.id === taskId) || TASKS[0]); }

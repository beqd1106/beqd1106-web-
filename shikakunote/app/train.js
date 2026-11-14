// 操作トレーニング（Dify）— ワークフロー編集画面の配置・用語・操作の流れを再現した練習用エディタ。
// 他社のロゴ・画像は使わない（配置・配色の雰囲気・用語を合わせる）。お題と採点は train_dify_tasks.js。
// つなぐ：ノード右端の「＋」→ブロックを選ぶと、そのノードの後ろに追加されてつながる。丸どうしのクリックでもつなげる。
import { TASKS } from "./train_dify_tasks.js?v=3";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => Math.random().toString(36).slice(2, 8);
const svg = (d, w = 14, fill = false) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="${fill ? "currentColor" : "none"}" stroke="${fill ? "none" : "currentColor"}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;

/* ---------- ブロック（名前・グループはDifyのブロック選択に合わせる） ---------- */
const TYPES = {
  start: { name: "ユーザー入力", color: "#2970FF", icon: "M12 5v14M5 12h14", outs: ["out"] },
  llm: { name: "LLM", color: "#6172F3", icon: "M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z", outs: ["out"], group: "" },
  knowledge: { name: "知識検索", color: "#16B364", icon: "M4 5h7v14H4zM13 5h7v14h-7z", outs: ["out"], group: "" },
  answer: { name: "回答", color: "#F79009", icon: "M4 5h16v11H8l-4 4z", outs: ["out"], chat: true, group: "" },
  output: { name: "出力", color: "#F04438", icon: "M5 12h11M12 7l5 5-5 5", outs: [], wf: true, group: "" },
  classifier: { name: "質問分類器", color: "#15B79E", icon: "M4 6h16M4 12h10M4 18h6", outs: "classes", group: "質問理解" },
  http: { name: "HTTPリクエスト", color: "#7A5AF8", icon: "M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18", outs: ["out"], group: "ユーティリティ" },
};
// 本物のブロック選択にはあるが、このお題では使わないもの（押せない表示にして並びを本物に近づける）
const DISABLED = { 質問理解: ["パラメータ抽出器"], ロジック: ["IF/ELSE", "反復処理", "ループ"], 変換: ["コード", "テンプレート", "変数集約器", "テキスト抽出", "変数代入", "リスト演算子"], ユーティリティ: [] };
const KB = ["就業規則", "経費精算ルール", "製品マニュアル"];
const MODELS = ["高精度モデル", "高速モデル"];

/* ---------- 状態 ---------- */
let G, task, root, saveKey, sel = null, linkFrom = null, panel = null, zoom = 1, selector = null, lastRun = null;
// お題のカードと重ならない位置から始める
const START = { x: 80, y: 340 };
function newGraph() { return { nodes: [{ id: "n_start", type: "start", ...START, cfg: { fields: [] } }], edges: [] }; }
// 重なっている（古い保存データなど）ときは、つながり順に横へ並べ直す
function relayout() {
  const ov = G.nodes.some((a, i) => G.nodes.some((b, j) => j > i && Math.abs(a.x - b.x) < NODE_W && Math.abs(a.y - b.y) < 90)) || G.nodes.some((n) => n.y < 300 && n.x < 360);
  if (!ov) return;
  const s = G.nodes.find((n) => n.type === "start"), col = new Map([[s.id, 0]]), q = [s];
  while (q.length) { const n = q.shift(); for (const e of G.edges.filter((x) => x.from === n.id)) if (!col.has(e.to)) { col.set(e.to, col.get(n.id) + 1); q.push(G.nodes.find((x) => x.id === e.to)); } }
  const rows = {};
  for (const n of G.nodes) { const c = col.has(n.id) ? col.get(n.id) : Math.max(0, ...col.values()) + 1; rows[c] = (rows[c] || 0) + 1; n.x = START.x + c * (NODE_W + 80); n.y = START.y + (rows[c] - 1) * 150; }
}
function api(gr) {
  const node = (id) => gr.nodes.find((n) => n.id === id);
  return { ...gr, node, byType: (t) => gr.nodes.filter((n) => n.type === t), connected: (a, b) => !!a && !!b && gr.edges.some((e) => e.from === a.id && e.to === b.id) };
}
function upstream(id) {
  const seen = new Set(), st = [id];
  while (st.length) { const c = st.pop(); for (const e of G.edges) if (e.to === c && !seen.has(e.from)) { seen.add(e.from); st.push(e.from); } }
  return G.nodes.filter((n) => seen.has(n.id));
}
function varsOf(n) {
  if (n.type === "start") return [...(task.app === "chatflow" ? ["userinput.query"] : []), ...n.cfg.fields.filter((f) => f.name).map((f) => "ユーザー入力." + f.name)];
  if (n.type === "llm") return ["LLM.text"];
  if (n.type === "knowledge") return ["知識検索.result"];
  if (n.type === "classifier") return ["質問分類器.class_name"];
  if (n.type === "http") return ["HTTPリクエスト.body", "HTTPリクエスト.status_code"];
  return [];
}
const upVars = (id) => upstream(id).flatMap(varsOf);
const outsOf = (n) => TYPES[n.type].outs === "classes" ? n.cfg.classes.map((_, i) => "c" + i) : TYPES[n.type].outs;
function defaultCfg(t) {
  return { llm: { model: MODELS[0], system: "", user: "", context: "", temp: 0.7 }, knowledge: { query: "", kb: "", topk: 3 }, classifier: { input: "", classes: [{ title: "クラス 1", desc: "" }, { title: "クラス 2", desc: "" }] },
    answer: { text: "" }, output: { vars: [] }, http: { method: "GET", url: "", auth: "なし", onError: "なし", fallback: "" } }[t] || {};
}
const persist = () => { try { localStorage.setItem(saveKey, JSON.stringify(G)); } catch {} queueMicrotask(updateCoach); };
const icoTile = (t, s = 24) => `<span class="dx-ico" style="background:${TYPES[t].color};width:${s}px;height:${s}px">${svg(TYPES[t].icon, Math.round(s * 0.58))}</span>`;
const chipVar = (v) => `<span class="dx-var"><i>{x}</i>${esc(v)}</span>`;

/* ---------- ノード ---------- */
const NODE_W = 240;
function nodeBody(n) {
  const c = n.cfg;
  if (n.type === "start") {
    const rows = [...(task.app === "chatflow" ? [["userinput.query", "String"]] : []), ...c.fields.filter((f) => f.name).map((f) => [f.name, f.type === "paragraph" ? "段落" : f.type === "number" ? "数値" : "短いテキスト"])];
    return rows.length ? rows.map(([a, b]) => `<div class="dx-row">${chipVar(a)}<span class="dx-sub">${esc(b)}</span></div>`).join("") : `<div class="dx-empty">入力フィールドがありません</div>`;
  }
  if (n.type === "llm") return `<div class="dx-row"><span class="dx-model">${svg("M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z", 12)}${esc(c.model)}</span><span class="dx-sub">チャット</span></div>`;
  if (n.type === "knowledge") return c.kb ? `<div class="dx-row"><span class="dx-kb">${svg("M4 5h7v14H4zM13 5h7v14h-7z", 12)}${esc(c.kb)}</span></div>` : `<div class="dx-empty">ナレッジが選択されていません</div>`;
  if (n.type === "answer") return c.text ? `<div class="dx-text">${esc(c.text).replace(/\{\{([^}]+)\}\}/g, (_, v) => chipVar(v))}</div>` : `<div class="dx-empty">回答が設定されていません</div>`;
  if (n.type === "output") return c.vars.length ? c.vars.map((v) => `<div class="dx-row"><span class="dx-sub">${esc(v.name || "（名前なし）")}</span>${v.ref ? chipVar(v.ref) : ""}</div>`).join("") : `<div class="dx-empty">出力変数がありません</div>`;
  if (n.type === "http") return `<div class="dx-row"><span class="dx-method">${esc(c.method)}</span><span class="dx-url">${esc(c.url || "URLが未設定です")}</span></div>`;
  if (n.type === "classifier") return c.classes.map((k, i) => `<div class="dx-cls"><span class="dx-sub">${esc(k.title || "クラス")}</span><button class="dx-port dx-port-c ${linkFrom?.id === n.id && linkFrom.port === "c" + i ? "on" : ""}" data-port="c${i}" aria-label="${esc(k.title)}からつなぐ"></button></div>`).join("");
  return "";
}
function nodeHTML(n) {
  const t = TYPES[n.type], single = outsOf(n).length === 1;
  return `<div data-type="${n.type}" class="dx-node ${sel === n.id ? "sel" : ""} ${linkFrom && linkFrom.id !== n.id ? "dx-target" : ""}" data-id="${n.id}" style="left:${n.x}px;top:${n.y}px;width:${NODE_W}px">
    <div class="dx-nh">${icoTile(n.type)}<b>${esc(t.name)}</b></div>
    <div class="dx-nb">${nodeBody(n)}</div>
    ${n.type !== "start" ? `<span class="dx-in" aria-hidden="true"></span>` : ""}
    ${single ? `<button class="dx-port dx-port-main ${linkFrom?.id === n.id ? "on" : ""}" data-port="out" aria-label="${esc(t.name)}の出力からつなぐ"></button><button class="dx-plus" data-plus="${n.id}" data-plus-type="${n.type}" aria-label="次のブロックを追加">${svg("M12 5v14M5 12h14", 12)}</button>` : ""}
  </div>`;
}
function portXY(n, port) {
  const el = root.querySelector(`.dx-node[data-id="${n.id}"]`); if (!el) return [n.x + NODE_W, n.y + 20];
  if (port === "out") return [n.x + NODE_W, n.y + 20];
  const p = el.querySelector(`[data-port="${port}"]`); const cls = p?.closest(".dx-cls");
  return [n.x + NODE_W, n.y + (cls ? cls.offsetTop + cls.offsetHeight / 2 : 20)];
}
function drawEdges() {
  const svgEl = root.querySelector(".dx-edges"), inner = root.querySelector(".dx-inner");
  let mx = 0, my = 0; G.nodes.forEach((n) => { mx = Math.max(mx, n.x + NODE_W + 200); my = Math.max(my, n.y + 260); });
  inner.style.width = Math.max(mx, 1400) + "px"; inner.style.height = Math.max(my, 900) + "px"; inner.style.transform = `scale(${zoom})`;
  svgEl.setAttribute("width", inner.style.width); svgEl.setAttribute("height", inner.style.height);
  svgEl.innerHTML = G.edges.map((e, i) => {
    const a = G.nodes.find((n) => n.id === e.from), b = G.nodes.find((n) => n.id === e.to); if (!a || !b) return "";
    const [x1, y1] = portXY(a, e.port), x2 = b.x, y2 = b.y + 20, dx = Math.max(40, Math.abs(x2 - x1) / 2);
    return `<path d="M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}" class="dx-edge ${sel && (e.from === sel || e.to === sel) ? "hl" : ""}" data-i="${i}"/>`;
  }).join("");
  root.querySelector("#dx-zoom").textContent = Math.round(zoom * 100) + "%";
}

/* ---------- 画面 ---------- */
function render() {
  const g = api(G), checks = task.checks(g), okN = checks.filter((c) => c.ok).length;
  root.innerHTML = `
  <div class="dx">
    <header class="dx-head">
      <div class="dx-app"><span class="dx-appic">${svg(task.app === "workflow" ? "M4 6h6v6H4zM14 12h6v6h-6zM10 9h4v6" : "M4 5h16v11H8l-4 4z", 16)}</span>
        <div style="min-width:0"><b class="dx-appname">${esc(task.title)}</b><div class="dx-meta"><span class="dx-type">${task.app === "workflow" ? "ワークフロー" : "チャットフロー"}</span><span>自動保存済み</span></div></div></div>
      <div class="dx-actions">
        <button class="dx-btn" id="dx-run">${svg("M7 4l13 8-13 8z", 12, true)}テスト実行</button>
        <button class="dx-btn dx-primary" id="dx-pub">公開する${svg("M6 9l6 6 6-6", 12)}</button>
      </div>
    </header>
    <div class="dx-body">
      <div class="dx-canvas" id="dx-cv"><div class="dx-inner"><svg class="dx-edges"></svg>${G.nodes.map(nodeHTML).join("")}</div></div>
      <div class="dx-guide ${task._fold ? "fold" : ""}">
        <button class="dx-gh" id="dx-gfold"><b>お題 ${TASKS.indexOf(task) + 1}/${TASKS.length}：${esc(task.title)}</b><span class="dx-gprog" id="dx-gprog">${okN}/${checks.length}</span>${svg(task._fold ? "M6 9l6 6 6-6" : "M18 15l-6-6-6 6", 14)}</button>
        <div class="dx-gb"><div id="dx-coach"></div>
          <details class="dx-all"><summary>このお題でやること（全体）</summary><p>${esc(task.goal)}</p><ol>${task.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></details></div>
      </div>
      <div class="dx-intro" id="dx-intro" hidden></div>
      ${linkFrom ? `<div class="dx-linkbar">つなぎ先のブロックをクリック<button class="dx-btn" id="dx-cancel">やめる</button></div>` : ""}
      <div class="dx-ctrl">
        <button id="dx-zo" aria-label="縮小">${svg("M5 12h14")}</button><span id="dx-zoom">100%</span><button id="dx-zi" aria-label="拡大">${svg("M12 5v14M5 12h14")}</button>
        <span class="dx-sep"></span><button id="dx-fit" aria-label="全体を表示">${svg("M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5")}</button>
        <button id="dx-add" class="dx-addbtn">${svg("M12 5v14M5 12h14")}ブロック</button>
      </div>
      <aside class="dx-panel" id="dx-panel" ${panel ? "" : "hidden"}></aside>
      <div class="dx-pop" id="dx-pop" hidden></div>
    </div>
  </div>`;
  drawEdges(); bind();
  if (panel === "run") openRun(); else if (panel && sel) openSettings(sel);
  if (selector) openSelector(selector);
  updateCoach();
  if (!seenIntro()) showIntro();
}

/* ---------- コーチ（知識ゼロでも進められるよう、次の一手だけを示して光らせる） ---------- */
const INTRO_KEY = "shikakunote.train.intro.dify";
const seenIntro = () => { try { return localStorage.getItem(INTRO_KEY) === "1"; } catch { return true; } };
function showIntro() {
  const el = root.querySelector("#dx-intro"); el.hidden = false;
  el.innerHTML = `<div class="dx-introbox"><b class="dx-it">はじめての方へ</b>
    <p><b>Difyとは</b>：AIを使ったアプリを、プログラムを書かずに「ブロック（部品）」を線でつないで作れるサービスです。</p>
    <p><b>この練習でやること</b>：本物と同じ並びの画面で、ブロックを置いて・つないで・設定して、「テスト実行」で動かします。うまくできたかは自動で採点されます。</p>
    <ul class="dx-anat"><li><b>まん中</b>：キャンバス（ブロックを並べる場所）</li><li><b>ブロック右端の青い＋</b>：次のブロックを追加</li><li><b>ブロックをクリック</b>：右に設定が開く</li><li><b>右上「テスト実行」</b>：動かして採点</li></ul>
    <p class="dx-sub">わからなくても大丈夫。左上の「次にやること」が1つずつ案内し、押す場所を<span class="dx-hlsample">青く光らせ</span>ます。</p>
    <button class="dx-btn dx-primary dx-wide" id="dx-introok">はじめる</button></div>`;
  el.querySelector("#dx-introok").onclick = () => { try { localStorage.setItem(INTRO_KEY, "1"); } catch {} el.hidden = true; updateCoach(); };
}
function visible(el) { return !!el && el.offsetParent !== null && el.getClientRects().length > 0; }
function updateCoach() {
  const box = root?.querySelector("#dx-coach"); if (!box) return;
  const checks = task.checks(api(G)), okN = checks.filter((c) => c.ok).length, i = checks.findIndex((c) => !c.ok);
  const prog = root.querySelector("#dx-gprog"); if (prog) prog.textContent = `${okN}/${checks.length}`;
  let step, total = checks.length + 1, n, targets;
  if (i >= 0) { const c = checks[i]; n = i + 1; step = { t: "目標：" + c.label, how: c.learn || c.hint, learn: "" }; targets = c.target || []; }
  else if (!lastRun?.all) { n = total; step = { t: "テスト実行で動かしてみる", how: "右上の「テスト実行」を押し、開いたパネルの「実行を開始」を押します。", learn: "テスト実行では、入力の例を使ってワークフローを最初から最後まで動かし、うまくできたかを採点します。" }; targets = ["#dx-start", "#dx-run"]; }
  else { n = total; step = { t: "クリア！", how: "テスト実行パネルの「次のお題へ」から続けられます。", learn: "" }; targets = ["#dx-next"]; }
  box.innerHTML = `<div class="dx-step"><span class="dx-stepn">次にやること ${n}/${total}</span><b>${esc(step.t)}</b><p>${esc(step.how)}</p>${step.learn ? `<p class="dx-learn"><span>これは何？</span>${esc(step.learn)}</p>` : ""}</div>`;
  root.querySelectorAll(".dx-hl").forEach((e) => e.classList.remove("dx-hl"));
  const tgt = targets.map((q) => root.querySelector(q)).find(visible);
  if (tgt) { tgt.classList.add("dx-hl"); if (tgt.closest(".dx-canvas")) tgt.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" }); }
}

/* ---------- 操作 ---------- */
function bind() {
  const $ = (q) => root.querySelector(q);
  $("#dx-run").onclick = () => { panel = "run"; sel = null; render(); };
  $("#dx-pub").onclick = () => toast(lastRun?.all ? "公開しました（練習用なので実際には公開されません）" : "テスト実行ですべての項目をクリアすると公開できます");
  $("#dx-gfold").onclick = () => { task._fold = !task._fold; render(); };
  $("#dx-cancel")?.addEventListener("click", () => { linkFrom = null; render(); });
  $("#dx-zi").onclick = () => { zoom = Math.min(1.5, +(zoom + 0.1).toFixed(1)); drawEdges(); };
  $("#dx-zo").onclick = () => { zoom = Math.max(0.5, +(zoom - 0.1).toFixed(1)); drawEdges(); };
  $("#dx-fit").onclick = () => { const cv = $("#dx-cv"); const mx = Math.max(...G.nodes.map((n) => n.x + NODE_W)) + 60; zoom = Math.max(0.5, Math.min(1, +(cv.clientWidth / mx).toFixed(2))); drawEdges(); cv.scrollTo(0, 0); };
  $("#dx-add").onclick = () => { selector = { from: sel || G.nodes[G.nodes.length - 1].id }; openSelector(selector); };
  root.querySelectorAll(".dx-edge").forEach((p) => p.addEventListener("click", () => { if (confirmInline("この接続を削除しますか？")) { G.edges.splice(+p.dataset.i, 1); persist(); render(); } }));
  root.querySelectorAll("[data-plus]").forEach((b) => b.addEventListener("click", (ev) => { ev.stopPropagation(); selector = { from: b.dataset.plus }; openSelector(selector); }));
  root.querySelectorAll(".dx-node").forEach((el) => {
    const n = G.nodes.find((x) => x.id === el.dataset.id);
    el.querySelectorAll(".dx-port").forEach((pt) => pt.addEventListener("click", (ev) => { ev.stopPropagation(); linkFrom = linkFrom?.id === n.id && linkFrom.port === pt.dataset.port ? null : { id: n.id, port: pt.dataset.port }; render(); }));
    let sx, sy, ox, oy, moved;
    el.addEventListener("pointerdown", (ev) => { if (ev.target.closest(".dx-port,.dx-plus")) return; sx = ev.clientX; sy = ev.clientY; ox = n.x; oy = n.y; moved = false; el.setPointerCapture(ev.pointerId); });
    el.addEventListener("pointermove", (ev) => { if (sx == null) return; const dx = (ev.clientX - sx) / zoom, dy = (ev.clientY - sy) / zoom; if (!moved && Math.hypot(dx, dy) < 5) return; moved = true; n.x = Math.max(0, ox + dx); n.y = Math.max(0, oy + dy); el.style.left = n.x + "px"; el.style.top = n.y + "px"; drawEdges(); });
    el.addEventListener("pointerup", () => { if (sx == null) return; sx = null; if (moved) return persist(); if (linkFrom) return connect(linkFrom, n); sel = n.id; panel = "set"; render(); });
  });
}
function connect(from, to) {
  const a = G.nodes.find((x) => x.id === from.id);
  if (to.id === a.id || to.type === "start") { toast("この組み合わせはつなげません"); linkFrom = null; return render(); }
  G.edges = G.edges.filter((e) => !(e.from === a.id && e.port === from.port));
  G.edges.push({ from: a.id, port: from.port, to: to.id });
  linkFrom = null; persist(); render();
}
function addAfter(fromId, type) {
  const from = G.nodes.find((x) => x.id === fromId);
  const n = { id: "n_" + uid(), type, x: (from?.x ?? 0) + NODE_W + 80, y: from?.y ?? 120, cfg: defaultCfg(type) };
  // 同じ位置にすでにブロックがあれば少し下へずらす
  while (G.nodes.some((m) => Math.abs(m.x - n.x) < 40 && Math.abs(m.y - n.y) < 60)) n.y += 110;
  G.nodes.push(n);
  if (from && outsOf(from).length === 1) { G.edges = G.edges.filter((e) => !(e.from === from.id && e.port === "out")); G.edges.push({ from: from.id, port: "out", to: n.id }); }
  sel = n.id; panel = "set"; selector = null; persist(); render();
  const cv = root.querySelector("#dx-cv"); cv.scrollTo({ left: Math.max(0, n.x * zoom - 80), top: Math.max(0, n.y * zoom - 120), behavior: "smooth" });
}

/* ---------- ブロック選択（検索・タブ・グループ） ---------- */
function openSelector(st) {
  const pop = root.querySelector("#dx-pop"); pop.hidden = false;
  const q = (st.q || "").trim(), tab = st.tab || "block";
  const avail = Object.entries(TYPES).filter(([k, t]) => k !== "start" && !(t.chat && task.app !== "chatflow") && !(t.wf && task.app !== "workflow"));
  const groups = ["", "質問理解", "ロジック", "変換", "ユーティリティ"];
  const item = ([k, t]) => `<button class="dx-bi" data-t="${k}">${icoTile(k, 22)}<span>${esc(t.name)}</span></button>`;
  const off = (name) => `<button class="dx-bi" disabled title="このお題では使いません"><span class="dx-ico dx-off">${svg("M12 5v14M5 12h14", 12)}</span><span>${esc(name)}</span></button>`;
  const body = tab === "tool" ? `<div class="dx-empty" style="padding:16px">このお題ではツールは使いません。HTTPリクエストは「ブロック」タブのユーティリティにあります。</div>`
    : groups.map((gname) => {
      const items = avail.filter(([, t]) => t.group === gname && (!q || t.name.includes(q))), offs = (DISABLED[gname] || []).filter((x) => !q || x.includes(q));
      if (!items.length && !offs.length) return "";
      return `${gname ? `<div class="dx-bg">${esc(gname)}</div>` : ""}${items.map(item).join("")}${offs.map(off).join("")}`;
    }).join("");
  pop.innerHTML = `<div class="dx-pop-in"><div class="dx-search">${svg("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4", 14)}<input id="dx-q" placeholder="ブロックを検索" value="${esc(q)}"></div>
    <div class="dx-tabs"><button data-tab="block" class="${tab === "block" ? "on" : ""}">ブロック</button><button data-tab="tool" class="${tab === "tool" ? "on" : ""}">ツール</button><button class="dx-x" data-x aria-label="閉じる">${svg("M6 6l12 12M18 6L6 18")}</button></div>
    <div class="dx-blist">${body || `<div class="dx-empty" style="padding:16px">見つかりません</div>`}</div></div>`;
  const inp = pop.querySelector("#dx-q"); inp.oninput = () => { st.q = inp.value; openSelector(st); const i = root.querySelector("#dx-q"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); };
  pop.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { st.tab = b.dataset.tab; openSelector(st); }));
  pop.querySelector("[data-x]").onclick = () => { selector = null; pop.hidden = true; };
  pop.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => addAfter(st.from, b.dataset.t)));
  updateCoach();
}

/* ---------- 設定パネル ---------- */
const sec = (label, html, tip = "") => `<div class="dx-sec"><div class="dx-lab">${label}${tip ? `<span class="dx-tip" title="${esc(tip)}">?</span>` : ""}</div>${html}</div>`;
function sel1(id, cur, opts, ph) { return `<select class="dx-in" id="${id}"><option value="">${ph}</option>${opts.map((o) => `<option ${o === cur ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`; }
const varPick = (id, cur, opts) => sel1(id, cur, opts, "変数を選択");
function promptBox(id, val, n, role) {
  return `<div class="dx-prompt"><div class="dx-ph"><b>${role}</b><span class="dx-sub">${(val || "").length} 文字</span><button class="dx-ins" data-ins="${id}">{x} 変数を挿入</button></div>
    <textarea class="dx-ta" id="${id}" rows="4" placeholder="ここにプロンプトを入力。「/」で変数を挿入">${esc(val)}</textarea>
    <div class="dx-vpick" id="${id}-pick" hidden>${upVars(n.id).map((v) => `<button class="dx-vopt" data-v="${esc(v)}">${chipVar(v)}</button>`).join("") || `<span class="dx-empty">接続された上流ノードの変数がありません</span>`}</div></div>`;
}
function bindPrompt(id, n, key) {
  const ta = root.querySelector("#" + id), pick = root.querySelector(`#${id}-pick`); if (!ta) return;
  ta.addEventListener("input", () => { n.cfg[key] = ta.value; persist(); refreshNode(n); if (ta.value.slice(ta.selectionStart - 1, ta.selectionStart) === "/") pick.hidden = false; });
  root.querySelector(`[data-ins="${id}"]`).onclick = () => { pick.hidden = !pick.hidden; };
  pick.querySelectorAll("[data-v]").forEach((b) => b.addEventListener("click", () => {
    const pos = ta.selectionStart ?? ta.value.length, before = ta.value.slice(0, pos), after = ta.value.slice(pos);
    ta.value = (before.endsWith("/") ? before.slice(0, -1) : before) + `{{${b.dataset.v}}}` + after; n.cfg[key] = ta.value; pick.hidden = true; persist(); refreshNode(n); ta.focus();
  }));
}
function refreshNode(n) { const el = root.querySelector(`.dx-node[data-id="${n.id}"] .dx-nb`); if (el) el.innerHTML = nodeBody(n); drawEdges(); }
function openSettings(id) {
  const n = G.nodes.find((x) => x.id === id); if (!n) return; const c = n.cfg, t = TYPES[n.type];
  const pn = root.querySelector("#dx-panel"); pn.hidden = false;
  const x = svg("M6 6l12 12M18 6L6 18"), plus = svg("M12 5v14M5 12h14", 12), trash = svg("M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13");
  let body = "";
  if (n.type === "start") body = (task.app === "chatflow" ? sec("システム変数", `<div class="dx-list">${chipVar("userinput.query")}<span class="dx-sub">String・利用者のメッセージ</span></div>`) : "")
    + sec("入力フィールド", `${c.fields.map((f, i) => `<div class="dx-field"><input class="dx-in" data-fn="${i}" value="${esc(f.name)}" placeholder="変数名"><select class="dx-in" data-ft="${i}"><option value="text" ${f.type === "text" ? "selected" : ""}>短いテキスト</option><option value="paragraph" ${f.type === "paragraph" ? "selected" : ""}>段落</option><option value="number" ${f.type === "number" ? "selected" : ""}>数値</option></select><button class="dx-icon" data-fd="${i}" aria-label="削除">${x}</button></div>`).join("")}<button class="dx-addrow" id="dx-fadd">${plus}入力フィールドを追加</button>`, "利用者に入力してもらう項目。変数名で後のノードから参照します");
  else if (n.type === "llm") body = sec("モデル", sel1("dx-model", c.model, MODELS, "モデルを選択") + `<div class="dx-param"><span>温度</span><input type="range" min="0" max="1" step="0.1" value="${c.temp}" id="dx-temp"><b id="dx-tv">${c.temp}</b></div>`)
    + sec("コンテキスト", varPick("dx-ctx", c.context, upVars(n.id).filter((v) => v.endsWith(".result"))), "知識検索の結果を入れると、それを根拠に回答します")
    + sec("プロンプト", promptBox("dx-sys", c.system, n, "SYSTEM") + promptBox("dx-user", c.user, n, "USER"));
  else if (n.type === "knowledge") body = sec("クエリ変数", varPick("dx-q2", c.query, upVars(n.id).filter((v) => !v.endsWith(".result"))))
    + sec("ナレッジ", sel1("dx-kb", c.kb, KB, "ナレッジベースを選択")) + sec("検索設定", `<div class="dx-param"><span>トップK</span><input type="range" min="1" max="10" value="${c.topk}" id="dx-k"><b>${c.topk}</b></div>`);
  else if (n.type === "classifier") body = sec("入力変数", varPick("dx-ci", c.input, upVars(n.id)))
    + sec("クラス", `${c.classes.map((k, i) => `<div class="dx-clsed"><input class="dx-in dx-clst" data-ct="${i}" value="${esc(k.title)}" placeholder="クラス ${i + 1}"><textarea class="dx-ta" data-cd="${i}" rows="2" placeholder="このクラスのトピックを書いてください">${esc(k.desc)}</textarea>${c.classes.length > 1 ? `<button class="dx-icon" data-cx="${i}" aria-label="クラスを削除">${trash}</button>` : ""}</div>`).join("")}<button class="dx-addrow" id="dx-cadd">${plus}クラスを追加</button>`, "タイトルはキャンバスの表示、本文はAIが判断に使う説明");
  else if (n.type === "answer") body = sec("回答", promptBox("dx-ans", c.text, n, "回答"));
  else if (n.type === "output") body = sec("出力変数", `${c.vars.map((v, i) => `<div class="dx-field"><input class="dx-in" data-vn="${i}" value="${esc(v.name)}" placeholder="変数名"><select class="dx-in" data-vr="${i}"><option value="">変数を選択</option>${upVars(n.id).map((o) => `<option ${o === v.ref ? "selected" : ""}>${esc(o)}</option>`).join("")}</select><button class="dx-icon" data-vd="${i}" aria-label="削除">${x}</button></div>`).join("")}<button class="dx-addrow" id="dx-vadd">${plus}出力変数を追加</button>`, "変数名がAPIレスポンスの outputs のキーになります");
  else if (n.type === "http") body = sec("API", `<div class="dx-field" style="grid-template-columns:110px 1fr">${sel1("dx-hm", c.method, ["GET", "POST", "PUT", "PATCH", "DELETE"], "メソッド")}<span class="dx-sub" style="align-self:center">URLは下の欄に入力（「/」で変数）</span></div>${promptBox("dx-hu", c.url, n, "URL")}`)
    + sec("認証", sel1("dx-ha", c.auth, ["なし", "APIキー（Bearer）"], "認証を選択"))
    + sec("エラー処理", sel1("dx-he", c.onError, ["なし", "デフォルト値", "失敗分岐"], "選択") + (c.onError === "デフォルト値" ? `<input class="dx-in" id="dx-hf" style="margin-top:8px" value="${esc(c.fallback)}" placeholder="body のデフォルト値">` : ""), "なし＝失敗でワークフロー全体が停止／デフォルト値＝決めた値で続行／失敗分岐＝別の道へ");
  const nexts = G.edges.filter((e) => e.from === n.id).map((e) => esc(TYPES[G.nodes.find((y) => y.id === e.to)?.type]?.name || "")).join("、");
  pn.innerHTML = `<div class="dx-pnh">${icoTile(n.type, 28)}<b>${esc(t.name)}</b><span style="flex:1"></span>
      ${n.type !== "start" ? `<button class="dx-icon" id="dx-del" title="削除">${trash}</button>` : ""}<button class="dx-icon" data-close aria-label="閉じる">${x}</button></div>
    <div class="dx-ptabs"><button class="on">設定</button><button disabled title="テスト実行後に表示">最後の実行</button></div>
    <div class="dx-pb">${body}${outsOf(n).length ? sec("次のステップ", `<div class="dx-sub">${nexts || "このワークフローに次のブロックを追加します（ノード右端の＋）"}</div>`) : ""}</div>`;
  const $ = (q) => pn.querySelector(q), on = (q, ev, fn) => pn.querySelectorAll(q).forEach((el) => el.addEventListener(ev, () => { fn(el); persist(); refreshNode(n); }));
  $("[data-close]").onclick = () => { sel = null; panel = null; render(); };
  $("#dx-del")?.addEventListener("click", () => { G.nodes = G.nodes.filter((y) => y.id !== n.id); G.edges = G.edges.filter((e) => e.from !== n.id && e.to !== n.id); sel = null; panel = null; persist(); render(); });
  if (n.type === "start") {
    $("#dx-fadd").onclick = () => { c.fields.push({ name: "", type: "text" }); persist(); render(); };
    on("[data-fn]", "input", (el) => { c.fields[+el.dataset.fn].name = el.value.trim(); });
    on("[data-ft]", "change", (el) => { c.fields[+el.dataset.ft].type = el.value; });
    on("[data-fd]", "click", (el) => { c.fields.splice(+el.dataset.fd, 1); render(); });
  } else if (n.type === "llm") {
    on("#dx-model", "change", (el) => { c.model = el.value; }); on("#dx-ctx", "change", (el) => { c.context = el.value; });
    on("#dx-temp", "input", (el) => { c.temp = +el.value; $("#dx-tv").textContent = el.value; });
    bindPrompt("dx-sys", n, "system"); bindPrompt("dx-user", n, "user");
  } else if (n.type === "knowledge") {
    on("#dx-q2", "change", (el) => { c.query = el.value; }); on("#dx-kb", "change", (el) => { c.kb = el.value; });
    on("#dx-k", "input", (el) => { c.topk = +el.value; el.nextElementSibling.textContent = el.value; });
  } else if (n.type === "classifier") {
    on("#dx-ci", "change", (el) => { c.input = el.value; }); on("[data-ct]", "input", (el) => { c.classes[+el.dataset.ct].title = el.value; }); on("[data-cd]", "input", (el) => { c.classes[+el.dataset.cd].desc = el.value; });
    on("[data-cx]", "click", (el) => { const i = +el.dataset.cx; c.classes.splice(i, 1); G.edges = G.edges.filter((e) => !(e.from === n.id && e.port === "c" + i)).map((e) => e.from === n.id && e.port[0] === "c" && +e.port.slice(1) > i ? { ...e, port: "c" + (+e.port.slice(1) - 1) } : e); render(); });
    $("#dx-cadd").onclick = () => { c.classes.push({ title: "クラス " + (c.classes.length + 1), desc: "" }); persist(); render(); };
  } else if (n.type === "answer") bindPrompt("dx-ans", n, "text");
  else if (n.type === "output") {
    $("#dx-vadd").onclick = () => { c.vars.push({ name: "", ref: "" }); persist(); render(); };
    on("[data-vn]", "input", (el) => { c.vars[+el.dataset.vn].name = el.value.trim(); }); on("[data-vr]", "change", (el) => { c.vars[+el.dataset.vr].ref = el.value; });
    on("[data-vd]", "click", (el) => { c.vars.splice(+el.dataset.vd, 1); render(); });
  } else if (n.type === "http") {
    on("#dx-hm", "change", (el) => { c.method = el.value; }); bindPrompt("dx-hu", n, "url");
    on("#dx-ha", "change", (el) => { c.auth = el.value; }); on("#dx-he", "change", (el) => { c.onError = el.value; render(); }); on("#dx-hf", "input", (el) => { c.fallback = el.value; });
  }
  updateCoach();
}

/* ---------- テスト実行パネル（入力 → 結果／採点／トレース） ---------- */
function traceRows() {
  const s = G.nodes.find((n) => n.type === "start"), order = [], q = [s], seen = new Set();
  while (q.length) { const n = q.shift(); if (!n || seen.has(n.id)) continue; seen.add(n.id); order.push(n); G.edges.filter((e) => e.from === n.id).forEach((e) => q.push(G.nodes.find((y) => y.id === e.to))); }
  const sm = task.sample; let stopped = false;
  return order.map((n, i) => {
    if (stopped) return null;
    const c = n.cfg; let msg = "", ok = true;
    if (n.type === "start") msg = task.app === "chatflow" ? `userinput.query：${sm.query}` : Object.entries(sm).filter(([k]) => k !== "apiDown").map(([k, v]) => `${k}：${v}`).join(" ");
    else if (n.type === "knowledge") { ok = !!c.kb; msg = c.kb ? `${c.kb} から ${c.topk} 件のチャンクを取得` : "ナレッジが選択されていません"; }
    else if (n.type === "llm") msg = c.context ? "コンテキストをもとに回答を生成" : "プロンプトから文章を生成";
    else if (n.type === "classifier") { const hit = c.classes.find((k) => /返品/.test(k.title)) && /返品/.test(sm.query || "") ? "返品" : c.classes[0]?.title; msg = `class_name：${hit}`; }
    else if (n.type === "answer") { ok = !!c.text; msg = c.text ? "チャットに回答を表示" : "回答が空です"; }
    else if (n.type === "output") { ok = c.vars.length > 0; msg = c.vars.length ? `outputs：{ ${c.vars.map((v) => v.name).join(", ")} }` : "出力変数がありません"; }
    else if (n.type === "http") { if (sm.apiDown) { if (c.onError === "デフォルト値") msg = "タイムアウト → デフォルト値で続行"; else if (c.onError === "失敗分岐") msg = "タイムアウト → 失敗分岐へ"; else { ok = false; stopped = true; msg = "タイムアウト：ワークフローが停止しました"; } } else msg = `${c.method} 200 OK`; }
    return { name: TYPES[n.type].name, type: n.type, ok, msg, ms: 30 + ((i * 137) % 900) };
  }).filter(Boolean);
}
function openRun() {
  const pn = root.querySelector("#dx-panel"); pn.hidden = false;
  const s = G.nodes.find((n) => n.type === "start"), check = svg("M5 12l5 5 9-10", 12), cross = svg("M6 6l12 12M18 6L6 18", 12);
  const inputs = task.app === "chatflow" ? [["userinput.query", task.sample.query]] : s.cfg.fields.filter((f) => f.name).map((f) => [f.name, task.sample[f.name] ?? ""]);
  const next = TASKS[TASKS.indexOf(task) + 1];
  let res = "";
  if (lastRun) {
    const v = lastRun.view, ch = lastRun.checks;
    res = `<div class="dx-ptabs dx-rtabs">${[["result", "結果"], ["detail", "採点"], ["trace", "トレース"]].map(([k, l]) => `<button data-rv="${k}" class="${v === k ? "on" : ""}">${l}</button>`).join("")}</div>
      ${v === "result" ? `<div class="dx-status ${lastRun.all ? "ok" : "ng"}">${lastRun.all ? "成功" : "要修正"}<span>${lastRun.okN}/${ch.length} 項目</span></div><p class="dx-sub" style="margin:8px 0">${lastRun.all ? "すべての項目をクリアしました。右上の「公開する」も押せます。" : "「採点」タブで、直すところとヒントを確認してください。"}</p>
          ${lastRun.all ? (next ? `<button class="dx-btn dx-primary dx-wide" id="dx-next">次のお題へ：${esc(next.title)}</button>` : `<p class="dx-sub">すべてのお題をクリアしました。</p>`) : ""}`
      : v === "detail" ? `<ul class="dx-checks">${ch.map((c) => `<li class="${c.ok ? "ok" : "ng"}"><span>${c.ok ? check : svg("M12 7v6M12 17h.01", 12)}</span><div><b>${esc(c.label)}</b>${c.ok ? "" : `<div class="dx-sub">${esc(c.hint)}</div>`}</div></li>`).join("")}</ul>`
      : `<div class="dx-trace">${lastRun.trace.map((r) => `<div class="dx-tr ${r.ok ? "" : "ng"}">${icoTile(r.type, 20)}<div style="flex:1;min-width:0"><b>${esc(r.name)}</b><div class="dx-sub">${esc(r.msg)}</div></div><span class="dx-ms">${r.ms}ms</span><span class="dx-st">${r.ok ? check : cross}</span></div>`).join("")}</div>`}
      <button class="dx-btn dx-wide" id="dx-reset" style="margin-top:12px">このお題を最初からやり直す</button>`;
  }
  pn.innerHTML = `<div class="dx-pnh"><b>テスト実行</b><span style="flex:1"></span><button class="dx-icon" data-close aria-label="閉じる">${cross}</button></div>
    <div class="dx-pb">${sec("入力", inputs.length ? inputs.map(([k, v]) => `<label class="dx-lab2">${esc(k)}</label><input class="dx-in" value="${esc(v)}" readonly>`).join("") : `<div class="dx-empty">ユーザー入力に入力フィールドがありません</div>`)}
      <button class="dx-btn dx-primary dx-wide" id="dx-start">${svg("M7 4l13 8-13 8z", 12, true)}実行を開始</button>${res}</div>`;
  pn.querySelector("[data-close]").onclick = () => { panel = null; render(); };
  pn.querySelector("#dx-start").onclick = () => {
    const checks = task.checks(api(G)), okN = checks.filter((c) => c.ok).length, all = okN === checks.length;
    lastRun = { checks, okN, all, trace: traceRows(), view: "result" };
    if (all) { let d = {}; try { d = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}"); } catch {} d[task.id] = Date.now(); try { localStorage.setItem("shikakunote.train.done", JSON.stringify(d)); } catch {} }
    openRun();
  };
  pn.querySelectorAll("[data-rv]").forEach((b) => (b.onclick = () => { lastRun.view = b.dataset.rv; openRun(); }));
  pn.querySelector("#dx-next")?.addEventListener("click", () => openTask(next));
  pn.querySelector("#dx-reset")?.addEventListener("click", () => { G = newGraph(); sel = null; linkFrom = null; lastRun = null; persist(); render(); });
  updateCoach();
}

/* ---------- 小物 ---------- */
let toastT, pend = 0;
function toast(m) { const t = document.getElementById("toast"); if (!t) return; t.textContent = m; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); }
function confirmInline(m) { const now = Date.now(); if (now - pend < 2500) { pend = 0; return true; } pend = now; toast(m + "（もう一度クリックで削除）"); return false; }
function openTask(t) {
  task = t; saveKey = "shikakunote.train." + t.id; sel = null; linkFrom = null; panel = null; selector = null; lastRun = null; zoom = 1;
  try { G = JSON.parse(localStorage.getItem(saveKey)) || newGraph(); } catch { G = newGraph(); }
  relayout();
  render(); window.scrollTo(0, 0);
}
export function taskList() {
  let d = {}; try { d = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}"); } catch {}
  return TASKS.map((t) => ({ id: t.id, title: t.title, app: t.app, goal: t.goal, done: !!d[t.id] }));
}
export function mount(el, id) { root = el; root.classList.add("tr-full"); openTask(TASKS.find((t) => t.id === id) || TASKS[0]); }

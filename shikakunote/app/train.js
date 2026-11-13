// 操作トレーニング（Dify）— ワークフロー編集画面の配置・用語・手順に合わせた練習用キャンバス。
// 他社の画像・ロゴは使わず、資格noteのデザインで作っている。お題 → ブロックを置く → つなぐ → 設定 → テスト実行で自動採点。
// スマホでも使えるよう、つなぐ操作は「出口の丸をタップ → つなぎ先のブロックをタップ」。ブロックはドラッグで動かせる。

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- ブロックの種類（名前・色はDifyの画面に合わせた用語） ---------- */
const TYPES = {
  start: { name: "ユーザー入力", color: "#2D7FF0", icon: "M4 12h16M12 4v16", outs: ["out"], single: true, desc: "利用者から入力を受け取る入口" },
  llm: { name: "LLM", color: "#6B5BE2", icon: "M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z", outs: ["out"], desc: "言語モデルで文章を作る" },
  knowledge: { name: "知識検索", color: "#16A34A", icon: "M4 5h7v14H4zM13 5h7v14h-7z", outs: ["out"], desc: "ナレッジベースから関連する文章を探す" },
  classifier: { name: "質問分類器", color: "#0E9F9A", icon: "M4 6h16M4 12h10M4 18h6", outs: "classes", desc: "質問の意味でクラスごとに道を分ける" },
  answer: { name: "回答", color: "#F39220", icon: "M4 5h16v11H8l-4 4z", outs: ["out"], chat: true, desc: "チャットに返事を出す（Chatflow）" },
  output: { name: "出力", color: "#E0533D", icon: "M5 12h11M12 7l5 5-5 5", outs: [], wf: true, desc: "結果を呼び出し元に返す（Workflow）" },
};
const KB = ["就業規則", "経費精算ルール", "製品マニュアル"];
const MODELS = ["高精度モデル", "高速モデル"];

/* ---------- お題 ---------- */
const TASKS = [
  {
    id: "d1", app: "workflow", title: "はじめてのワークフロー",
    goal: "入力した文章を要約して返すワークフローを作ります。",
    steps: [
      "「ユーザー入力」に、段落タイプの入力欄 text を追加する",
      "「＋ブロック」から LLM を追加し、ユーザー入力からつなぐ",
      "LLMのプロンプトに「/」で {{ユーザー入力.text}} を差し込み、要約を頼む文を書く",
      "「出力」を追加してLLMからつなぎ、変数 summary に LLM.text を選ぶ",
      "「テスト実行」で確かめる",
    ],
    sample: { text: "来週から経費精算の締め日が毎月25日に変わります。領収書は電子でも提出できます。" },
    checks: (g) => {
      const s = g.byType("start")[0], llm = g.byType("llm")[0], out = g.byType("output")[0];
      const f = s?.cfg.fields.find((x) => x.name === "text");
      return [
        { ok: !!f, label: "ユーザー入力に入力欄 text がある", hint: "ユーザー入力を選んで「＋入力欄」から、変数名 text を追加します。" },
        { ok: f?.type === "paragraph", label: "text の種類が「段落」", hint: "長い文章を受けるので「段落」にします（短いテキストは256文字まで）。" },
        { ok: !!llm && g.connected(s, llm), label: "ユーザー入力 → LLM がつながっている", hint: "ユーザー入力の右の丸をタップしてから、LLMをタップします。" },
        { ok: !!llm && /\{\{ユーザー入力\.text\}\}/.test(llm.cfg.user), label: "LLMのプロンプトで text を参照している", hint: "プロンプト欄で「/」を入力し、ユーザー入力.text を選びます。" },
        { ok: !!out && g.connected(llm, out), label: "LLM → 出力 がつながっている", hint: "LLMの右の丸をタップしてから、出力をタップします。" },
        { ok: !!out && out.cfg.vars.some((v) => v.name === "summary" && v.ref === "LLM.text"), label: "出力の変数 summary が LLM.text を指している", hint: "出力ノードで「＋変数」→ 名前 summary、値に LLM.text を選びます。" },
      ];
    },
  },
  {
    id: "d2", app: "chatflow", title: "社内FAQボット（RAG）",
    goal: "就業規則をもとに質問へ答えるChatflowを作ります。",
    steps: [
      "「＋ブロック」から 知識検索 を追加し、ユーザー入力からつなぐ",
      "知識検索の検索語に userinput.query、ナレッジに「就業規則」を選ぶ",
      "LLM を追加して知識検索からつなぎ、コンテキストに 知識検索.result を選ぶ",
      "回答 を追加してLLMからつなぎ、本文に {{LLM.text}} を差し込む",
      "「テスト実行」で確かめる",
    ],
    sample: { query: "有給休暇は何日前までに申請すればいいですか？" },
    checks: (g) => {
      const s = g.byType("start")[0], kn = g.byType("knowledge")[0], llm = g.byType("llm")[0], ans = g.byType("answer")[0];
      return [
        { ok: !!kn && g.connected(s, kn), label: "ユーザー入力 → 知識検索 がつながっている", hint: "ユーザー入力の右の丸をタップしてから、知識検索をタップします。" },
        { ok: kn?.cfg.query === "userinput.query", label: "検索語が userinput.query", hint: "Chatflowでは利用者のメッセージが userinput.query に入ります。" },
        { ok: kn?.cfg.kb === "就業規則", label: "ナレッジが「就業規則」", hint: "知識検索の「ナレッジ」で就業規則を選びます。" },
        { ok: !!llm && g.connected(kn, llm), label: "知識検索 → LLM がつながっている", hint: "知識検索の右の丸 → LLM の順にタップします。" },
        { ok: llm?.cfg.context === "知識検索.result", label: "LLMのコンテキストが 知識検索.result", hint: "検索結果はLLMの「コンテキスト」に入れると、出典付きで答えます。" },
        { ok: !!ans && g.connected(llm, ans) && /\{\{LLM\.text\}\}/.test(ans.cfg.text), label: "LLM → 回答 がつながり、本文で LLM.text を返している", hint: "回答ノードの本文で「/」→ LLM.text を選びます。" },
      ];
    },
  },
  {
    id: "d3", app: "chatflow", title: "問い合わせの振り分け",
    goal: "質問の意味で「返品」「使い方」「その他」に分け、それぞれ別の返事をするChatflowを作ります。",
    steps: [
      "「＋ブロック」から 質問分類器 を追加し、ユーザー入力からつなぐ",
      "入力に userinput.query を選び、クラスを3つ（返品／使い方／その他）にする",
      "回答 を3つ追加し、各クラスの出口からそれぞれつなぐ",
      "各回答に、そのクラス向けの返事を書く",
      "「テスト実行」で確かめる",
    ],
    sample: { query: "買った商品を返品したいのですが" },
    checks: (g) => {
      const s = g.byType("start")[0], c = g.byType("classifier")[0];
      const titles = (c?.cfg.classes || []).map((x) => x.title.trim());
      const want = ["返品", "使い方", "その他"];
      const allClasses = want.every((w) => titles.includes(w));
      const wired = c ? c.cfg.classes.every((_, i) => g.edges.some((e) => e.from === c.id && e.port === "c" + i && g.node(e.to)?.type === "answer")) : false;
      const filled = c ? c.cfg.classes.every((_, i) => { const e = g.edges.find((x) => x.from === c.id && x.port === "c" + i); const n = e && g.node(e.to); return n && n.cfg.text.trim().length >= 4; }) : false;
      return [
        { ok: !!c && g.connected(s, c), label: "ユーザー入力 → 質問分類器 がつながっている", hint: "ユーザー入力の右の丸 → 質問分類器の順にタップします。" },
        { ok: c?.cfg.input === "userinput.query", label: "分類する入力が userinput.query", hint: "質問分類器の「入力変数」で userinput.query を選びます。" },
        { ok: allClasses && titles.length === 3, label: "クラスが 返品／使い方／その他 の3つ", hint: "「＋クラス」で増やし、タイトルを返品・使い方・その他にします。説明欄にはAIが判断に使う説明を書きます。" },
        { ok: wired, label: "各クラスの出口が、それぞれ回答ノードにつながっている", hint: "分類器の右側にクラスごとの丸が並びます。1つずつ回答ノードへつなぎます。" },
        { ok: filled, label: "3つの回答に返事が書かれている", hint: "各回答ノードを選び、本文にそのクラス向けの返事を書きます。" },
      ];
    },
  },
];

/* ---------- 状態 ---------- */
let G, task, sel = null, linkFrom = null, root, saveKey;
const uid = () => Math.random().toString(36).slice(2, 8);

function newGraph(t) {
  const start = { id: "n_start", type: "start", x: 24, y: 32, cfg: { fields: [] } };
  return { nodes: [start], edges: [] };
}
function api(gr) {
  const node = (id) => gr.nodes.find((n) => n.id === id);
  const byType = (t) => gr.nodes.filter((n) => n.type === t);
  const connected = (a, b) => !!a && !!b && gr.edges.some((e) => e.from === a.id && e.to === b.id);
  return { ...gr, node, byType, connected };
}
// あるノードより上流のノード（そこから参照できる変数を作るため）
function upstream(id) {
  const seen = new Set(), stack = [id];
  while (stack.length) { const cur = stack.pop(); for (const e of G.edges) if (e.to === cur && !seen.has(e.from)) { seen.add(e.from); stack.push(e.from); } }
  return G.nodes.filter((n) => seen.has(n.id));
}
function varsOf(n) {
  if (n.type === "start") return task.app === "chatflow" ? ["userinput.query", ...n.cfg.fields.map((f) => "ユーザー入力." + f.name)] : n.cfg.fields.map((f) => "ユーザー入力." + f.name);
  if (n.type === "llm") return ["LLM.text"];
  if (n.type === "knowledge") return ["知識検索.result"];
  if (n.type === "classifier") return ["質問分類器.class_name"];
  return [];
}
const upVars = (id) => upstream(id).flatMap(varsOf);
const outsOf = (n) => TYPES[n.type].outs === "classes" ? n.cfg.classes.map((_, i) => "c" + i) : TYPES[n.type].outs;
function defaultCfg(type) {
  if (type === "llm") return { model: MODELS[0], system: "", user: "", context: "", temp: 0.7 };
  if (type === "knowledge") return { query: "", kb: "", topk: 3 };
  if (type === "classifier") return { input: "", classes: [{ title: "クラス 1", desc: "" }, { title: "クラス 2", desc: "" }] };
  if (type === "answer") return { text: "" };
  if (type === "output") return { vars: [] };
  return {};
}
function persist() { try { localStorage.setItem(saveKey, JSON.stringify(G)); } catch {} }

/* ---------- 描画 ---------- */
const NODE_W = 168;
function nodeHTML(n) {
  const t = TYPES[n.type];
  const outs = outsOf(n);
  const sub = n.type === "start" ? (n.cfg.fields.map((f) => f.name).join("・") || (task.app === "chatflow" ? "userinput.query" : "入力欄なし"))
    : n.type === "llm" ? n.cfg.model : n.type === "knowledge" ? (n.cfg.kb || "ナレッジ未選択") : n.type === "answer" ? (n.cfg.text.slice(0, 18) || "本文なし")
    : n.type === "output" ? (n.cfg.vars.map((v) => v.name).join("・") || "変数なし") : "";
  return `<div class="tr-node ${sel === n.id ? "sel" : ""} ${linkFrom ? "linkable" : ""}" data-id="${n.id}" style="left:${n.x}px;top:${n.y}px;width:${NODE_W}px">
    <div class="tr-node-h"><span class="tr-ic" style="background:${t.color}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${t.icon}"/></svg></span><b>${esc(t.name)}</b></div>
    ${n.type === "classifier" ? `<div class="tr-classes">${n.cfg.classes.map((c, i) => `<div class="tr-cls"><span>${esc(c.title || "クラス")}</span><button class="tr-port ${linkFrom?.id === n.id && linkFrom.port === "c" + i ? "on" : ""}" data-port="c${i}" aria-label="${esc(c.title)}の出口からつなぐ"></button></div>`).join("")}</div>`
      : `<div class="tr-node-sub">${esc(sub)}</div>`}
    ${n.type !== "start" ? `<span class="tr-in" aria-hidden="true"></span>` : ""}
    ${outs.length === 1 ? `<button class="tr-port tr-port-main ${linkFrom?.id === n.id ? "on" : ""}" data-port="out" aria-label="${esc(t.name)}の出口からつなぐ"></button>` : ""}
  </div>`;
}
function portXY(n, port) {
  const el = root.querySelector(`.tr-node[data-id="${n.id}"]`);
  if (!el) return [n.x + NODE_W, n.y + 24];
  if (port === "out") return [n.x + NODE_W, n.y + el.offsetHeight / 2];
  const p = el.querySelector(`[data-port="${port}"]`);
  return [n.x + NODE_W, n.y + (p ? p.offsetTop + p.offsetHeight / 2 : 24)];
}
function drawEdges() {
  const svg = root.querySelector(".tr-edges");
  let maxX = 0, maxY = 0;
  G.nodes.forEach((n) => { maxX = Math.max(maxX, n.x + NODE_W + 80); maxY = Math.max(maxY, n.y + 160); });
  const cv = root.querySelector(".tr-canvas-in"); cv.style.width = Math.max(maxX, 900) + "px"; cv.style.height = Math.max(maxY, 560) + "px";
  svg.setAttribute("width", cv.style.width); svg.setAttribute("height", cv.style.height);
  svg.innerHTML = G.edges.map((e, i) => {
    const a = G.nodes.find((n) => n.id === e.from), b = G.nodes.find((n) => n.id === e.to); if (!a || !b) return "";
    const [x1, y1] = portXY(a, e.port); const bEl = root.querySelector(`.tr-node[data-id="${b.id}"]`);
    const x2 = b.x, y2 = b.y + (bEl ? bEl.offsetHeight / 2 : 24); const dx = Math.min(90, Math.max(28, Math.abs(x2 - x1) / 2));
    return `<path d="M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}" class="tr-edge" data-i="${i}"/>`;
  }).join("");
}
function render() {
  const g = api(G);
  root.innerHTML = `
  <div class="tr-task card">
    <div class="tr-task-top"><span class="tag">${task.app === "workflow" ? "Workflow" : "Chatflow"}</span><span class="cap">お題 ${TASKS.indexOf(task) + 1}/${TASKS.length}</span></div>
    <b class="tr-task-t">${esc(task.title)}</b>
    <p class="cap" style="margin:2px 0 6px">${esc(task.goal)}</p>
    <details class="tr-steps"><summary>手順を見る（${task.steps.length}ステップ）</summary><ol>${task.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></details>
  </div>
  <div class="tr-toolbar">
    <button class="btn btn-secondary btn-sm" id="tr-add"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>ブロック</button>
    ${linkFrom ? `<span class="tr-linkmsg">つなぎ先のブロックをタップ<button class="btn btn-ghost btn-sm" id="tr-cancel">やめる</button></span>` : `<span class="cap tr-help">右の丸 → つなぎ先をタップでつなぐ</span>`}
    <button class="btn btn-cta btn-sm" id="tr-run"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>テスト実行</button>
  </div>
  <div class="tr-canvas" id="tr-cv"><div class="tr-canvas-in"><svg class="tr-edges"></svg>${G.nodes.map(nodeHTML).join("")}</div></div>
  <div class="tr-sheet" id="tr-sheet" hidden></div>
  <div class="tr-result" id="tr-res" hidden></div>`;
  drawEdges();
  bind();
  if (sel) openSettings(sel);
}

/* ---------- 操作 ---------- */
function bind() {
  root.querySelector("#tr-add").onclick = openPalette;
  root.querySelector("#tr-run").onclick = runTest;
  root.querySelector("#tr-cancel")?.addEventListener("click", () => { linkFrom = null; render(); });
  root.querySelectorAll(".tr-edge").forEach((p) => p.addEventListener("click", () => {
    if (confirmInline("この線を消しますか？")) { G.edges.splice(+p.dataset.i, 1); persist(); render(); }
  }));
  root.querySelectorAll(".tr-node").forEach((el) => {
    const n = G.nodes.find((x) => x.id === el.dataset.id);
    el.querySelectorAll(".tr-port").forEach((pt) => pt.addEventListener("click", (ev) => {
      ev.stopPropagation();
      linkFrom = linkFrom?.id === n.id && linkFrom.port === pt.dataset.port ? null : { id: n.id, port: pt.dataset.port };
      sel = null; render();
    }));
    // ドラッグで移動（小さな動きはタップ扱い）
    let sx, sy, ox, oy, moved = false;
    el.addEventListener("pointerdown", (ev) => {
      if (ev.target.closest(".tr-port")) return;
      sx = ev.clientX; sy = ev.clientY; ox = n.x; oy = n.y; moved = false; el.setPointerCapture(ev.pointerId);
    });
    el.addEventListener("pointermove", (ev) => {
      if (sx == null) return;
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (!moved && Math.hypot(dx, dy) < 6) return;
      moved = true; n.x = Math.max(0, ox + dx); n.y = Math.max(0, oy + dy);
      el.style.left = n.x + "px"; el.style.top = n.y + "px"; drawEdges();
    });
    el.addEventListener("pointerup", () => {
      if (sx == null) return; sx = null;
      if (moved) { persist(); return; }
      if (linkFrom) return connectTo(n);
      sel = n.id; render();
    });
  });
}
function connectTo(n) {
  const from = G.nodes.find((x) => x.id === linkFrom.id);
  if (n.id === from.id) { linkFrom = null; return render(); }
  if (n.type === "start") { flash("ユーザー入力は入口なので、つなぎ先にはできません。"); linkFrom = null; return render(); }
  if (!G.edges.some((e) => e.from === from.id && e.port === linkFrom.port && e.to === n.id)) {
    // 1つの出口から出す線は1本（クラスの出口も同じ）。付け替えたら古い線は消す
    G.edges = G.edges.filter((e) => !(e.from === from.id && e.port === linkFrom.port));
    G.edges.push({ from: from.id, port: linkFrom.port, to: n.id });
  }
  linkFrom = null; persist(); render();
}
function addNode(type) {
  const last = G.nodes[G.nodes.length - 1];
  // 画面が狭いとき（スマホ）は右ではなく下に並べ、横スクロールしなくても見えるようにする
  const narrow = root.clientWidth < 600;
  const lastEl = last && root.querySelector(`.tr-node[data-id="${last.id}"]`);
  const pos = narrow ? { x: Math.min((last?.x || 0) + 36, 120), y: (last?.y || 0) + (lastEl?.offsetHeight || 60) + 48 }
    : { x: (last?.x || 0) + NODE_W + 56, y: last?.y ?? 32 };
  const n = { id: "n_" + uid(), type, ...pos, cfg: defaultCfg(type) };
  G.nodes.push(n);
  // 選んでいたブロック（なければ最後のブロック）から自動でつなぐ。Difyの「次のブロックを追加」と同じ流れ
  const from = sel ? G.nodes.find((x) => x.id === sel) : last;
  if (from && outsOf(from).length === 1 && !G.edges.some((e) => e.from === from.id)) G.edges.push({ from: from.id, port: "out", to: n.id });
  sel = n.id; persist(); render();
}
function openPalette() {
  const sh = root.querySelector("#tr-sheet");
  const list = Object.entries(TYPES).filter(([k, t]) => k !== "start" && !(t.chat && task.app !== "chatflow") && !(t.wf && task.app !== "workflow"));
  sh.hidden = false;
  sh.innerHTML = `<div class="tr-sheet-in"><div class="tr-sheet-h"><b>ブロックを追加</b><button class="btn btn-ghost btn-sm" data-x>閉じる</button></div>
    <div class="stack">${list.map(([k, t]) => `<button class="tr-pal press" data-t="${k}"><span class="tr-ic" style="background:${t.color}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${t.icon}"/></svg></span><span style="flex:1;text-align:left"><b>${esc(t.name)}</b><br><span class="cap">${esc(t.desc)}</span></span></button>`).join("")}</div>
    <p class="cap" style="margin-top:12px">選んでいるブロック（なければ最後のブロック）の後ろに追加され、自動でつながります。</p></div>`;
  sh.querySelector("[data-x]").onclick = () => (sh.hidden = true);
  sh.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => { sh.hidden = true; addNode(b.dataset.t); }));
}

/* ---------- 設定パネル ---------- */
function varSelect(id, cur, opts, placeholder = "変数を選ぶ") {
  return `<select class="tr-input" id="${id}"><option value="">${placeholder}</option>${opts.map((o) => `<option ${o === cur ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
}
function promptBox(id, val, n) {
  return `<div class="tr-prompt"><textarea class="tr-input" id="${id}" rows="4" placeholder="「/」で変数を差し込めます">${esc(val)}</textarea>
    <div class="tr-vpick" id="${id}-pick" hidden>${upVars(n.id).map((v) => `<button class="tr-chip" data-v="${esc(v)}">{{${esc(v)}}}</button>`).join("") || `<span class="cap">つながっている上流のブロックがまだありません</span>`}</div></div>`;
}
function bindPrompt(id, n, key) {
  const ta = root.querySelector("#" + id), pick = root.querySelector(`#${id}-pick`);
  ta.addEventListener("input", () => {
    n.cfg[key] = ta.value; persist();
    if (ta.value.slice(ta.selectionStart - 1, ta.selectionStart) === "/") pick.hidden = false;
  });
  pick.querySelectorAll("[data-v]").forEach((b) => b.addEventListener("click", () => {
    const pos = ta.selectionStart, before = ta.value.slice(0, pos), after = ta.value.slice(pos);
    const cut = before.endsWith("/") ? before.slice(0, -1) : before;
    ta.value = cut + `{{${b.dataset.v}}}` + after; n.cfg[key] = ta.value; pick.hidden = true; persist(); ta.focus();
  }));
}
function openSettings(id) {
  const n = G.nodes.find((x) => x.id === id); if (!n) return;
  const t = TYPES[n.type], sh = root.querySelector("#tr-sheet"); sh.hidden = false;
  let body = "";
  if (n.type === "start") {
    body = `${task.app === "chatflow" ? `<div class="tr-field"><label>プリセット</label><div class="tr-ro">userinput.query（利用者のメッセージ）</div></div>` : ""}
      <div class="tr-field"><label>入力欄</label>${n.cfg.fields.map((f, i) => `<div class="tr-row"><input class="tr-input" data-fn="${i}" value="${esc(f.name)}" placeholder="変数名（英数字）"><select class="tr-input" data-ft="${i}"><option value="text" ${f.type === "text" ? "selected" : ""}>短いテキスト</option><option value="paragraph" ${f.type === "paragraph" ? "selected" : ""}>段落</option><option value="number" ${f.type === "number" ? "selected" : ""}>数値</option></select><button class="btn btn-ghost btn-sm" data-fd="${i}" aria-label="削除">×</button></div>`).join("")}
      <button class="btn btn-secondary btn-sm" id="tr-fadd">＋入力欄</button></div>`;
  } else if (n.type === "llm") {
    body = `<div class="tr-field"><label>AIモデル</label>${varSelect("tr-model", n.cfg.model, MODELS, "モデルを選ぶ")}</div>
      <div class="tr-field"><label>コンテキスト</label>${varSelect("tr-ctx", n.cfg.context, upVars(n.id).filter((v) => v.endsWith(".result")), "なし")}<span class="cap">知識検索の結果を入れると、それを根拠に答えます</span></div>
      <div class="tr-field"><label>システム</label>${promptBox("tr-sys", n.cfg.system, n)}</div>
      <div class="tr-field"><label>ユーザー</label>${promptBox("tr-user", n.cfg.user, n)}</div>
      <div class="tr-field"><label>温度 <b class="num" id="tr-tv">${n.cfg.temp}</b></label><input type="range" min="0" max="1" step="0.1" value="${n.cfg.temp}" id="tr-temp"><span class="cap">0に近いほど毎回同じ答え、1に近いほど発想が広がる</span></div>`;
  } else if (n.type === "knowledge") {
    body = `<div class="tr-field"><label>検索語（クエリ）</label>${varSelect("tr-q", n.cfg.query, upVars(n.id).filter((v) => !v.endsWith(".result")))}</div>
      <div class="tr-field"><label>ナレッジ</label>${varSelect("tr-kb", n.cfg.kb, KB, "ナレッジベースを選ぶ")}</div>
      <div class="tr-field"><label>トップK <b class="num">${n.cfg.topk}</b></label><input type="range" min="1" max="10" value="${n.cfg.topk}" id="tr-k"><span class="cap">返すチャンクの数（初期値3）</span></div>`;
  } else if (n.type === "classifier") {
    body = `<div class="tr-field"><label>入力変数</label>${varSelect("tr-ci", n.cfg.input, upVars(n.id))}</div>
      <div class="tr-field"><label>クラス</label>${n.cfg.classes.map((c, i) => `<div class="tr-cls-ed"><input class="tr-input" data-ct="${i}" value="${esc(c.title)}" placeholder="タイトル（キャンバスの表示）"><textarea class="tr-input" data-cd="${i}" rows="2" placeholder="説明（AIが判断に使う）">${esc(c.desc)}</textarea>${n.cfg.classes.length > 1 ? `<button class="btn btn-ghost btn-sm" data-cx="${i}">このクラスを消す</button>` : ""}</div>`).join("")}
      <button class="btn btn-secondary btn-sm" id="tr-cadd">＋クラス</button></div>`;
  } else if (n.type === "answer") {
    body = `<div class="tr-field"><label>回答</label>${promptBox("tr-ans", n.cfg.text, n)}</div>`;
  } else if (n.type === "output") {
    body = `<div class="tr-field"><label>出力変数</label>${n.cfg.vars.map((v, i) => `<div class="tr-row"><input class="tr-input" data-vn="${i}" value="${esc(v.name)}" placeholder="変数名"><select class="tr-input" data-vr="${i}"><option value="">値を選ぶ</option>${upVars(n.id).map((o) => `<option ${o === v.ref ? "selected" : ""}>${esc(o)}</option>`).join("")}</select><button class="btn btn-ghost btn-sm" data-vd="${i}" aria-label="削除">×</button></div>`).join("")}
      <button class="btn btn-secondary btn-sm" id="tr-vadd">＋変数</button><span class="cap">変数名がAPIの返り値（outputs）の項目名になります</span></div>`;
  }
  sh.innerHTML = `<div class="tr-sheet-in"><div class="tr-sheet-h"><span class="tr-ic" style="background:${t.color}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${t.icon}"/></svg></span><b style="flex:1">${esc(t.name)}</b>
    ${n.type !== "start" ? `<button class="btn btn-ghost btn-sm" id="tr-del">削除</button>` : ""}<button class="btn btn-secondary btn-sm" data-x>閉じる</button></div>${body}</div>`;
  const $ = (q) => sh.querySelector(q);
  $("[data-x]").onclick = () => { sel = null; render(); };
  $("#tr-del")?.addEventListener("click", () => { G.nodes = G.nodes.filter((x) => x.id !== n.id); G.edges = G.edges.filter((e) => e.from !== n.id && e.to !== n.id); sel = null; persist(); render(); });
  const on = (q, ev, fn) => sh.querySelectorAll(q).forEach((el) => el.addEventListener(ev, () => { fn(el); persist(); }));
  if (n.type === "start") {
    $("#tr-fadd").onclick = () => { n.cfg.fields.push({ name: "", type: "text" }); persist(); render(); };
    on("[data-fn]", "input", (el) => { n.cfg.fields[+el.dataset.fn].name = el.value.trim(); });
    on("[data-fn]", "change", () => render());
    on("[data-ft]", "change", (el) => { n.cfg.fields[+el.dataset.ft].type = el.value; render(); });
    on("[data-fd]", "click", (el) => { n.cfg.fields.splice(+el.dataset.fd, 1); render(); });
  } else if (n.type === "llm") {
    on("#tr-model", "change", (el) => { n.cfg.model = el.value; drawEdges(); });
    on("#tr-ctx", "change", (el) => { n.cfg.context = el.value; });
    on("#tr-temp", "input", (el) => { n.cfg.temp = +el.value; $("#tr-tv").textContent = el.value; });
    bindPrompt("tr-sys", n, "system"); bindPrompt("tr-user", n, "user");
  } else if (n.type === "knowledge") {
    on("#tr-q", "change", (el) => { n.cfg.query = el.value; });
    on("#tr-kb", "change", (el) => { n.cfg.kb = el.value; render(); });
    on("#tr-k", "input", (el) => { n.cfg.topk = +el.value; el.previousElementSibling.querySelector("b").textContent = el.value; });
  } else if (n.type === "classifier") {
    on("#tr-ci", "change", (el) => { n.cfg.input = el.value; });
    on("[data-ct]", "input", (el) => { n.cfg.classes[+el.dataset.ct].title = el.value; });
    on("[data-ct]", "change", () => render());
    on("[data-cd]", "input", (el) => { n.cfg.classes[+el.dataset.cd].desc = el.value; });
    on("[data-cx]", "click", (el) => { const i = +el.dataset.cx; n.cfg.classes.splice(i, 1); G.edges = G.edges.filter((e) => !(e.from === n.id && e.port === "c" + i)).map((e) => e.from === n.id && +e.port.slice(1) > i ? { ...e, port: "c" + (+e.port.slice(1) - 1) } : e); render(); });
    $("#tr-cadd").onclick = () => { n.cfg.classes.push({ title: "クラス " + (n.cfg.classes.length + 1), desc: "" }); persist(); render(); };
  } else if (n.type === "answer") {
    bindPrompt("tr-ans", n, "text"); on("#tr-ans", "change", () => render());
  } else if (n.type === "output") {
    $("#tr-vadd").onclick = () => { n.cfg.vars.push({ name: "", ref: "" }); persist(); render(); };
    on("[data-vn]", "input", (el) => { n.cfg.vars[+el.dataset.vn].name = el.value.trim(); });
    on("[data-vn]", "change", () => render());
    on("[data-vr]", "change", (el) => { n.cfg.vars[+el.dataset.vr].ref = el.value; render(); });
    on("[data-vd]", "click", (el) => { n.cfg.vars.splice(+el.dataset.vd, 1); render(); });
  }
}

/* ---------- テスト実行と採点 ---------- */
function trace() {
  const lines = []; const s = G.nodes.find((n) => n.type === "start");
  const order = []; const q = [s]; const seen = new Set();
  while (q.length) { const n = q.shift(); if (!n || seen.has(n.id)) continue; seen.add(n.id); order.push(n); G.edges.filter((e) => e.from === n.id).forEach((e) => q.push(G.nodes.find((x) => x.id === e.to))); }
  const sample = task.sample;
  for (const n of order) {
    const t = TYPES[n.type].name;
    if (n.type === "start") lines.push([t, task.app === "chatflow" ? `userinput.query = 「${sample.query}」` : Object.entries(sample).map(([k, v]) => `${k} = 「${v}」`).join(" ")]);
    else if (n.type === "knowledge") lines.push([t, n.cfg.kb ? `「${n.cfg.kb}」から${n.cfg.topk}件のチャンクを取得` : "ナレッジが未選択"]);
    else if (n.type === "llm") lines.push([t, n.cfg.context ? "検索結果をもとに回答文を生成" : "プロンプトから文章を生成"]);
    else if (n.type === "classifier") { const hit = n.cfg.classes.find((c) => /返品/.test(c.title)) && /返品/.test(sample.query || "") ? "返品" : n.cfg.classes[0]?.title; lines.push([t, `「${hit}」に分類`]); }
    else if (n.type === "answer") lines.push([t, n.cfg.text ? "チャットに返事を表示" : "本文が空"]);
    else if (n.type === "output") lines.push([t, n.cfg.vars.length ? `outputs: { ${n.cfg.vars.map((v) => v.name).join(", ")} }` : "出力変数がない"]);
  }
  return lines;
}
function runTest() {
  const res = root.querySelector("#tr-res");
  const checks = task.checks(api(G));
  const okN = checks.filter((c) => c.ok).length, all = okN === checks.length;
  const done = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}");
  if (all) { done[task.id] = Date.now(); try { localStorage.setItem("shikakunote.train.done", JSON.stringify(done)); } catch {} }
  const next = TASKS[TASKS.indexOf(task) + 1];
  res.hidden = false;
  res.innerHTML = `<div class="tr-sheet-in">
    <div class="tr-sheet-h"><b style="flex:1">${all ? "クリア！" : `あと${checks.length - okN}か所`}</b><button class="btn btn-ghost btn-sm" data-x>閉じる</button></div>
    <div class="tr-trace">${trace().map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>
    <ul class="tr-checks">${checks.map((c) => `<li class="${c.ok ? "ok" : "ng"}"><span class="tr-mark">${c.ok ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 6v8M12 18h.01"/></svg>'}</span><div><b>${esc(c.label)}</b>${c.ok ? "" : `<div class="cap">${esc(c.hint)}</div>`}</div></li>`).join("")}</ul>
    ${all ? (next ? `<button class="btn btn-cta btn-block" id="tr-next">次のお題へ：${esc(next.title)}</button>` : `<p class="note">3つのお題をすべてクリアしました。実際のDifyでも同じ手順で作れます。</p>`) : ""}
    <button class="btn btn-ghost btn-block" id="tr-reset">このお題を最初からやり直す</button></div>`;
  res.querySelector("[data-x]").onclick = () => (res.hidden = true);
  res.querySelector("#tr-next")?.addEventListener("click", () => openTask(next));
  res.querySelector("#tr-reset").onclick = () => { G = newGraph(task); sel = null; linkFrom = null; persist(); render(); };
}

/* ---------- 小物 ---------- */
let flashT;
function flash(msg) { const t = document.getElementById("toast"); if (!t) return; t.textContent = msg; t.classList.add("show"); clearTimeout(flashT); flashT = setTimeout(() => t.classList.remove("show"), 2400); }
// ブラウザのダイアログは使わない（操作が止まるため）。2回タップで確定
let pendingConfirm = 0;
function confirmInline(msg) { const now = Date.now(); if (now - pendingConfirm < 2500) { pendingConfirm = 0; return true; } pendingConfirm = now; flash(msg + "（もう一度タップで消す）"); return false; }

function openTask(t) {
  task = t; saveKey = "shikakunote.train." + t.id; sel = null; linkFrom = null;
  try { G = JSON.parse(localStorage.getItem(saveKey)) || newGraph(t); } catch { G = newGraph(t); }
  render(); window.scrollTo(0, 0);
}

export function taskList() {
  let done = {}; try { done = JSON.parse(localStorage.getItem("shikakunote.train.done") || "{}"); } catch {}
  return TASKS.map((t) => ({ id: t.id, title: t.title, app: t.app, goal: t.goal, done: !!done[t.id] }));
}
export function mount(el, taskId) {
  root = el; root.classList.add("tr");
  openTask(TASKS.find((t) => t.id === taskId) || TASKS[0]);
}

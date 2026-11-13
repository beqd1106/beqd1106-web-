// 資格note Web — ビルドなしの1ページアプリ（hashルーティング）
// 進捗はこのブラウザの localStorage にだけ保存する（ログイン・同期なし）。
const DATA_V = "20261114d";
const STORE_KEY = "shikakunote.web.v1";
const INTERVALS = [1, 3, 7, 14, 30]; // iOS版と同じ間隔反復
const SET_SIZE = 5;

/* ---------- 小道具 ---------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dayNum = (d = new Date()) => Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 86400000);
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

const I = {
  chev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  down: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
  home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  pencil: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  head: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/></svg>',
  cal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  redo: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  shuffle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
  star: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
  starF: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
  bulb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>',
  q: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>',
  check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  checkBig: '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  play: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
  pause: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
  next: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5.5v13a1 1 0 0 0 1.6.8L15 13v5a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0v5L6.6 4.7A1 1 0 0 0 5 5.5z"/></svg>',
  prev: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 5.5v13a1 1 0 0 1-1.6.8L9 13v5a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5l8.4-6.3A1 1 0 0 1 19 5.5z"/></svg>',
  gear: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  dl: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  bolt: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
  inbox: '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/></svg>',
};

/* ---------- 保存 ---------- */
// 形: { v:1, exam, onboarded, ex:{ [key]: { r:{qid:[lastOk,tries,oks,lv,due,unsure]}, fav:[], lessons:[], sess } }, days:{ "YYYY-MM-DD": {exam:n, _l:n} }, set:{goal,rate,readEx,autoNext,pause} }
let S = load();
function blank() { return { v: 1, exam: null, onboarded: false, ex: {}, days: {}, set: { goal: 10, rate: 1.05, readEx: true, autoNext: true, pause: 3 } }; }
function load() {
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s && s.v === 1) return Object.assign(blank(), s, { set: Object.assign(blank().set, s.set) }); } catch {}
  return blank();
}
let saveWarned = false;
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }
  catch { if (!saveWarned) { saveWarned = true; toast("このブラウザに保存できませんでした。プライベートブラウズを解除してください"); } }
}
const exState = (k = S.exam) => (S.ex[k] ||= { r: {}, fav: [], lessons: [], sess: null });
try { navigator.storage?.persist?.(); } catch {}

/* ---------- データ ---------- */
let EXAMS = [];
const cache = {};
async function getJSON(name) {
  const res = await fetch(`data/${name}.json?v=${DATA_V}`);
  if (!res.ok) throw new Error(`${name} ${res.status}`);
  return res.json();
}
async function examData(k) {
  if (cache[k]) return cache[k];
  const [qs, lessons, terms] = await Promise.all([getJSON(`${k}_questions`), getJSON(`${k}_lessons`).catch(() => []), getJSON(`${k}_terms`).catch(() => [])]);
  const byId = new Map(qs.map((q) => [q.id, q]));
  return (cache[k] = { qs, byId, lessons, terms });
}
const examInfo = (k = S.exam) => EXAMS.find((e) => e.key === k);
const domainInfo = (id, k = S.exam) => examInfo(k)?.domains.find((d) => d.id === id);

/* ---------- 学習ロジック ---------- */
function recordAnswer(q, ok, usedHint) {
  const st = exState();
  const r = st.r[q.id] || [0, 0, 0, -1, 0, 0];
  r[0] = ok ? 1 : 0; r[1]++; if (ok) r[2]++;
  const today = dayNum();
  if (!ok) { r[3] = 0; r[4] = today; }                          // 間違えた問題はすぐ復習へ
  else if (r[3] >= 0) {
    if (usedHint) r[4] = today + INTERVALS[Math.min(r[3], 4)];  // ヒントつき正解は段階を据え置き
    else { r[3] = Math.min(r[3] + 1, 4); r[4] = today + INTERVALS[r[3]]; if (r[3] >= 4) { r[3] = -1; r[4] = 0; } }
  }
  st.r[q.id] = r;
  const d = (S.days[dayKey()] ||= {}); d[S.exam] = (d[S.exam] || 0) + 1;
  save();
}
function markUnsure(q) {
  const st = exState(); const r = st.r[q.id] || [1, 1, 1, -1, 0, 0];
  r[3] = 0; r[4] = dayNum() + 1; r[5] = 1; st.r[q.id] = r; save();
}
function dueIds(k = S.exam) {
  const st = exState(k), t = dayNum();
  return Object.entries(st.r).filter(([, r]) => r[3] >= 0 && r[4] <= t).sort((a, b) => a[1][4] - b[1][4]).map(([id]) => id);
}
function pickMix(D, n, domain) {
  const st = exState();
  let pool = D.qs.filter((q) => !domain || q.domain === domain);
  const unseen = pool.filter((q) => !st.r[q.id]);
  const weak = pool.filter((q) => st.r[q.id] && st.r[q.id][0] === 0);
  const rest = pool.filter((q) => st.r[q.id] && st.r[q.id][0] === 1);
  // 未出題を中心に、苦手を少し混ぜる
  const out = [...shuffle(weak).slice(0, Math.min(2, n)), ...shuffle(unseen)];
  for (const q of shuffle(rest)) out.push(q);
  return [...new Map(out.map((q) => [q.id, q])).values()].slice(0, n);
}
function studyDays() { return new Set(Object.entries(S.days).filter(([, v]) => Object.keys(v).length).map(([k]) => k)); }
// 休息日：7日に1日までは、学習しなかった日があっても連続が切れない（iOS版 StudyStreak と同じ規則）
const REST_SPACING = 7;
function walkStreak() {
  const days = studyDays(); if (!days.size) return { n: 0, rests: [] };
  const d = new Date(); d.setHours(0, 0, 0, 0);
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0; const rests = [];
  for (;;) {
    if (days.has(dayKey(d))) n++;
    else {
      const before = new Date(d); before.setDate(before.getDate() - 1);
      const spaced = !rests.length || (dayNum(rests[rests.length - 1]) - dayNum(d)) >= REST_SPACING;
      if (!days.has(dayKey(before)) || !spaced) break;
      rests.push(new Date(d));
    }
    d.setDate(d.getDate() - 1);
  }
  return { n, rests: rests.map((x) => dayKey(x)) };
}
function streak() { return walkStreak().n; }
function longest() {
  const nums = [...studyDays()].map((k) => { const [y, m, dd] = k.split("-").map(Number); return dayNum(new Date(y, m - 1, dd)); }).sort((a, b) => a - b);
  let best = 0, cur = 0, prev = null, lastRest = null;
  for (const x of nums) {
    if (prev === null) cur = 1;
    else if (x === prev + 1) cur++;
    else if (x === prev + 2 && (lastRest === null || x - lastRest > REST_SPACING)) { cur++; lastRest = x - 1; }
    else { cur = 1; lastRest = null; }
    best = Math.max(best, cur); prev = x;
  }
  return Math.max(best, walkStreak().n); // 休息日の選び方で今の連続のほうが長くなる場合に合わせる
}
const todayCount = (k) => { const d = S.days[dayKey()] || {}; return k ? d[k] || 0 : Object.entries(d).filter(([x]) => x !== "_l").reduce((a, [, v]) => a + v, 0); };

/* ---------- ヒント（iOS版と同じ考え方：答えは言わない） ---------- */
function hintText(q) {
  if (q.beginnerNote && !q.correctAnswers.some((i) => q.beginnerNote.includes(q.choices[i]))) return q.beginnerNote;
  const tags = (q.tags || []).filter((t) => !q.correctAnswers.some((i) => q.choices[i].includes(t)));
  if (tags.length) return `「${tags.slice(0, 2).join("」「")}」がこの問題の着眼点です。`;
  return `${domainInfo(q.domain)?.title || "この分野"}の基本を思い出してみましょう。`;
}
function eliminate(q) {
  const wrong = q.choices.map((_, i) => i).filter((i) => !q.correctAnswers.includes(i));
  const keep = q.correctAnswers.length + 1;
  if (q.choices.length <= keep) return [];
  const order = wrong.sort((a, b) => hash(q.id + a) - hash(q.id + b));
  return order.slice(0, q.choices.length - keep);
}

/* ---------- 画面の枠 ---------- */
function topbar(mode = "exam", backHref = "#/home", title = "") {
  const e = examInfo();
  $("#topbar").innerHTML = `<div class="topbar-in">${
    mode === "back"
      ? `<a class="back" href="${backHref}">${I.back}<span>戻る</span></a><b style="flex:1;text-align:center;font-size:15px;margin-right:56px">${esc(title)}</b>`
      : `<a class="brand" href="#/home"><img src="icon-96.png" alt="" width="28" height="28">資格note</a>
         ${e ? `<button class="exam-switch press" id="sw" aria-label="資格を切り替える（今は${esc(e.examShortName)}）"><img src="exams/${e.key}.png" alt="" width="26" height="26"><span>${esc(e.examShortName)}</span>${I.down}</button>` : ""}`
  }</div>`;
  $("#sw")?.addEventListener("click", () => go("#/pick"));
}
function tabbar(cur) {
  const t = (h, ic, label, k) => `<a class="tab" href="${h}" ${cur === k ? 'aria-current="page"' : ""}><span class="tab-ic">${ic}</span>${label}</a>`;
  $("#tabbar").innerHTML = S.exam ? `<div class="tabbar-in">${t("#/home", I.home, "ホーム", "home")}${t("#/lessons", I.book, "レッスン", "lessons")}${t("#/practice", I.pencil, "演習", "practice")}${t("#/listen", I.head, "聞き流し", "listen")}${t("#/record", I.cal, "記録", "record")}</div>` : "";
  $("#tabbar").style.display = S.exam ? "" : "none";
}
function render(html) { const m = $("#main"); m.innerHTML = html; window.scrollTo(0, 0); }
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2400); }
function go(h) { if (location.hash === h) route(); else location.hash = h; }
function vibrate() { try { navigator.vibrate?.(8); } catch {} }

/* ---------- 資格選択 ---------- */
function viewPick() {
  topbar(S.exam ? "back" : "exam", "#/home", "資格をえらぶ"); tabbar("");
  const groups = [...new Set(EXAMS.map((e) => e.group))];
  render(`
    ${S.exam ? "" : `<div style="margin:8px 0 20px"><h1 class="h-title">9つの資格を、1日5問ずつ。</h1><p class="muted" style="margin:6px 0 0">登録なしで、すぐ始められます。勉強する資格をえらんでください。</p></div>`}
    ${groups.map((g) => `<h2 class="h-sec">${esc(g)}</h2><div class="stack">${EXAMS.filter((e) => e.group === g).map((e) => `
      <button class="card press exam-card" data-k="${e.key}" ${S.exam === e.key ? 'aria-current="true"' : ""} style="text-align:left;width:100%">
        <img class="exam-ic" src="exams/${e.key}.png" alt="" width="52" height="52" loading="lazy">
        <span style="flex:1;min-width:0"><b style="display:block;color:var(--navy)">${esc(e.examShortName)}</b>
        <span class="cap">${e.questionCount}問・レッスン${e.lessonCount}本</span></span>
        ${S.exam === e.key ? `<span class="tag green">学習中</span>` : I.chev}
      </button>`).join("")}</div>`).join("")}
    <p class="foot">各試験の名称は各実施団体の商標です。本サービスは非公式の学習支援ツールで、問題はすべてオリジナルです。</p>`);
  $("#main").querySelectorAll("[data-k]").forEach((b) => b.addEventListener("click", () => {
    const first = !S.onboarded; S.exam = b.dataset.k; S.onboarded = true; save(); vibrate();
    go(first ? "#/quiz/mix" : "#/home");   // 初回は資格を選んだらすぐ5問へ
  }));
}

/* ---------- レッスン中心の導線 ---------- */
// まだ読んでいない最初のレッスン（分野を指定するとその分野の中で）
function nextLessonOf(D, st, domain) { return D.lessons.find((l) => !st.lessons.includes(l.id) && (!domain || l.domain === domain)); }

/* ---------- ホーム ---------- */
async function viewHome() {
  topbar(); tabbar("home");
  const e = examInfo(); const D = await examData(S.exam); const st = exState();
  const due = dueIds().length;
  const nextLesson = nextLessonOf(D, st);
  const readN = st.lessons.length, lessonN = D.lessons.length;
  const inSess = !!(st.sess && st.sess.ids?.length && st.sess.i < st.sess.ids.length);
  let na;
  if (st.sess && st.sess.ids?.length && st.sess.i < st.sess.ids.length) na = { eyebrow: "つづきから", title: `${st.sess.title}の続き`, sub: `残り${st.sess.ids.length - st.sess.i}問・約${Math.max(1, Math.round((st.sess.ids.length - st.sess.i) * 0.6))}分`, href: "#/quiz/resume", go: "続きを解く" };
  else if (nextLesson) na = { eyebrow: `次のレッスン（${readN + 1}/${lessonN}本目）`, title: nextLesson.title, sub: `約${nextLesson.estimatedMinutes || 5}分で読める解説 → 確認問題`, href: `#/lesson/${nextLesson.id}`, go: "レッスンを読む" };
  else if (due > 0) na = { eyebrow: "今日の復習", title: `復習${Math.min(due, SET_SIZE)}問`, sub: `前に間違えた問題・自信がなかった問題です（約${Math.min(due, SET_SIZE) * 0.6 | 0 || 1}分）`, href: "#/quiz/review", go: `復習${Math.min(due, SET_SIZE)}問を始める` };
  else na = { eyebrow: "今日の1区切り", title: `ミックス${SET_SIZE}問`, sub: "まだ解いていない問題を中心に。約3分", href: "#/quiz/mix", go: `${SET_SIZE}問を始める` };
  const tc = todayCount(), goal = S.set.goal, p = Math.min(100, Math.round((tc / goal) * 100));
  const days = studyDays(); const rests = new Set(walkStreak().rests); const strip = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d; });
  const wk = "日月火水木金土";
  const answered = Object.keys(st.r).length;
  render(`
    <section class="card hero" aria-labelledby="na-t">
      <div class="hero-ring" aria-hidden="true"></div>
      <div class="eyebrow">${esc(na.eyebrow)}</div>
      <h2 id="na-t">${esc(na.title)}</h2>
      <p>${esc(na.sub)}</p>
      <a class="go press" href="${na.href}"><span>${esc(na.go)}</span>${I.chev}</a>
    </section>
    ${nextLesson && !inSess ? `<div class="lesson-prog" aria-label="レッスンの進み具合"><div class="bar"><i style="width:${(readN / lessonN) * 100}%"></i></div><span class="cap num">レッスン ${readN}/${lessonN}本</span></div>` : ""}
    ${nextLesson && due > 0 && !inSess ? `<a class="mini-link" href="#/quiz/review">${I.redo}復習が${due}問あります（先に${Math.min(due, SET_SIZE)}問だけ解く）</a>` : todayCount(S.exam) === 0 ? `<a class="mini-link" href="#/quiz/one">${I.bolt}忙しい日は 1問だけ（約30秒）</a>` : ""}

    <section class="card today" style="margin-top:16px" aria-label="今日の学習">
      <div class="ring" style="--p:${p}"><div><b class="num">${tc}</b><span class="cap">/${goal}問</span></div></div>
      <div>
        <div class="row" style="justify-content:space-between;align-items:baseline"><b style="color:var(--navy)">今日の目標</b><span class="cap num" style="white-space:nowrap">連続 <b style="color:var(--orange);font-size:17px">${streak()}</b> 日</span></div><div class="cap" style="margin-top:-2px">全資格の合計・週1日までは休んでも連続が切れません</div>
        <div class="strip">${strip.map((d) => `<div><span class="dot ${days.has(dayKey(d)) ? "on" : rests.has(dayKey(d)) ? "rest" : ""} ${dayKey(d) === dayKey() ? "today" : ""}" ${rests.has(dayKey(d)) ? 'title="休息日"' : ""}>${days.has(dayKey(d)) ? I.check.replace('width="20" height="20"', 'width="14" height="14"') : rests.has(dayKey(d)) ? "休" : ""}</span>${wk[d.getDay()]}</div>`).join("")}</div>
      </div>
    </section>

    ${TRAIN_EXAMS.includes(e.key) ? `<a class="card press row" href="#/train" style="margin-top:16px;border:1.5px solid var(--orange)">
      <span class="ic ic-orange" style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center;flex:none">${I.bolt}</span>
      <div style="flex:1;min-width:0"><b style="color:var(--navy)">操作トレーニング</b><div class="cap">画面と同じ手順で作って、自動で採点</div></div>${I.chev}</a>` : ""}

    <h2 class="h-sec">ほかの学び方</h2>
    <div class="grid2 wide">
      <a class="card press qa" href="#/lessons"><span class="ic ic-green">${I.book}</span><b>レッスン一覧</b><small>${st.lessons.length}/${D.lessons.length} 本読了</small></a>
      <a class="card press qa" href="#/quiz/review"><span class="ic ic-red">${I.redo}</span><b>復習 ${due ? `<span class="badge">${due}</span>` : ""}</b><small>${due ? "期限の来た問題" : "今日の復習はありません"}</small></a>
      <a class="card press qa" href="#/practice"><span class="ic ic-blue">${I.pencil}</span><b>分野をえらぶ</b><small>苦手な分野だけ5問</small></a>
      <a class="card press qa" href="#/listen"><span class="ic ic-orange">${I.head}</span><b>聞き流し</b><small>読み上げで1問ずつ</small></a>
    </div>

    <h2 class="h-sec">${esc(e.examShortName)}の進み具合</h2>
    <section class="card" style="padding-top:4px;padding-bottom:4px">
      ${e.domains.map((d) => { const qs = D.qs.filter((q) => q.domain === d.id); const seen = qs.filter((q) => st.r[q.id]).length; const ok = qs.filter((q) => st.r[q.id]?.[0] === 1).length;
        const dl = D.lessons.filter((l) => l.domain === d.id), dr = dl.filter((l) => st.lessons.includes(l.id)).length, nl = nextLessonOf(D, st, d.id);
        const href = dl.length ? (nl ? `#/lesson/${nl.id}` : `#/lessons/${d.id}`) : `#/quiz/d/${d.id}`;
        return `<a class="dom press" href="${href}"><div><b style="font-size:15px">${esc(d.title)}</b><div class="bar"><i style="width:${qs.length ? (ok / qs.length) * 100 : 0}%"></i></div></div><span class="cap num">${dl.length ? `レッスン${dr}/${dl.length}` : `${seen}/${qs.length}`}</span>${I.chev.replace('class=""', "")}</a>`; }).join("")}
    </section>

    ${e.applyUrl ? `<a class="card press row apply" href="${esc(e.applyUrl)}" target="_blank" rel="noopener noreferrer" style="margin-top:16px">
      <span class="ic ic-blue" style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center;flex:none">${I.cal}</span>
      <div style="flex:1;min-width:0"><b style="color:var(--navy)">${esc(e.applyTitle || "受験の申し込み")}</b><div class="cap">${esc(e.applyLabel || "公式サイトで申し込む")}（別タブで開きます）</div></div>${I.chev}</a>` : ""}

    <section class="card" style="margin-top:16px;display:flex;gap:12px;align-items:flex-start">
      <span class="ic ic-blue" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;flex:none">${I.dl}</span>
      <div style="flex:1"><b style="color:var(--navy);font-size:15px">記録はこのブラウザだけに保存されます</b>
      <p class="cap" style="margin:2px 0 10px">ほかの端末とは同期しません。ブラウザのデータを消すと記録も消えます。ときどき書き出しておくと安心です。</p>
      <div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn btn-secondary btn-sm" id="exp">${I.dl}記録を書き出す</button><a class="btn btn-ghost btn-sm" href="#/settings">設定・読み込み</a></div></div>
    </section>
    <p class="foot">${esc(e.organizerNotice || "")}<br>累計 ${answered} 問に回答・全${D.qs.length}問</p>`);
  $("#exp").addEventListener("click", exportData);
}

/* ---------- 演習メニュー ---------- */
async function viewPractice() {
  topbar(); tabbar("practice");
  const e = examInfo(); const D = await examData(S.exam); const st = exState();
  const favN = st.fav.length, due = dueIds().length;
  const wrongN = Object.values(st.r).filter((r) => r[0] === 0).length;
  render(`
    <h1 class="h-title" style="margin:4px 0 16px">演習</h1>
    <div class="stack">
      <a class="card press row" href="#/quiz/mix"><span class="ic ic-orange" style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center">${I.shuffle}</span><div style="flex:1"><b style="color:var(--navy)">ミックス5問</b><div class="cap">未出題を中心に全分野から・約3分</div></div>${I.chev}</a>
      <a class="card press row" href="#/quiz/review"><span class="ic ic-red" style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center">${I.redo}</span><div style="flex:1"><b style="color:var(--navy)">復習</b><div class="cap">${due ? `期限の来た問題 ${due}問` : "今日の復習はありません"}</div></div>${I.chev}</a>
      <a class="card press row" href="#/quiz/wrong"><span class="ic ic-red" style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center">${I.x}</span><div style="flex:1"><b style="color:var(--navy)">最後に間違えた問題</b><div class="cap">${wrongN}問</div></div>${I.chev}</a>
      <a class="card press row" href="#/quiz/fav"><span class="ic ic-orange" style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center">${I.star}</span><div style="flex:1"><b style="color:var(--navy)">お気に入り</b><div class="cap">${favN}問</div></div>${I.chev}</a>
    </div>
    <h2 class="h-sec">分野をえらんで5問</h2>
    <section class="card" style="padding-top:4px;padding-bottom:4px">
      ${e.domains.map((d) => { const qs = D.qs.filter((q) => q.domain === d.id); const ok = qs.filter((q) => st.r[q.id]?.[0] === 1).length;
        return `<a class="dom press" href="#/quiz/d/${d.id}"><div><b style="font-size:15px">${esc(d.title)}</b><div class="bar"><i style="width:${qs.length ? (ok / qs.length) * 100 : 0}%"></i></div></div><span class="cap num">${Math.round(qs.length ? (ok / qs.length) * 100 : 0)}%</span>${I.chev}</a>`; }).join("")}
    </section>
    <p class="cap" style="margin-top:12px">パソコンでは、数字キー（1〜4）で選ぶ・Enterで答え合わせ／次へ・Hでヒント・Cで自信なし、が使えます。</p>`);
}

/* ---------- 演習 ---------- */
let Q = null; // 進行中の演習
async function viewQuiz(mode, arg) {
  const D = await examData(S.exam); const st = exState();
  let ids, title;
  if (mode === "resume" && st.sess) { ids = st.sess.ids; title = st.sess.title; }
  else if (mode === "review") { ids = dueIds().slice(0, SET_SIZE); title = "復習"; }
  else if (mode === "wrong") { ids = shuffle(Object.entries(st.r).filter(([, r]) => r[0] === 0).map(([id]) => id)).slice(0, SET_SIZE); title = "間違えた問題"; }
  else if (mode === "fav") { ids = shuffle(st.fav).slice(0, SET_SIZE); title = "お気に入り"; }
  else if (mode === "one") { ids = pickMix(D, 1).map((q) => q.id); title = "1問だけ"; }
  else if (mode === "d") { ids = pickMix(D, SET_SIZE, arg).map((q) => q.id); title = domainInfo(arg)?.title || "分野別"; }
  else if (mode === "lesson") { const l = D.lessons.find((x) => x.id === arg); ids = shuffle((l?.quizIds || []).filter((id) => D.byId.has(id))).slice(0, SET_SIZE); title = l?.title || "レッスンの確認"; }
  else if (mode === "two") { ids = pickMix(D, 2, arg || undefined).map((q) => q.id); title = "あと2問"; }
  else if (mode === "ids") { ids = arg.split(",").filter((id) => D.byId.has(id)); title = "もう一度"; }
  else { ids = pickMix(D, SET_SIZE).map((q) => q.id); title = "ミックス"; }
  ids = (ids || []).filter((id) => D.byId.has(id));
  topbar("back", "#/home", title); tabbar("practice");
  if (!ids.length) {
    const ec = mode === "review" ? ["いま復習する問題はありません", "間違えた問題や「自信なし」にした問題が、日をおいてここに出てきます。今日は新しい問題に進みましょう。"]
      : mode === "fav" ? ["お気に入りはまだありません", "問題の画面で「お気に入り」を押すと、あとで見返したい問題がここに集まります。"]
      : ["出せる問題がありません", "ほかのメニューから始めてみましょう。"];
    render(`<div class="empty"><img class="empty-art" src="empty.png" srcset="empty.png 1x, empty@2x.png 2x" width="150" height="136" alt=""><p style="font-weight:700;color:var(--navy)">${ec[0]}</p><p class="cap">${ec[1]}</p><a class="btn btn-primary" href="#/quiz/mix" style="margin-top:12px">ミックス5問を始める</a></div>`);
    return;
  }
  const resume = mode === "resume" && st.sess;
  Q = { D, ids, title, i: resume ? st.sess.i : 0, results: resume ? st.sess.results || {} : {}, sel: new Set(), submitted: false, hint: 0, usedHint: false, unsure: false, mode };
  saveSess(); drawQ();
}
function saveSess() {
  const st = exState();
  if (!Q || Q.ids.length < 3 || Q.mode === "one" || Q.mode === "two") return;
  st.sess = Q.i >= Q.ids.length ? null : { ids: Q.ids, i: Q.i, title: Q.title, results: Q.results };
  save();
}
function drawQ() {
  const q = Q.D.byId.get(Q.ids[Q.i]); const n = Q.ids.length; const multi = q.correctAnswers.length > 1;
  const elim = Q.hint >= 2 ? eliminate(q) : [];
  const ok = Q.submitted && q.correctAnswers.length === Q.sel.size && q.correctAnswers.every((i) => Q.sel.has(i));
  const left = n - Q.i - (Q.submitted ? 1 : 0);
  const fav = exState().fav.includes(q.id);
  render(`
    <div class="qhead"><span class="cap num" style="font-weight:800;color:var(--navy)">${Q.i + 1} / ${n}</span><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${Q.i + (Q.submitted ? 1 : 0)}"><i style="width:${((Q.i + (Q.submitted ? 1 : 0)) / n) * 100}%"></i></div><span class="cap">${left > 0 ? `残り約${Math.max(1, Math.round(left * 0.6))}分` : "あと少し"}</span></div>
    <div class="row" style="gap:6px;flex-wrap:wrap"><span class="tag">${esc(domainInfo(q.domain)?.shortTitle || "")}</span>${multi ? `<span class="tag orange">${q.correctAnswers.length}つ選ぶ</span>` : ""}</div>
    <p class="qtext">${esc(q.question)}</p>
    <div role="group" aria-label="選択肢">
    ${q.choices.map((c, i) => {
      let cls = "";
      if (Q.submitted) { if (q.correctAnswers.includes(i)) cls = "ok"; else if (Q.sel.has(i)) cls = "ng"; }
      else if (elim.includes(i)) cls = "dim";
      return `<button class="choice ${cls}" data-i="${i}" aria-pressed="${Q.sel.has(i)}" ${Q.submitted || elim.includes(i) ? "disabled" : ""}><span class="mk">${Q.submitted && q.correctAnswers.includes(i) ? I.check.replace(/width="20" height="20"/, 'width="16" height="16"') : Q.submitted && Q.sel.has(i) ? I.x.replace(/width="20" height="20"/, 'width="16" height="16"') : i + 1}</span><span>${esc(c)}</span></button>`;
    }).join("")}
    </div>
    ${!Q.submitted && Q.hint >= 1 ? `<div class="hint"><b>${I.bulb} ヒント</b><br>${esc(hintText(q))}${Q.hint >= 2 && elim.length ? `<br><span class="cap">ちがう選択肢を${elim.length}つ薄くしました。</span>` : ""}</div>` : ""}
    ${Q.submitted ? `
      <section class="card result" aria-live="polite">
        <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h3 class="${ok ? "ok" : "ng"}">${ok ? I.check : I.x}${ok ? "正解" : "不正解"}${Q.usedHint ? ' <span class="tag orange">ヒント使用</span>' : ""}</h3>
          <button class="pill-btn fav" id="fav" aria-pressed="${fav}">${fav ? I.starF : I.star}お気に入り</button>
        </div>
        ${ok && !Q.usedHint ? `<div style="margin:10px 0 4px"><button class="pill-btn" id="unsure" aria-pressed="${Q.unsure}">${Q.unsure ? I.check : I.q}${Q.unsure ? "明日の復習に入れました" : "自信なし（明日もう一度出す）"}</button></div>` : ""}
        ${ok && Q.usedHint ? `<p class="cap" style="margin:6px 0 0">ヒントを使ったので、この問題は復習に残します。</p>` : ""}
        ${!ok ? `<p class="cap" style="margin:6px 0 0">この問題は復習に入りました。</p>` : ""}
        <hr style="border:none;border-top:1px solid var(--line);margin:12px 0">
        <b style="color:var(--navy);font-size:14px">解説</b>
        <p class="exp" style="margin:4px 0 0">${esc(q.explanation)}</p>
        ${q.wrongChoiceExplanations && Object.keys(q.wrongChoiceExplanations).length ? `<ul class="wrong-list">${Object.entries(q.wrongChoiceExplanations).map(([i, t]) => `<li><b>${Number(i) + 1}</b><span>${esc(t)}</span></li>`).join("")}</ul>` : ""}
        ${q.beginnerNote ? `<div class="note"><b>${I.bulb} ひとこと</b><br>${esc(q.beginnerNote)}</div>` : ""}
      </section>` : ""}
    <div class="sticky-act">
      ${Q.submitted
        ? `<button class="btn btn-cta btn-block" id="next">${Q.i + 1 >= n ? "結果を見る" : "次の問題へ"} ${I.chev}</button>`
        : `<button class="btn btn-secondary" id="hint" ${Q.hint >= 2 || (Q.hint >= 1 && !eliminate(q).length) ? "disabled" : ""}>${I.bulb}${Q.hint === 0 ? "ヒント" : "しぼり込む"}</button>
           <button class="btn btn-primary btn-block" id="submit" ${Q.sel.size === 0 ? "disabled" : ""}>答え合わせ</button>`}
    </div>`);
  $("#main").querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => choose(Number(b.dataset.i))));
  $("#submit")?.addEventListener("click", submit);
  $("#hint")?.addEventListener("click", hint);
  $("#next")?.addEventListener("click", nextQ);
  $("#fav")?.addEventListener("click", () => { const st = exState(); st.fav = st.fav.includes(q.id) ? st.fav.filter((x) => x !== q.id) : [...st.fav, q.id]; save(); vibrate(); drawQ(); });
  $("#unsure")?.addEventListener("click", () => { if (Q.unsure) return; markUnsure(q); Q.unsure = true; vibrate(); toast("明日の復習に入れました"); drawQ(); });
  if (Q.submitted) $("#next")?.focus({ preventScroll: true });
}
function choose(i) {
  if (!Q || Q.submitted) return;
  const q = Q.D.byId.get(Q.ids[Q.i]); if (i >= q.choices.length) return;
  if (Q.hint >= 2 && eliminate(q).includes(i)) return;
  if (q.correctAnswers.length > 1) { Q.sel.has(i) ? Q.sel.delete(i) : Q.sel.add(i); }
  else Q.sel = new Set([i]);
  vibrate(); drawQ();
}
function submit() {
  if (!Q || Q.submitted || !Q.sel.size) return;
  const q = Q.D.byId.get(Q.ids[Q.i]);
  const ok = q.correctAnswers.length === Q.sel.size && q.correctAnswers.every((i) => Q.sel.has(i));
  Q.submitted = true; Q.results[Q.i] = ok;
  recordAnswer(q, ok, Q.usedHint);
  vibrate(); drawQ();
  $(".result")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
}
function hint() {
  if (!Q || Q.submitted) return;
  const q = Q.D.byId.get(Q.ids[Q.i]);
  if (Q.hint === 0) Q.hint = 1; else if (Q.hint === 1 && eliminate(q).length) { Q.hint = 2; Q.sel = new Set([...Q.sel].filter((i) => !eliminate(q).includes(i))); }
  Q.usedHint = true; drawQ();
}
function nextQ() {
  if (!Q || !Q.submitted) return;
  Q.i++; Q.sel = new Set(); Q.submitted = false; Q.hint = 0; Q.usedHint = false; Q.unsure = false;
  saveSess();
  if (Q.i >= Q.ids.length) return drawDone();
  drawQ();
}
function drawDone() {
  const n = Q.ids.length, okN = Object.values(Q.results).filter(Boolean).length;
  const missed = Q.ids.filter((_, i) => Q.results[i] === false);
  const tc = todayCount(), goal = S.set.goal;
  const st = exState(); st.sess = null; save();
  const nl = nextLessonOf(Q.D, st);
  render(`
    <section class="card done">
      <img class="done-img" src="done.png" srcset="done.png 1x, done@2x.png 2x" width="150" height="155" alt="">
      <p class="cap" style="margin:0;font-weight:800;letter-spacing:.06em">1区切り完了</p>
      <div class="big num" style="margin:6px 0">${okN}<span style="font-size:22px;color:var(--sub)"> / ${n} 問正解</span></div>
      <p class="muted" style="margin:0">${okN === n ? "全問正解。この調子です。" : missed.length ? `間違えた${missed.length}問は復習に入れました。明日またどうぞ。` : "おつかれさまでした。"}</p>
      <p class="cap" style="margin:10px 0 0">今日は全資格で ${tc}問（目標 ${goal}問）・連続 ${streak()}日</p>
    </section>
    <div class="stack" style="margin-top:16px">
      ${missed.length ? `<a class="btn btn-cta btn-block" href="#/quiz/ids/${missed.join(",")}">間違えた${missed.length}問をもう一度</a>` : ""}
      ${nl ? `<a class="btn ${missed.length ? "btn-secondary" : "btn-cta"} btn-block" href="#/lesson/${nl.id}">次のレッスンへ：${esc(nl.title)}</a>` : `<a class="btn ${missed.length ? "btn-secondary" : "btn-cta"} btn-block" href="#/quiz/${Q.mode === "d" ? "d/" + Q.D.byId.get(Q.ids[0]).domain : "mix"}?n=2" data-two>あと2問だけ（約1分）</a>`}
      <a class="btn btn-ghost btn-block" href="#/home">今日はここまで</a>
    </div>`);
  topbar("back", "#/home", "結果");
}

/* ---------- レッスン ---------- */
async function viewLessons(focus) {
  topbar("back", "#/home", "レッスン"); tabbar("lessons");
  const e = examInfo(); const D = await examData(S.exam); const st = exState();
  if (!D.lessons.length) return render(`<div class="empty">${I.inbox}<p>この資格のレッスンはまだありません。</p></div>`);
  const nx = nextLessonOf(D, st);
  const head = `<h1 class="h-title" style="margin:4px 0 4px">レッスン</h1><p class="cap" style="margin:0 0 12px">上から順に読むと、試験範囲をひと通り学べます。各レッスンのあとに確認問題があります。</p>
    <div class="lesson-prog" style="margin:0 0 16px"><div class="bar"><i style="width:${D.lessons.length ? (st.lessons.length / D.lessons.length) * 100 : 0}%"></i></div><span class="cap num">${st.lessons.length}/${D.lessons.length}本 読了</span></div>
    ${nx ? `<a class="card press hero-next" href="#/lesson/${nx.id}"><span class="eyebrow">次はここ</span><b>${esc(nx.title)}</b><span class="cap">${esc(domainInfo(nx.domain)?.shortTitle || "")}・約${nx.estimatedMinutes || 5}分</span><span class="go"><span>読む</span>${I.chev}</span></a>` : `<div class="note">全レッスンを読み終えました。あとは演習と復習で仕上げましょう。</div>`}`;
  render(head + e.domains.map((d) => { const ls = D.lessons.filter((l) => l.domain === d.id); if (!ls.length) return "";
    return `<h2 class="h-sec" id="dom-${d.id}">${esc(d.title)}</h2><div class="stack">${ls.map((l) => `<a class="card press row" href="#/lesson/${l.id}"><div style="flex:1;min-width:0"><b style="color:var(--navy)">${esc(l.title)}</b><div class="cap">約${l.estimatedMinutes || 5}分 ${st.lessons.includes(l.id) ? '<span class="done-mark">・読了</span>' : nx && l.id === nx.id ? '<span class="next-mark">・次はここ</span>' : ""}</div></div>${I.chev}</a>`).join("")}</div>`; }).join(""));
  if (focus) document.getElementById(`dom-${focus}`)?.scrollIntoView({ block: "start" });
}
async function viewLesson(id) {
  const D = await examData(S.exam); const l = D.lessons.find((x) => x.id === id); const st = exState();
  topbar("back", "#/lessons", "レッスン"); tabbar("lessons");
  if (!l) return render(`<div class="empty"><p>レッスンが見つかりません。</p><a class="btn btn-secondary" href="#/lessons">一覧へ</a></div>`);
  const qn = (l.quizIds || []).filter((x) => D.byId.has(x)).length;
  render(`<article class="lesson">
      <span class="tag">${esc(domainInfo(l.domain)?.shortTitle || "")}・約${l.estimatedMinutes || 5}分</span>
      <h1 class="h-title" style="margin:10px 0 8px">${esc(l.title)}</h1>
      ${l.summary ? `<div class="note" style="margin:0 0 8px"><b>要点</b><br>${esc(l.summary)}</div>` : ""}
      ${(l.sections || []).map((s) => `<h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p>`).join("")}
    </article>
    <div class="stack" style="margin-top:24px">
      ${qn ? `<a class="btn btn-cta btn-block" href="#/quiz/lesson/${l.id}" id="lq">読んだ内容を${Math.min(qn, SET_SIZE)}問で確かめる</a>` : ""}
      <button class="btn btn-secondary btn-block" id="lm">${st.lessons.includes(l.id) ? "読了を取り消す" : "読了にする"}</button>
      ${(() => { const nl = D.lessons[D.lessons.indexOf(l) + 1]; return nl ? `<a class="btn btn-ghost btn-block" href="#/lesson/${nl.id}" id="ln">次のレッスン：${esc(nl.title)}</a>` : ""; })()}
    </div>`);
  const mark = () => { if (!st.lessons.includes(l.id)) { st.lessons.push(l.id); const d = (S.days[dayKey()] ||= {}); d._l = (d._l || 0) + 1; save(); } };
  $("#lq")?.addEventListener("click", mark);
  $("#ln")?.addEventListener("click", mark);
  $("#lm").addEventListener("click", () => { if (st.lessons.includes(l.id)) { st.lessons = st.lessons.filter((x) => x !== l.id); save(); } else mark(); viewLesson(id); toast("保存しました"); });
}

/* ---------- 操作トレーニング（train.js を必要なときだけ読む） ---------- */
const TRAIN_EXAMS = ["dify", "wia"];
const TRAIN_MOD = { dify: ["./train.js?v=3", "Dify"], wia: ["./train_wa.js?v=1", "WinActor"] };
async function viewTrain(id) {
  const e = examInfo();
  if (!TRAIN_EXAMS.includes(e.key)) return go("#/home");
  const [modPath, tool] = TRAIN_MOD[e.key]; const m = await import(modPath);
  if (!id) {
    topbar("back", "#/home", "操作トレーニング"); tabbar("practice");
    const ts = m.taskList();
    return render(`<h1 class="h-title" style="margin:4px 0 4px">操作トレーニング</h1>
      <p class="cap" style="margin:0 0 16px">${tool === "Dify" ? "Difyのワークフロー編集画面と同じ配置・用語・手順で、ブロックを置いてつなぎ、設定して、テスト実行で自動採点します。" : "WinActorのシナリオ編集と同じ考え方（開始から終了へ上から下に並べる・パレット・プロパティ・変数一覧）で組み立て、実行で自動採点します。"}本物の画面の画像は使っていない練習用の画面です。</p>
      <div class="stack">${ts.map((t, i) => `<a class="card press row" href="#/train/${t.id}"><span class="ic ${t.done ? "ic-green" : "ic-blue"}" style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center;flex:none">${t.done ? I.check : `<b>${i + 1}</b>`}</span><div style="flex:1;min-width:0"><b style="color:var(--navy)">${esc(t.title)}</b><div class="cap">${t.app === "workflow" ? "Workflow" : t.app === "chatflow" ? "Chatflow" : esc(t.app)}・${esc(t.goal)}</div></div>${I.chev}</a>`).join("")}</div>
      ${tool === "Dify" ? `<p class="cap" style="margin-top:16px">スマホでは、ブロックの右の丸をタップ → つなぎ先のブロックをタップ、でつなげます。ブロックはドラッグで動かせます。</p>` : `<p class="cap" style="margin-top:16px">フローチャートの「＋」をタップして、そこに置くノードをパレットから選びます。</p>`}`);
  }
  topbar("back", "#/train", "操作トレーニング"); tabbar("practice");
  render(`<div id="trroot"></div>`);
  m.mount($("#trroot"), id);
}

/* ---------- 記録（カレンダー） ---------- */
let calScope = "all", calMonth = null, calSel = null;
function viewRecord() {
  topbar(); tabbar("record");
  const now = new Date(); calMonth ||= new Date(now.getFullYear(), now.getMonth(), 1); calSel ||= dayKey();
  const y = calMonth.getFullYear(), m = calMonth.getMonth();
  const count = (k) => { const d = S.days[k] || {}; return calScope === "all" ? Object.entries(d).filter(([x]) => x !== "_l").reduce((a, [, v]) => a + v, 0) + (d._l || 0) : d[S.exam] || 0; };
  const first = new Date(y, m, 1).getDay(), last = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first)].map(() => "<span></span>").concat([...Array(last)].map((_, i) => {
    const k = dayKey(new Date(y, m, i + 1)), c = count(k); const lv = c === 0 ? "" : c < 5 ? "l1" : c < 15 ? "l2" : "l3";
    return `<button class="${lv} ${k === dayKey() ? "today" : ""}" data-d="${k}" aria-pressed="${k === calSel}" aria-label="${m + 1}月${i + 1}日 ${c}問">${i + 1}</button>`;
  }));
  const sd = S.days[calSel] || {};
  const total = Object.values(S.days).reduce((a, d) => a + Object.entries(d).filter(([x]) => x !== "_l").reduce((b, [, v]) => b + v, 0), 0);
  render(`
    <h1 class="h-title" style="margin:4px 0 12px">学習の記録</h1>
    <div class="seg" role="group" aria-label="表示する範囲"><button data-s="all" aria-pressed="${calScope === "all"}">すべての資格</button><button data-s="one" aria-pressed="${calScope === "one"}">${esc(examInfo().examShortName)}</button></div>
    <section class="card stats3" style="margin-top:12px"><div><b class="num">${streak()}</b><span class="cap">連続日数</span></div><div><b class="num">${longest()}</b><span class="cap">最長</span></div><div><b class="num">${total}</b><span class="cap">累計（問）</span></div></section>
    <section class="card" style="margin-top:12px">
      <div class="row" style="justify-content:space-between;margin-bottom:8px">
        <button class="icon-btn" style="background:var(--card2);color:var(--navy)" id="pm" aria-label="前の月">${I.back}</button>
        <b style="color:var(--navy)">${y}年${m + 1}月</b>
        <button class="icon-btn" style="background:var(--card2);color:var(--navy);transform:scaleX(-1)" id="nm" aria-label="次の月">${I.back}</button>
      </div>
      <div class="cal">${[..."日月火水木金土"].map((w) => `<span class="wd">${w}</span>`).join("")}${cells.join("")}</div>
      <p class="cap" style="margin:8px 0 0">日付を押すと、その日の内訳が下に出ます。</p>
    </section>
    <section class="card" style="margin-top:12px">
      <b style="color:var(--navy)">${calSel.replace(/^(\d+)-0?(\d+)-0?(\d+)$/, "$2月$3日")}の学習</b>
      ${Object.keys(sd).length ? `<div style="margin-top:6px">${Object.entries(sd).map(([k, v]) => `<div class="setting"><span>${k === "_l" ? "レッスン" : esc(examInfo(k)?.examShortName || k)}</span><b class="num">${v}${k === "_l" ? "本" : "問"}</b></div>`).join("")}</div>` : `<p class="cap" style="margin:6px 0 0">この日の記録はありません。</p>`}
    </section>
    <div class="row" style="margin-top:16px;gap:8px;flex-wrap:wrap"><button class="btn btn-secondary btn-sm" id="exp">${I.dl}記録を書き出す</button><a class="btn btn-ghost btn-sm" href="#/settings">${I.gear}設定</a></div>`);
  $("#main").querySelectorAll("[data-s]").forEach((b) => b.addEventListener("click", () => { calScope = b.dataset.s; viewRecord(); }));
  $("#main").querySelectorAll("[data-d]").forEach((b) => b.addEventListener("click", () => { calSel = b.dataset.d; viewRecord(); }));
  $("#pm").addEventListener("click", () => { calMonth = new Date(y, m - 1, 1); viewRecord(); });
  $("#nm").addEventListener("click", () => { calMonth = new Date(y, m + 1, 1); viewRecord(); });
  $("#exp").addEventListener("click", exportData);
}

/* ---------- 設定・書き出し ---------- */
function exportData() {
  const blob = new Blob([JSON.stringify({ app: "shikakunote-web", format: 1, exportedAt: new Date().toISOString(), data: S })], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `shikakunote-${dayKey()}.json`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast("記録を書き出しました");
}
function viewSettings() {
  topbar("back", "#/home", "設定"); tabbar("record");
  render(`
    <section class="card">
      <div class="setting"><label for="goal">1日の目標（問）</label><select id="goal" style="font:inherit;padding:6px 10px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink)">${[5, 10, 15, 20, 30].map((n) => `<option ${S.set.goal === n ? "selected" : ""}>${n}</option>`).join("")}</select></div>
    </section>
    <h2 class="h-sec">ホーム画面に追加</h2>
    <section class="card"><p class="cap" style="margin:0">iPhoneはSafariの共有ボタン→「ホーム画面に追加」、Androidはメニュー→「ホーム画面に追加」で、アプリのように開けます。記録が消えにくくなり、一度開いた資格は電波がなくても使えます。</p></section>
    <h2 class="h-sec">記録の書き出し・読み込み</h2>
    <section class="card stack">
      <p class="cap" style="margin:0">記録はこのブラウザにだけ保存されています。別の端末やブラウザに移すときは、書き出したファイルを読み込んでください（読み込むと今の記録は置きかわります）。</p>
      <button class="btn btn-secondary" id="exp">${I.dl}記録を書き出す</button>
      <label class="btn btn-secondary" style="cursor:pointer">ファイルから読み込む<input type="file" accept="application/json,.json" id="imp" hidden></label>
    </section>
    <h2 class="h-sec">リセット</h2>
    <section class="card stack">
      <button class="btn btn-ghost" id="rs1" style="color:var(--red)">${esc(examInfo()?.examShortName || "")}の記録だけ消す</button>
      <button class="btn btn-ghost" id="rs2" style="color:var(--red)">すべての記録を消す</button>
    </section>
    <p class="foot">資格note Web（試験運用版）。問題・解説はすべてオリジナルです。誤りに気づいたら iPhone版のサポートページからお知らせください。<br><a href="../">資格note サポートページ</a>・<a href="../privacy/">プライバシーポリシー</a></p>`);
  $("#goal").addEventListener("change", (e) => { S.set.goal = Number(e.target.value); save(); toast("保存しました"); });
  $("#exp").addEventListener("click", exportData);
  $("#imp").addEventListener("change", async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    try {
      const j = JSON.parse(await f.text());
      if (j?.app !== "shikakunote-web" || j?.data?.v !== 1 || typeof j.data.ex !== "object") throw new Error("形式");
      S = Object.assign(blank(), j.data, { set: Object.assign(blank().set, j.data.set) }); save(); toast("記録を読み込みました"); go("#/home");
    } catch { toast("このファイルは読み込めませんでした"); }
  });
  const twoStep = (btn, label, fn) => { let armed = false; btn.addEventListener("click", () => { if (!armed) { armed = true; btn.textContent = `もう一度押すと${label}（元に戻せません）`; setTimeout(() => { armed = false; viewSettings(); }, 4000); return; } fn(); }); };
  twoStep($("#rs1"), "消えます", () => { delete S.ex[S.exam]; Object.values(S.days).forEach((d) => delete d[S.exam]); save(); toast("消しました"); go("#/home"); });
  twoStep($("#rs2"), "すべて消えます", () => { S = blank(); save(); toast("すべて消しました"); go("#/pick"); });
}

/* ---------- 聞き流し（ブラウザの読み上げ） ---------- */
const canSpeak = "speechSynthesis" in window;
async function viewListen() {
  topbar(); tabbar("listen");
  const e = examInfo(); const D = await examData(S.exam); const st = exState();
  const vidx = await voiceIndex(); const voiced = S.set.voice !== false && vidx?.[S.exam]?.length;
  const done = JSON.parse(localStorage.getItem("shikakunote.listen." + S.exam) || "{}");
  const chapters = [];
  chapters.push({ id: "mix3", title: "ミックス 3分", sub: "全分野から5問", ic: "ic-orange" });
  chapters.push({ id: "mix10", title: "ミックス 10分", sub: "全分野から15問", ic: "ic-orange" });
  if (dueIds().length) chapters.push({ id: "review", title: "復習を聞く", sub: `期限の来た問題 ${Math.min(dueIds().length, 10)}問`, ic: "ic-red" });
  const weakN = weakIds().length;
  if (weakN) chapters.push({ id: "weak", title: "間違えた問題", sub: `${Math.min(weakN, 30)}問`, ic: "ic-red" });
  if (st.fav.length) chapters.push({ id: "fav", title: "お気に入り", sub: `${st.fav.length}問`, ic: "ic-orange" });
  const domCh = e.domains.map((d) => { const qs = D.qs.filter((q) => q.domain === d.id && listenable(q)); return { d, n: Math.ceil(qs.length / 5) }; });
  render(`
    <h1 class="h-title" style="margin:4px 0 6px">聞き流し</h1>
    <p class="cap" style="margin:0 0 12px">問題→少し考える間→答え→解説、の順に読み上げます。縦にスワイプで次の問題へ。</p>
    ${voiced ? `<div class="hint" style="border-color:var(--blue);background:var(--blue-soft)">自然な声で流れます（読み上げの設定で切り替えられます）。考える時間で止まることがあるので、画面はつけたままがおすすめです。</div>`
      : `${canSpeak ? "" : `<div class="hint">このブラウザは読み上げに対応していません。Chrome・Safari・Edgeの最新版でお試しください。</div>`}
    <div class="hint" style="border-color:var(--blue);background:var(--blue-soft)">Webでは、画面を消したりほかのアプリに切り替えたりすると読み上げが止まります。画面をつけたままお使いください。</div>`}
    ${TERMS && TERMS[S.exam]?.length ? `<a class="card press chapter" href="#/terms" style="margin-top:12px;border-color:color-mix(in srgb,var(--orange) 45%,var(--line))"><span class="ic ic-orange">${I.head.replace('width="22" height="22"', 'width="20" height="20"')}</span><div style="flex:1"><b style="color:var(--navy)">重要用語を聞く</b><div class="cap">自然な声で${TERMS[S.exam].length}語・画面を消しても続きます</div></div>${I.chev}</a>` : ""}
    <div class="stack" style="margin-top:12px">${chapters.map((c) => `<a class="card press chapter" href="#/play/${c.id}"><span class="ic ${c.ic}">${I.play.replace('width="26" height="26"', 'width="18" height="18"')}</span><div style="flex:1"><b style="color:var(--navy)">${c.title}</b><div class="cap">${c.sub}</div></div>${I.chev}</a>`).join("")}</div>
    <h2 class="h-sec">分野ごと（5問ずつ）</h2>
    <div class="stack">${domCh.map(({ d, n }) => `<details class="card"><summary>${esc(d.title)}<span class="cap">　${n}チャプター</span></summary><div class="stack" style="margin-top:10px">${[...Array(n)].map((_, i) => `<a class="row press" style="text-decoration:none;color:inherit;min-height:44px;border-top:1px solid var(--line);padding-top:8px" href="#/play/d.${d.id}.${i}"><b style="flex:1">チャプター${i + 1}</b>${done[`d.${d.id}.${i}`] ? '<span class="done-mark">聞いた</span>' : ""}${I.chev}</a>`).join("")}</div></details>`).join("")}</div>`);
}
// 耳だけで意味が通る問題か。iOS の ListeningCatalog.isListenable・音声原稿（build_scripts.py）と同じ規則
function listenable(q) {
  const t = q.question;
  const visual = ["図", "表", "下記", "次の画面", "グラフ"].some((w) => ["の", "に", "を"].some((p) => t.includes(w + p)));
  const lines = t.split("\n").filter((l) => l.trim()).length;
  return !visual && lines < 3 && t.length <= 220;
}
let L = null;
async function viewPlay(id) {
  const D = await examData(S.exam); const st = exState();
  await voiceIndex();
  let qs = D.qs.filter(listenable), title = "聞き流し";
  if (id === "mix3") { qs = shuffle(qs).slice(0, 5); title = "ミックス 3分"; }
  else if (id === "mix10") { qs = shuffle(qs).slice(0, 15); title = "ミックス 10分"; }
  else if (id === "review") { qs = dueIds().slice(0, 10).map((x) => D.byId.get(x)).filter(Boolean); title = "復習"; }
  else if (id === "fav") { qs = st.fav.map((x) => D.byId.get(x)).filter(Boolean); title = "お気に入り"; }
  else if (id === "weak") { const w = new Set(weakIds()); qs = qs.filter((q) => w.has(q.id)).slice(0, 30); title = "間違えた問題"; }
  else if (id.startsWith("d.")) { const [, dom, ix] = id.split("."); qs = qs.filter((q) => q.domain === dom).slice(Number(ix) * 5, Number(ix) * 5 + 5); title = `${domainInfo(dom)?.shortTitle || ""} ${Number(ix) + 1}`; }
  if (!qs.length) { go("#/listen"); return toast("聞ける問題がありません"); }
  stopSpeak();
  L = { id, qs, title, i: 0, playing: false, phase: "", token: 0 };
  $("#tabbar").style.display = "none";
  $("#topbar").innerHTML = "";
  render(`<div class="listen-wrap" role="dialog" aria-label="聞き流し ${esc(title)}">
    <div class="listen-top"><button class="icon-btn" id="lx" aria-label="閉じる">${I.x}</button><span class="t">${esc(title)}・<span id="lc">1</span>/${qs.length}</span><button class="icon-btn" id="ls" aria-label="読み上げの設定">${I.gear}</button></div>
    <div class="reel" id="reel">${qs.map((q, i) => `<section class="slide" data-i="${i}">
      <div class="slide-body"><span class="phase" id="ph${i}">問題</span><div class="q">${esc(q.question)}</div>
        <ol>${q.choices.map((c, j) => `<li class="${"c" + i + "-" + j}">${esc(c)}</li>`).join("")}</ol>
        <div class="ex" id="ex${i}" hidden>${esc(q.explanation)}</div></div>
      <div class="rail"><button data-fav="${q.id}" aria-pressed="${st.fav.includes(q.id)}"><span class="ib">${st.fav.includes(q.id) ? I.starF : I.star}</span>お気に入り</button>
        <button data-skip><span class="ib">${I.next.replace('width="24" height="24"', 'width="20" height="20"')}</span>答えへ</button></div>
    </section>`).join("")}</div>
    <div class="listen-bottom"><div class="lprog"><i id="lp" style="width:0%"></i></div>
      <div class="listen-ctl"><button class="icon-btn" id="lprev" aria-label="前の問題">${I.prev}</button><button class="icon-btn play" id="lplay" aria-label="再生">${I.play}</button><button class="icon-btn" id="lnext" aria-label="次の問題">${I.next}</button></div>
      <p class="swipe-hint">上にスワイプでも次の問題へ</p></div>
  </div>`);
  const reel = $("#reel");
  let scrollT;
  reel.addEventListener("scroll", () => { clearTimeout(scrollT); scrollT = setTimeout(() => { const i = Math.round(reel.scrollTop / reel.clientHeight); if (i !== L.i) { L.i = i; $("#lc").textContent = i + 1; progress(); if (L.playing) speakCurrent(); } }, 120); });
  $("#lx").addEventListener("click", () => { stopSpeak(); go("#/listen"); });
  $("#lplay").addEventListener("click", () => { L.playing ? pauseL() : (L.playing = true, speakCurrent()); playBtn(); });
  $("#lnext").addEventListener("click", () => toSlide(L.i + 1));
  $("#lprev").addEventListener("click", () => toSlide(L.i - 1));
  $("#ls").addEventListener("click", listenSheet);
  reel.querySelectorAll("[data-fav]").forEach((b) => b.addEventListener("click", () => { const id = b.dataset.fav; st.fav = st.fav.includes(id) ? st.fav.filter((x) => x !== id) : [...st.fav, id]; save(); const on = st.fav.includes(id); b.setAttribute("aria-pressed", on); b.querySelector(".ib").innerHTML = on ? I.starF : I.star; vibrate(); }));
  reel.querySelectorAll("[data-skip]").forEach((b) => b.addEventListener("click", () => { L.playing = true; playBtn(); speakCurrent(true); }));
  if ("mediaSession" in navigator) { try { navigator.mediaSession.metadata = new MediaMetadata({ title, artist: "資格note " + examInfo().examShortName }); navigator.mediaSession.setActionHandler("nexttrack", () => toSlide(L.i + 1)); navigator.mediaSession.setActionHandler("previoustrack", () => toSlide(L.i - 1)); } catch {} }
  progress();
}
function playBtn() { const b = $("#lplay"); if (b) { b.innerHTML = L.playing ? I.pause : I.play; b.setAttribute("aria-label", L.playing ? "一時停止" : "再生"); } }
function progress() { const p = $("#lp"); if (p) p.style.width = `${((L.i + 1) / L.qs.length) * 100}%`; }
function toSlide(i) { if (!L) return; if (i < 0 || i >= L.qs.length) { if (i >= L.qs.length) chapterDone(); return; } $("#reel").scrollTo({ top: i * $("#reel").clientHeight, behavior: "smooth" }); }
function stopSpeak() { if (L) L.token++; try { speechSynthesis.cancel(); } catch {} try { if (VA) { VA.pause(); VA.removeAttribute("src"); } } catch {} }

/* 自然な声の音声（Gemini TTS で作った問題ごとの mp3）。無い問題・読み込めないときは端末の読み上げに戻す */
const VOICE_BASE = "https://shikakunote-audio.beqd1106.workers.dev/";
let VIDX = null, VA = null;
async function voiceIndex() {
  if (VIDX) return VIDX;
  // 読み込めなかったときは覚えず、次に画面を開いたときにもう一度取りにいく
  try { const r = await fetch(VOICE_BASE + "index.json", { cache: "no-cache" }); if (r.ok) VIDX = await r.json(); } catch {}
  return VIDX || {};
}
function hasVoice(qid) { return S.set.voice !== false && !!VIDX?.[S.exam]?.includes?.(qid); }
// 1本を最後まで流す。戻り値：true＝流し終えた／false＝止められた／"error"＝流せなかった（呼び出し側が読み上げに切り替える）
function playClip(url, token) {
  return new Promise((res) => {
    if (!L || token !== L.token) return res(false);
    VA ||= new Audio();
    VA.preload = "auto"; VA.src = url; VA.playbackRate = S.set.rate || 1; VA.preservesPitch = true;
    let doneF = false;
    const fin = (r) => { if (doneF) return; doneF = true; VA.onended = VA.onerror = null; res(token === L?.token ? r : false); };
    VA.onended = () => fin(true); VA.onerror = () => fin("error");
    VA.play().catch((e) => fin(e?.name === "AbortError" ? false : "error"));
  });
}
function pauseL() { L.playing = false; stopSpeak(); }
function jaVoice() {
  // 自然に聞こえる声を優先（端末の高品質音声 → Google/Microsoftのニューラル音声 → 既定）
  const vs = speechSynthesis.getVoices().filter((v) => v.lang?.replace("_", "-").startsWith("ja"));
  const rank = (v) => /Premium|Enhanced|拡張|プレミアム/i.test(v.name) ? 0 : /Nanami|Keita|Natural|Online/i.test(v.name) ? 1 : /Google/i.test(v.name) ? 2 : /Kyoko|Otoya|O-ren/i.test(v.name) ? 3 : 4;
  return vs.sort((a, b) => rank(a) - rank(b))[0];
}
function say(text, token) {
  return new Promise((res) => {
    if (!L || token !== L.token) return res(false);
    const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; u.rate = S.set.rate; const v = jaVoice(); if (v) u.voice = v;
    let doneF = false; const fin = () => { if (!doneF) { doneF = true; clearTimeout(t); res(token === L?.token); } };
    u.onend = fin; u.onerror = fin;
    const t = setTimeout(fin, 4000 + text.length * 260 / S.set.rate); // onendが来ない端末向けの保険
    speechSynthesis.speak(u);
  });
}
const wait = (ms, token) => new Promise((r) => setTimeout(() => r(token === L?.token), ms));
const ORD = ["1つ目", "2つ目", "3つ目", "4つ目", "5つ目"];
// 読み上げ用に整える：記号や括弧の読み方を自然に
function spoken(s) {
  return String(s).replace(/[「」『』]/g, "").replace(/（/g, "、").replace(/）/g, "、").replace(/\s+/g, " ").replace(/、+/g, "、").replace(/、。/g, "。");
}
// 考える時間に入る合図音（iOS版と同じ2音のやわらかいチャイム）
let AC = null;
function chime() {
  try {
    AC ||= new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const t0 = AC.currentTime + 0.02;
    [[880, 0, 0.8], [1318.5, 0.09, 0.7]].forEach(([f, d, g]) => {
      const o = AC.createOscillator(), v = AC.createGain();
      o.type = "sine"; o.frequency.value = f;
      v.gain.setValueAtTime(0.0001, t0 + d);
      v.gain.exponentialRampToValueAtTime(0.12 * g, t0 + d + 0.01);
      v.gain.exponentialRampToValueAtTime(0.0001, t0 + d + 0.45);
      o.connect(v).connect(AC.destination); o.start(t0 + d); o.stop(t0 + d + 0.5);
    });
  } catch {}
}
// 最後に間違えた／自信なしにした問題（復習の期限がまだ先のものも含む）
function weakIds() { return Object.keys(exState().r).filter((id) => mastery(id) === "weak"); }
// 身につき具合：weak＝最後に間違えた／自信なし、solid＝最後に自力で正解、new＝まだ解いていない（iOS版と同じ考え方）
function mastery(qid) {
  const r = exState().r[qid]; if (!r) return "new";
  return !r[0] || r[5] ? "weak" : "solid";
}
// 答えの前に考える間（秒）。苦手は長め・身についた問題は短め。0（聞くだけ）は変えない
function thinkPause(base, m) {
  if (!(base > 0)) return 0;
  if (m === "weak") return Math.min(base * 1.5, base + 3);
  if (m === "solid") return Math.max(1, base * 0.5);
  return base;
}
async function speakCurrent(skipToAnswer = false) {
  stopSpeak(); const token = L.token; const i = L.i; const q = L.qs[i];
  const ph = (t) => { const el = $("#ph" + i); if (el) el.textContent = t; };
  // 自然な声の音声があれば、それで流す（問題＋選択肢 → 考える間 → 正解＋解説）
  if (hasVoice(q.id)) {
    const base = `${VOICE_BASE}${S.exam}/${encodeURIComponent(q.id)}`;
    let fallback = false;
    if (!skipToAnswer) {
      ph("問題");
      const r = await playClip(base + "_q.mp3", token);
      if (r === "error") fallback = true; else if (!r) return;
      if (!fallback) {
        const tp = thinkPause(S.set.pause, mastery(q.id));
        if (tp > 0) { ph("考える時間"); if (tp >= 1 && S.set.chime !== false) chime(); if (!(await wait(tp * 1000, token))) return; }
      }
    }
    if (!fallback) {
      ph("答え");
      q.correctAnswers.forEach((j) => $(`.c${i}-${j}`)?.classList.add("ans"));
      $("#ex" + i).hidden = false;
      const r = await playClip(base + "_a.mp3", token);
      if (r === true) {
        if (!(await wait(1100, token))) return;
        if (S.set.autoNext) { if (i + 1 < L.qs.length) toSlide(i + 1); else chapterDone(); }
        else { L.playing = false; playBtn(); }
        return;
      }
      if (!r) return;
      skipToAnswer = true; // 答えの音声だけ読めなかったときは、答えから読み上げで続ける
    }
  }
  if (!skipToAnswer) {
    ph("問題");
    if (!(await say(`${i === 0 ? "では、" : ""}第${i + 1}問。${spoken(q.question)}`, token))) return;
    if (!(await wait(450, token))) return;
    for (let j = 0; j < q.choices.length; j++) {
      if (!(await say(`${ORD[j] || j + 1 + "つ目"}、${spoken(q.choices[j])}`, token))) return;
      if (!(await wait(250, token))) return;
    }
    const tp = thinkPause(S.set.pause, mastery(q.id));
    if (tp > 0) { ph("考える時間"); if (tp >= 1 && S.set.chime !== false) chime(); if (!(await wait(tp * 1000, token))) return; }
  }
  ph("答え");
  q.correctAnswers.forEach((j) => $(`.c${i}-${j}`)?.classList.add("ans"));
  const ans = q.correctAnswers.map((j) => `${j + 1}番の、${spoken(q.choices[j])}`).join("と、");
  if (!(await say(`正解は、${ans}、です。`, token))) return;
  if (S.set.readEx) { ph("解説"); $("#ex" + i).hidden = false; if (!(await wait(350, token))) return; if (!(await say(spoken(q.explanation), token))) return; }
  // 聞き流しは回答記録とは分ける（演習の正答率・復習には入れない）
  if (!(await wait(1100, token))) return;
  if (S.set.autoNext) { if (i + 1 < L.qs.length) toSlide(i + 1); else chapterDone(); }
  else { L.playing = false; playBtn(); }
}
function chapterDone() {
  stopSpeak(); if (!L) return; L.playing = false; playBtn();
  const k = "shikakunote.listen." + S.exam; let m = {}; try { m = JSON.parse(localStorage.getItem(k) || "{}"); m[L.id] = 1; localStorage.setItem(k, JSON.stringify(m)); } catch {}
  const wrap = $(".listen-wrap"); if (!wrap) return;
  const sheet = document.createElement("div"); sheet.className = "listen-sheet"; sheet.setAttribute("role", "dialog");
  sheet.innerHTML = `<b style="font-size:18px">このチャプターを聞き終えました</b><p style="opacity:.75;margin:6px 0 14px;font-size:14px">${L.qs.length}問を聞きました。耳で覚えたら、5問解いて確かめましょう。</p>
    <div style="display:grid;gap:8px"><a class="btn btn-cta btn-block" href="#/quiz/ids/${L.qs.slice(0, 5).map((q) => q.id).join(",")}">今の問題を5問で解く</a><a class="btn btn-block" style="background:rgba(255,255,255,.1);color:#fff" href="#/listen">ほかのチャプターへ</a></div>`;
  wrap.appendChild(sheet);
}
function listenSheet() {
  const wrap = $(".listen-wrap"); $(".listen-sheet")?.remove();
  const s = document.createElement("div"); s.className = "listen-sheet";
  s.innerHTML = `<div class="row" style="justify-content:space-between"><b>読み上げの設定</b><button class="icon-btn" id="sx" aria-label="閉じる">${I.x}</button></div>
    <div class="setting"><label for="rate">速さ</label><select id="rate">${[0.9, 1, 1.05, 1.2, 1.4, 1.6].map((r) => `<option value="${r}" ${S.set.rate === r ? "selected" : ""}>${r}倍</option>`).join("")}</select></div>
    <div class="setting"><label for="pause">考える時間</label><select id="pause">${[0, 2, 3, 5, 8].map((r) => `<option value="${r}" ${S.set.pause === r ? "selected" : ""}>${r}秒</option>`).join("")}</select></div>
    <p class="cap" style="margin:-4px 0 8px">間違えたことのある問題は長め、正解した問題は短めに自動で調整します。</p>
    <div class="setting"><label for="chm">考える時間の合図音</label><input type="checkbox" class="switch" id="chm" ${S.set.chime !== false ? "checked" : ""}></div>
    <div class="setting"><label for="vce">自然な声で聞く</label><input type="checkbox" class="switch" id="vce" ${S.set.voice !== false ? "checked" : ""}></div>
    <p class="cap" style="margin:-4px 0 8px">オフにすると端末の読み上げになります。自然な声は解説も含めて流れます。</p>
    <div class="setting"><label for="rex">解説も読む（端末の読み上げのとき）</label><input type="checkbox" class="switch" id="rex" ${S.set.readEx ? "checked" : ""}></div>
    <div class="setting"><label for="auto">次の問題へ自動で進む</label><input type="checkbox" class="switch" id="auto" ${S.set.autoNext ? "checked" : ""}></div>`;
  wrap.appendChild(s);
  $("#sx").addEventListener("click", () => s.remove());
  $("#rate").addEventListener("change", (e) => { S.set.rate = Number(e.target.value); save(); });
  $("#pause").addEventListener("change", (e) => { S.set.pause = Number(e.target.value); save(); });
  $("#chm").addEventListener("change", (e) => { S.set.chime = e.target.checked; save(); });
  $("#vce").addEventListener("change", (e) => { S.set.voice = e.target.checked; save(); if (L?.playing) speakCurrent(); });
  $("#rex").addEventListener("change", (e) => { S.set.readEx = e.target.checked; save(); });
  $("#auto").addEventListener("change", (e) => { S.set.autoNext = e.target.checked; save(); });
}

/* ---------- 重要用語を聞く（Geminiで作った音声・audio要素で再生） ---------- */
let TERMS = null;
async function loadTerms() { if (TERMS) return TERMS; try { const r = await fetch(`audio/terms/index.json?v=${DATA_V}`); TERMS = r.ok ? await r.json() : {}; } catch { TERMS = {}; } return TERMS; }
let T = null;
async function viewTerms() {
  await loadTerms(); const list = TERMS[S.exam] || [];
  topbar("back", "#/listen", "重要用語を聞く"); tabbar("listen");
  if (!list.length) return render(`<div class="empty">${I.inbox}<p>この資格の音声はまだありません。</p></div>`);
  if (T?.audio) { T.audio.pause(); }
  const audio = new Audio(); audio.preload = "auto";
  T = { list, i: 0, audio, playing: false };
  render(`
    <p class="cap" style="margin:0 0 12px">試験直前に見直したい用語を、自然な声で1語ずつ読み上げます。続けて流れるので、移動中にもどうぞ。</p>
    <section class="card" style="position:sticky;top:64px;z-index:4">
      <div class="cap" id="tc">1 / ${list.length}</div>
      <b id="tt" style="display:block;font-size:19px;color:var(--navy);margin:2px 0 8px">${esc(list[0].term)}</b>
      <div class="progress"><i id="tp" style="width:0%"></i></div>
      <div class="row" style="justify-content:center;gap:20px;margin-top:12px">
        <button class="icon-btn" style="background:var(--card2);color:var(--navy)" id="tprev" aria-label="前の用語">${I.prev}</button>
        <button class="icon-btn" style="width:60px;height:60px;background:var(--navy);color:#fff" id="tplay" aria-label="再生">${I.play}</button>
        <button class="icon-btn" style="background:var(--card2);color:var(--navy)" id="tnext" aria-label="次の用語">${I.next}</button>
      </div>
    </section>
    <div class="stack" style="margin-top:12px">${list.map((t, i) => `<button class="card press" data-t="${i}" style="text-align:left;width:100%"><b style="color:var(--navy)">${esc(t.term)}</b><p class="cap" style="margin:4px 0 0;line-height:1.7">${esc(t.text)}</p></button>`).join("")}</div>
    <p class="foot">音声はGoogleのGemini（音声合成）で作成しています。</p>`);
  const set = (i, autoplay) => {
    T.i = Math.max(0, Math.min(list.length - 1, i));
    const t = list[T.i]; audio.src = `audio/terms/${t.file}?v=${DATA_V}`;
    $("#tc").textContent = `${T.i + 1} / ${list.length}`; $("#tt").textContent = t.term;
    $("#main").querySelectorAll("[data-t]").forEach((b) => b.style.borderColor = Number(b.dataset.t) === T.i ? "var(--orange)" : "");
    if ("mediaSession" in navigator) { try { navigator.mediaSession.metadata = new MediaMetadata({ title: t.term, artist: "資格note " + examInfo().examShortName, album: "重要用語", artwork: [{ src: "icon.png", sizes: "192x192", type: "image/png" }] }); } catch {} }
    if (autoplay) audio.play().catch(() => {});
  };
  const btn = () => { const b = $("#tplay"); if (b) { b.innerHTML = T.playing ? I.pause : I.play; b.setAttribute("aria-label", T.playing ? "一時停止" : "再生"); } };
  audio.addEventListener("play", () => { T.playing = true; btn(); });
  audio.addEventListener("pause", () => { T.playing = false; btn(); });
  audio.addEventListener("timeupdate", () => { const p = $("#tp"); if (p && audio.duration) p.style.width = `${(audio.currentTime / audio.duration) * 100}%`; });
  audio.addEventListener("ended", () => { if (T.i + 1 < list.length) setTimeout(() => set(T.i + 1, true), 700); else { T.playing = false; btn(); toast("最後まで聞きました"); } });
  audio.addEventListener("error", () => toast("音声を読み込めませんでした"));
  $("#tplay").addEventListener("click", () => { if (audio.paused) { if (!audio.src) set(T.i, false); audio.play().catch(() => toast("再生できませんでした")); } else audio.pause(); });
  $("#tnext").addEventListener("click", () => set(T.i + 1, !audio.paused || T.playing));
  $("#tprev").addEventListener("click", () => set(T.i - 1, !audio.paused || T.playing));
  $("#main").querySelectorAll("[data-t]").forEach((b) => b.addEventListener("click", () => set(Number(b.dataset.t), true)));
  if ("mediaSession" in navigator) { try { navigator.mediaSession.setActionHandler("play", () => audio.play()); navigator.mediaSession.setActionHandler("pause", () => audio.pause()); navigator.mediaSession.setActionHandler("nexttrack", () => set(T.i + 1, true)); navigator.mediaSession.setActionHandler("previoustrack", () => set(T.i - 1, true)); } catch {} }
  set(0, false);
}

/* ---------- ルーター ---------- */
async function route() {
  if (L && !location.hash.startsWith("#/play/")) { stopSpeak(); L = null; }
  if (T && !location.hash.startsWith("#/terms")) { T.audio.pause(); T = null; }
  const h = location.hash.slice(2) || "home";
  const [path, qs] = h.split("?");
  const parts = path.split("/");
  // アプリ（iOS）から「#/train/<お題>?exam=<資格>」で開かれたときは、その資格に切り替える
  const qExam = new URLSearchParams(qs || "").get("exam");
  if (qExam && EXAMS.some((x) => x.key === qExam) && S.exam !== qExam) { S.exam = qExam; S.onboarded = true; save(); }
  if (!S.exam && parts[0] !== "pick") return go("#/pick");
  try {
    switch (parts[0]) {
      case "pick": return viewPick();
      case "practice": return await viewPractice();
      case "quiz": {
        if (qs?.includes("n=2")) return await viewQuiz("two", parts[1] === "d" ? parts[2] : "");
        return await viewQuiz(parts[1] || "mix", parts.slice(2).join("/"));
      }
      case "lessons": return await viewLessons(parts[1]);
      case "lesson": return await viewLesson(parts[1]);
      case "listen": await loadTerms(); return await viewListen();
      case "terms": return await viewTerms();
      case "play": return await viewPlay(parts[1]);
      case "record": return viewRecord();
      case "settings": return viewSettings();
      case "train": return await viewTrain(parts[1]);
      default: return await viewHome();
    }
  } catch (err) {
    console.error(err);
    render(`<div class="empty">${I.inbox}<p style="font-weight:700;color:var(--navy)">読み込めませんでした</p><p class="cap">通信状態を確かめて、もう一度お試しください。</p><button class="btn btn-primary" onclick="location.reload()">再読み込み</button></div>`);
  }
}
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input,select,textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
  if (Q && location.hash.startsWith("#/quiz") && $(".qtext")) {
    if (/^[1-9]$/.test(e.key)) { choose(Number(e.key) - 1); e.preventDefault(); }
    else if (e.key === "Enter") { if (Q.submitted) nextQ(); else submit(); e.preventDefault(); }
    else if (e.key.toLowerCase() === "h") hint();
    else if (e.key.toLowerCase() === "c") $("#unsure")?.click();
  } else if (L && location.hash.startsWith("#/play/")) {
    if (e.key === " ") { $("#lplay")?.click(); e.preventDefault(); }
    else if (e.key === "ArrowDown") { toSlide(L.i + 1); e.preventDefault(); }
    else if (e.key === "ArrowUp") { toSlide(L.i - 1); e.preventDefault(); }
  }
});
window.addEventListener("hashchange", route);
document.addEventListener("visibilitychange", () => { if (document.hidden && L?.playing) { pauseL(); playBtn(); } });

if ("serviceWorker" in navigator) { window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {})); }

(async function init() {
  try { EXAMS = await getJSON("exams"); }
  catch { render(`<div class="empty"><p>データを読み込めませんでした。</p><button class="btn btn-primary" onclick="location.reload()">再読み込み</button></div>`); return; }
  if (S.exam && !examInfo()) S.exam = null;
  if (canSpeak) speechSynthesis.getVoices();
  route();
})();

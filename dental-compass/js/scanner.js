// =====================================================
// 歯科経営スキャナー v2 — 8軸 精密レーダー経営診断
// =====================================================
(function () {
  'use strict';

  // ─── 8軸 KPI 定義 ───
  const AXES = [
    {
      key: 'labor',    label: '人件費管理',     shortLabel: '人件費',
      unit: '%',      catId: 'cat-10', ideal: '40〜45%',  benchmark: 42,
      msgLow:  '人件費率が高すぎます。採用・評価制度を見直し、歯科衛生士の生産性向上が急務です。',
      msgHigh: '人件費率が低い場合、採用不足・スタッフ不足のリスクがあります。人材への投資を検討してください。',
    },
    {
      key: 'jihi',     label: '自費活用',       shortLabel: '自費',
      unit: '%',      catId: 'cat-07', ideal: '30%以上',  benchmark: 28,
      msgLow: '自費比率の向上が収益改善の最重要課題です。カウンセリング強化と高単価メニュー整備を推奨します。',
    },
    {
      key: 'recall',   label: '患者定着',       shortLabel: 'リコール',
      unit: '%',      catId: 'cat-11', ideal: '60〜80%',  benchmark: 58,
      msgLow: 'リコール率が低いと安定収益を確保できません。予約管理の仕組み化とリマインド施策を強化してください。',
    },
    {
      key: 'material', label: '材料費管理',     shortLabel: '材料費',
      unit: '%',      catId: 'cat-15', ideal: '10〜15%',  benchmark: 13,
      msgLow:  '材料費が高すぎます。在庫管理の適正化とベンダー交渉の見直しを推奨します。',
      msgHigh: '材料費が非常に低い場合、品質管理も合わせて確認してください。',
    },
    {
      key: 'profit',   label: '収益性',         shortLabel: '利益率',
      unit: '%',      catId: 'cat-15', ideal: '15〜25%',  benchmark: 17,
      msgLow: '利益率の改善が急務です。自費強化・コスト最適化・KPI管理を同時に進めましょう。',
    },
    {
      key: 'newpts',   label: '新患獲得',       shortLabel: '新患数',
      unit: '人/月',  catId: 'cat-09', ideal: '30人以上', benchmark: 30,
      msgLow: '新患数が少ないと長期的な患者基盤が弱体化します。SEO・Web集患・口コミ強化が必要です。',
    },
    {
      key: 'cancel',   label: 'キャンセル管理', shortLabel: 'キャンセル',
      unit: '%',      catId: 'cat-11', ideal: '10%以下',  benchmark: 12,
      msgLow: 'キャンセル率が高すぎます。前日リマインド・ペナルティポリシー・予約間隔の見直しが効果的です。',
    },
    {
      key: 'unit',     label: 'ユニット稼働',   shortLabel: '稼働率',
      unit: '%',      catId: 'cat-11', ideal: '80%以上',  benchmark: 72,
      msgLow: 'ユニット稼働率が低い場合、予約枠の最適化・診療時間延長・衛生士主導型予防診療の導入を検討してください。',
    },
  ];

  // ─── 精密スコア計算 ───
  function calcScore(key, val) {
    switch (key) {
      case 'labor': {
        if (val >= 40 && val <= 45) return Math.min(100, 90 + (1 - Math.abs(val - 42.5) / 2.5) * 10);
        if (val < 40) return Math.max(5, 90 - Math.pow(40 - val, 1.4) * 3.5);
        return Math.max(5, 90 - Math.pow(val - 45, 1.4) * 3.5);
      }
      case 'jihi': {
        if (val <= 0) return 5;
        if (val >= 30 && val <= 60) return Math.min(100, 70 + (val - 30) * 1.0);
        if (val > 60) return Math.min(100, 100 - (val - 60) * 0.12);
        return Math.max(5, (val / 30) * 70);
      }
      case 'recall': {
        if (val >= 60 && val <= 80) return Math.min(100, 85 + (1 - Math.abs(val - 70) / 10) * 15);
        if (val < 60) return Math.max(5, (val / 60) * 85);
        return Math.max(60, 100 - (val - 80) * 0.4);
      }
      case 'material': {
        if (val >= 10 && val <= 15) return Math.min(100, 90 + (1 - Math.abs(val - 12.5) / 2.5) * 10);
        if (val < 10) return Math.max(35, 90 - Math.pow(10 - val, 1.8) * 5);
        return Math.max(5, 90 - Math.pow(val - 15, 1.6) * 4.5);
      }
      case 'profit': {
        if (val >= 15 && val <= 25) return Math.min(100, 85 + (1 - Math.abs(val - 20) / 5) * 15);
        if (val < 15) return Math.max(5, (val / 15) * 85);
        return Math.min(100, 100 - (val - 25) * 0.3);
      }
      case 'newpts': {
        if (val <= 0) return 5;
        if (val >= 30) return Math.min(100, 75 + Math.min(25, (val - 30) * 0.8));
        return Math.max(5, (val / 30) * 75);
      }
      case 'cancel': {
        if (val <= 5) return 100;
        if (val <= 10) return Math.max(80, 100 - (val - 5) * 4);
        if (val <= 20) return Math.max(35, 80 - (val - 10) * 4.5);
        return Math.max(5, 35 - (val - 20) * 1.5);
      }
      case 'unit': {
        if (val >= 80) return Math.min(100, 85 + (val - 80) * 0.75);
        if (val >= 60) return Math.max(50, 85 - (80 - val) * 1.75);
        return Math.max(5, (val / 60) * 50);
      }
      default: return 50;
    }
  }

  function getBenchmarkScores() {
    return AXES.map(a => Math.round(calcScore(a.key, a.benchmark)));
  }

  function getMsg(axis, val) {
    if (axis.key === 'labor') {
      if (val > 50) return axis.msgLow;
      if (val < 32) return axis.msgHigh;
    }
    if (axis.key === 'material') {
      if (val > 17) return axis.msgLow;
      if (val < 7)  return axis.msgHigh;
    }
    if (axis.key === 'cancel' && val <= 10) return '';
    return axis.msgLow || '';
  }

  function getGrade(avg) {
    if (avg >= 88) return { grade: 'A+', label: '経営トップクラス',    color: '#00c9a7' };
    if (avg >= 75) return { grade: 'A',  label: '優良経営',            color: '#27ae60' };
    if (avg >= 62) return { grade: 'B+', label: '良好な状態',          color: '#3b9eca' };
    if (avg >= 50) return { grade: 'B',  label: '標準的',              color: '#c9a84c' };
    if (avg >= 38) return { grade: 'C+', label: '改善の余地あり',      color: '#e67e22' };
    return           { grade: 'C',  label: '専門家への相談を推奨', color: '#e74c3c' };
  }

  // ─── リスク評価 ───
  function getRisk(scores) {
    let pts = 0;
    const flags = [];
    if (scores.labor   < 40) { pts += 3; flags.push('人件費超過'); }
    if (scores.profit  < 30) { pts += 3; flags.push('利益率危険水域'); }
    if (scores.jihi    < 35) { pts += 2; flags.push('自費依存度低'); }
    if (scores.cancel  < 40) { pts += 2; flags.push('キャンセル多発'); }
    if (scores.recall  < 40) { pts += 2; flags.push('患者流出リスク'); }
    if (scores.newpts  < 35) { pts += 1; flags.push('新患不足傾向'); }
    if (scores.unit    < 40) { pts += 1; flags.push('稼働率低迷'); }
    if (scores.material < 30) { pts += 1; flags.push('材料費過多'); }

    if (pts >= 8) return { level: 'critical', label: '経営危機リスク', color: '#e74c3c', width: 95, flags };
    if (pts >= 5) return { level: 'high',     label: '高リスク',       color: '#e67e22', width: 70, flags };
    if (pts >= 3) return { level: 'medium',   label: '中程度のリスク', color: '#c9a84c', width: 45, flags };
    if (pts >= 1) return { level: 'low',      label: '低リスク',       color: '#27ae60', width: 20, flags };
    return          { level: 'none',   label: 'リスク良好',       color: '#00c9a7', width: 5,  flags };
  }

  // ─── レーダーチャート（業界平均リング付き） ───
  function drawRadar(canvas, rawScores, benchScores, progress) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.clientWidth  * dpr;
    const H   = canvas.clientHeight * dpr;
    canvas.width  = W;
    canvas.height = H;
    ctx.scale(dpr, dpr);

    const cW = canvas.clientWidth, cH = canvas.clientHeight;
    const cx = cW / 2, cy = cH / 2 - 4;
    const R  = Math.min(cW, cH) / 2 - 58;
    const n  = rawScores.length;

    const pt = (i, r) => {
      const a = (i * 2 * Math.PI / n) - Math.PI / 2;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    };

    ctx.clearRect(0, 0, cW, cH);

    // grid rings
    for (let lv = 1; lv <= 5; lv++) {
      const r = (R * lv) / 5;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const p = pt(i, r);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = lv === 5 ? 'rgba(0,201,167,0.18)' : 'rgba(255,255,255,0.05)';
      ctx.lineWidth   = lv === 5 ? 1.5 : 0.8;
      ctx.stroke();
      // level number
      if (lv === 2 || lv === 4 || lv === 5) {
        ctx.font      = "9px 'Noto Sans JP', sans-serif";
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.textAlign = 'center';
        ctx.fillText(lv * 20, cx + 4, cy - r + 10);
      }
    }

    // axis lines
    for (let i = 0; i < n; i++) {
      const outer = pt(i, R);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(outer.x, outer.y);
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth   = 0.8;
      ctx.stroke();
    }

    // benchmark ring (dashed amber) — fades in after progress 0.5
    if (benchScores) {
      const alpha = Math.max(0, Math.min(1, (progress - 0.45) * 3.5));
      if (alpha > 0) {
        ctx.beginPath();
        benchScores.forEach((s, i) => {
          const p = pt(i, (R * s) / 100);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.strokeStyle = `rgba(201,168,76,${alpha * 0.65})`;
        ctx.lineWidth   = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // user data (animated fill + stroke)
    const aScores = rawScores.map(s => s * progress);
    ctx.beginPath();
    aScores.forEach((s, i) => {
      const p = pt(i, (R * s) / 100);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(0,201,167,0.38)');
    grad.addColorStop(1, 'rgba(0,201,167,0.04)');
    ctx.fillStyle   = grad;
    ctx.fill();
    ctx.shadowColor = '#00c9a7';
    ctx.shadowBlur  = 10;
    ctx.strokeStyle = '#00c9a7';
    ctx.lineWidth   = 2.5;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    // data points
    aScores.forEach((s, i) => {
      const p = pt(i, (R * s) / 100);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle   = '#00c9a7';
      ctx.shadowColor = '#00c9a7';
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;
    });

    // labels
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < n; i++) {
      const p     = pt(i, R + 34);
      const score = Math.round(aScores[i]);
      ctx.font      = "10px 'Noto Sans JP', sans-serif";
      ctx.fillStyle = 'rgba(255,255,255,0.78)';
      ctx.fillText(AXES[i].shortLabel, p.x, p.y - 7);
      ctx.font      = "bold 12px 'Noto Sans JP', sans-serif";
      ctx.fillStyle = score >= 75 ? '#00c9a7' : score >= 50 ? '#c9a84c' : '#e74c3c';
      ctx.fillText(score, p.x, p.y + 8);
    }

    // legend (fades in at end)
    const la = Math.max(0, Math.min(1, (progress - 0.85) * 6.5));
    if (la > 0) {
      ctx.font = "9px 'Noto Sans JP', sans-serif";
      const lx = cx - 72, ly = cH - 16;
      ctx.fillStyle = `rgba(0,201,167,${la})`;
      ctx.fillRect(lx, ly - 4, 16, 3);
      ctx.fillStyle = `rgba(255,255,255,${la * 0.55})`;
      ctx.textAlign = 'left';
      ctx.fillText('あなたの医院', lx + 20, ly - 2);
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(lx + 82, ly - 2);
      ctx.lineTo(lx + 98, ly - 2);
      ctx.strokeStyle = `rgba(201,168,76,${la * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(255,255,255,${la * 0.55})`;
      ctx.fillText('業界平均', lx + 102, ly - 2);
    }
  }

  // ─── スパークライン（履歴トレンド） ───
  function drawSparkline(canvas, history) {
    if (!canvas || history.length < 2) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.clientWidth, H = canvas.clientHeight;
    ctx.clearRect(0, 0, W, H);

    const avgs  = history.map(h => h.avg);
    const minV  = Math.max(0,   Math.min(...avgs) - 8);
    const maxV  = Math.min(100, Math.max(...avgs) + 8);
    const range = maxV - minV || 1;
    const pts   = avgs.map((v, i) => ({
      x: (i / (avgs.length - 1)) * (W - 16) + 8,
      y: H - ((v - minV) / range) * (H - 20) - 10,
    }));

    // fill under line
    ctx.beginPath();
    ctx.moveTo(pts[0].x, H);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, H);
    ctx.closePath();
    const fg = ctx.createLinearGradient(0, 0, 0, H);
    fg.addColorStop(0, 'rgba(0,201,167,0.25)');
    fg.addColorStop(1, 'rgba(0,201,167,0)');
    ctx.fillStyle = fg;
    ctx.fill();

    // line
    const lg = ctx.createLinearGradient(0, 0, W, 0);
    lg.addColorStop(0, 'rgba(0,201,167,0.45)');
    lg.addColorStop(1, '#00c9a7');
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = lg;
    ctx.lineWidth   = 2;
    ctx.lineJoin    = 'round';
    ctx.stroke();

    // dots + value labels
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, i === pts.length - 1 ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = i === pts.length - 1 ? '#00c9a7' : 'rgba(0,201,167,0.45)';
      ctx.fill();
      ctx.font      = "9px 'Noto Sans JP', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillStyle = i === pts.length - 1 ? '#00c9a7' : 'rgba(255,255,255,0.4)';
      ctx.fillText(Math.round(avgs[i]), p.x, p.y - 7);
    });
  }

  // ─── 履歴管理 ───
  const HIST_KEY = 'dc_scanner_v2';
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HIST_KEY)) || []; } catch { return []; }
  }
  function saveHistory(scores, avg) {
    const hist = loadHistory();
    hist.push({
      date: new Date().toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      scores: Object.fromEntries(AXES.map(a => [a.key, Math.round(scores[a.key])])),
      avg:   Math.round(avg),
    });
    if (hist.length > 6) hist.shift();
    try { localStorage.setItem(HIST_KEY, JSON.stringify(hist)); } catch {}
  }

  // ─── スライダー塗り ───
  function updateFill(slider) {
    const min = +slider.min, max = +slider.max, val = +slider.value;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.backgroundImage =
      `linear-gradient(to right, #00c9a7 ${pct}%, rgba(255,255,255,0.12) ${pct}%)`;
  }

  // ─── 履歴パネルを更新 ───
  function refreshHistPanel(histPanel, histCanvas) {
    const hist = loadHistory();
    if (!histPanel) return;
    if (hist.length < 1) { histPanel.style.display = 'none'; return; }
    histPanel.style.display = 'block';
    if (histCanvas) drawSparkline(histCanvas, hist);
    histPanel.querySelectorAll('.hist-entry').forEach((el, i) => {
      const h = hist[hist.length - 1 - i];
      if (!h) { el.style.display = 'none'; return; }
      el.style.display = 'flex';
      el.querySelector('.hist-date').textContent  = h.date;
      const scoreEl = el.querySelector('.hist-score');
      scoreEl.textContent  = h.avg;
      scoreEl.style.color  = h.avg >= 75 ? '#00c9a7' : h.avg >= 50 ? '#c9a84c' : '#e74c3c';
    });
  }

  // ─── 初期化 ───
  function initScanner() {
    if (!document.getElementById('scanner')) return;

    const canvas      = document.getElementById('radarCanvas');
    const scanBtn     = document.getElementById('scanBtn');
    const resultPanel = document.getElementById('scanResult');
    const scoreNum    = document.getElementById('scoreNum');
    const scoreGrade  = document.getElementById('scoreGrade');
    const scoreLabel  = document.getElementById('scoreLabel');
    const kpiList     = document.getElementById('kpiList');
    const recList     = document.getElementById('recList');
    const riskBar     = document.getElementById('riskBar');
    const riskLabel   = document.getElementById('riskLabel');
    const riskFlags   = document.getElementById('riskFlags');
    const histPanel   = document.getElementById('histPanel');
    const histCanvas  = document.getElementById('histCanvas');
    const deltaBadge  = document.getElementById('deltaBadge');
    const benchmarks  = getBenchmarkScores();
    let animObj = { val: 0 };

    // sliders init
    document.querySelectorAll('.scan-slider').forEach(s => {
      updateFill(s);
      s.addEventListener('input', () => {
        updateFill(s);
        const el = document.getElementById(s.id + '_val');
        if (el) el.textContent = s.value + (s.dataset.unit || '%');
      });
    });

    // initial history
    refreshHistPanel(histPanel, histCanvas);

    scanBtn.addEventListener('click', () => {
      const inputs = Object.fromEntries(
        AXES.map(a => [a.key, +document.getElementById('s_' + a.key).value])
      );
      const scores   = Object.fromEntries(AXES.map(a => [a.key, calcScore(a.key, inputs[a.key])]));
      const scoreArr = AXES.map(a => scores[a.key]);
      const avg      = scoreArr.reduce((s, v) => s + v, 0) / scoreArr.length;
      const grade    = getGrade(avg);
      const risk     = getRisk(scores);

      // delta vs previous
      const prevHist = loadHistory();
      const prevAvg  = prevHist.length ? prevHist[prevHist.length - 1].avg : null;

      saveHistory(scores, avg);

      // show result panel
      resultPanel.style.display   = 'block';
      resultPanel.style.opacity   = '0';
      resultPanel.style.transform = 'translateY(20px)';
      scanBtn.disabled    = true;
      scanBtn.textContent = 'スキャン中...';
      scanBtn.classList.add('scanning');
      gsap.to(resultPanel, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

      // score count-up
      gsap.killTweensOf(animObj);
      animObj = { val: 0 };
      gsap.to(animObj, {
        val:      Math.round(avg),
        duration: 1.8,
        delay:    0.2,
        ease:     'power2.out',
        onUpdate() { scoreNum.textContent = Math.round(animObj.val); },
        onComplete() {
          scoreGrade.textContent = grade.grade;
          scoreGrade.style.color = grade.color;
          scoreLabel.textContent = grade.label;
          scanBtn.disabled    = false;
          scanBtn.textContent = '再スキャン';
          scanBtn.classList.remove('scanning');
          refreshHistPanel(histPanel, histCanvas);
        },
      });

      // delta badge
      if (deltaBadge) {
        if (prevAvg !== null) {
          const d = Math.round(avg) - prevAvg;
          deltaBadge.textContent = (d >= 0 ? '+' : '') + d + ' vs 前回';
          deltaBadge.style.color   = d >= 0 ? '#00c9a7' : '#e74c3c';
          deltaBadge.style.display = 'inline-block';
        } else {
          deltaBadge.style.display = 'none';
        }
      }

      // radar animation
      const prog = { val: 0 };
      gsap.to(prog, {
        val:      1,
        duration: 1.8,
        delay:    0.2,
        ease:     'power2.out',
        onUpdate() { drawRadar(canvas, scoreArr, benchmarks, prog.val); },
      });

      // risk meter
      if (riskBar) {
        riskBar.style.background = risk.color;
        gsap.fromTo(riskBar, { width: '0%' }, {
          width:    risk.width + '%',
          duration: 1.2,
          delay:    0.6,
          ease:     'power2.out',
        });
      }
      if (riskLabel) { riskLabel.textContent = risk.label; riskLabel.style.color = risk.color; }
      if (riskFlags) {
        riskFlags.innerHTML = risk.flags.map(f =>
          `<span class="risk-flag" style="color:${risk.color};border-color:${risk.color}66">${f}</span>`
        ).join('');
      }

      // KPI bars
      kpiList.innerHTML = AXES.map((a, i) => {
        const s   = Math.round(scores[a.key]);
        const bm  = benchmarks[i];
        const d   = s - bm;
        const clr = s >= 75 ? '#00c9a7' : s >= 55 ? '#3b9eca' : s >= 40 ? '#c9a84c' : '#e74c3c';
        const lbl = s >= 75 ? '良好' : s >= 55 ? '普通' : s >= 40 ? '要注意' : '要改善';
        return `
          <div class="kpi-item" style="animation-delay:${0.4 + i * 0.07}s">
            <div class="kpi-item-top">
              <span class="kpi-name">${a.label}</span>
              <div class="kpi-right">
                <span class="kpi-delta" style="color:${d >= 0 ? '#00c9a7' : '#e74c3c'}">${d >= 0 ? '▲' : '▼'}${Math.abs(d)}</span>
                <span class="kpi-status" style="color:${clr}">${lbl}&nbsp;${inputs[a.key]}${a.unit}</span>
              </div>
            </div>
            <div class="kpi-bar-bg">
              <div class="kpi-bar-bm" style="left:${Math.min(99, bm)}%"></div>
              <div class="kpi-bar" data-score="${s}" style="background:${clr}"></div>
            </div>
          </div>`;
      }).join('');

      setTimeout(() => {
        document.querySelectorAll('.kpi-bar').forEach((bar, i) => {
          gsap.fromTo(bar, { width: '0%' }, {
            width:    bar.dataset.score + '%',
            duration: 1,
            delay:    i * 0.07,
            ease:     'power2.out',
          });
        });
      }, 400);

      // recommendations
      const sorted = [...AXES].sort((a, b) => scores[a.key] - scores[b.key]);
      const weak   = sorted.slice(0, 3).filter(a => scores[a.key] < 88);
      recList.innerHTML = weak.length
        ? weak.map((a, i) => {
            const s   = Math.round(scores[a.key]);
            const sev = s < 40 ? '緊急' : s < 55 ? '要対応' : '改善推奨';
            const sc  = s < 40 ? '#e74c3c' : s < 55 ? '#e67e22' : '#c9a84c';
            const msg = getMsg(a, inputs[a.key]) || '継続的な改善が必要です。';
            return `
              <div class="rec-item" style="animation-delay:${0.8 + i * 0.12}s">
                <div class="rec-num">${i + 1}</div>
                <div class="rec-body">
                  <div class="rec-item-top-row">
                    <span class="rec-item-title">${a.label}の改善</span>
                    <span class="rec-severity" style="color:${sc};border-color:${sc}55">${sev}</span>
                  </div>
                  <div class="rec-item-text">${msg}</div>
                  <a href="#${a.catId}" class="rec-item-link" onclick="if(window.lenis){event.preventDefault();lenis.scrollTo(document.getElementById('${a.catId}'),{offset:-130,duration:1.2});}">詳しく見る →</a>
                </div>
              </div>`;
          }).join('')
        : `<p class="rec-perfect">全指標が優れた状態です！このまま維持してください。</p>`;

      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });

    // initial empty chart
    drawRadar(canvas, new Array(AXES.length).fill(0), null, 1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScanner);
  } else {
    initScanner();
  }
})();

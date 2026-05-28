// =====================================================
// 歯科経営スキャナー — レーダーチャート経営診断
// =====================================================
(function () {
  'use strict';

  const AXES = [
    {
      key: 'labor', label: '人件費管理', unit: '%', catId: 'cat-10',
      ideal: '40〜45%',
      msgLow:  '人件費率が高すぎます。採用・評価制度を見直し、歯科衛生士の生産性向上が急務です。',
      msgHigh: '人件費率が低い場合、採用不足・スタッフ不足のリスクがあります。',
    },
    {
      key: 'jihi', label: '自費活用', unit: '%', catId: 'cat-07',
      ideal: '30%以上',
      msgLow: '自費比率の向上が収益改善の最重要課題です。カウンセリング強化と高単価メニュー整備を推奨します。',
    },
    {
      key: 'recall', label: '患者定着', unit: '%', catId: 'cat-11',
      ideal: '60〜80%',
      msgLow: 'リコール率が低いと安定収益を確保できません。予約管理の仕組み化とリマインド施策を強化してください。',
    },
    {
      key: 'material', label: '材料費管理', unit: '%', catId: 'cat-15',
      ideal: '10〜15%',
      msgLow:  '材料費が高すぎます。在庫管理の適正化とベンダー交渉の見直しを推奨します。',
      msgHigh: '材料費が非常に低い場合、品質管理も合わせて確認してください。',
    },
    {
      key: 'profit', label: '収益性', unit: '%', catId: 'cat-15',
      ideal: '15〜25%',
      msgLow: '利益率の改善が急務です。自費強化・コスト最適化・KPI管理を同時に進めましょう。',
    },
  ];

  function calcScore(key, val) {
    switch (key) {
      case 'labor':
        return Math.max(5, Math.min(100, 100 - Math.pow(Math.abs(val - 42.5), 1.3) * 0.95));
      case 'jihi':
        return Math.min(100, Math.max(5, (val / 40) * 100));
      case 'recall':
        return Math.min(100, Math.max(5, (val / 70) * 100));
      case 'material':
        return Math.max(5, Math.min(100, 100 - Math.pow(Math.abs(val - 12.5), 1.5) * 1.4));
      case 'profit':
        return Math.min(100, Math.max(5, (val / 20) * 100));
      default: return 50;
    }
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
    return axis.msgLow || '';
  }

  function getGrade(avg) {
    if (avg >= 88) return { grade: 'A+', label: '経営トップクラス',   color: '#00c9a7' };
    if (avg >= 75) return { grade: 'A',  label: '優良経営',           color: '#27ae60' };
    if (avg >= 62) return { grade: 'B+', label: '良好な状態',         color: '#3b9eca' };
    if (avg >= 50) return { grade: 'B',  label: '標準的',             color: '#c9a84c' };
    if (avg >= 38) return { grade: 'C+', label: '改善の余地あり',     color: '#e67e22' };
    return           { grade: 'C',  label: '専門家への相談を推奨', color: '#e74c3c' };
  }

  // ─── Canvas レーダーチャート ───
  function drawRadar(canvas, rawScores, progress) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth  * dpr;
    const H = canvas.clientHeight * dpr;
    canvas.width  = W;
    canvas.height = H;
    ctx.scale(dpr, dpr);

    const cW = canvas.clientWidth;
    const cH = canvas.clientHeight;
    const cx = cW / 2, cy = cH / 2;
    const R  = Math.min(cW, cH) / 2 - 50;
    const n  = rawScores.length;

    const getXY = (i, r) => {
      const angle = (i * 2 * Math.PI / n) - Math.PI / 2;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };

    ctx.clearRect(0, 0, cW, cH);

    // grid
    for (let lv = 1; lv <= 5; lv++) {
      const r = (R * lv) / 5;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const p = getXY(i, r);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = lv === 5 ? 'rgba(0,201,167,0.18)' : 'rgba(255,255,255,0.06)';
      ctx.lineWidth   = lv === 5 ? 1.5 : 1;
      ctx.stroke();
    }

    // axes
    for (let i = 0; i < n; i++) {
      const outer = getXY(i, R);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(outer.x, outer.y);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth   = 1;
      ctx.stroke();
    }

    // data (animated)
    const animScores = rawScores.map(s => s * progress);
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const r = (R * animScores[i]) / 100;
      const p = getXY(i, r);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(0,201,167,0.4)');
    grad.addColorStop(1, 'rgba(0,201,167,0.05)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowColor = '#00c9a7';
    ctx.shadowBlur  = 10;
    ctx.strokeStyle = '#00c9a7';
    ctx.lineWidth   = 2.5;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    // dots
    for (let i = 0; i < n; i++) {
      const r = (R * animScores[i]) / 100;
      const p = getXY(i, r);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle   = '#00c9a7';
      ctx.shadowColor = '#00c9a7';
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;
    }

    // labels
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < n; i++) {
      const p     = getXY(i, R + 32);
      const score = Math.round(animScores[i]);
      ctx.font      = "11px 'Noto Sans JP', sans-serif";
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(AXES[i].label, p.x, p.y - 8);
      ctx.font      = "bold 14px 'Noto Serif JP', serif";
      ctx.fillStyle = score >= 70 ? '#00c9a7' : score >= 50 ? '#c9a84c' : '#e74c3c';
      ctx.fillText(score, p.x, p.y + 9);
    }
  }

  // ─── スライダー Fill ───
  function updateFill(slider) {
    const min = +slider.min, max = +slider.max, val = +slider.value;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.backgroundImage =
      `linear-gradient(to right, #00c9a7 ${pct}%, rgba(255,255,255,0.12) ${pct}%)`;
  }

  // ─── 初期化 ───
  function initScanner() {
    const section = document.getElementById('scanner');
    if (!section) return;

    const canvas      = document.getElementById('radarCanvas');
    const scanBtn     = document.getElementById('scanBtn');
    const resultPanel = document.getElementById('scanResult');
    const scoreNum    = document.getElementById('scoreNum');
    const scoreGrade  = document.getElementById('scoreGrade');
    const scoreLabel  = document.getElementById('scoreLabel');
    const kpiList     = document.getElementById('kpiList');
    const recList     = document.getElementById('recList');
    let   animObj     = { val: 0 };

    // init slider fill
    document.querySelectorAll('.scan-slider').forEach(s => {
      updateFill(s);
      s.addEventListener('input', () => {
        updateFill(s);
        const valEl = document.getElementById(s.id + '_val');
        if (valEl) valEl.textContent = s.value + '%';
      });
    });

    scanBtn.addEventListener('click', () => {
      const inputs = {
        labor:    +document.getElementById('s_labor').value,
        jihi:     +document.getElementById('s_jihi').value,
        recall:   +document.getElementById('s_recall').value,
        material: +document.getElementById('s_material').value,
        profit:   +document.getElementById('s_profit').value,
      };

      const scores  = {};
      AXES.forEach(a => { scores[a.key] = calcScore(a.key, inputs[a.key]); });
      const scoreArr = AXES.map(a => scores[a.key]);
      const avg      = scoreArr.reduce((s, v) => s + v, 0) / scoreArr.length;
      const grade    = getGrade(avg);

      // show panel
      resultPanel.style.display  = 'block';
      resultPanel.style.opacity  = '0';
      resultPanel.style.transform = 'translateY(20px)';
      scanBtn.disabled = true;
      scanBtn.textContent = 'スキャン中...';
      scanBtn.classList.add('scanning');

      gsap.to(resultPanel, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

      // score count-up
      if (animObj._gsap) gsap.killTweensOf(animObj);
      animObj = { val: 0 };
      gsap.to(animObj, {
        val: Math.round(avg),
        duration: 1.6,
        delay: 0.3,
        ease: 'power2.out',
        onUpdate() { scoreNum.textContent = Math.round(animObj.val); },
        onComplete() {
          scoreGrade.textContent = grade.grade;
          scoreGrade.style.color = grade.color;
          scoreLabel.textContent = grade.label;
          scanBtn.disabled = false;
          scanBtn.textContent = '再スキャン';
          scanBtn.classList.remove('scanning');
        },
      });

      // radar
      const prog = { val: 0 };
      gsap.to(prog, {
        val: 1,
        duration: 1.6,
        delay: 0.3,
        ease: 'power2.out',
        onUpdate() { drawRadar(canvas, scoreArr, prog.val); },
      });

      // KPI bars
      kpiList.innerHTML = AXES.map((a, i) => {
        const s   = Math.round(scores[a.key]);
        const clr = s >= 70 ? '#00c9a7' : s >= 50 ? '#c9a84c' : '#e74c3c';
        const lbl = s >= 70 ? '良好' : s >= 50 ? '注意' : '要改善';
        return `
          <div class="kpi-item" style="animation-delay:${0.5 + i * 0.1}s">
            <div class="kpi-item-top">
              <span class="kpi-name">${a.label}</span>
              <span class="kpi-status" style="color:${clr}">${lbl} ${inputs[a.key]}%</span>
            </div>
            <div class="kpi-bar-bg">
              <div class="kpi-bar" data-score="${s}" style="background:${clr}"></div>
            </div>
          </div>`;
      }).join('');

      setTimeout(() => {
        document.querySelectorAll('.kpi-bar').forEach((bar, i) => {
          gsap.fromTo(bar, { width: '0%' }, { width: bar.dataset.score + '%', duration: 1, delay: i * 0.1, ease: 'power2.out' });
        });
      }, 400);

      // recommendations
      const sorted = [...AXES].sort((a, b) => scores[a.key] - scores[b.key]);
      const weak   = sorted.slice(0, 3).filter(a => scores[a.key] < 82);
      recList.innerHTML = weak.length
        ? weak.map((a, i) => `
            <div class="rec-item" style="animation-delay:${0.9 + i * 0.15}s">
              <div class="rec-num">${i + 1}</div>
              <div class="rec-body">
                <div class="rec-item-title">${a.label}の改善</div>
                <div class="rec-item-text">${getMsg(a, inputs[a.key]) || '改善の余地があります。'}</div>
                <a href="#${a.catId}" class="rec-item-link" onclick="if(window.lenis){event.preventDefault();lenis.scrollTo(document.getElementById('${a.catId}'),{offset:-130,duration:1.2});}">詳しく見る →</a>
              </div>
            </div>`).join('')
        : `<p class="rec-perfect">全指標が優れた状態です。このまま維持してください！</p>`;

      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });

    // Initial draw (empty)
    drawRadar(canvas, [0, 0, 0, 0, 0], 1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScanner);
  } else {
    initScanner();
  }
})();

window.__AI_SUPPORT_V1 = true;
/* ================================================================
   AI作成支援 - --------
================================================================ */

// -- --切-替- ----------------------------------
(function(){
  var tabs = document.querySelectorAll('.ai-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var panel = tab.dataset.panel;
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelectorAll('.ai-panel').forEach(function(p){ p.classList.remove('active'); });
      var target = document.getElementById('panel-' + panel);
      if (target) target.classList.add('active');
    });
  });
})();

// -- 文字数----- -----------------------------
(function(){
  var pairs = [
    ['ps-hope', 'ps-hope-count'],
    ['ls-question', 'ls-question-count'],
    ['er-content', 'er-content-count'],
  ];
  pairs.forEach(function(pair) {
    var el = document.getElementById(pair[0]);
    var counter = document.getElementById(pair[1]);
    if (!el || !counter) return;
    el.addEventListener('input', function() {
      var n = el.value.length;
      counter.textContent = n + '字';
      counter.className = 'char-counter' + (n > 500 ? ' warn' : '');
    });
  });
})();

// -- -------収集 ----------------------------
function collectFormData(feature) {
  var data = { feature: feature };

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
  function radios(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }
  function checks(cls) {
    var els = document.querySelectorAll('.' + cls + ':checked');
    return Array.from(els).map(function(e){ return e.value; });
  }
  function checksById(id) {
    var container = document.getElementById(id);
    if (!container) return [];
    var els = container.querySelectorAll('input[type=checkbox]:checked');
    return Array.from(els).map(function(e){ return e.value; });
  }

  if (feature === 'plan_shuro') {
    data.serviceType = val('ps-type') || document.querySelector('#panel-plan_shuro .ai-select')?.value;
    data.age = val('ps-age');
    data.disabilities = checksById('ps-disability');
    data.diagnosis = val('ps-diagnosis');
    data.level = radios('ps-level');
    data.hope = val('ps-hope');
    data.adl = val('ps-adl');
    data.work = val('ps-work');
    data.strengths = val('ps-strengths');
    data.issues = val('ps-issues');
    data.medical = val('ps-medical');
    data.family = val('ps-family');
    data.period = radios('ps-period');
  } else if (feature === 'plan_kyotaku') {
    data.services = checksById('pk-service');
    data.age = val('pk-age');
    data.level = val('pk-level');
    data.diagnosis = val('pk-diagnosis');
    data.hope = val('pk-hope');
    data.adl = checks('pk-adl');
    data.risks = checks('pk-risk');
    data.riskDetail = val('pk-risk-detail');
    data.schedule = val('pk-schedule');
    data.family = val('pk-family');
    data.medical = val('pk-medical');
  } else if (feature === 'assessment') {
    data.service = val('as-service');
    data.basic = val('as-basic');
    data.body = val('as-body');
    data.activity = val('as-activity');
    data.participation = val('as-participation');
    data.environment = val('as-environment');
    data.strengths = val('as-strengths');
    data.complaint = val('as-complaint');
    data.other = val('as-other');
  } else if (feature === 'monitoring') {
    data.service = val('mn-service');
    data.period = val('mn-period');
    data.longGoal = val('mn-long-goal');
    data.shortGoal = val('mn-short-goal');
    data.lifeChange = val('mn-life');
    data.hope = val('mn-hope');
    data.familyOpinion = val('mn-family-opinion');
    data.nextPlan = val('mn-next');
  } else if (feature === 'nursing_report') {
    data.recordType = radios('nr-type');
    data.patient = val('nr-patient');
    data.bp = val('nr-bp');
    data.pulse = val('nr-pulse');
    data.temp = val('nr-temp');
    data.spo2 = val('nr-spo2');
    data.observation = val('nr-observation');
    data.subj = val('nr-subj');
    data.plan = val('nr-plan');
    data.meds = val('nr-meds');
  } else if (feature === 'kasan_check') {
    data.services = checksById('kc-service');
    data.staff = val('kc-staff');
    data.qualifications = checksById('kc-qualification');
    data.initiatives = checksById('kc-initiatives');
    data.users = val('kc-users');
    data.other = val('kc-other');
  } else if (feature === 'claim_check') {
    data.service = val('cc-service');
    data.month = val('cc-month');
    data.claims = val('cc-claims');
    data.basis = val('cc-basis');
    data.concern = val('cc-concern');
  } else if (feature === 'law_summary') {
    data.qtype = radios('ls-type');
    data.areas = checksById('ls-area');
    data.question = val('ls-question');
  } else if (feature === 'incident_docs') {
    data.incidentType = val('inc-type');
    data.level = radios('inc-level');
    data.when = val('inc-when');
    data.staffStatus = val('inc-staff');
    data.situation = val('inc-situation');
    data.response = val('inc-response');
    data.person = val('inc-person');
    data.purpose = checksById('inc-purpose');
  } else if (feature === 'wage_plan') {
    data.workTypes = checksById('wp-work');
    data.wageNow = val('wp-wage-now');
    data.wageTarget = val('wp-wage-target');
    data.year = val('wp-year');
    data.users = val('wp-users');
    data.current = val('wp-current');
    data.challenges = val('wp-challenges');
  } else if (feature === 'easy_read') {
    data.purpose = radios('er-purpose');
    data.reader = radios('er-reader');
    data.content = val('er-content');
    data.request = val('er-request');
  } else if (feature === 'staff_sim') {
    data.services = checksById('ss-service');
    data.manager = val('ss-manager');
    data.staff = val('ss-staff');
    data.users = val('ss-users');
    data.daily = val('ss-daily');
    data.capacity = val('ss-capacity');
    data.future = val('ss-future');
  }

  return data;
}

// -- ------- --------------------------------
var REQUIRED_FIELDS = {
  plan_shuro:    ['age', 'hope'],
  plan_kyotaku:  ['age', 'diagnosis', 'hope'],
  assessment:    ['basic', 'body', 'activity', 'complaint'],
  monitoring:    ['longGoal', 'shortGoal'],
  nursing_report:['patient', 'observation'],
  kasan_check:   [],
  claim_check:   ['claims'],
  law_summary:   ['question'],
  incident_docs: ['situation'],
  wage_plan:     ['wageNow', 'wageTarget'],
  easy_read:     ['content'],
  staff_sim:     ['manager', 'staff', 'users'],
};

function validate(feature, data) {
  var required = REQUIRED_FIELDS[feature] || [];
  for (var i = 0; i < required.length; i++) {
    var key = required[i];
    var v = data[key];
    if (!v || (Array.isArray(v) && v.length === 0)) {
      return '必須項目が入力されていません。';
    }
  }
  return null;
}

// -- ------ - HTML（簡易） -------------------
function renderMarkdown(text) {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^[-・]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, function(m){ return '<ul>' + m + '</ul>'; })
    .replace(/\n{2,}/g, '\n\n')
    .replace(/\n/g, '<br>');
}


// -- AI生成----保存（Excel生成用）
var AI_RAW_OUTPUT = {};

// -- Markdown------配列
function parseMdSections(text) {
  var sections = [];
  var cur = null;
  (text || '').split('\n').forEach(function(line) {
    var h2 = line.match(/^##\s+(.+)/);
    var h3 = line.match(/^###\s+(.+)/);
    if (h2) {
      if (cur) sections.push(cur);
      cur = { title: h2[1].trim(), lines: [], level: 2 };
    } else if (h3) {
      if (cur) sections.push(cur);
      cur = { title: h3[1].trim(), lines: [], level: 3 };
    } else if (cur) {
      var ln = line.replace(/\*\*/g, '').trim();
      if (ln) cur.lines.push(ln);
    }
  });
  if (cur) sections.push(cur);
  return sections;
}

// -- ----行
function makeHeaderRows(title, dateStr) {
  return [
    [title],
    ['作成日', dateStr, '', '事業所名', ''],
    ['作成者', '', '', '確認者', ''],
    [],
  ];
}

// -- 列幅定義
var COL_WIDTHS = {
  plan_shuro:    [{wch:22},{wch:70}],
  plan_kyotaku:  [{wch:22},{wch:70}],
  assessment:    [{wch:22},{wch:35},{wch:35},{wch:35}],
  monitoring:    [{wch:28},{wch:65}],
  nursing_report:[{wch:18},{wch:25},{wch:18},{wch:25}],
  kasan_check:   [{wch:5},{wch:30},{wch:55}],
  claim_check:   [{wch:5},{wch:30},{wch:55}],
  law_summary:   [{wch:22},{wch:70}],
  incident_docs: [{wch:22},{wch:70}],
  wage_plan:     [{wch:28},{wch:65}],
  easy_read:     [{wch:12},{wch:80}],
  staff_sim:     [{wch:22},{wch:65}],
};

// -- ------（ICF 4列）
function buildAssessmentRows(sections, dateStr) {
  var rows = [
    ['アセスメントシート（ICF準拠）'],
    ['作成日', dateStr, '', '利用サービス', ''],
    ['対象者', '', '', '障害支援区分', ''],
    [],
    ['評価領域', '現状', '課題・ニーズ', '強み・リソース'],
  ];
  sections.forEach(function(s) {
    var genjo = '', kadai = '', tsuyomi = '', mode = 0;
    s.lines.forEach(function(l) {
      if (/^現状|^状況/.test(l) && l.length < 20) { mode=1; return; }
      if (/^課題|^ニーズ/.test(l) && l.length < 20) { mode=2; return; }
      if (/^強み|^リソース/.test(l) && l.length < 20) { mode=3; return; }
      if (mode===1) genjo += l + '\n';
      else if (mode===2) kadai += l + '\n';
      else if (mode===3) tsuyomi += l + '\n';
      else genjo += l + '\n';
    });
    rows.push([s.title, genjo.trim() || s.lines.join('\n'), kadai.trim(), tsuyomi.trim()]);
  });
  return rows;
}

// -- 看護記録（----表付-）
function buildNursingRows(sections, dateStr) {
  var rows = [
    ['看護記録・看護サマリー'],
    ['作成日', dateStr, '', '訪問看護ステーション', ''],
    ['対象者', '', '', '主治医', ''],
    [],
    ['【バイタルサイン（記録時）】'],
    ['血圧', '', '脈拍', ''],
    ['体温', '', 'SpO2', ''],
    [],
  ];
  sections.forEach(function(s) {
    rows.push(['■ ' + s.title]);
    s.lines.forEach(function(l) { rows.push(['', l]); });
    rows.push([]);
  });
  return rows;
}

// -- 加算-----請求----（---表）
function buildCheckRows(sections, dateStr, title) {
  var rows = [
    [title],
    ['診断日', dateStr, '', '事業所名', ''],
    [],
    ['判定', '項目', '内容・根拠・対応'],
  ];
  sections.forEach(function(s) {
    var mark = '';
    if (s.title.includes('✅')||/問題なし|算定可/.test(s.title)) mark='✅';
    else if (s.title.includes('⚠')||/警告|要確認/.test(s.title)) mark='⚠️';
    else if (s.title.includes('🔴')||/エラー/.test(s.title)) mark='🔴';
    else if (s.title.includes('🎯')) mark='🎯';
    else if (s.title.includes('❌')) mark='❌';
    else if (s.title.includes('📊')) mark='📊';
    else if (s.title.includes('🔧')) mark='🔧';
    var t = s.title.replace(/[^\u0021-\u007E\u3000-\u9FFF\uFF00-\uFFEF\s]/g,'').trim();
    rows.push([mark, t, '']);
    s.lines.forEach(function(l) { rows.push(['', '', l]); });
    rows.push([]);
  });
  return rows;
}

// -- 事故報告書（5W1H表付-）
function buildIncidentRows(sections, dateStr) {
  var rows = [
    ['事故・ヒヤリハット報告書'],
    ['報告日', dateStr, '', '報告者', ''],
    ['事業所名', '', '', '管理者確認', ''],
    [],
    ['発生日時', '', '場所', ''],
    ['事故種別', '', '重傷度', ''],
    ['当事者', '', '障害支援区分', ''],
    [],
  ];
  sections.forEach(function(s) {
    rows.push(['■ ' + s.title]);
    s.lines.forEach(function(l) { rows.push(['', l]); });
    rows.push([]);
  });
  return rows;
}

// -- 工賃向上計画書（目標値----付-）
function buildWagePlanRows(sections, dateStr) {
  var rows = [
    ['工賃向上計画書（就労継続支援B型）'],
    ['提出日', dateStr, '', '事業所名', ''],
    ['計画年度', '', '', '管理者', ''],
    [],
    ['現在の平均月額工賃（円）', '', '目標月額工賃（円）', ''],
    ['登録利用者数（名）', '', '平均稼働率（%）', ''],
    [],
  ];
  sections.forEach(function(s) {
    rows.push(['■ ' + s.title]);
    s.lines.forEach(function(l) { rows.push(['', l]); });
    rows.push([]);
  });
  return rows;
}

// -- 人員配置（常勤換算----付-）
function buildStaffSimRows(sections, dateStr) {
  var rows = [
    ['人員配置シミュレーション診断レポート'],
    ['診断日', dateStr, '', '事業所名', ''],
    [],
    ['【常勤換算計算シート】'],
    ['職種・氏名', '資格', '週勤務時間', '常勤換算値（÷常勤所定時間）'],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '合計', ''],
    [],
  ];
  sections.forEach(function(s) {
    rows.push(['■ ' + s.title]);
    s.lines.forEach(function(l) { rows.push(['', l]); });
    rows.push([]);
  });
  return rows;
}

// -- 汎用2列-----
function buildGenericRows(sections, dateStr, title) {
  var rows = makeHeaderRows(title, dateStr);
  sections.forEach(function(s) {
    rows.push(['■ ' + s.title]);
    s.lines.forEach(function(l) { rows.push(['', l]); });
    rows.push([]);
  });
  return rows;
}

// -- Render.com API URL -----------------------------
// ----後-実際-URL-書-換------
var RENDER_API_URL = "https://beqd1106-fukushi-api.onrender.com";

// -- ---：Excel------（Render API経由）
function downloadFilledTemplate(feature) {
  var rawText = AI_RAW_OUTPUT[feature];
  if (!rawText) {
    var box = document.getElementById('output-box-' + feature);
    rawText = box ? (box.innerText || box.textContent) : '';
  }
  if (!rawText || rawText.trim().length < 10) {
    alert('先にAI生成を実行してください。');
    return;
  }

  var title   = FEATURE_TITLES[feature] || 'AI生成書類';
  var today   = new Date();
  var fileDate= today.getFullYear() + String(today.getMonth()+1).padStart(2,'0') + String(today.getDate()).padStart(2,'0');

  // ----------状態-
  var btn = event && event.target;
  var origText = btn ? btn.textContent : '';
  if (btn) { btn.textContent = '⏳ 生成中...'; btn.disabled = true; }

  // Form ----送信（------固有-入力値-使用）
  var formData = {};
  try { formData = collectFormData(feature) || {}; } catch(e) {}

  fetch(RENDER_API_URL + '/fill-excel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      feature:   feature,
      raw_text:  rawText,
      form_data: formData,
    }),
  })
  .then(function(res) {
    if (!res.ok) throw new Error('API エラー: ' + res.status);
    return res.blob();
  })
  .then(function(blob) {
    var url = URL.createObjectURL(blob);
    var a   = document.createElement('a');
    a.href     = url;
    a.download = title + '_' + fileDate + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  })
  .catch(function(err) {
    // Render -----中-場合--------（SheetJS）
    console.warn('Render API unavailable, falling back to SheetJS:', err);
    if (typeof XLSX !== 'undefined') {
      fallbackSheetJS(feature, rawText, title, fileDate);
    } else {
      alert('ダウンロードに失敗しました。しばらく待ってから再試行してください。\n\n（Renderサーバー起動中：約30秒）');
    }
  })
  .finally(function() {
    if (btn) { btn.textContent = origText; btn.disabled = false; }
  });
}

// -- -------：SheetJS（Render-----中-場合）
function fallbackSheetJS(feature, rawText, title, fileDate) {
  var sections = parseMdSections(rawText);
  var rows = buildGenericRows(sections, new Date().getFullYear() + '年' + (new Date().getMonth()+1) + '月' + new Date().getDate() + '日', title);
  rows.push([], ['※ サーバー未応答のためシンプル形式で出力しました。Excelボタンを再度押すと高品質版が取得できます。']);
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{wch:22},{wch:70}];
  XLSX.utils.book_append_sheet(wb, ws, title.slice(0,31));
  XLSX.writeFile(wb, title + '_' + fileDate + '.xlsx');
}


// -- ---生成関数 --------------------------------
function generateAI(feature) {
  var data = collectFormData(feature);

  var err = validate(feature, data);
  if (err) {
    showError(feature, err);
    return;
  }

  var outputWrap = document.getElementById('output-' + feature);
  var outputBox  = document.getElementById('output-box-' + feature);
  var btn = document.querySelector('#panel-' + feature + ' .ai-generate-btn');

  outputBox.innerHTML = '';
  outputBox.className = 'ai-output-box streaming stream-cursor';
  outputWrap.classList.add('visible');
  btn.disabled = true;
  btn.classList.add('loading');

  var rawText = '';

  fetch('/api/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then(function(res) {
    if (!res.ok) {
      return res.json().then(function(j) { throw new Error(j.error || 'APIエラー: ' + res.status); });
    }
    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var buf = '';

    function pump() {
      return reader.read().then(function(result) {
        if (result.done) {
          AI_RAW_OUTPUT[feature] = rawText;  // Excel生成用-保存
          outputBox.className = 'ai-output-box';
          outputBox.innerHTML = renderMarkdown(rawText);
          btn.disabled = false;
          btn.classList.remove('loading');
          return;
        }
        buf += decoder.decode(result.value, { stream: true });
        var lines = buf.split('\n');
        buf = lines.pop();
        lines.forEach(function(line) {
          if (!line.startsWith('data: ')) return;
          var payload = line.slice(6).trim();
          if (payload === '[DONE]') return;
          try {
            var obj = JSON.parse(payload);
            var delta = obj.response || (obj.delta && obj.delta.text) || '';
            if (delta) {
              rawText += delta;
              // -------中------HTML------（改行-保持）
              outputBox.innerHTML = rawText
                .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                .replace(/^##\s+(.+)$/gm,'<strong style="display:block;margin-top:0.8em;color:var(--coral-dark);">$1</strong>')
                .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
                .replace(/\n/g,'<br>');
              outputBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          } catch(e) {}
        });
        return pump();
      });
    }
    return pump();
  })
  .catch(function(e) {
    outputBox.className = 'ai-output-box';
    outputBox.innerHTML = '<div class="ai-error">⚠️ ' + (e.message || 'エラーが発生しました') + '</div>';
    btn.disabled = false;
    btn.classList.remove('loading');
  });
}

function showError(feature, msg) {
  var outputWrap = document.getElementById('output-' + feature);
  var outputBox  = document.getElementById('output-box-' + feature);
  outputBox.className = 'ai-output-box';
  outputBox.innerHTML = '<div class="ai-error">⚠️ ' + msg + '</div>';
  outputWrap.classList.add('visible');
}

// -- --- ----------------------------------------
function copyOutput(feature) {
  var box = document.getElementById('output-box-' + feature);
  var text = box.innerText || box.textContent;
  navigator.clipboard.writeText(text).then(function() {
    var btn = box.closest('.ai-output-wrap').querySelector('.primary-action');
    var orig = btn.textContent;
    btn.textContent = '✅ コピーしました';
    setTimeout(function(){ btn.textContent = orig; }, 2000);
  });
}

// -- 印刷 -----------------------------------------
function printOutput(feature) {
  var box = document.getElementById('output-box-' + feature);
  var win = window.open('', '_blank');
  win.document.write([
    '<!DOCTYPE html><html lang="ja"><head>',
    '<meta charset="UTF-8">',
    '<title>AI生成書類</title>',
    '<style>',
    'body { font-family: "Hiragino Sans","Noto Sans JP",sans-serif; font-size:11pt; line-height:1.8; margin:2cm; color:#111; }',
    'h2 { font-size:13pt; border-bottom:2px solid #ccc; padding-bottom:4px; margin-top:1.5em; }',
    'h3 { font-size:11pt; margin-top:1em; }',
    'ul { margin-left:1.5em; }',
    'strong { font-weight:bold; }',
    '@media print { body { margin:1cm; } }',
    '</style></head><body>',
    box.innerHTML,
    '</body></html>',
  ].join(''));
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); }, 500);
}

// -- --- ----------------------------------------
function clearOutput(feature) {
  document.getElementById('output-box-' + feature).innerHTML = '';
  document.getElementById('output-' + feature).classList.remove('visible');
}

// -- 評価 -----------------------------------------
function rateOutput(feature, type) {
  var msg = type === 'good' ? '👍 フィードバックありがとうございます！' : '👎 改善のフィードバックをありがとうございます。';
  var ratingEl = document.querySelector('#output-' + feature + ' .ai-rating');
  if (ratingEl) ratingEl.innerHTML = '<span style="color:var(--text-mid);font-size:0.78rem;">' + msg + '</span>';
}

// -- 書類----定義 -----------------------------
var FEATURE_TITLES = {
  plan_shuro:     '個別支援計画書（就労継続支援）',
  plan_kyotaku:   '個別支援計画書（居宅介護）',
  assessment:     'アセスメントシート',
  monitoring:     'モニタリング報告書',
  nursing_report: '看護記録・看護サマリー',
  kasan_check:    '加算算定診断レポート',
  claim_check:    '請求エラーチェックレポート',
  law_summary:    '法令・Q&A回答',
  incident_docs:  '事故・ヒヤリハット報告書',
  wage_plan:      '工賃向上計画書',
  easy_read:      'わかりやすい説明文',
  staff_sim:      '人員配置診断レポート',
};

// -- Word（HTML形式）------- ---------------
function downloadOutput(feature) {
  var box   = document.getElementById('output-box-' + feature);
  var inner = box.innerHTML;
  if (!inner || !inner.trim()) return;

  var title = FEATURE_TITLES[feature] || 'AI生成書類';
  var today = new Date();
  var dateStr = today.getFullYear() + '年' +
                (today.getMonth()+1) + '月' +
                today.getDate() + '日';
  var fileDate = today.getFullYear() +
                 String(today.getMonth()+1).padStart(2,'0') +
                 String(today.getDate()).padStart(2,'0');

  var html = '<!DOCTYPE html>\n' +
'<html lang="ja">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<title>' + title + '</title>\n' +
'<style>\n' +
'body{font-family:"Hiragino Sans","Meiryo","MS PGothic",sans-serif;font-size:11pt;line-height:1.9;margin:2.5cm 2cm;color:#111;}\n' +
'.doc-header{border-bottom:3px solid #333;padding-bottom:0.6em;margin-bottom:1.8em;}\n' +
'.doc-title{font-size:18pt;font-weight:bold;margin:0 0 0.3em;color:#1a1a1a;}\n' +
'.doc-meta{font-size:9pt;color:#666;margin:0;}\n' +
'.doc-notice{font-size:9pt;color:#c0504f;font-weight:bold;margin:0.2em 0 0;}\n' +
'h2{font-size:13pt;font-weight:bold;border-bottom:2px solid #ccc;padding-bottom:4px;margin:1.5em 0 0.5em;color:#1a1a1a;page-break-after:avoid;}\n' +
'h3{font-size:11pt;font-weight:bold;margin:1.2em 0 0.4em;color:#333;page-break-after:avoid;}\n' +
'ul,ol{margin:0.3em 0 0.8em 1.8em;padding:0;}\n' +
'li{margin-bottom:0.25em;}\n' +
'strong{font-weight:bold;}\n' +
'table{width:100%;border-collapse:collapse;margin:0.8em 0;font-size:10pt;}\n' +
'th{background:#f0f0f0;border:1px solid #aaa;padding:6px 10px;text-align:left;font-weight:bold;}\n' +
'td{border:1px solid #ccc;padding:5px 10px;vertical-align:top;}\n' +
'br{display:block;margin:0.15em 0;}\n' +
'.doc-footer{margin-top:2.5em;padding-top:0.6em;border-top:1px solid #ccc;font-size:8pt;color:#888;}\n' +
'@page{margin:2.5cm 2cm;}\n' +
'@media print{.doc-footer{position:fixed;bottom:1cm;left:2cm;right:2cm;}}\n' +
'</style>\n' +
'</head>\n' +
'<body>\n' +
'<div class="doc-header">\n' +
'  <p class="doc-title">' + title + '</p>\n' +
'  <p class="doc-meta">作成日：' + dateStr + '　　事業所名：___________________________　担当者：_______________</p>\n' +
'  <p class="doc-notice">※ これはAI（Llama 3.1）が生成した下書きです。内容は必ず担当者が確認・修正のうえご使用ください。</p>\n' +
'</div>\n' +
inner + '\n' +
'<div class="doc-footer">AI作成支援 - 障碍者福祉事業所 運営ガイド | beqd1106.com/nursing/ | 生成日時：' + dateStr + '</div>\n' +
'</body>\n' +
'</html>';

  var bom  = '﻿'; // BOM付-UTF-8（Word-文字化-------）
  var blob = new Blob([bom + html], { type: 'application/msword;charset=utf-8' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href     = url;
  a.download = title + '_' + fileDate + '.doc';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
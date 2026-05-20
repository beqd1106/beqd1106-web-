/* ================================================================
   マーケティング学習 — 進捗・メモ管理ライブラリ
   localStorage キー: marketing_progress_v1 / marketing_memo_v1
================================================================ */
(function(w){
  var PROG_KEY = 'marketing_progress_v1';
  var MEMO_KEY = 'marketing_memo_v1';

  var Progress = {
    getAll: function(){
      try{ return JSON.parse(localStorage.getItem(PROG_KEY)) || {}; }catch(e){ return {}; }
    },
    get: function(id){ return this.getAll()[id] || null; },
    save: function(id, score, total){
      var all  = this.getAll();
      var prev = all[id] || {};
      var pct  = total > 0 ? Math.round(score / total * 100) : 0;
      all[id]  = {
        score    : score,
        total    : total,
        pct      : pct,
        best     : Math.max(prev.best  || 0, score),
        bestPct  : Math.max(prev.bestPct || 0, pct),
        attempts : (prev.attempts || 0) + 1,
        date     : new Date().toLocaleDateString('ja-JP',{month:'2-digit',day:'2-digit'}),
        timestamp: Date.now()
      };
      localStorage.setItem(PROG_KEY, JSON.stringify(all));
      return all[id];
    },
    reset: function(id){
      var all = this.getAll(); delete all[id];
      localStorage.setItem(PROG_KEY, JSON.stringify(all));
    },
    resetAll: function(){ localStorage.removeItem(PROG_KEY); },
    /* 合格ライン（80%以上）の数 */
    passCount: function(){
      var all = this.getAll();
      return Object.keys(all).filter(function(k){ return (all[k].bestPct||0) >= 80; }).length;
    },
    /* 挑戦済みの数 */
    triedCount: function(){ return Object.keys(this.getAll()).length; },
    /* 全体平均ベストスコア */
    avgBestPct: function(){
      var all  = this.getAll();
      var keys = Object.keys(all);
      if(!keys.length) return 0;
      return Math.round(keys.reduce(function(s,k){ return s+(all[k].bestPct||0); },0) / keys.length);
    }
  };

  var Memo = {
    getAll: function(){
      try{ return JSON.parse(localStorage.getItem(MEMO_KEY)) || {}; }catch(e){ return {}; }
    },
    get: function(id){ return this.getAll()[id] || null; },
    save: function(id, data){
      var all = this.getAll();
      all[id] = Object.assign({}, all[id]||{}, data);
      localStorage.setItem(MEMO_KEY, JSON.stringify(all));
      return all[id];
    },
    remove: function(id){
      var all = this.getAll(); delete all[id];
      localStorage.setItem(MEMO_KEY, JSON.stringify(all));
    }
  };

  w.Progress = Progress;
  w.Memo     = Memo;
})(window);

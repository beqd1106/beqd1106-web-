// Dify 操作トレーニングのお題と採点（画面とは別にしておく）
export const TASKS = [
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
  {
    id: "d4", app: "workflow", title: "外部APIを呼んで答える（失敗に備える）",
    goal: "入力した都市の天気をAPIから取ってきて、ひとことで返すワークフローを作ります。APIが止まっていても全体は止めません。",
    steps: [
      "ユーザー入力に、短いテキストの入力欄 city を追加する",
      "「＋ブロック」から HTTPリクエスト を追加し、メソッド GET、URLに https://api.example.com/weather?city= と書いて「/」で {{ユーザー入力.city}} を差し込む",
      "HTTPリクエストのエラー処理を「デフォルト値」にし、デフォルト値に知らせる文を書く",
      "LLM を追加してHTTPリクエストからつなぎ、プロンプトで {{HTTPリクエスト.body}} を参照する",
      "出力 を追加してLLMからつなぎ、変数 answer に LLM.text を選ぶ",
      "「テスト実行」で確かめる（APIが応答しない状況でも自動チェック）",
    ],
    sample: { city: "札幌", apiDown: true },
    checks: (g) => {
      const s = g.byType("start")[0], h = g.byType("http")[0], llm = g.byType("llm")[0], out = g.byType("output")[0];
      const f = s?.cfg.fields.find((x) => x.name === "city");
      return [
        { ok: !!f, label: "ユーザー入力に入力欄 city がある", hint: "ユーザー入力を選び「＋入力欄」で city を追加します（都市名なので短いテキストで十分）。" },
        { ok: !!h && g.connected(s, h), label: "ユーザー入力 → HTTPリクエスト がつながっている", hint: "ユーザー入力の右の丸 → HTTPリクエストの順にタップします。" },
        { ok: h?.cfg.method === "GET", label: "メソッドが GET", hint: "データを取ってくるだけなので GET を選びます（POSTは送信、PATCHは一部更新）。" },
        { ok: !!h && /\{\{ユーザー入力\.city\}\}/.test(h.cfg.url) && /^https?:\/\//.test(h.cfg.url.trim()), label: "URLに city を差し込んでいる", hint: "URL欄で https://… の後ろに「/」を入力し、ユーザー入力.city を選びます。" },
        { ok: h?.cfg.onError === "デフォルト値" && h.cfg.fallback.trim().length >= 4, label: "エラー処理がデフォルト値で、知らせる文が入っている", hint: "エラー処理を「なし」のままにすると、APIが止まったときにワークフロー全体が止まります。" },
        { ok: !!llm && g.connected(h, llm) && /\{\{HTTPリクエスト\.body\}\}/.test(llm.cfg.user + llm.cfg.system), label: "LLMが HTTPリクエスト.body を参照している", hint: "LLMのプロンプトで「/」→ HTTPリクエスト.body を選びます。" },
        { ok: !!out && g.connected(llm, out) && out.cfg.vars.some((v) => v.name === "answer" && v.ref === "LLM.text"), label: "出力の answer が LLM.text を指している", hint: "出力ノードで「＋変数」→ 名前 answer、値 LLM.text にします。" },
      ];
    },
  },
];

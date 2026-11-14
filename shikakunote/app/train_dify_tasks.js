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
        { ok: !!f, label: "ユーザー入力に入力欄 text がある", hint: "ユーザー入力をクリックし、右の設定で「入力フィールドを追加」→ 変数名 text を入れます。" , target: ["#dx-fadd", ".dx-node[data-type=\"start\"]"], learn: "「ユーザー入力」は、アプリを使う人が文字を入れる入口です。まずブロックをクリックして、右に出る設定で「入力フィールドを追加」を押し、変数名に text と入れます。" },
        { ok: f?.type === "paragraph", label: "text の種類が「段落」", hint: "長い文章を受けるので「段落」にします（短いテキストは256文字まで）。" , target: ["[data-ft=\"0\"]", ".dx-node[data-type=\"start\"]"], learn: "「段落」は長い文章を入れる欄です（短いテキストは256文字まで）。要約したい文章は長いので段落にします。" },
        { ok: !!llm && g.connected(s, llm), label: "ユーザー入力 → LLM がつながっている", hint: "ユーザー入力の右の青い「＋」から LLM を選びます。" , target: [".dx-bi[data-t=\"llm\"]", ".dx-node[data-type=\"llm\"]", "[data-plus-type=\"start\"]"], learn: "「LLM」は文章を考えて作るAIのブロックです。ユーザー入力の右の青い「＋」を押して、一覧から LLM を選ぶと、後ろに追加されて線でつながります。" },
        { ok: !!llm && /\{\{ユーザー入力\.text\}\}/.test(llm.cfg.user), label: "LLMのプロンプトで text を参照している", hint: "LLMのUSER欄で「{x} 変数を挿入」（または「/」）→ ユーザー入力.text を選びます。" , target: ["[data-ins=\"dx-user\"]", ".dx-node[data-type=\"llm\"]"], learn: "プロンプトはAIへのお願い文です。USER欄に「次の文章を3行で要約して」などと書き、「{x} 変数を挿入」で ユーザー入力.text を選ぶと、入力された文章が差し込まれます。" },
        { ok: !!out && g.connected(llm, out), label: "LLM → 出力 がつながっている", hint: "LLMの右の青い「＋」から 出力 を選びます。" , target: [".dx-bi[data-t=\"output\"]", ".dx-node[data-type=\"output\"]", "[data-plus-type=\"llm\"]"], learn: "「出力」は、できた結果を呼び出した人に返すブロックです。LLMの右の「＋」から 出力 を選びます。" },
        { ok: !!out && out.cfg.vars.some((v) => v.name === "summary" && v.ref === "LLM.text"), label: "出力の変数 summary が LLM.text を指している", hint: "出力をクリックし「出力変数を追加」→ 名前 summary、値に LLM.text を選びます。" , target: ["[data-vr=\"0\"]", "#dx-vadd", ".dx-node[data-type=\"output\"]"], learn: "出力変数は返す結果の名前です。「出力変数を追加」で名前に summary、値に LLM.text（LLMが作った文章）を選びます。" },
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
        { ok: !!kn && g.connected(s, kn), label: "ユーザー入力 → 知識検索 がつながっている", hint: "ユーザー入力の右の青い「＋」から 知識検索 を選びます。" , target: [".dx-bi[data-t=\"knowledge\"]", ".dx-node[data-type=\"knowledge\"]", "[data-plus-type=\"start\"]"], learn: "「知識検索」は、登録した社内資料（ナレッジ）から質問に関係する部分を探すブロックです。ユーザー入力の右の「＋」から選びます。" },
        { ok: kn?.cfg.query === "userinput.query", label: "検索語が userinput.query", hint: "Chatflowでは利用者のメッセージが userinput.query に入ります。" , target: ["#dx-q2", ".dx-node[data-type=\"knowledge\"]"], learn: "Chatflowでは、利用者が送ったメッセージが userinput.query に入ります。それを検索の言葉（クエリ）にします。" },
        { ok: kn?.cfg.kb === "就業規則", label: "ナレッジが「就業規則」", hint: "知識検索の「ナレッジ」で就業規則を選びます。" , target: ["#dx-kb", ".dx-node[data-type=\"knowledge\"]"], learn: "どの資料から探すかを選びます。今回は「就業規則」です。" },
        { ok: !!llm && g.connected(kn, llm), label: "知識検索 → LLM がつながっている", hint: "知識検索の右の青い「＋」から LLM を選びます。" , target: [".dx-bi[data-t=\"llm\"]", ".dx-node[data-type=\"llm\"]", "[data-plus-type=\"knowledge\"]"], learn: "見つけた資料をもとに、AI（LLM）に答えを書かせます。知識検索の右の「＋」から LLM を選びます。" },
        { ok: llm?.cfg.context === "知識検索.result", label: "LLMのコンテキストが 知識検索.result", hint: "検索結果はLLMの「コンテキスト」に入れると、出典付きで答えます。" , target: ["#dx-ctx", ".dx-node[data-type=\"llm\"]"], learn: "「コンテキスト」にAIが参考にする資料を入れます。知識検索.result（検索結果）を選ぶと、資料にもとづいて答えます。" },
        { ok: !!ans && g.connected(llm, ans) && /\{\{LLM\.text\}\}/.test(ans.cfg.text), label: "LLM → 回答 がつながり、本文で LLM.text を返している", hint: "回答をクリックし、回答欄で「{x} 変数を挿入」→ LLM.text を選びます。" , target: ["[data-ins=\"dx-ans\"]", ".dx-bi[data-t=\"answer\"]", ".dx-node[data-type=\"answer\"]", "[data-plus-type=\"llm\"]"], learn: "「回答」はチャットに返事を表示するブロックです。LLMの右の「＋」から追加し、回答欄で「{x} 変数を挿入」→ LLM.text を選びます。" },
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
        { ok: !!c && g.connected(s, c), label: "ユーザー入力 → 質問分類器 がつながっている", hint: "ユーザー入力の右の青い「＋」から 質問分類器 を選びます。" , target: [".dx-bi[data-t=\"classifier\"]", ".dx-node[data-type=\"classifier\"]", "[data-plus-type=\"start\"]"], learn: "「質問分類器」は、質問の意味をAIが読んで、決めた種類（クラス）ごとに道を分けるブロックです。ユーザー入力の右の「＋」から選びます。" },
        { ok: c?.cfg.input === "userinput.query", label: "分類する入力が userinput.query", hint: "質問分類器の「入力変数」で userinput.query を選びます。" , target: ["#dx-ci", ".dx-node[data-type=\"classifier\"]"], learn: "何を分類するかを選びます。利用者のメッセージ userinput.query を選びます。" },
        { ok: allClasses && titles.length === 3, label: "クラスが 返品／使い方／その他 の3つ", hint: "「クラスを追加」で3つにし、タイトルを 返品・使い方・その他 にします。本文にはAIが判断に使う説明を書けます。" , target: ["#dx-cadd", "[data-ct=\"0\"]", ".dx-node[data-type=\"classifier\"]"], learn: "クラスは分ける先の種類です。「クラスを追加」で3つにし、タイトルを 返品・使い方・その他 にします（説明欄にはAIが判断に使う説明を書けます）。" },
        { ok: wired, label: "各クラスの出口が、それぞれ回答ノードにつながっている", hint: "左下の「＋ブロック」で回答を3つ追加し、分類器の各クラスの右の丸 → 回答 の順にクリックしてつなぎます。" , target: [".dx-bi[data-t=\"answer\"]", ".dx-node[data-type=\"classifier\"] .dx-port-c", "#dx-add"], learn: "分類器のクラスごとに返事を用意します。左下の「＋ブロック」で 回答 を3つ追加し、分類器の各クラスの右の丸 → つなぎたい回答 の順にクリックしてつなぎます。" },
        { ok: filled, label: "3つの回答に返事が書かれている", hint: "各回答ノードを選び、本文にそのクラス向けの返事を書きます。" , target: ["[data-ins=\"dx-ans\"]", ".dx-node[data-type=\"answer\"]"], learn: "各回答ブロックをクリックして、そのクラス向けの返事（例：返品は30日以内に承ります）を書きます。" },
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
        { ok: !!f, label: "ユーザー入力に入力欄 city がある", hint: "ユーザー入力をクリック →「入力フィールドを追加」→ 変数名 city（都市名なので短いテキストで十分）。" , target: ["#dx-fadd", ".dx-node[data-type=\"start\"]"], learn: "都市名を入れてもらう欄を作ります。ユーザー入力をクリック →「入力フィールドを追加」→ 変数名 city。" },
        { ok: !!h && g.connected(s, h), label: "ユーザー入力 → HTTPリクエスト がつながっている", hint: "ユーザー入力の右の青い「＋」→ ユーティリティの HTTPリクエスト を選びます。" , target: [".dx-bi[data-t=\"http\"]", ".dx-node[data-type=\"http\"]", "[data-plus-type=\"start\"]"], learn: "「HTTPリクエスト」は、外部のサービス（API）に問い合わせてデータを取ってくるブロックです。ユーザー入力の右の「＋」→ ユーティリティの HTTPリクエスト。" },
        { ok: h?.cfg.method === "GET", label: "メソッドが GET", hint: "データを取ってくるだけなので GET を選びます（POSTは送信、PATCHは一部更新）。" , target: ["#dx-hm", ".dx-node[data-type=\"http\"]"], learn: "GETは「データをください」という取り方です。天気を取ってくるだけなので GET にします。" },
        { ok: !!h && /\{\{ユーザー入力\.city\}\}/.test(h.cfg.url) && /^https?:\/\//.test(h.cfg.url.trim()), label: "URLに city を差し込んでいる", hint: "URL欄に https://… と入れ、続けて「{x} 変数を挿入」→ ユーザー入力.city を選びます。" , target: ["[data-ins=\"dx-hu\"]", ".dx-node[data-type=\"http\"]"], learn: "URL欄に https://api.example.com/weather?city= と入れ、続けて「{x} 変数を挿入」で ユーザー入力.city を差し込みます。入力された都市名がURLに入ります。" },
        { ok: h?.cfg.onError === "デフォルト値" && h.cfg.fallback.trim().length >= 4, label: "エラー処理がデフォルト値で、知らせる文が入っている", hint: "エラー処理を「なし」のままにすると、APIが止まったときにワークフロー全体が止まります。" , target: ["#dx-hf", "#dx-he", ".dx-node[data-type=\"http\"]"], learn: "外部のサービスは止まることがあります。エラー処理を「デフォルト値」にして、代わりに返す文（例：天気を取得できませんでした）を書くと、止まっても全体は止まりません。" },
        { ok: !!llm && g.connected(h, llm) && /\{\{HTTPリクエスト\.body\}\}/.test(llm.cfg.user + llm.cfg.system), label: "LLMが HTTPリクエスト.body を参照している", hint: "LLMのUSER欄で「{x} 変数を挿入」→ HTTPリクエスト.body を選びます。" , target: ["[data-ins=\"dx-user\"]", ".dx-bi[data-t=\"llm\"]", ".dx-node[data-type=\"llm\"]", "[data-plus-type=\"http\"]"], learn: "取ってきたデータ（HTTPリクエスト.body）をAIにわかりやすく言い直してもらいます。HTTPリクエストの右の「＋」→ LLM、USER欄で HTTPリクエスト.body を差し込みます。" },
        { ok: !!out && g.connected(llm, out) && out.cfg.vars.some((v) => v.name === "answer" && v.ref === "LLM.text"), label: "出力の answer が LLM.text を指している", hint: "出力をクリック →「出力変数を追加」→ 名前 answer、値 LLM.text にします。" , target: ["[data-vr=\"0\"]", "#dx-vadd", ".dx-bi[data-t=\"output\"]", ".dx-node[data-type=\"output\"]", "[data-plus-type=\"llm\"]"], learn: "最後に 出力 を追加し、出力変数 answer に LLM.text を選びます。" },
      ];
    },
  },
];

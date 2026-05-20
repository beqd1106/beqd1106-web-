const DATA = [
{
  id:'hubspot', diff:1, dlabel:'入門', free:true,
  name:'HubSpot Academy 認定資格', org:'HubSpot',
  hours:'5〜15時間（各種）', rate:'比較的高め', cost:'無料',
  chapters:[
    { title:'Chapter 1｜インバウンドマーケティングの本質', body:`
<h4>なぜ今インバウンドが主流なのか</h4>
<p>テレビCMに1000万円かけても、興味のない人に届くだけです。現代の消費者は広告をスキップし、自分で検索して情報を集めます。ここに<span class="kw">インバウンドマーケティング</span>の核心があります。</p>
<table class="tbl">
  <tr><th>アウトバウンド（押し付け型）</th><th>インバウンド（引き寄せ型）</th></tr>
  <tr><td>テレビCM・飛び込み営業・ダイレクトメール</td><td>ブログ・SEO・SNS・動画コンテンツ</td></tr>
  <tr><td>興味のない人にも届ける</td><td>求めている人が自ら見つける</td></tr>
  <tr><td>効果測定が難しい</td><td>データで正確に測定できる</td></tr>
</table>
<div class="memory"><strong>覚え方：「行列のラーメン屋 vs ビラ配りのお店」</strong><br>インバウンドは行列ができる名店。おいしい情報（コンテンツ）を出し続けることで、お客様が自ら来てくれます。</div>
<h4>フライホイール（Flywheel）モデル</h4>
<table class="tbl">
  <tr><th>フェーズ</th><th>目的</th><th>主な手法</th></tr>
  <tr><td><span class="kw">Attract（引き付ける）</span></td><td>見知らぬ人→訪問者</td><td>SEO・ブログ・SNS</td></tr>
  <tr><td><span class="kw">Engage（関係を深める）</span></td><td>訪問者→リード→顧客</td><td>メール・LP・ウェビナー</td></tr>
  <tr><td><span class="kw">Delight（喜ばせる）</span></td><td>顧客→プロモーター</td><td>サポート・コミュニティ</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：「Attract・Engage・Delight」の3フェーズと、顧客がプロモーターになって次の集客を生む好循環がキーワードです。頭文字「AED」で覚えましょう。</div>
` },
    { title:'Chapter 2｜バイヤーズジャーニーとペルソナ', body:`
<h4>バイヤーズジャーニー（Buyer\'s Journey）</h4>
<p>顧客は「困った」から「よし買おう」まで3段階の旅をします。各段階に合わせたコンテンツを用意しないと途中で離脱されます。</p>
<table class="tbl">
  <tr><th>段階</th><th>顧客の状態</th><th>最適なコンテンツ</th></tr>
  <tr><td><span class="kw">認知（Awareness）</span></td><td>問題・課題に気づく段階</td><td>ハウツーブログ・解説動画</td></tr>
  <tr><td><span class="kw">検討（Consideration）</span></td><td>解決策を比較・調べる段階</td><td>比較記事・ウェビナー・事例集</td></tr>
  <tr><td><span class="kw">決定（Decision）</span></td><td>特定の製品・会社を選ぶ段階</td><td>無料トライアル・デモ・価格表</td></tr>
</table>
<h4>ペルソナ（Buyer Persona）</h4>
<p>「誰でも」に向けたコンテンツは誰にも刺さりません。<span class="kw">ペルソナ</span>は実在しそうな特定の1人を描いた理想顧客像です。</p>
<div style="background:#f8fafc;border-radius:8px;padding:14px;margin:10px 0;font-size:.85rem;">
  <strong>ペルソナ例：田中さゆり（32歳・ITマーケ担当3年目）</strong><br>
  課題：データ分析が苦手でレポート作成に毎週3時間かかる。目標：上司に「数字で話せるマーケター」と評価されたい。情報収集：Googleで検索・LinkedInを週3回チェック。
</div>
<div class="warn"><strong>よくある間違い</strong>：ペルソナを「30〜40代の働く女性」など曖昧に設定しがちです。名前・年齢・具体的な悩みまで決めることで、コンテンツの判断基準になります。</div>
<div class="tip"><strong>試験ポイント</strong>：ジャーニーの3段階の順番と各段階に合うコンテンツが問われます。「Awarenessに価格ページを見せても早すぎる」という判断問題が頻出です。</div>
` },
    { title:'Chapter 3｜コンテンツマーケティングとSEO', body:`
<h4>コンテンツは「資産」になる</h4>
<p>広告は出稿をやめれば集客がゼロになります。コンテンツは一度作ると資産として積み上がり、何年も検索流入を生み続けます。</p>
<h4>トピッククラスター戦略</h4>
<table class="tbl">
  <tr><th>要素</th><th>役割</th><th>例</th></tr>
  <tr><td><span class="kw">ピラーページ</span></td><td>テーマ全体を網羅する包括的ページ</td><td>「SEO完全ガイド2026年版」</td></tr>
  <tr><td><span class="kw">クラスターコンテンツ</span></td><td>サブトピックを深掘りするブログ記事群</td><td>「titleタグの書き方」「被リンク獲得方法」</td></tr>
  <tr><td><span class="kw">内部リンク</span></td><td>クラスター→ピラーへのリンクで評価を集約</td><td>各記事からピラーへ誘導</td></tr>
</table>
<h4>コンテンツの種類と活用場面</h4>
<table class="tbl">
  <tr><th>種類</th><th>ジャーニー段階</th><th>目的</th></tr>
  <tr><td>ブログ記事・ハウツー動画</td><td>Awareness</td><td>SEO流入・問題提起</td></tr>
  <tr><td>比較記事・ウェビナー・eBook</td><td>Consideration</td><td>リード獲得・教育</td></tr>
  <tr><td>事例集・無料トライアル</td><td>Decision</td><td>購買意欲の後押し</td></tr>
</table>
<div class="tip"><strong>良いコンテンツの3条件</strong>：①バイヤーズジャーニーの段階に合っている ②顧客の具体的な質問に答えている ③次の行動を促すCTA（Call To Action）がある</div>
` },
    { title:'Chapter 4｜リード獲得とナーチャリング', body:`
<h4>リード（Lead）とは</h4>
<p>メールアドレスなど情報を提供した見込み客を<span class="kw">リード</span>と呼びます。訪問者がリードになった瞬間から関係を深めるナーチャリングが始まります。</p>
<h4>MQLとSQL</h4>
<table class="tbl">
  <tr><th>種類</th><th>意味</th><th>次のアクション</th></tr>
  <tr><td><span class="kw">MQL</span>（Marketing Qualified Lead）</td><td>マーケが育成すべきリード（まだ購買準備できていない）</td><td>メール・コンテンツでナーチャリング</td></tr>
  <tr><td><span class="kw">SQL</span>（Sales Qualified Lead）</td><td>営業がアプローチすべきリード（購買意欲が高い）</td><td>営業担当が直接コンタクト</td></tr>
</table>
<h4>リードスコアリング</h4>
<p>行動に点数をつけてSQLへの昇格タイミングを判断します。例：資料DL(+10点)・価格ページ閲覧(+15点)・メール開封(+3点)→80点到達で営業へ引き渡し。</p>
<h4>リードマグネット（情報収集の仕掛け）</h4>
<ul>
  <li>無料eBook・ホワイトペーパー</li>
  <li>無料ツール・テンプレート</li>
  <li>ウェビナー・オンラインセミナー参加権</li>
  <li>無料トライアル・デモ申し込み</li>
</ul>
<div class="memory"><strong>覚え方</strong>：MQL→SQL→成約は「見込み→脈あり→成約」の3段階。M（マーケ担当）とS（Sales営業担当）が管理する段階を表します。</div>
` },
    { title:'Chapter 5｜CRM・マーケティングオートメーション', body:`
<h4>CRM（Customer Relationship Management）</h4>
<p><span class="kw">CRM</span>は顧客情報を一元管理するシステムです。「いつ・誰が・どのページを見て・何を買ったか」がすべて記録され、顧客との関係を長期管理します。HubSpot CRMは基本機能が無料です。</p>
<h4>MA（Marketing Automation）</h4>
<p><span class="kw">MA</span>はメール配信・リードスコアリング・ワークフロー実行などを自動化するツールです。1万人のリードに個別最適なタイミングでメッセージを送ることが実現できます。</p>
<h4>自動化ワークフローの実例</h4>
<table class="tbl">
  <tr><th>トリガー</th><th>自動アクション</th></tr>
  <tr><td>eBookをダウンロードした</td><td>即座にお礼メール→3日後にフォローメール送信</td></tr>
  <tr><td>価格ページを2回閲覧した</td><td>スコア+15点→80点超えたら営業に通知</td></tr>
  <tr><td>メールを7日間未開封</td><td>件名を変えた別バージョンを再送</td></tr>
</table>
<h4>CRM・MA・SFAの違い</h4>
<table class="tbl">
  <tr><th>ツール</th><th>役割</th></tr>
  <tr><td>CRM</td><td>顧客情報管理・商談管理</td></tr>
  <tr><td>MA</td><td>マーケティング業務の自動化・リード育成</td></tr>
  <tr><td>SFA</td><td>営業活動支援・売上予測</td></tr>
</table>
<div class="exam"><strong>試験頻出</strong>：CRM・MA・SFAの違いを整理しましょう。HubSpotはこの3つを統合したプラットフォームです。</div>
` },
    { title:'Chapter 6｜重要キーワード総まとめ', body:`
<h4>試験に出る最重要用語</h4>
<table class="tbl">
  <tr><th>用語</th><th>一言定義</th></tr>
  <tr><td>インバウンドマーケティング</td><td>価値あるコンテンツで顧客を自然に引き寄せる手法</td></tr>
  <tr><td>フライホイール</td><td>Attract→Engage→Delightの好循環モデル</td></tr>
  <tr><td>バイヤーズジャーニー</td><td>Awareness→Consideration→Decisionの3段階</td></tr>
  <tr><td>ペルソナ</td><td>理想顧客の詳細な人物像</td></tr>
  <tr><td>リードマグネット</td><td>リード獲得のための価値あるコンテンツ</td></tr>
  <tr><td>MQL</td><td>マーケが育成するリード段階</td></tr>
  <tr><td>SQL</td><td>営業がアプローチするリード段階</td></tr>
  <tr><td>リードスコアリング</td><td>行動に点数をつけてSQL昇格タイミングを判断</td></tr>
  <tr><td>CRM</td><td>顧客情報の一元管理システム</td></tr>
  <tr><td>MA</td><td>マーケティング業務の自動化ツール</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：HubSpot Academyは動画視聴後にテストを受けるスタイル。動画内で「3つのフェーズ」「5つのステップ」のように番号付きで出る内容は必ずメモしましょう。インバウンド認定資格が最初に受けるべき基本資格です。</div>
` }
  ],
  quiz:[
    { q:'インバウンドマーケティングの説明として最も適切なものはどれか。', choices:['A. テレビCMや電話営業など企業が一方的に顧客へ情報を届ける手法','B. 価値あるコンテンツを提供することで顧客が自ら引き寄せられる手法','C. 大量メールを一斉送信して素早く認知を広げる手法','D. 展示会・イベントへの出展を中心とした対面型営業手法'], answer:1, explanation:'インバウンドマーケティングはHubSpotが提唱する「プル型」マーケティングです。ブログ・SEO・SNSなど価値あるコンテンツで顧客を自然に引き寄せます。A・C・Dはすべてアウトバウンドマーケティングの手法で、押し付け型という点が本質的な違いです。現代の消費者は広告をスキップするため、求められた時に見つけてもらうインバウンドが主流になっています。' },
    { q:'HubSpotのフライホイール3フェーズの正しい順序はどれか。', choices:['A. Engage → Attract → Delight','B. Attract → Engage → Delight','C. Delight → Engage → Attract','D. Attract → Delight → Engage'], answer:1, explanation:'フライホイールはAttract（引き付ける）→Engage（関係を深める）→Delight（喜ばせる）の順です。「AED」と頭文字で覚えましょう。最終的にプロモーター（推薦者）になった顧客が口コミで新たな訪問者を呼び込み、フライホイールが回り続けるのがポイントです。従来のファネルモデルと違い、顧客が中心となる循環型モデルです。' },
    { q:'バイヤーズジャーニー「検討（Consideration）」段階に最適なコンテンツはどれか。', choices:['A. 業界課題を紹介するハウツーブログ記事','B. 競合ツールとの詳細な比較記事やウェビナー','C. 無料デモや価格ページへの直接誘導','D. 会社概要や採用情報ページ'], answer:1, explanation:'Consideration（検討）段階の顧客は「解決策の種類を調べている」状態です。この段階に最適なのは比較記事・事例集・ウェビナーなど解決策を選ぶための情報です。Aは問題提起のAwareness段階向け、CはDecision（決定）段階向けです。段階に合わないコンテンツを出すと顧客は「まだそこじゃない」と感じて離脱します。' },
    { q:'MQL（Marketing Qualified Lead）の説明として正しいものはどれか。', choices:['A. 購入意思を示した顧客で今すぐ営業が電話すべきリード','B. まだ購買準備ができておらずマーケティングで育成すべきリード','C. 過去に購入した既存顧客のリスト','D. SNS広告のターゲティングリスト'], answer:1, explanation:'MQLはMarketing Qualified Leadの略で、マーケティング活動（コンテンツ・メール）で育成すべき段階のリードです。まだ購買準備ができていない点がポイントです。スコアが高まりSQLになった時点で営業へ引き渡します。Aは購買意欲が高いSQLの説明です。MとSの頭文字はそれぞれMarketing（マーケ担当）とSales（営業担当）が管理することを表しています。' },
    { q:'CRM（Customer Relationship Management）の主な目的として正しいものはどれか。', choices:['A. 広告費を最適化して新規顧客獲得コストを最小化する','B. 顧客情報を一元管理し長期的な関係を強化してLTVを最大化する','C. 検索エンジンでの上位表示を実現するためのSEOツール','D. 競合他社の価格動向を自動収集する'], answer:1, explanation:'CRMは顧客との関係を長期的に管理するシステムです。「いつ・誰が・何を・どのように」を一元管理し、顧客生涯価値（LTV）の最大化を目指します。A.は広告運用、C.はSEO、D.は競合分析ツールの目的です。HubSpot CRMは無料で使えるため、スタートアップから大企業まで広く活用されています。' },
    { q:'リードナーチャリングの説明として正しいものはどれか。', choices:['A. 広告費を使ってリードを大量獲得するプロセス','B. 購買準備ができていないリードを教育・情報提供によって段階的に育てるプロセス','C. 既存顧客にアップセルを提案するプロセス','D. 顧客満足度調査を定期的に実施するプロセス'], answer:1, explanation:'リードナーチャリングは「まだ買う気がない」見込み客を、役立つコンテンツやメールで時間をかけて育てるプロセスです。BtoB企業では意思決定に数ヶ月かかることも多く、すぐ売り込まずに信頼を築くことが重要です。リードスコアリングと組み合わせて「熟したら営業へ」と最適なタイミングを狙います。' },
    { q:'ピラーページとクラスターコンテンツの関係として正しいものはどれか。', choices:['A. ピラーは商品ページ、クラスターは価格比較ページ','B. ピラーはテーマ全体を包括するページで、クラスターはサブトピックを深掘りする記事群','C. ピラーは採用ページ、クラスターはコーポレートサイト','D. 両者は同じ意味で使われる言葉'], answer:1, explanation:'トピッククラスター戦略では、ピラーページが「SEO完全ガイド」のようにテーマ全体を網羅し、クラスターコンテンツが「titleタグの書き方」「被リンク獲得術」のように各サブトピックを深掘りします。クラスターがピラーへ内部リンクすることでSEO評価が集約され、上位表示しやすくなります。HubSpotが提唱するコンテンツ戦略の中核です。' },
    { q:'フライホイールモデルが従来のファネルモデルと異なる最大の特徴はどれか。', choices:['A. フライホイールは見込み客の獲得フェーズだけに特化している','B. 満足した顧客がプロモーターとなり新たな集客を生む好循環を表している','C. フライホイールはオフラインマーケティング専用モデルである','D. フライホイールはB2B企業のみに適用できるモデルである'], answer:1, explanation:'フライホイールモデルの最大の特徴は、顧客の成功体験が口コミとなり新たな訪問者を呼び込む好循環（フライホイール）です。従来のファネルは顧客獲得で「終わり」でしたが、フライホイールは顧客満足がDelightフェーズを経てAttractへとつながり続けます。B2B・B2Cどちらにも適用できる現代マーケティングの考え方です。' }
  ]
},

{
  id:'google_ads', diff:1, dlabel:'入門', free:true,
  name:'Google 広告認定資格（各種）', org:'Google（Skillshop）',
  hours:'10〜20時間（各種）', rate:'非公開', cost:'無料',
  chapters:[
    { title:'Chapter 1｜Google広告の仕組みとオークション', body:`
<h4>Google広告は「リアルタイムの競り市」</h4>
<p>誰かがGoogleで検索するたびに、コンマ数秒でオークションが行われます。入札額が一番高い広告主が1位になるわけではなく、<strong>品質も加味したスコア（広告ランク）</strong>で順位が決まります。</p>
<div class="formula">広告ランク ＝ 入札額 × 品質スコア × 広告表示オプションの影響</div>
<div class="memory"><strong>覚え方</strong>：「高品質の店は目立つ場所に置かれる」。品質スコア10点なら、入札額が半分でも品質スコア5点の競合と同じ広告ランクになります（10×100円 ＝ 5×200円）。</div>
<h4>アカウントの階層構造</h4>
<table class="tbl">
  <tr><th>レベル</th><th>設定内容</th><th>例</th></tr>
  <tr><td>アカウント</td><td>支払い情報・全体設定</td><td>株式会社ABCのGoogleアカウント</td></tr>
  <tr><td>キャンペーン</td><td>目的・日予算・地域・ネットワーク</td><td>「春の新商品プロモーション」</td></tr>
  <tr><td>広告グループ</td><td>関連キーワードと広告をまとめる</td><td>「英会話スクール 渋谷」グループ</td></tr>
  <tr><td>広告・キーワード</td><td>実際に表示される広告文とキーワード</td><td>「渋谷 英会話 初心者」など</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：広告ランクの計算式は必須。「入札額だけでは上位表示できない＝品質スコアが重要」という原則を理解してください。</div>
` },
    { title:'Chapter 2｜キーワードとマッチタイプ', body:`
<h4>マッチタイプは「釣りの網の目の粗さ」</h4>
<p>目の細かい網（完全一致）は狙った魚だけ、粗い網（部分一致）は関連する魚も一緒に入ります。</p>
<table class="tbl">
  <tr><th>マッチタイプ</th><th>設定方法</th><th>表示範囲</th><th>使いどころ</th></tr>
  <tr><td><span class="kw">完全一致</span></td><td>[英会話 渋谷]</td><td>ほぼそのキーワードのみ</td><td>コンバージョン重視・予算が限られる</td></tr>
  <tr><td><span class="kw">フレーズ一致</span></td><td>"英会話 渋谷"</td><td>フレーズを含む検索（前後に語句追加可）</td><td>ある程度意図を絞りたい</td></tr>
  <tr><td><span class="kw">部分一致</span></td><td>英会話 渋谷（そのまま）</td><td>関連する幅広い検索（類義語も含む）</td><td>認知拡大・新キーワード発掘</td></tr>
</table>
<h4>除外キーワードで無駄を省く</h4>
<p>例：英会話スクールの広告で「英会話 独学」「英会話 無料」を除外すると、購買意欲のある人にのみ広告を表示できます。</p>
<div class="warn"><strong>よくある失敗</strong>：部分一致のみで運用すると関係ない検索に広告が表示されます。「検索語句レポート」で実際の検索クエリを確認し、不要なものを除外キーワードに追加する作業が必須です。</div>
<div class="exam"><strong>試験頻出</strong>：[ ]で囲むと完全一致、""で囲むとフレーズ一致、何もしないと部分一致。この3つの設定方法と特徴は確実に覚えてください。</div>
` },
    { title:'Chapter 3｜品質スコアの3要素と改善方法', body:`
<h4>品質スコア（1〜10点）とは</h4>
<p>品質スコアが高いほど、低い入札額でも上位表示でき、クリック単価（CPC）も安くなります。</p>
<table class="tbl">
  <tr><th>要素</th><th>評価内容</th><th>改善方法</th></tr>
  <tr><td><span class="kw">①推定クリック率（CTR）</span></td><td>この広告はクリックされそうか</td><td>魅力的な見出し・数字の活用・明確なCTA</td></tr>
  <tr><td><span class="kw">②広告の関連性</span></td><td>キーワードと広告文が一致しているか</td><td>広告グループを細分化・キーワードを広告文に含める</td></tr>
  <tr><td><span class="kw">③ランディングページの利便性</span></td><td>遷移後のページは使いやすいか</td><td>ページ速度改善・キーワードに関連するコンテンツ配置</td></tr>
</table>
<h4>品質スコアの違いによる費用差（実例）</h4>
<table class="tbl">
  <tr><th>広告主</th><th>入札額</th><th>品質スコア</th><th>広告ランク</th><th>結果</th></tr>
  <tr><td>A社（あなた）</td><td>100円</td><td>10点</td><td>1000</td><td>上位表示！</td></tr>
  <tr><td>B社（競合）</td><td>200円</td><td>4点</td><td>800</td><td>下位に…</td></tr>
</table>
<p>A社はB社の半分の入札額でも品質スコアが2.5倍あるため上位に表示できます。品質スコア向上は費用対効果を劇的に改善します。</p>
<div class="tip"><strong>試験ポイント</strong>：品質スコアの3要素「推定CTR・広告の関連性・ランディングページの利便性」は超頻出問題です。3つの要素名を正確に覚えましょう。</div>
` },
    { title:'Chapter 4｜レスポンシブ検索広告（RSA）と広告アセット', body:`
<h4>レスポンシブ検索広告（RSA）とは</h4>
<p>現在のGoogle広告の標準フォーマット。最大15個の見出し・4個の説明文を入力すると、GoogleのAIが自動で最適な組み合わせを選択・テストします。</p>
<table class="tbl">
  <tr><th>要素</th><th>最大入力数</th><th>文字数制限</th><th>実際の表示数</th></tr>
  <tr><td>見出し</td><td>15個（最低3個必須）</td><td>各30文字以内</td><td>2〜3個表示</td></tr>
  <tr><td>説明文</td><td>4個（最低2個必須）</td><td>各90文字以内</td><td>1〜2個表示</td></tr>
</table>
<h4>効果的な見出しの作り方</h4>
<table class="tbl">
  <tr><th>種類</th><th>例</th></tr>
  <tr><td>キーワードを含む</td><td>「渋谷の英会話スクール｜無料体験あり」</td></tr>
  <tr><td>数字を使う</td><td>「3ヶ月で日常会話が話せる」</td></tr>
  <tr><td>ベネフィット訴求</td><td>「ネイティブ講師が丁寧に指導」</td></tr>
  <tr><td>緊急性・限定性</td><td>「今月限定キャンペーン実施中」</td></tr>
</table>
<h4>広告アセット（拡張機能）の種類</h4>
<table class="tbl">
  <tr><th>アセット名</th><th>役割</th></tr>
  <tr><td>サイトリンク</td><td>追加リンクで関連ページへ誘導（「料金案内」「無料体験申込」など）</td></tr>
  <tr><td>コールアウト</td><td>短い訴求文を追加（「送料無料」「24時間対応」「創業20年」）</td></tr>
  <tr><td>電話番号</td><td>電話番号を広告に表示。スマホから直接発信できる</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：RSAは「最大15見出し・最大4説明文」という数字が頻出。広告アセット（拡張機能）の有無も広告ランクに影響します。</div>
` },
    { title:'Chapter 5｜入札戦略の選び方', body:`
<h4>主要な自動入札戦略</h4>
<table class="tbl">
  <tr><th>戦略名</th><th>Googleの目標</th><th>使うシーン</th></tr>
  <tr><td><span class="kw">コンバージョン数の最大化</span></td><td>予算内でCV数を最大化</td><td>CVデータが蓄積されたアカウント</td></tr>
  <tr><td><span class="kw">目標コンバージョン単価（tCPA）</span></td><td>目標CPA内でCV数を最大化</td><td>「1件あたり5,000円以内で獲得したい」時</td></tr>
  <tr><td><span class="kw">目標広告費用対効果（tROAS）</span></td><td>目標ROASを維持してCV値を最大化</td><td>商品ごとに売上が異なるEC</td></tr>
  <tr><td><span class="kw">クリック数の最大化</span></td><td>予算内でクリック数を最大化</td><td>新規立ち上げ・認知拡大フェーズ</td></tr>
</table>
<div class="warn"><strong>注意</strong>：自動入札はコンバージョンデータがないと機能しません。新規アカウントはまず手動CPCやクリック最大化で30〜50件のCVデータを集めてから切り替えましょう。</div>
<div class="exam"><strong>試験頻出</strong>：tCPA（目標コンバージョン単価）とtROAS（目標広告費用対効果）の違い。tCPAは「件数重視」、tROASは「売上金額重視（EC向け）」という使い分けを覚えましょう。</div>
` },
    { title:'Chapter 6｜KPIの計算と効果測定', body:`
<h4>Google広告の主要KPI（暗記必須の計算式）</h4>
<table class="tbl">
  <tr><th>指標</th><th>計算式</th><th>例（数値）</th></tr>
  <tr><td><span class="kw">CTR（クリック率）</span></td><td>クリック数 ÷ インプレッション数 × 100</td><td>500 ÷ 10,000 × 100 ＝ 5%</td></tr>
  <tr><td><span class="kw">CPC（クリック単価）</span></td><td>費用 ÷ クリック数</td><td>50,000円 ÷ 500 ＝ 100円</td></tr>
  <tr><td><span class="kw">CVR（コンバージョン率）</span></td><td>CV数 ÷ クリック数 × 100</td><td>10 ÷ 500 × 100 ＝ 2%</td></tr>
  <tr><td><span class="kw">CPA（コンバージョン単価）</span></td><td>費用 ÷ CV数</td><td>50,000円 ÷ 10 ＝ 5,000円</td></tr>
  <tr><td><span class="kw">ROAS</span></td><td>売上 ÷ 広告費 × 100</td><td>200,000円 ÷ 50,000円 × 100 ＝ 400%</td></tr>
</table>
<h4>計算問題を解いてみよう</h4>
<p><strong>問題</strong>：広告費100,000円・インプレッション50,000回・クリック2,000回・CV20件。CTR・CPC・CVR・CPAはいくらか？</p>
<p><strong>答え</strong>：CTR＝4%（2,000÷50,000×100）、CPC＝50円（100,000÷2,000）、CVR＝1%（20÷2,000×100）、CPA＝5,000円（100,000÷20）</p>
<div class="memory"><strong>覚え方</strong>：「分母が何か」で整理。CTR＝÷表示回数、CPC＝÷クリック数、CVR＝÷クリック数、CPA＝÷CV数。「費用」が分子か分母かに注意！</div>
<div class="tip"><strong>試験ポイント</strong>：KPI計算は毎回出題されます。特にCTR・CPC・CPAの3公式は紙に書いて覚えましょう。数値を代入して電卓なしで解けるように練習してください。</div>
` }
  ],
  quiz:[
    { q:'広告ランクの計算要素として正しい組み合わせはどれか。', choices:['A. 入札額 × 広告掲載期間 × アカウント年数','B. 入札額 × 品質スコア × 広告表示オプションの影響','C. 予算 × クリック率 × 広告の見た目','D. 入札額 ÷ 品質スコア × インプレッション数'], answer:1, explanation:'広告ランクは「入札額 × 品質スコア × 広告表示オプション（アセット）の影響」で決まります。これにより入札額が低くても品質スコアが高い広告主が上位表示できます。広告掲載期間やアカウント年数は広告ランクに直接影響しません。この公式はGoogle広告の根本原理であり、品質スコア向上に投資することの重要性を示しています。' },
    { q:'キーワードを[英会話 渋谷]のようにブラケットで囲むと適用されるマッチタイプはどれか。', choices:['A. 部分一致','B. フレーズ一致','C. 完全一致','D. 修飾子部分一致'], answer:2, explanation:'[ ]（ブラケット）で囲むと完全一致になります。完全一致は設定キーワードとほぼ同一の検索にのみ広告が表示されます。フレーズ一致は""（ダブルクォート）、部分一致は何もつけないのがデフォルトです。完全一致はコンバージョン重視の精密ターゲティングに向いており、無駄なクリックを抑えられます。' },
    { q:'品質スコアを構成する3要素として正しいものはどれか。', choices:['A. 入札額・広告の長さ・クリック数','B. 推定クリック率・広告の関連性・ランディングページの利便性','C. キーワード数・広告グループ数・キャンペーン予算','D. 広告掲載順位・インプレッション数・コンバージョン率'], answer:1, explanation:'品質スコア（1〜10点）は①推定クリック率（この広告はクリックされそうか）②広告の関連性（キーワードと広告文が合っているか）③ランディングページの利便性（遷移後のページは使いやすいか）の3要素で評価されます。品質スコアが高いと低い入札額でも上位表示でき広告費を節約できます。' },
    { q:'CTR（クリック率）の計算式として正しいものはどれか。', choices:['A. 費用 ÷ クリック数','B. クリック数 ÷ インプレッション数 × 100','C. コンバージョン数 ÷ クリック数 × 100','D. 売上 ÷ 広告費 × 100'], answer:1, explanation:'CTR（Click Through Rate）＝ クリック数 ÷ インプレッション数 × 100（%）です。A.はCPC（クリック単価）、C.はCVR（コンバージョン率）、D.はROASの計算式です。「何回表示されて何回クリックされたか」という割合がCTRです。検索広告の平均CTRは業種により異なりますが3〜5%程度が目安です。' },
    { q:'広告費100,000円でコンバージョンが20件獲得できた場合のCPAはいくらか。', choices:['A. 2,000円','B. 5,000円','C. 10,000円','D. 500円'], answer:1, explanation:'CPA（Cost Per Acquisition）＝ 広告費 ÷ コンバージョン数 ＝ 100,000円 ÷ 20件 ＝ 5,000円です。CPAは「1件の成果を獲得するのにかかった費用」を表します。目標CPAよりも実際のCPAが低ければ効率的、高ければ広告・LPの改善が必要なサインです。この計算式は試験で必ず出題されます。' },
    { q:'レスポンシブ検索広告（RSA）に登録できる見出しの最大数はどれか。', choices:['A. 3個','B. 5個','C. 10個','D. 15個'], answer:3, explanation:'レスポンシブ検索広告（RSA）は最大15個の見出しと最大4個の説明文を登録できます。GoogleのAIが最適な組み合わせを自動選択してテストします。実際の広告には2〜3個の見出しと1〜2個の説明文が表示されます。最低3個の見出しと2個の説明文が必須で、多く登録するほどAIが最適化しやすくなります。' },
    { q:'「目標コンバージョン単価（tCPA）」入札戦略が適している状況はどれか。', choices:['A. 新規アカウントでCV計測を開始したばかりの段階','B. 認知拡大が主目的でCVよりクリック数を重視したい段階','C. CVデータが蓄積されており特定のCPA目標内でCV数を最大化したい段階','D. 商品ごとに売上が異なるECサイトでROASを重視したい場合'], answer:2, explanation:'tCPA（目標コンバージョン単価）は「1件あたり5,000円以内でCV獲得」のようなCPA目標がある時に使います。CVデータが十分ない新規アカウント（A）では機能しません。認知重視のB.はクリック数最大化、EC向けROAS重視のD.はtROASが適しています。一般的にCV30件以上のデータが蓄積されてから使うのが推奨です。' },
    { q:'除外キーワードを設定する主な目的として正しいものはどれか。', choices:['A. 広告のインプレッション数を増やすため','B. 関係のない検索クエリへの広告表示を防いで無駄な費用を削減するため','C. 広告の品質スコアを直接引き上げるため','D. キャンペーンの日予算を自動調整するため'], answer:1, explanation:'除外キーワードは「広告を表示させたくない検索クエリ」を指定する機能です。例えば英会話スクールの広告を「英会話 独学」「英会話 無料」で検索した人に表示しないよう除外すると、購買意欲のある人にのみ広告を表示でき費用対効果が向上します。検索語句レポートで定期的にチェックして追加するのが運用の基本です。' }
  ]
},

{
  id:'seo4', diff:1, dlabel:'入門', free:false,
  name:'SEO検定 4級', org:'一般社団法人 全日本SEO協会',
  hours:'10〜20時間', rate:'約80〜90%', cost:'6,600円',
  chapters:[
    { title:'Chapter 1｜検索エンジンの仕組みを完全理解', body:`
<h4>「図書館」で理解するGoogleの仕組み</h4>
<p>Googleの動きは図書館に例えると分かりやすいです。①本を集める（クロール）→②目録に整理する（インデックス）→③質問に答える（ランキング）の3段階です。</p>
<table class="tbl">
  <tr><th>プロセス</th><th>図書館の例え</th><th>実際のGoogleの動作</th></tr>
  <tr><td><span class="kw">クロール</span></td><td>司書が本を集めに行く</td><td>Googlebotがリンクをたどってページを発見・収集</td></tr>
  <tr><td><span class="kw">インデックス</span></td><td>本を目録に登録・分類</td><td>収集したページの内容を解析してデータベースに格納</td></tr>
  <tr><td><span class="kw">ランキング</span></td><td>「料理の本でおすすめは？」に最適な本を選ぶ</td><td>200以上のシグナルで検索クエリへの関連度・品質を判定</td></tr>
</table>
<h4>Googlebotはどうやってページを発見するか</h4>
<p>Googlebotは既知のページから<strong>リンクをたどって</strong>新しいページを発見します。他のサイトからリンクがない「孤立したページ」はクロールされにくく、検索結果に表示されません。だから内部リンクと被リンクが重要なのです。</p>
<div class="tip"><strong>試験ポイント</strong>：クロール→インデックス→ランキングの3段階の順番と各段階の意味を覚えましょう。「クロールされていないページは検索結果に表示されない」という原則も重要です。</div>
` },
    { title:'Chapter 2｜GoogleのE-E-A-Tと評価基準', body:`
<h4>Googleの目標はユーザーへの最高の回答</h4>
<p>Googleのミッションは「ユーザーの質問に最も役立つページを上位表示すること」。すべての判断基準はここにあります。</p>
<h4>E-E-A-T（品質評価の4要素）</h4>
<table class="tbl">
  <tr><th>要素</th><th>意味</th><th>評価される例</th></tr>
  <tr><td><span class="kw">Experience（経験）</span></td><td>実際に体験したことを書いているか</td><td>実際に使った製品のリアルレビュー</td></tr>
  <tr><td><span class="kw">Expertise（専門性）</span></td><td>分野の専門知識があるか</td><td>医師による医療情報</td></tr>
  <tr><td><span class="kw">Authoritativeness（権威性）</span></td><td>業界で認められているか</td><td>大手メディア・学術機関への引用</td></tr>
  <tr><td><span class="kw">Trustworthiness（信頼性）</span></td><td>信頼できる情報源か</td><td>HTTPS・運営者情報・出典明示</td></tr>
</table>
<h4>主要アルゴリズムアップデート</h4>
<table class="tbl">
  <tr><th>アップデート名</th><th>対象</th><th>対策</th></tr>
  <tr><td>パンダアップデート</td><td>低品質・薄いコンテンツ</td><td>価値あるオリジナルコンテンツを作成</td></tr>
  <tr><td>ペンギンアップデート</td><td>スパムリンク</td><td>自然な被リンク獲得のみ実施</td></tr>
  <tr><td>コアアップデート</td><td>E-E-A-T全般の再評価</td><td>継続的なコンテンツ品質向上</td></tr>
</table>
<div class="memory"><strong>E-E-A-Tの覚え方</strong>：「経験・専門・権威・信頼」の4文字。「経専権信（けいせんけんしん）」と音で覚えると試験で思い出せます。</div>
` },
    { title:'Chapter 3｜SEOの目的・ホワイト vs ブラックハット', body:`
<h4>オーガニック検索 vs リスティング広告</h4>
<table class="tbl">
  <tr><th>項目</th><th>オーガニック（自然検索）</th><th>リスティング広告</th></tr>
  <tr><td>費用</td><td>無料（工数は必要）</td><td>クリックごとに費用発生</td></tr>
  <tr><td>効果の出方</td><td>遅い（3〜6ヶ月以上）</td><td>即日から効果が出る</td></tr>
  <tr><td>停止後</td><td>効果が継続（資産になる）</td><td>即座に表示が止まる</td></tr>
  <tr><td>ユーザーの信頼</td><td>高い（広告に見えない）</td><td>「広告」と表示される</td></tr>
</table>
<h4>ホワイトハット vs ブラックハット SEO</h4>
<table class="tbl">
  <tr><th>種類</th><th>手法例</th><th>リスク</th></tr>
  <tr><td><span class="kw">ホワイトハット</span></td><td>良質コンテンツ・自然なリンク獲得・UX改善</td><td>低リスク・持続的効果</td></tr>
  <tr><td><span class="kw">ブラックハット</span></td><td>リンク購入・隠しテキスト・コンテンツ無断コピー</td><td>Google手動ペナルティ・検索圏外へ</td></tr>
</table>
<div class="exam"><strong>試験頻出</strong>：「リンクを購入するのはホワイトかブラックか？」→ ブラックハット（違反）です。ペナルティを受けると検索結果から大幅に順位が下落します。</div>
` },
    { title:'Chapter 4｜内部SEO完全ガイド', body:`
<h4>最重要タグ一覧</h4>
<table class="tbl">
  <tr><th>タグ</th><th>SEOでの役割</th><th>文字数目安</th></tr>
  <tr><td><span class="kw">&lt;title&gt;</span></td><td>検索結果に表示される最重要タグ。ページの主題を示す</td><td>30〜60文字（全角）</td></tr>
  <tr><td><span class="kw">&lt;meta description&gt;</span></td><td>検索結果の説明文（スニペット）。CTRに直接影響</td><td>約120文字（全角）</td></tr>
  <tr><td><span class="kw">&lt;h1&gt;〜&lt;h6&gt;</span></td><td>コンテンツの見出し構造を整理。H1は1ページに1個</td><td>H1は30文字以内が目安</td></tr>
  <tr><td><span class="kw">alt属性</span></td><td>画像の内容をGoogleに伝える。画像検索にも影響</td><td>20〜30文字が目安</td></tr>
</table>
<h4>titleタグのBefore/After</h4>
<table class="tbl">
  <tr><th></th><th>例</th><th>問題点</th></tr>
  <tr><td><strong>Before（悪い例）</strong></td><td>「TOPページ ｜ 株式会社〇〇」</td><td>何のページか不明・キーワードなし</td></tr>
  <tr><td><strong>After（良い例）</strong></td><td>「渋谷の英会話スクール【初心者歓迎】無料体験あり」</td><td>キーワード含む・ベネフィット明確</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：meta descriptionは「直接的にはランキングに影響しないがCTRに影響する」という点が試験に出ます。「descriptionが良いとランキングが上がる？」→ 直接影響しないが間接的には影響する、が正解です。</div>
` },
    { title:'Chapter 5｜外部SEO：被リンクの理解', body:`
<h4>被リンクは「推薦状」</h4>
<p>他のWebサイトからあなたのサイトへのリンクを<span class="kw">被リンク（バックリンク）</span>と呼びます。Googleは被リンクを「信頼の推薦」として評価します。信頼できるサイトからの推薦が多いほど高く評価されます。</p>
<h4>被リンクの質を決める要素</h4>
<table class="tbl">
  <tr><th>要素</th><th>高評価</th><th>低評価</th></tr>
  <tr><td>リンク元の権威性</td><td>大手ニュースサイト・政府機関・大学</td><td>無名のリンクファームサイト</td></tr>
  <tr><td>関連性</td><td>自サイトと同テーマのサイト</td><td>まったく無関係なサイト</td></tr>
  <tr><td>アンカーテキスト</td><td>キーワードを含むテキスト</td><td>「こちら」「URL」など無意味なテキスト</td></tr>
  <tr><td>フォロー属性</td><td>通常のリンク（dofollow）</td><td>rel="nofollow"リンク（効果限定的）</td></tr>
</table>
<h4>自然な被リンク獲得方法</h4>
<ul>
  <li>他サイトが引用したくなる独自調査データ・統計を公開する</li>
  <li>業界メディアへの寄稿・専門家インタビューへの回答</li>
  <li>無料で使えるツール・テンプレートを提供する</li>
</ul>
<div class="warn"><strong>リンクの購入は絶対NG</strong>：有料でリンクを買うのはGoogleのガイドライン違反です。Manual Action（手動ペナルティ）で検索順位が大幅に下落します。</div>
` },
    { title:'Chapter 6｜検索意図と試験対策まとめ', body:`
<h4>検索意図（Search Intent）の4タイプ</h4>
<table class="tbl">
  <tr><th>タイプ</th><th>検索者の目的</th><th>例</th><th>最適なページ</th></tr>
  <tr><td><span class="kw">ナビゲーショナル</span></td><td>特定サイトに行きたい</td><td>「Amazon ログイン」</td><td>そのサイトのトップページ</td></tr>
  <tr><td><span class="kw">インフォメーショナル</span></td><td>情報を知りたい</td><td>「SEOとは 初心者」</td><td>解説記事・ハウツー記事</td></tr>
  <tr><td><span class="kw">コマーシャル</span></td><td>比較・検討したい</td><td>「英会話スクール 比較」</td><td>比較記事・ランキング</td></tr>
  <tr><td><span class="kw">トランザクショナル</span></td><td>購入・申込したい</td><td>「英会話スクール 申し込み」</td><td>LP・申込ページ</td></tr>
</table>
<h4>SEO検定4級 出題範囲の重要度</h4>
<table class="tbl">
  <tr><th>テーマ</th><th>重要度</th></tr>
  <tr><td>クロール・インデックス・ランキングの3段階</td><td>★★★</td></tr>
  <tr><td>E-E-A-Tの4要素</td><td>★★★</td></tr>
  <tr><td>titleタグ・meta description・H1の役割</td><td>★★★</td></tr>
  <tr><td>ホワイト/ブラックハットSEO</td><td>★★★</td></tr>
  <tr><td>被リンクの概念と質の判断</td><td>★★</td></tr>
  <tr><td>検索意図の4タイプ</td><td>★★</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：全日本SEO協会の公式テキストから出題されます。合格率80〜90%の比較的やさしい試験です。公式問題集を3回解いて満点が取れれば合格ラインに達します。</div>
` }
  ],
  quiz:[
    { q:'検索エンジンの動作順序として正しいものはどれか。', choices:['A. インデックス → クロール → ランキング','B. ランキング → インデックス → クロール','C. クロール → インデックス → ランキング','D. クロール → ランキング → インデックス'], answer:2, explanation:'検索エンジンの動作はクロール（ページを収集）→インデックス（データベースに格納）→ランキング（検索クエリへの関連度で順位付け）の順です。クロールされなければインデックスされず、インデックスされなければランキングされません。図書館の例えで「本を集める→目録登録→検索者への回答」と理解しましょう。' },
    { q:'E-E-A-Tの4要素として正しい組み合わせはどれか。', choices:['A. Economy・Efficiency・Authority・Trust','B. Experience・Expertise・Authoritativeness・Trustworthiness','C. Engagement・Expertise・Accuracy・Transparency','D. Experience・Evaluation・Authority・Technology'], answer:1, explanation:'E-E-A-TはExperience（経験）・Expertise（専門性）・Authoritativeness（権威性）・Trustworthiness（信頼性）の4要素です。2022年にGoogleが従来のE-A-TにExperience（経験）を追加しました。「経専権信（けいせんけんしん）」と覚えると試験で思い出しやすいです。' },
    { q:'SEOにおいてtitleタグが重要な理由として最も正しいものはどれか。', choices:['A. titleタグの文字数が多いほどランキングが上がるから','B. Googleがページの主題を把握するために参照し検索結果にも表示される最重要タグだから','C. titleタグは画像を検索エンジンに理解させるためのタグだから','D. titleタグを設定しないとページが表示されないから'], answer:1, explanation:'titleタグはSEOで最も重要なHTMLタグです。Googleがページのテーマを理解するために参照し、検索結果（SERP）のリンクテキストとして表示されます。文字数は30〜60文字（全角）が推奨で、ページのキーワードを前方に含めるのが基本です。画像のための代替テキストはalt属性が担います。' },
    { q:'被リンク（バックリンク）をGoogleが評価する理由はどれか。', choices:['A. リンクが多いと検索クロールが速くなるから','B. 他サイトからのリンクを信頼の推薦として評価しサイトの権威性の指標にするから','C. 被リンクがないとGooglebotがサイトを発見できないから','D. リンクの数だけクリック数が増えてCTRが上がるから'], answer:1, explanation:'Googleは被リンクを「他のWebサイトからの推薦・投票」として評価します。権威あるサイトからのリンクは高品質な推薦として重視されます。これはPageRankアルゴリズムの根本原理です。ただし量より質が重要で、低品質なリンクファームからの大量リンクは逆効果（ペナルティ）になります。' },
    { q:'「英会話スクール 渋谷 体験 予約」という検索の検索意図はどれか。', choices:['A. ナビゲーショナル','B. インフォメーショナル','C. コマーシャル','D. トランザクショナル'], answer:3, explanation:'「渋谷・体験・予約」というキーワードは購買・申込意欲が高いトランザクショナルな検索意図を示します。この検索者には体験申し込みができるLPや予約ページを表示するのが最適です。「英会話とは」はインフォメーショナル、「英会話スクール 比較」はコマーシャルな検索意図です。' },
    { q:'ブラックハットSEOの例として正しいものはどれか。', choices:['A. ユーザーの検索意図に合ったオリジナルコンテンツを作成する','B. 被リンク獲得のためにプレスリリースを配信する','C. 検索順位向上のためにリンクを金銭で購入する','D. ページの読み込み速度を改善してUXを向上させる'], answer:2, explanation:'リンクの金銭売買はGoogleのウェブマスターガイドライン違反のブラックハットSEOです。発覚するとManual Action（手動ペナルティ）が適用され、検索結果から大幅に順位が下落します。A・B・Dはすべてユーザーに価値を提供するホワイトハットSEOの手法です。' },
    { q:'meta descriptionタグのSEOにおける役割として正しいものはどれか。', choices:['A. 直接的にランキング（検索順位）を決定する重要なシグナル','B. 検索結果のスニペット（説明文）として表示されCTRに影響する','C. ページの読み込み速度を改善するためのタグ','D. Google画像検索での上位表示に影響するタグ'], answer:1, explanation:'meta descriptionはGoogleのランキングアルゴリズムには直接影響しませんが、検索結果に表示されるスニペット（説明文）として機能し、ユーザーがクリックするかどうか（CTR）に影響します。CTRが高まると間接的にSEO効果があります。ページ速度改善はCore Web Vitals、画像検索はalt属性が担当します。' },
    { q:'内部リンクのSEO効果として正しいものはどれか。', choices:['A. 内部リンクが多いほど外部被リンクと同等の効果がある','B. サイト内ページ間のリンクによりSEO評価の分配とクロールの効率化を促進する','C. 内部リンクはSEOにほとんど影響せずユーザー体験のみに関係する','D. 内部リンクを設置すると自動的にGoogleに新しいページが通知される'], answer:1, explanation:'内部リンクにはSEO評価（PageRank）をサイト内で分配し重要ページへ集中させる効果と、Googlebotがサイト内をクロールしやすくなる効果があります。孤立したページ（どこからもリンクされていないページ）はクロールされにくくなります。外部からの被リンクの代替にはなりませんが、サイト構造の最適化に不可欠です。' }
  ]
}
,
{
  id:'bizcareer3', diff:2, dlabel:'易しい', free:false,
  name:'ビジネス・キャリア検定 3級（マーケティング区分）', org:'中央職業能力開発協会（JAVADA）',
  hours:'50〜80時間', rate:'約60〜70%', cost:'約5,610円',
  chapters:[
    { title:'Chapter 1｜マーケティング戦略とSTP', body:`
<h4>STP分析とは</h4>
<p>市場全体に同じアプローチをしても効果は薄いです。<span class="kw">STP分析</span>は「誰に・何を・どう届けるか」を絞り込む戦略フレームワークです。</p>
<table class="tbl">
  <tr><th>要素</th><th>問い</th><th>例（コーヒーチェーンの場合）</th></tr>
  <tr><td><span class="kw">Segmentation（市場細分化）</span></td><td>市場をどう分けるか？</td><td>学生・ビジネスパーソン・シニア・主婦など</td></tr>
  <tr><td><span class="kw">Targeting（標的市場選定）</span></td><td>どのセグメントを狙うか？</td><td>都市部のビジネスパーソン（30〜50代）</td></tr>
  <tr><td><span class="kw">Positioning（ポジショニング）</span></td><td>競合とどう差別化するか？</td><td>「高品質・落ち着いた空間・プレミアム体験」</td></tr>
</table>
<h4>セグメンテーションの4変数</h4>
<table class="tbl">
  <tr><th>種類</th><th>変数例</th></tr>
  <tr><td>地理的変数</td><td>地域・都市規模・気候・人口密度</td></tr>
  <tr><td>人口統計的変数</td><td>年齢・性別・職業・所得・学歴・家族構成</td></tr>
  <tr><td>心理的変数</td><td>ライフスタイル・価値観・性格</td></tr>
  <tr><td>行動変数</td><td>購買頻度・ブランドロイヤルティ・使用量</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：STPの順番（S→T→P）と各要素の意味は必須。「セグメンテーション＝市場を分ける」「ターゲティング＝どこを狙うか」「ポジショニング＝どう見せるか」で整理しましょう。</div>
` },
    { title:'Chapter 2｜PPMと製品ライフサイクル', body:`
<h4>PPM（プロダクトポートフォリオマネジメント）</h4>
<p>BCGが提唱。市場成長率（縦軸）×相対的市場シェア（横軸）の2軸で事業・製品を4分類し、経営資源の最適配分を判断します。</p>
<table class="tbl">
  <tr><th>象限</th><th>成長率</th><th>シェア</th><th>特徴</th><th>戦略</th></tr>
  <tr><td><span class="kw">花形（Star）</span></td><td>高</td><td>高</td><td>売上大・投資も大</td><td>積極投資で地位維持</td></tr>
  <tr><td><span class="kw">金のなる木（Cash Cow）</span></td><td>低</td><td>高</td><td>安定収益・投資少</td><td>収益を他事業へ回す</td></tr>
  <tr><td><span class="kw">問題児（Problem Child）</span></td><td>高</td><td>低</td><td>投資必要・将来性あり</td><td>投資判断が重要</td></tr>
  <tr><td><span class="kw">負け犬（Dog）</span></td><td>低</td><td>低</td><td>収益低・将来性乏しい</td><td>縮小・撤退検討</td></tr>
</table>
<h4>製品ライフサイクル（PLC）</h4>
<table class="tbl">
  <tr><th>段階</th><th>特徴</th><th>マーケティング戦略</th></tr>
  <tr><td><span class="kw">導入期</span></td><td>売上低・赤字が多い</td><td>認知拡大・教育コンテンツ</td></tr>
  <tr><td><span class="kw">成長期</span></td><td>売上急増・競合参入</td><td>シェア拡大・差別化</td></tr>
  <tr><td><span class="kw">成熟期</span></td><td>売上安定・競合激化</td><td>維持・コスト効率化・リニューアル</td></tr>
  <tr><td><span class="kw">衰退期</span></td><td>売上低下</td><td>撤退・収穫戦略・後継品への移行</td></tr>
</table>
<div class="memory"><strong>覚え方</strong>：PPMの4象限は「花金問負（はなきんもんぷ）」で覚える。花形→金のなる木→問題児→負け犬。花形が成熟すると金のなる木に変化します。</div>
` },
    { title:'Chapter 3｜マーケティング・リサーチ', body:`
<h4>リサーチの種類を整理する</h4>
<table class="tbl">
  <tr><th>区分</th><th>内容</th><th>例</th></tr>
  <tr><td><span class="kw">1次データ</span></td><td>目的のために新たに収集した情報</td><td>アンケート・インタビュー・観察</td></tr>
  <tr><td><span class="kw">2次データ</span></td><td>既存の統計・資料から収集した情報</td><td>政府統計・業界レポート・社内データ</td></tr>
  <tr><td><span class="kw">定量調査</span></td><td>数値化できるデータを統計的に分析</td><td>アンケート・購買データ分析</td></tr>
  <tr><td><span class="kw">定性調査</span></td><td>言葉・行動から深層心理を探る</td><td>グループインタビュー（FGI）・観察法</td></tr>
</table>
<h4>フォーカスグループインタビュー（FGI）</h4>
<p>6〜8人程度のグループで進行役（モデレーター）が議論を促す定性調査。消費者の本音・購買動機・潜在ニーズを探るのに適しています。</p>
<h4>サンプリング方法</h4>
<ul>
  <li><span class="kw">無作為抽出</span>：母集団全員が同確率で選ばれる（最も公平）</li>
  <li><span class="kw">層別抽出</span>：母集団を層（性別・年代等）に分け各層から抽出</li>
  <li><span class="kw">多段抽出</span>：地域→市区町村→個人のように段階的に抽出</li>
</ul>
<div class="tip"><strong>試験ポイント</strong>：1次vs2次データ、定量vs定性の4区分と代表的な手法の組み合わせが頻出です。「FGIは定性調査」「アンケートは定量調査」を確実に覚えましょう。</div>
` },
    { title:'Chapter 4｜製品・価格政策', body:`
<h4>製品の4分類</h4>
<table class="tbl">
  <tr><th>種類</th><th>特徴</th><th>例</th></tr>
  <tr><td><span class="kw">最寄品</span></td><td>頻繁に購入・近くの店で手軽に</td><td>食料品・日用品・コンビニ商品</td></tr>
  <tr><td><span class="kw">買回品</span></td><td>複数店舗を比較・検討してから購入</td><td>家電・家具・衣料品</td></tr>
  <tr><td><span class="kw">専門品</span></td><td>特定ブランドへの強いこだわり</td><td>高級時計・高級車・ブランドバッグ</td></tr>
  <tr><td><span class="kw">非探索品</span></td><td>必要性を感じておらず購買意欲がない</td><td>保険・墓・百科事典</td></tr>
</table>
<h4>価格設定の3方法</h4>
<table class="tbl">
  <tr><th>方法</th><th>内容</th><th>例</th></tr>
  <tr><td><span class="kw">コストプラス法</span></td><td>原価＋利益マージンで設定</td><td>製造原価1,000円×1.5倍＝1,500円</td></tr>
  <tr><td><span class="kw">競争志向型</span></td><td>競合他社の価格を基準に設定</td><td>業界平均価格に合わせる</td></tr>
  <tr><td><span class="kw">知覚価値型</span></td><td>顧客が感じる価値をもとに設定</td><td>ブランド品の高価格戦略</td></tr>
</table>
<h4>心理的価格設定</h4>
<ul>
  <li><strong>端数価格</strong>：998円・4,980円（安く見せる）</li>
  <li><strong>プレステージ価格</strong>：あえて高価格にして品質感を演出</li>
  <li><strong>段階価格</strong>：100円・200円・500円のように価格帯を設定</li>
</ul>
` },
    { title:'Chapter 5｜流通経路（チャネル）政策', body:`
<h4>チャネルの長さ（流通段階数）</h4>
<table class="tbl">
  <tr><th>種類</th><th>経路</th><th>例</th></tr>
  <tr><td><span class="kw">直接流通</span></td><td>メーカー → 消費者</td><td>自社ECサイト・直営店・訪問販売</td></tr>
  <tr><td><span class="kw">間接流通（短）</span></td><td>メーカー → 小売 → 消費者</td><td>スーパーマーケット</td></tr>
  <tr><td><span class="kw">間接流通（長）</span></td><td>メーカー → 卸 → 小売 → 消費者</td><td>食品・日用品の一般的な流通</td></tr>
</table>
<h4>チャネルの幅（流通政策）</h4>
<table class="tbl">
  <tr><th>種類</th><th>説明</th><th>例</th></tr>
  <tr><td><span class="kw">開放的流通</span></td><td>あらゆる店舗で販売</td><td>コンビニ・スーパーの飲料・菓子</td></tr>
  <tr><td><span class="kw">選択的流通</span></td><td>条件を満たした特定店舗のみ</td><td>百貨店の化粧品・家電専門店</td></tr>
  <tr><td><span class="kw">専属的流通</span></td><td>特定地域で1社のみに販売権</td><td>自動車ディーラー・フランチャイズ</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：チャネルの「長さ（段階数）」と「幅（販売店数）」の2軸で整理。「高級ブランドが百貨店のみで販売」→ 選択的流通。「コンビニ飲料」→ 開放的流通。</div>
` },
    { title:'Chapter 6｜総まとめ・試験対策', body:`
<h4>ビジキャリ3級マーケティング 出題テーマ別重要度</h4>
<table class="tbl">
  <tr><th>テーマ</th><th>重要度</th></tr>
  <tr><td>STP（セグメンテーション・ターゲティング・ポジショニング）</td><td>★★★</td></tr>
  <tr><td>PPM（花形・金のなる木・問題児・負け犬）</td><td>★★★</td></tr>
  <tr><td>製品ライフサイクル（導入・成長・成熟・衰退）</td><td>★★★</td></tr>
  <tr><td>マーケティングリサーチ（1次/2次・定量/定性）</td><td>★★★</td></tr>
  <tr><td>製品分類（最寄品・買回品・専門品・非探索品）</td><td>★★</td></tr>
  <tr><td>価格設定方法（コストプラス・競争・知覚価値）</td><td>★★</td></tr>
  <tr><td>流通チャネルの長さと幅</td><td>★★</td></tr>
</table>
<h4>試験概要</h4>
<table class="tbl">
  <tr><th>項目</th><th>内容</th></tr>
  <tr><td>実施時期</td><td>年2回（9月・翌2〜3月頃）</td></tr>
  <tr><td>試験形式</td><td>五肢択一式・マークシート</td></tr>
  <tr><td>問題数</td><td>40問</td></tr>
  <tr><td>合格基準</td><td>概ね60%以上の正答率</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：JAVADA公式の標準テキスト（マーケティング3級）と過去問を使った学習が王道。特にSTP・PPM・PLCの3フレームワークを完全に理解すれば大半の問題に対応できます。</div>
` }
  ],
  quiz:[
    { q:'PPM（プロダクトポートフォリオマネジメント）で「市場成長率が高く相対的市場シェアも高い」事業はどれか。', choices:['A. 金のなる木（Cash Cow）','B. 花形（Star）','C. 問題児（Problem Child）','D. 負け犬（Dog）'], answer:1, explanation:'花形（Star）は市場成長率が高くシェアも高い状態です。売上は大きいが投資も大きく、シェア維持のための積極投資が必要です。成長が止まりシェアを維持できれば金のなる木に転換します。PPMは市場成長率（縦軸）×相対的市場シェア（横軸）の2軸で4分類するBCGが提唱したフレームワークです。' },
    { q:'製品ライフサイクルの正しい順序はどれか。', choices:['A. 成長期→導入期→成熟期→衰退期','B. 導入期→成長期→成熟期→衰退期','C. 導入期→成熟期→成長期→衰退期','D. 成長期→成熟期→導入期→衰退期'], answer:1, explanation:'製品ライフサイクルは「導入期→成長期→成熟期→衰退期」の4段階です。導入期は認知拡大・成長期はシェア拡大・成熟期は維持・衰退期はリニューアルか撤退かの判断が求められます。各段階で最適なマーケティング戦略が異なるため、現在どの段階かの判断が重要です。' },
    { q:'定性調査の代表的な手法として最も適切なものはどれか。', choices:['A. 大規模なWebアンケート調査','B. 統計的なサンプリング調査','C. フォーカスグループインタビュー（FGI）','D. 購買データのコンジョイント分析'], answer:2, explanation:'フォーカスグループインタビュー（FGI）は6〜8人程度のグループで進行役が議論を促す定性調査の代表手法です。消費者の本音・購買動機・潜在ニーズを深く探るのに適しています。大規模アンケート・統計的サンプリング・コンジョイント分析はいずれも数値データを扱う定量調査です。' },
    { q:'「高級腕時計ブランドが百貨店のみで販売する」流通政策はどれか。', choices:['A. 開放的流通','B. 専属的流通','C. 選択的流通','D. 直接流通'], answer:2, explanation:'選択的流通は条件を満たした特定の店舗のみで販売する政策です。ブランドイメージ維持・品質管理に適しています。開放的流通はコンビニ等あらゆる店で販売、専属的流通は特定地域で1社のみに販売権を付与（自動車ディーラー等）、直接流通はメーカーが消費者に直接販売（ECサイト等）です。' },
    { q:'価格設定法のうち「コストプラス法」の説明として正しいものはどれか。', choices:['A. 競合他社の価格を基準に設定する','B. 顧客が感じる価値をもとに設定する','C. 製品の原価に一定の利益マージンを上乗せして設定する','D. 需要曲線から最適な価格と販売量を求める'], answer:2, explanation:'コストプラス法は原価＋目標利益で価格を決めるシンプルな方法です。計算が容易ですが、顧客の支払意欲や競合を考慮しない点が弱点です。A.は競争志向型、B.は知覚価値型の説明です。実務では複数の方法を組み合わせて価格を設定します。' },
    { q:'STPのうち「ポジショニング（Positioning）」の説明として正しいものはどれか。', choices:['A. 市場をいくつかのグループに分割する','B. 攻略する標的市場を決定する','C. 競合との差別化を図り顧客の頭の中に自社の位置づけを確立する','D. 市場における自社のシェアを測定する'], answer:2, explanation:'ポジショニングは「顧客の頭の中で競合と比べてどう見られたいか」を決める戦略です。ポジショニングマップ（縦軸・横軸に異なる属性を置いた2軸のマップ）で競合との位置関係を可視化します。A.はセグメンテーション、B.はターゲティングの説明です。' },
    { q:'製品の分類のうち「専門品」の説明として最も適切なのはどれか。', choices:['A. 日常的に頻繁に購入し近くの店で手軽に買える商品','B. 購入前に複数店舗で比較・検討する商品','C. 特定ブランドへの強いこだわりがあり特定店舗のみで購入する商品','D. 必要性を感じておらず購買意欲がない商品'], answer:2, explanation:'専門品は消費者が特定のブランドや製品に強いこだわりを持ち、わざわざ特定の店に出向いてでも購入する商品です。高級時計・高級車・特定ブランドのバッグなどが該当します。A.は最寄品、B.は買回品、D.は非探索品の説明です。' },
    { q:'1次データと2次データの説明として正しい組み合わせはどれか。', choices:['A. 1次データ＝既存統計、2次データ＝新規調査','B. 1次データ＝新規に収集、2次データ＝既存の統計・資料','C. 1次データ＝定量調査のみ、2次データ＝定性調査のみ','D. 1次と2次の違いは調査規模の大小を表す'], answer:1, explanation:'1次データは「今回の調査目的のために新たに収集するデータ」（アンケート・インタビュー・観察など）、2次データは「すでに存在する統計・資料から収集するデータ」（政府統計・業界レポート・社内過去データなど）です。2次データは低コスト・即入手可能ですが、目的に完全には合わないことがあります。' }
  ]
},

{
  id:'marken3', diff:2, dlabel:'易しい', free:false,
  name:'マーケティング検定 3級', org:'公益社団法人 日本マーケティング協会（JMA）',
  hours:'30〜50時間', rate:'約70〜75%', cost:'6,600円',
  chapters:[
    { title:'Chapter 1｜マーケティングの基本概念', body:`
<h4>マーケティングとは何か（AMA 2013年定義）</h4>
<p>「顧客・取引先・社会全体にとって価値ある提供物を<strong>創造・伝達・配達・交換する</strong>活動や、一連の制度、プロセス」（米国マーケティング協会）</p>
<h4>重要用語の整理</h4>
<table class="tbl">
  <tr><th>用語</th><th>意味</th><th>例</th></tr>
  <tr><td><span class="kw">ニーズ（Needs）</span></td><td>満たされていない基本的欲求</td><td>「のどが渇いた」</td></tr>
  <tr><td><span class="kw">ウォンツ（Wants）</span></td><td>ニーズを具体化した欲求</td><td>「コーラが飲みたい」</td></tr>
  <tr><td><span class="kw">デマンド（Demand）</span></td><td>購買力を伴ったウォンツ</td><td>「500円払ってコーラを買う」</td></tr>
</table>
<h4>マーケティング近視眼（Marketing Myopia）</h4>
<p>レビットが提唱。「鉄道会社は輸送業ではなく鉄道業と定義したため、自動車・航空機に顧客を奪われた」という例が有名。<strong>自社製品ではなく顧客ニーズに焦点を当てるべき</strong>という教訓です。</p>
<div class="memory"><strong>覚え方</strong>：「近視眼＝近くしか見えない＝自社製品しか見えていない状態」。顧客ニーズという遠くを見ることが重要。</div>
<div class="tip"><strong>試験ポイント</strong>：AMAの定義は「創造・伝達・配達・交換」の4動詞がポイント。ニーズ→ウォンツ→デマンドの流れも頻出です。</div>
` },
    { title:'Chapter 2｜市場環境分析（PEST・3C・SWOT）', body:`
<h4>PEST分析（マクロ環境）</h4>
<table class="tbl">
  <tr><th>要素</th><th>内容</th><th>現代の日本の例</th></tr>
  <tr><td><span class="kw">P（Political）</span></td><td>政治・法規制・税制</td><td>インボイス制度・規制緩和</td></tr>
  <tr><td><span class="kw">E（Economic）</span></td><td>景気・金利・為替・物価</td><td>円安・インフレ・金利上昇</td></tr>
  <tr><td><span class="kw">S（Social）</span></td><td>人口・ライフスタイル・文化</td><td>少子高齢化・テレワーク普及</td></tr>
  <tr><td><span class="kw">T（Technological）</span></td><td>技術革新・特許・AI</td><td>生成AI普及・DX推進</td></tr>
</table>
<h4>3C分析（ミクロ環境）</h4>
<ul>
  <li><span class="kw">Customer（顧客）</span>：市場規模・ニーズ・購買行動・セグメント</li>
  <li><span class="kw">Competitor（競合）</span>：競合の強み・弱み・戦略・シェア</li>
  <li><span class="kw">Company（自社）</span>：自社の強み・弱み・経営資源・コアコンピタンス</li>
</ul>
<h4>SWOT分析とクロス分析</h4>
<table class="tbl">
  <tr><th></th><th>機会（O）</th><th>脅威（T）</th></tr>
  <tr><td><strong>強み（S）</strong></td><td>SO戦略：強みで機会を活かす</td><td>ST戦略：強みで脅威を回避</td></tr>
  <tr><td><strong>弱み（W）</strong></td><td>WO戦略：弱みを補い機会を活かす</td><td>WT戦略：弱みと脅威を最小化</td></tr>
</table>
` },
    { title:'Chapter 3｜STP戦略と4P/4C', body:`
<h4>STP（再確認）</h4>
<p>Segmentation（細分化）→ Targeting（標的選定）→ Positioning（位置づけ）。競合との差別化を「ポジショニングマップ」で可視化します。</p>
<h4>マーケティングミックス 4P</h4>
<table class="tbl">
  <tr><th>要素</th><th>主な内容</th><th>日本企業の例</th></tr>
  <tr><td><span class="kw">Product（製品）</span></td><td>品質・機能・デザイン・ブランド・PLC</td><td>ユニクロ：機能性素材のSPA製品</td></tr>
  <tr><td><span class="kw">Price（価格）</span></td><td>価格設定方法・割引・支払条件</td><td>マクドナルド：バリューセット戦略</td></tr>
  <tr><td><span class="kw">Place（流通）</span></td><td>チャネル・立地・物流・在庫</td><td>コンビニ：日本全国の高密度出店</td></tr>
  <tr><td><span class="kw">Promotion（促進）</span></td><td>広告・人的販売・SP・PR・口コミ</td><td>資生堂：インフルエンサーマーケティング</td></tr>
</table>
<h4>4P → 4C（顧客視点への転換）</h4>
<table class="tbl">
  <tr><th>4P（企業視点）</th><th>4C（顧客視点）</th><th>問うべき問い</th></tr>
  <tr><td>Product</td><td>Customer Value（顧客価値）</td><td>顧客にとって何の価値があるか？</td></tr>
  <tr><td>Price</td><td>Customer Cost（顧客コスト）</td><td>顧客が払う総コストは適切か？</td></tr>
  <tr><td>Place</td><td>Convenience（利便性）</td><td>入手しやすい場所・方法か？</td></tr>
  <tr><td>Promotion</td><td>Communication（対話）</td><td>双方向に対話できているか？</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：4P→4Cの対応は頻出。ProductはCustomer Value（Customer Costではない）、PromotionはCommunication（Convenienceではない）に対応します。</div>
` },
    { title:'Chapter 4｜消費者行動モデル', body:`
<h4>AIDMA と AISAS の違い</h4>
<table class="tbl">
  <tr><th>段階</th><th>AIDMA（テレビ時代）</th><th>AISAS（ネット時代）</th></tr>
  <tr><td>1</td><td>Attention（注意）</td><td>Attention（注意）</td></tr>
  <tr><td>2</td><td>Interest（興味）</td><td>Interest（興味）</td></tr>
  <tr><td>3</td><td>Desire（欲求）</td><td><span class="kw">Search（検索）</span></td></tr>
  <tr><td>4</td><td>Memory（記憶）</td><td>Action（行動・購買）</td></tr>
  <tr><td>5</td><td>Action（行動・購買）</td><td><span class="kw">Share（共有・口コミ）</span></td></tr>
</table>
<p>AISASのポイント：購買前に<strong>自分でネット検索</strong>し、購買後に<strong>SNSでシェア</strong>するのが現代の消費者行動。このShareが他者のAttentionになる口コミの連鎖が現代マーケティングの核心です。</p>
<h4>購買意思決定プロセス（5段階）</h4>
<ol>
  <li><span class="kw">問題認識</span>：ニーズの発生（「お腹が空いた」「スマホが古い」）</li>
  <li><span class="kw">情報探索</span>：内部情報（記憶）・外部情報（検索・口コミ）の収集</li>
  <li><span class="kw">代替案評価</span>：選択肢の比較・ブランド評価</li>
  <li><span class="kw">購買決定</span>：購入実行</li>
  <li><span class="kw">購買後評価</span>：満足・不満→クチコミ・リピートへ</li>
</ol>
<div class="tip"><strong>試験ポイント</strong>：AIDMAとAISASの各段階の名前と順番は必須。最大の違いは「Search（検索）とShare（共有）がAISASに追加された」点です。</div>
` },
    { title:'Chapter 5｜サービスマーケティング', body:`
<h4>サービスの4つの特性（美容院で理解する）</h4>
<table class="tbl">
  <tr><th>特性</th><th>内容</th><th>美容院の例</th><th>対策</th></tr>
  <tr><td><span class="kw">無形性</span></td><td>目に見えない・触れない</td><td>カット後の仕上がりが事前に分からない</td><td>ビフォーアフター写真・口コミで可視化</td></tr>
  <tr><td><span class="kw">不可分性</span></td><td>生産と消費が同時に起こる</td><td>施術中が「生産」であり同時に「消費」</td><td>スタッフ教育・標準化</td></tr>
  <tr><td><span class="kw">変動性（異質性）</span></td><td>提供者・タイミングで品質が変わる</td><td>担当者によって仕上がりが異なる</td><td>マニュアル化・技術者認定</td></tr>
  <tr><td><span class="kw">消滅性</span></td><td>在庫できない・使わなければ消える</td><td>予約が入らなかった時間は永久に失われる</td><td>ダイナミックプライシング・事前予約管理</td></tr>
</table>
<h4>サービスマーケティングの7P</h4>
<p>4Pに加え、<span class="kw">People（人）</span>・<span class="kw">Process（プロセス）</span>・<span class="kw">Physical Evidence（物的証拠）</span>の3要素が追加されます。</p>
<div class="memory"><strong>4特性の覚え方</strong>：「無不変消（むふへんしょう）」→無形性・不可分性・変動性・消滅性。各特性への対策とセットで覚えましょう。</div>
` },
    { title:'Chapter 6｜ブランドとデジタルマーケティング', body:`
<h4>ブランドとは何か</h4>
<p>ブランドは企業が所有するものではなく、<strong>顧客の頭の中にある印象・意味の集合</strong>です。価格以上の価値を顧客に感じさせる力（ブランドエクイティ）が競争優位の源泉です。</p>
<h4>ブランドエクイティの4要素（アーカー）</h4>
<table class="tbl">
  <tr><th>要素</th><th>内容</th></tr>
  <tr><td>ブランド認知</td><td>そのブランドを知っているか</td></tr>
  <tr><td>ブランド連想</td><td>ブランドから何をイメージするか（Apple→革新・スタイリッシュ）</td></tr>
  <tr><td>知覚品質</td><td>顧客が感じる品質（実際の品質と異なることもある）</td></tr>
  <tr><td>ブランドロイヤルティ</td><td>そのブランドへの忠誠心・リピート購買</td></tr>
</table>
<h4>トリプルメディア</h4>
<table class="tbl">
  <tr><th>種類</th><th>内容</th><th>例</th></tr>
  <tr><td><span class="kw">オウンドメディア</span></td><td>自社所有のメディア</td><td>自社Webサイト・ブログ・公式SNS</td></tr>
  <tr><td><span class="kw">アーンドメディア</span></td><td>第三者が自発的に発信</td><td>SNS口コミ・レビュー・プレスリリース掲載</td></tr>
  <tr><td><span class="kw">ペイドメディア</span></td><td>費用を払って使う媒体</td><td>Google広告・SNS広告・テレビCM</td></tr>
</table>
<div class="tip"><strong>試験頻出</strong>：トリプルメディアの3分類と代表例は必ず出ます。「SNSの公式アカウントはオウンド、そこでのユーザーのシェアはアーンド」という境界線問題が出ます。</div>
` },
    { title:'Chapter 7｜マーケティングリサーチと試験対策まとめ', body:`
<h4>マーケティングリサーチの手法</h4>
<table class="tbl">
  <tr><th>区分</th><th>種類</th><th>内容</th><th>例</th></tr>
  <tr><td rowspan="2">データ種別</td><td>1次データ</td><td>新たに収集したデータ</td><td>アンケート・インタビュー</td></tr>
  <tr><td>2次データ</td><td>既存の統計・資料</td><td>政府統計・業界レポート</td></tr>
  <tr><td rowspan="2">調査手法</td><td>定量調査</td><td>数値化・統計分析</td><td>アンケート・購買データ</td></tr>
  <tr><td>定性調査</td><td>言葉・行動から深層心理を探る</td><td>FGI・デプスインタビュー</td></tr>
</table>
<h4>頻出テーマ別優先度</h4>
<table class="tbl">
  <tr><th>優先度</th><th>テーマ</th></tr>
  <tr><td>最高</td><td>4P/4C・STP・AIDMA/AISAS・マーケティングの定義</td></tr>
  <tr><td>高</td><td>サービスマーケティング4特性・ブランド・購買意思決定5段階</td></tr>
  <tr><td>中</td><td>トリプルメディア・マーケティングリサーチ・製品ライフサイクル</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：公式問題集の例題を繰り返し解き、間違えた問題の解説を熟読するサイクルが最も効率的。4P・STP・AISASの3テーマを完全理解するだけで正答率50%以上に届きます。</div>
` }
  ],
  quiz:[
    { q:'AMA（米国マーケティング協会）のマーケティング定義で正しいものはどれか。', choices:['A. 自社製品の品質を高めることで競合との差別化を図る活動','B. 顧客・取引先・社会全体にとって価値ある提供物を創造・伝達・配達・交換する活動','C. 市場シェアを拡大するための価格競争戦略','D. 既存顧客との関係を深めリピート購入を促進する販売活動のみ'], answer:1, explanation:'AMAの2013年定義は「顧客・取引先・社会全体にとって価値ある提供物を創造・伝達・配達・交換する活動や、一連の制度、プロセス」です。「創造・伝達・配達・交換」の4動詞がポイントです。マーケティングは販売だけでなく、製品開発から顧客への価値届けまでの全プロセスを含みます。' },
    { q:'AISASモデルがAIDMAモデルと比べて最も異なる点はどれか。', choices:['A. AISASはBtoB向け、AIDMAはBtoC向けのモデルである','B. Search（検索）とShare（共有）が追加されDesireとMemoryが置き換わった','C. AISASはテレビCM時代のモデルである','D. 両者はまったく同じ順序で同じ意味である'], answer:1, explanation:'AISASはインターネット時代の購買行動を表すモデルで、AIDMAのDesire（欲求）とMemory（記憶）に代わりSearch（検索）とShare（共有）が追加されています。現代消費者は購入前にスマートフォンで検索し比較、購入後はSNSでシェアします。このShareが他者のAttentionとなる口コミの連鎖が現代マーケティングの核心です。' },
    { q:'サービスマーケティングの「消滅性（Perishability）」への対策として最も適切なものはどれか。', choices:['A. ビフォーアフター写真の公開やレビューの活用','B. スタッフ研修によるサービス品質の標準化','C. ダイナミックプライシングや予約システムによる需要平準化','D. 生産と消費を切り離してサービス品質を向上させる'], answer:2, explanation:'消滅性とはサービスを在庫として保存できないという特性です。美容院の空き時間・ホテルの空室など、使用されなかった時間は永久に失われます。対策はダイナミックプライシング（閑散期割引）や予約管理システムで需要を平準化することです。A.は無形性、B.は変動性（異質性）、D.は不可分性への対策です。' },
    { q:'4Pの「Promotion（プロモーション）」に対応する4Cの要素はどれか。', choices:['A. Customer Value（顧客価値）','B. Customer Cost（顧客コスト）','C. Convenience（利便性）','D. Communication（コミュニケーション）'], answer:3, explanation:'4Cはラウターボーンが提唱した顧客視点の4要素です。Promotion（プロモーション）に対応するのはCommunication（コミュニケーション）です。プロモーションが「企業から顧客への一方的発信」を想起させるのに対し、コミュニケーションは双方向の対話を強調します。Product→Customer Value、Price→Customer Cost、Place→Convenienceの対応も覚えましょう。' },
    { q:'SWOT分析の「WO戦略」の説明として正しいものはどれか。', choices:['A. 強みを活かして機会を最大限に活用する戦略','B. 弱みを克服・補完して機会を活かす戦略','C. 強みを活かして脅威を回避する戦略','D. 弱みと脅威を最小化する撤退戦略'], answer:1, explanation:'WO戦略はWeakness（弱み）を克服してOpportunity（機会）を活かす戦略です。SO＝強み×機会（最も攻撃的）、ST＝強み×脅威（競合対策）、WT＝弱み×脅威（最小化・撤退）という4つのクロス戦略で整理しましょう。' },
    { q:'トリプルメディアの「アーンドメディア」に該当するものはどれか。', choices:['A. 自社が運営する公式Webサイト','B. Google広告やSNS広告への出稿','C. 顧客が自発的にSNSに投稿した製品レビュー','D. 自社が運営するYouTubeチャンネル'], answer:2, explanation:'アーンドメディアとは企業がコントロールできない第三者による自発的な発信です。顧客のSNSレビュー・口コミ・報道機関の記事掲載などが該当します。「稼いだ（Earned）」メディアとも呼ばれ、信頼性が高い反面コントロールが難しいのが特徴です。自社Webサイト・公式SNS・YouTubeチャンネルはオウンド、Google広告・SNS広告はペイドメディアです。' },
    { q:'購買意思決定プロセスの正しい順序はどれか。', choices:['A. 情報探索→問題認識→代替案評価→購買決定→購買後評価','B. 問題認識→情報探索→代替案評価→購買決定→購買後評価','C. 問題認識→代替案評価→情報探索→購買決定→購買後評価','D. 問題認識→情報探索→購買決定→代替案評価→購買後評価'], answer:1, explanation:'購買意思決定プロセスは「問題認識→情報探索→代替案評価→購買決定→購買後評価」の5段階です。問題を認識してから情報を集め、比較・検討して購買し、その後満足度を評価します。購買後評価が満足であればリピートや口コミ（Share）につながり、AISASモデルのShareに対応します。' },
    { q:'マーケティング近視眼（Marketing Myopia）の説明として正しいものはどれか。', choices:['A. 市場のニーズ変化を先読みして製品を開発する先進的な手法','B. 自社製品・サービスに焦点を当てすぎて顧客のニーズを見失うこと','C. デジタルマーケティングに過度に依存するリスク','D. 競合他社の動向ばかり追いかけ自社強みを忘れること'], answer:1, explanation:'マーケティング近視眼はレビットが提唱した概念で「自社製品の定義にとらわれ顧客のニーズを見失う」状態を指します。「鉄道会社は輸送業でなく鉄道業と定義したため、車・航空機に顧客を奪われた」が有名な例です。解決策は「我々は何のビジネスをしているか（事業の目的）」を顧客視点で定義することです。' }
  ]
}
,
{
  id:'imma_c', diff:2, dlabel:'易しい', free:false,
  name:'マーケティング・ビジネス実務検定 C級', org:'国際実務マーケティング協会（IMMA）',
  hours:'30〜50時間', rate:'約75〜85%', cost:'6,270円',
  chapters:[
    { title:'Chapter 1｜マーケティングの定義と4P/4C', body:`
<h4>マーケティングの本質</h4>
<p>マーケティングとは「売れる仕組みを作ること」。製品を作ってから売るのではなく、顧客が欲しいものを見極め、届け、対価を得るまでの全活動です。</p>
<h4>4P → 4C（視点の転換）</h4>
<table class="tbl">
  <tr><th>4P（企業視点）</th><th>4C（顧客視点）</th><th>問うべき問い</th></tr>
  <tr><td>Product（製品）</td><td><span class="kw">Customer Value（顧客価値）</span></td><td>顧客にとって何の価値があるか？</td></tr>
  <tr><td>Price（価格）</td><td><span class="kw">Customer Cost（顧客コスト）</span></td><td>顧客が払う総コストは適切か？</td></tr>
  <tr><td>Place（流通）</td><td><span class="kw">Convenience（利便性）</span></td><td>顧客が入手しやすい場所・方法か？</td></tr>
  <tr><td>Promotion（促進）</td><td><span class="kw">Communication（対話）</span></td><td>顧客と双方向に対話できているか？</td></tr>
</table>
<h4>B2B vs B2C の違い</h4>
<table class="tbl">
  <tr><th>項目</th><th>B2B（企業間）</th><th>B2C（企業対消費者）</th></tr>
  <tr><td>意思決定</td><td>複数人・組織的・論理重視</td><td>個人・感情的・即決も多い</td></tr>
  <tr><td>購買金額</td><td>大（長期契約多い）</td><td>比較的少額</td></tr>
  <tr><td>関係性</td><td>長期・継続的</td><td>短期・取引型も多い</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：4P→4Cの対応を正確に覚えましょう。Product→Customer Value（Customer Costではない）が頻出の引っかけです。</div>
` },
    { title:'Chapter 2｜環境分析フレームワーク', body:`
<h4>PEST分析（マクロ環境）</h4>
<p>自社でコントロールできない外部環境を政治(P)・経済(E)・社会(S)・技術(T)の4軸で分析します。</p>
<h4>3C分析（ミクロ環境）</h4>
<ul>
  <li><span class="kw">Customer（顧客）</span>：市場規模・ニーズ・購買行動の分析</li>
  <li><span class="kw">Competitor（競合）</span>：競合の強み・弱み・戦略・シェア</li>
  <li><span class="kw">Company（自社）</span>：自社の強み・弱み・経営資源</li>
</ul>
<h4>SWOT分析とクロス分析</h4>
<table class="tbl">
  <tr><th></th><th>機会（O）</th><th>脅威（T）</th></tr>
  <tr><td><strong>強み（S）</strong></td><td>SO戦略：強みで機会を活かす</td><td>ST戦略：強みで脅威を回避</td></tr>
  <tr><td><strong>弱み（W）</strong></td><td>WO戦略：弱みを補い機会を活かす</td><td>WT戦略：最小化・撤退</td></tr>
</table>
<div class="memory"><strong>覚え方「スタバが郊外に出店する判断」</strong>：機会＝郊外の人口増加・競合少ない、脅威＝ドライブスルー型競合の進出、強み＝ブランド力・落ち着いた空間、弱み＝高価格帯。→ SO戦略でプレミアム感を前面に出した出店を決定。</div>
` },
    { title:'Chapter 3｜顧客分析（RFM・LTV・NPS）', body:`
<h4>RFM分析</h4>
<p>顧客を購買行動で分類し、優良顧客への集中投資や休眠顧客の掘り起こしに活用します。「お得意様ポイントカード」の行動データ分析がRFMの典型例です。</p>
<table class="tbl">
  <tr><th>指標</th><th>英語</th><th>内容</th><th>高評価の例</th></tr>
  <tr><td><span class="kw">R（最終購買日）</span></td><td>Recency</td><td>直近いつ買ったか</td><td>3日前に購入</td></tr>
  <tr><td><span class="kw">F（購買頻度）</span></td><td>Frequency</td><td>どのくらいの頻度で買うか</td><td>月4回以上</td></tr>
  <tr><td><span class="kw">M（購買金額）</span></td><td>Monetary</td><td>累計でいくら使っているか</td><td>年間50万円以上</td></tr>
</table>
<h4>LTV（Life Time Value：顧客生涯価値）</h4>
<div class="formula">LTV ＝ 購買単価 × 購買頻度 × 継続期間（年）</div>
<p>例：月5,000円のサービスを3年間利用 → LTV＝5,000円×12回×3年＝180,000円</p>
<h4>NPS（Net Promoter Score）</h4>
<p>「この製品を友人や同僚に薦める可能性は？（0〜10点）」で顧客ロイヤルティを測定。推奨者（9〜10点）の割合から批判者（0〜6点）の割合を引いた値です。</p>
<div class="tip"><strong>試験ポイント</strong>：RFMの3要素と計算式を正確に覚えましょう。LTVは「顧客1人が生涯に企業にもたらす価値の総額」で、高いLTVの顧客への優遇が重要です。</div>
` },
    { title:'Chapter 4｜トリプルメディアとデジタルマーケティング', body:`
<h4>トリプルメディア</h4>
<table class="tbl">
  <tr><th>種類</th><th>内容</th><th>例</th><th>メリット</th></tr>
  <tr><td><span class="kw">オウンドメディア</span></td><td>自社所有のメディア</td><td>自社Webサイト・ブログ・公式SNS</td><td>長期的な資産・コントロール可能</td></tr>
  <tr><td><span class="kw">ペイドメディア</span></td><td>費用を払う媒体</td><td>Web広告・SNS広告・テレビCM</td><td>即効性・ターゲティング可能</td></tr>
  <tr><td><span class="kw">アーンドメディア</span></td><td>第三者が自発的に発信</td><td>SNS口コミ・レビュー・PR掲載</td><td>信頼性が高い</td></tr>
</table>
<h4>O2O（Online to Offline）とオムニチャネル</h4>
<ul>
  <li><span class="kw">O2O</span>：オンラインの情報・広告で実店舗への来店を促す（スマホクーポン→店舗来店）</li>
  <li><span class="kw">オムニチャネル</span>：EC・店舗・アプリ・SNSなど全チャネルを一体的に管理し一貫した体験を提供</li>
</ul>
<div class="warn"><strong>よくある混同</strong>：オムニチャネルとマルチチャネルは異なります。マルチチャネルは「複数のチャネルを持つだけ」、オムニチャネルは「すべてのチャネルが統合されシームレスな体験を提供する」点が違います。</div>
` },
    { title:'Chapter 5｜マーケティング戦略の立案', body:`
<h4>コアコンピタンス</h4>
<p>競合他社が真似できない自社独自の強み・能力のことです。ハメルとプラハラードが提唱。例：ソニーの小型化技術・トヨタのかんばん方式（TPS）。</p>
<h4>競争戦略（ポーターの3類型）</h4>
<table class="tbl">
  <tr><th>戦略</th><th>内容</th><th>例</th></tr>
  <tr><td><span class="kw">コストリーダーシップ</span></td><td>業界最低コストで価格競争力を持つ</td><td>ユニクロ・コストコ</td></tr>
  <tr><td><span class="kw">差別化</span></td><td>独自の製品・サービスで競合と差別化</td><td>アップル・スターバックス</td></tr>
  <tr><td><span class="kw">集中</span></td><td>特定市場・セグメントに経営資源を集中</td><td>高級スポーツカーメーカー</td></tr>
</table>
<h4>マーケティングオートメーション（MA）の役割</h4>
<p>MA（Marketing Automation）はメール配信・リードスコアリング・ワークフロー実行を自動化するツールです。「見込み客1万人に個別最適なメッセージを自動で送る」ことが実現します。</p>
<div class="tip"><strong>試験ポイント</strong>：コアコンピタンスは「真似できない独自強み」、ポーターの3戦略は「コスト・差別化・集中」の3つを押さえましょう。</div>
` },
    { title:'Chapter 6｜試験対策まとめ', body:`
<h4>IMMA C級 試験概要</h4>
<table class="tbl">
  <tr><th>項目</th><th>内容</th></tr>
  <tr><td>試験形式</td><td>Web試験（在宅受験可）</td></tr>
  <tr><td>問題数・時間</td><td>2科目、各100点満点</td></tr>
  <tr><td>合格基準</td><td>2科目合計160点以上（80%）</td></tr>
  <tr><td>受験料</td><td>6,270円（税込）</td></tr>
</table>
<h4>頻出テーマ一覧</h4>
<table class="tbl">
  <tr><th>優先度</th><th>テーマ</th></tr>
  <tr><td>最高</td><td>4P/4C・STP・トリプルメディア・SWOT</td></tr>
  <tr><td>高</td><td>RFM・LTV・PEST・3C・競争戦略</td></tr>
  <tr><td>中</td><td>コアコンピタンス・MA・オムニチャネル</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：IMMA公式の「ベーシック マーケティング・ビジネスハンドブック」と公式問題集を使った学習が基本。合格率75〜85%と高めなので、基礎をしっかり固めれば十分合格できます。</div>
` }
  ],
  quiz:[
    { q:'4P→4Cの変換でProduct（製品）に対応するのはどれか。', choices:['A. Customer Cost（顧客コスト）','B. Convenience（利便性）','C. Customer Value（顧客価値）','D. Communication（コミュニケーション）'], answer:2, explanation:'4CではProduct→Customer Value（顧客価値）、Price→Customer Cost、Place→Convenience、Promotion→Communicationと対応します。Product→Customer Valueは「製品の機能ではなく顧客が得る価値で考える」という発想の転換です。Product→Customer Costという誤りが試験の引っかけとして頻出です。' },
    { q:'RFM分析のRが表す指標はどれか。', choices:['A. 購買金額（Monetary）','B. 購買頻度（Frequency）','C. 最終購買日（Recency）','D. 推奨スコア（Recommendation）'], answer:2, explanation:'RFMのRはRecency（最終購買日）、FはFrequency（購買頻度）、MはMonetary（購買金額）です。直近に購買した顧客ほどR値が高く、次の購買可能性が高いと判断します。RFM分析は顧客をセグメント化し、優良顧客へのリソース集中や休眠顧客への再アプローチに活用されます。' },
    { q:'SWOT分析のWO戦略の説明として正しいものはどれか。', choices:['A. 強みを活かして機会を最大限活用する','B. 弱みを克服して機会を活かす','C. 強みで脅威を回避する','D. 弱みと脅威を最小化する'], answer:1, explanation:'WO戦略はWeakness（弱み）を克服してOpportunity（機会）を活かす戦略です。例：「デジタル化が遅れている（W）が市場のDX需要が急増している（O）→DXパートナーと提携して機会を活かす（WO戦略）」。SO＝最も攻撃的、WT＝最も守備的（撤退・縮小）という位置づけを整理しましょう。' },
    { q:'トリプルメディアの「アーンドメディア」に該当するものはどれか。', choices:['A. 自社公式Webサイト','B. Google検索広告','C. 顧客がSNSに投稿した商品口コミ','D. 自社メールマガジン'], answer:2, explanation:'アーンドメディア（Earned Media）は第三者が自発的に発信するメディアです（顧客口コミ・SNSシェア・プレス掲載など）。「稼いだ（Earned）」メディアとも呼ばれ信頼性が高い反面コントロールできません。自社Webサイト・メルマガはオウンド、Google広告はペイドメディアです。' },
    { q:'LTV（Life Time Value）の計算式として正しいものはどれか。', choices:['A. 広告費 ÷ 新規顧客獲得数','B. 購買単価 × 購買頻度 × 継続期間','C. CV数 ÷ セッション数 × 100','D. ユーザー数 × ページビュー数'], answer:1, explanation:'LTV（顧客生涯価値）＝購買単価×購買頻度×継続期間です。例：月5,000円のサービスを3年利用→LTV＝5,000×12×3＝180,000円。LTVが高いほど1人の顧客が長期的にもたらす収益が大きく、顧客獲得コスト（CAC）との比較でビジネスの健全性を判断できます。' },
    { q:'ポーターの競争戦略の3類型として正しい組み合わせはどれか。', choices:['A. 成長・安定・縮小','B. コストリーダーシップ・差別化・集中','C. 攻撃・防御・提携','D. 市場浸透・市場開発・製品開発'], answer:1, explanation:'ポーターの競争戦略はコストリーダーシップ（業界最低コストで価格競争力）・差別化（独自の価値で競合と差別化）・集中（特定市場への経営資源集中）の3類型です。Dはアンゾフの製品・市場マトリクスの成長戦略です。' },
    { q:'O2O（Online to Offline）の説明として正しいものはどれか。', choices:['A. ECサイトで商品を購入しオンラインで完結させる仕組み','B. オンラインの情報や広告を通じて実店舗への来店を促す施策','C. オフラインの顧客データをオンラインシステムで管理する方法','D. SNSの口コミを実店舗の接客に活かす手法'], answer:1, explanation:'O2O（Online to Offline）はオンラインの情報・広告で実店舗への来店を促す施策です。例：スマートフォンアプリのクーポンを見せると割引（オンライン→オフライン来店）。逆にオフラインからオンラインへの誘導（店舗でQRコード読み取り→ECサイトへ）もあります。' },
    { q:'コアコンピタンスの説明として正しいものはどれか。', choices:['A. 企業の財務上の中核的な指標','B. 競合他社が真似できない自社独自の強み・中核能力','C. 市場の中核となる主要な顧客層','D. 製品ラインナップの中核となる主力商品'], answer:1, explanation:'コアコンピタンスはハメルとプラハラードが提唱した「競合他社が容易に模倣できない自社独自の中核的能力」です。例：ソニーの小型化・省電力化技術、トヨタのかんばん方式による生産効率化。コアコンピタンスに基づいた事業展開が持続的競争優位につながります。' }
  ]
},

{
  id:'waca', diff:2, dlabel:'易しい', free:false,
  name:'ウェブ解析士', org:'一般社団法人 ウェブ解析士協会（WACA）',
  hours:'30〜60時間', rate:'約60〜70%', cost:'17,600円（試験費用）',
  chapters:[
    { title:'Chapter 1｜ウェブ解析の目的とKPI設計', body:`
<h4>ウェブ解析とは</h4>
<p>Webサイトのデータを収集・分析し、<strong>事業目標の達成に向けた意思決定を支援</strong>するプロセスです。データを「見る」だけでなく「アクションにつなげる」ことが本来の目的です。</p>
<h4>KGI・KPI・KSFの関係（山登りに例える）</h4>
<table class="tbl">
  <tr><th>指標</th><th>山登りの例え</th><th>Webの例</th></tr>
  <tr><td><span class="kw">KGI</span>（Key Goal Indicator）</td><td>頂上（最終目標）</td><td>年間売上1億円</td></tr>
  <tr><td><span class="kw">KPI</span>（Key Performance Indicator）</td><td>ルートポイント（中間目標）</td><td>月間コンバージョン100件</td></tr>
  <tr><td><span class="kw">KSF</span>（Key Success Factor）</td><td>登山装備（成功要因）</td><td>LP改善・広告CTR向上</td></tr>
</table>
<h4>ファネル（漏斗）モデルで考える</h4>
<p>例：EC サイトの購買ファネル</p>
<ul>
  <li>100人が訪問 → 20人が商品ページ閲覧 → 5人がカートに追加 → 2人が購入（CVR 2%）</li>
  <li>最も離脱が多いステップ（商品ページ→カート）が最優先の改善ポイント</li>
</ul>
<div class="tip"><strong>試験ポイント</strong>：KGI・KPI・KSFの関係と違いが頻出。「KGIを達成するためのKPI、KPIを達成するためのKSF」という階層関係を理解しましょう。</div>
` },
    { title:'Chapter 2｜GA4の基礎とUAとの違い', body:`
<h4>UA（旧）からGA4（現在）へ</h4>
<table class="tbl">
  <tr><th>項目</th><th>UA（ユニバーサルアナリティクス）</th><th>GA4（現在の標準）</th></tr>
  <tr><td>計測モデル</td><td>セッションベース（訪問単位）</td><td><span class="kw">イベントベース</span>（行動単位）</td></tr>
  <tr><td>直帰率</td><td>1ページで離脱した割合（高いと悪い）</td><td>エンゲージなしセッションの割合（定義が逆転）</td></tr>
  <tr><td>コンバージョン</td><td>ゴール設定</td><td>キーイベント設定</td></tr>
</table>
<h4>エンゲージメントセッションとは</h4>
<p>以下のいずれか1つ以上を満たすセッションです：</p>
<ul>
  <li>10秒以上セッションが継続した</li>
  <li>2回以上のページビューまたはスクリーンビューが発生した</li>
  <li>コンバージョンイベントが発生した</li>
</ul>
<div class="warn"><strong>重要な注意</strong>：GA4の「直帰率」はUAとは定義が逆転しています。GA4では「エンゲージメントのなかったセッションの割合」なので、直帰率が低いほど良い（エンゲージメントが高い）ことになります。混同しないよう注意！</div>
<div class="formula">エンゲージメント率 ＝ エンゲージメントセッション数 ÷ 全セッション数</div>
` },
    { title:'Chapter 3｜流入チャネルの種類と分析', body:`
<h4>GA4の主要チャネルグループ</h4>
<table class="tbl">
  <tr><th>チャネル</th><th>内容</th><th>改善施策</th></tr>
  <tr><td><span class="kw">Organic Search</span></td><td>検索エンジンの自然検索結果</td><td>SEO強化・コンテンツ充実</td></tr>
  <tr><td><span class="kw">Paid Search</span></td><td>リスティング広告（Google・Yahoo!）</td><td>広告文改善・LP最適化</td></tr>
  <tr><td><span class="kw">Direct</span></td><td>URL直打ち・ブックマーク・参照元不明</td><td>ブランド認知強化</td></tr>
  <tr><td><span class="kw">Referral</span></td><td>他サイトのリンク経由</td><td>被リンク獲得・PR活動</td></tr>
  <tr><td><span class="kw">Organic Social</span></td><td>SNSの自然投稿経由</td><td>SNSコンテンツ強化</td></tr>
  <tr><td><span class="kw">Email</span></td><td>メールのリンク経由</td><td>メルマガ最適化</td></tr>
</table>
<h4>UTMパラメータで流入を正確に計測</h4>
<table class="tbl">
  <tr><th>パラメータ</th><th>用途</th><th>例</th></tr>
  <tr><td>utm_source</td><td>流入元</td><td>google, newsletter</td></tr>
  <tr><td>utm_medium</td><td>メディア種類</td><td>cpc, email, social</td></tr>
  <tr><td>utm_campaign</td><td>キャンペーン名</td><td>spring_sale_2026</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：各チャネルの定義と特徴が問われます。「Organic Search」と「Paid Search」の違い（無料の自然検索か有料広告か）は必ず覚えましょう。</div>
` },
    { title:'Chapter 4｜コンバージョン最適化', body:`
<h4>コンバージョン（キーイベント）の種類</h4>
<ul>
  <li><strong>マクロコンバージョン</strong>：最終目標（商品購入・資料請求・会員登録）</li>
  <li><strong>マイクロコンバージョン</strong>：中間目標（商品詳細ページ閲覧・カートへの追加・動画再生）</li>
</ul>
<h4>主要な改善指標</h4>
<table class="tbl">
  <tr><th>指標</th><th>計算式</th><th>改善方法</th></tr>
  <tr><td><span class="kw">CVR（コンバージョン率）</span></td><td>CV数 ÷ セッション数 × 100</td><td>LP改善・CTA最適化</td></tr>
  <tr><td><span class="kw">CPA（コンバージョン単価）</span></td><td>広告費 ÷ CV数</td><td>ターゲティング精度向上</td></tr>
  <tr><td><span class="kw">LTV</span></td><td>購買単価 × 頻度 × 期間</td><td>リピート促進・アップセル</td></tr>
</table>
<h4>A/Bテストとは</h4>
<p>2つのパターン（例：ボタンの色が青 vs 赤）を同時にテストし、データで優れた方を選択する手法。「感覚」ではなく「データ」で意思決定する文化の基本です。</p>
` },
    { title:'Chapter 5｜レポートとPDCAサイクル', body:`
<h4>GA4の主要レポート</h4>
<table class="tbl">
  <tr><th>レポート</th><th>確認できること</th></tr>
  <tr><td>集客レポート</td><td>流入チャネル別のユーザー・セッション・CV数</td></tr>
  <tr><td>エンゲージメントレポート</td><td>ページ別閲覧数・エンゲージメント時間</td></tr>
  <tr><td>収益化レポート</td><td>EC売上・購買行動ファネル</td></tr>
  <tr><td>維持率レポート</td><td>ユーザーのリピート率・コホート分析</td></tr>
  <tr><td><span class="kw">探索レポート</span></td><td>フリーフォーム・ファネル探索・経路探索・コホート探索</td></tr>
</table>
<h4>PDCAサイクルの実践</h4>
<ol>
  <li><strong>Plan</strong>：KPIを設定し仮説を立てる（「LPのCTA変更でCVRが20%向上するはず」）</li>
  <li><strong>Do</strong>：施策を実施する（A/Bテスト開始）</li>
  <li><strong>Check</strong>：データで結果を検証する（GA4でCVR変化を確認）</li>
  <li><strong>Action</strong>：改善策を立案・実行する（効果のある方を本番適用）</li>
</ol>
<div class="tip"><strong>試験ポイント</strong>：探索レポートの種類（フリーフォーム・ファネル探索・経路探索・コホート探索）と各用途が問われます。ファネル探索は「どのステップで離脱が多いか」の分析に使います。</div>
` },
    { title:'Chapter 6｜ウェブ解析士 試験対策まとめ', body:`
<h4>試験概要</h4>
<table class="tbl">
  <tr><th>項目</th><th>内容</th></tr>
  <tr><td>試験形式</td><td>CBT方式（コンピュータ試験・随時受験）</td></tr>
  <tr><td>問題数・時間</td><td>選択式・60分程度</td></tr>
  <tr><td>合格基準</td><td>70%以上の正答率</td></tr>
  <tr><td>合格率</td><td>約60〜70%</td></tr>
</table>
<h4>頻出テーマ一覧</h4>
<table class="tbl">
  <tr><th>優先度</th><th>テーマ</th></tr>
  <tr><td>最高</td><td>KGI・KPI・KSFの関係、GA4のエンゲージメントセッション定義</td></tr>
  <tr><td>高</td><td>流入チャネルの種類、CVR・CPA・LTVの計算式</td></tr>
  <tr><td>中</td><td>UTMパラメータ、探索レポートの種類、PDCAサイクル</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：WACA公式テキストと認定試験問題集を使った学習が基本。特にGA4関連の問題は毎年更新されているため、最新版のテキストを使うことが重要です。GA4のデモアカウントで実際に操作する練習が合格への近道です。</div>
` }
  ],
  quiz:[
    { q:'KGIとKPIの関係として正しい説明はどれか。', choices:['A. KGIはKPIを達成するための具体的な施策目標','B. KPIはKGIを達成するための中間指標','C. KGIとKPIは同じ意味で使われる言葉','D. KPIは外部環境の変化を測る指標'], answer:1, explanation:'KGI（最終目標指標）を達成するために設定する中間指標がKPI（Key Performance Indicator）です。山登りに例えると、KGI＝頂上、KPI＝途中のルートポイントです。KPI（月間CV100件）を積み上げることでKGI（年間売上1億円）を達成します。KPIの達成手段がKSF（成功要因）です。' },
    { q:'GA4のエンゲージメントセッションの定義として正しいものはどれか。', choices:['A. 1ページのみ閲覧して5秒で離脱したセッション','B. 10秒以上継続、または2ページ以上閲覧、またはCVが発生したセッション','C. 広告からの流入があったセッション','D. ユーザーが初めて訪問したセッション'], answer:1, explanation:'GA4のエンゲージメントセッションは①10秒以上継続 ②2ページ以上閲覧 ③コンバージョンイベント発生のいずれかを満たすセッションです。この定義がUAの直帰率（1ページで離脱）とは逆転しており、GA4の直帰率は「エンゲージメントのなかったセッションの割合」となります。' },
    { q:'GA4の流入チャネル「Organic Search」に該当するものはどれか。', choices:['A. Google広告のリスティング広告経由','B. TwitterのリンクからのSNS流入','C. Google検索の自然検索結果からのクリック','D. メールに記載されたリンクからの流入'], answer:2, explanation:'Organic Search（オーガニック検索）は検索エンジンの自然検索結果（広告ではない）からの流入です。A.はPaid Search（有料検索）、B.はOrganic SocialまたはReferral、D.はEmailチャネルです。「Organic（有機的・自然な）」は費用のかかる広告ではなく、SEOによって獲得した自然流入を指します。' },
    { q:'CVR（コンバージョン率）の計算式として正しいものはどれか。', choices:['A. 広告費 ÷ CV数','B. CV数 ÷ インプレッション数 × 100','C. CV数 ÷ セッション数 × 100','D. クリック数 ÷ インプレッション数 × 100'], answer:2, explanation:'CVR（Conversion Rate）＝CV数÷セッション数×100（%）です。A.はCPA（コンバージョン単価）、D.はCTR（クリック率）の計算式です。CVRが低い場合はランディングページの改善（CTA変更・デザイン改善・コンテンツ追加）が有効な施策です。' },
    { q:'A/Bテストの目的として正しいものはどれか。', choices:['A. 複数のSNSアカウントを同時に運用する手法','B. 2つのパターンを同時にテストしデータで優れた方を選択する手法','C. A商品とB商品の売上を比較するレポート','D. 2つの広告代理店のパフォーマンスを比較する手法'], answer:1, explanation:'A/Bテストは同一の要素（例：CTAボタンの色・コピー文・画像）の2パターンを異なるユーザーに同時に見せ、どちらがより高いCVRを得られるかをデータで判断する手法です。「感覚や経験」ではなく「データ」で意思決定するウェブ解析の基本的な改善手法です。' },
    { q:'GA4の探索レポートの「ファネル探索」を使う主な目的はどれか。', choices:['A. ユーザーがどのページをどの順で閲覧したか確認する','B. 購買・申込完了までの各ステップの離脱率を可視化する','C. 特定期間に獲得したユーザーのリテンション率を分析する','D. ディメンションと指標を自由に組み合わせて分析する'], answer:1, explanation:'ファネル探索は購買・申込等の目標達成までのステップ（例：商品一覧→商品詳細→カート→決済完了）で各ステップの離脱率を可視化し、改善箇所を特定するために使います。A.は経路探索、C.はコホート探索、D.はフリーフォームの用途です。' },
    { q:'UTMパラメータ「utm_medium」が表す情報はどれか。', choices:['A. 流入元サービス名（例：google）','B. メディアの種類・手法（例：cpc, email）','C. キャンペーン名（例：spring_sale）','D. ランディングページのURL'], answer:1, explanation:'utm_mediumはメディアの種類を表します（cpc＝検索広告、email＝メール、social＝SNS等）。utm_sourceが流入元（google・newsletter等）、utm_campaignがキャンペーン名（spring_sale_2026等）です。これらのUTMパラメータをURLに付与することで、GA4でどの施策からの流入かを正確に計測できます。' },
    { q:'ウェブ解析士の試験で最も重要なフレームワークとして適切なものはどれか。', choices:['A. 簿記会計の仕訳処理','B. KGI・KPI・KSFによる目標設定とGA4を使ったPDCA','C. プログラミング言語の構文理解','D. 法律条文の解釈と適用'], answer:1, explanation:'ウェブ解析士はKGI・KPI・KSFを使った目標設定と、GA4などのデータ分析ツールを活用したPDCAサイクルの実践が中核です。試験では「データを見てアクションにつなげる」思考プロセスが問われます。簿記・プログラミング・法律の専門知識は試験範囲外です。' }
  ]
},

{
  id:'netmk', diff:2, dlabel:'易しい', free:false,
  name:'ネットマーケティング検定', org:'サーティファイ',
  hours:'30〜50時間', rate:'約60〜70%', cost:'約5,500円',
  chapters:[
    { title:'Chapter 1｜インターネットマーケティングの特性', body:`
<h4>従来マーケティングとの4つの違い</h4>
<table class="tbl">
  <tr><th>特性</th><th>内容</th><th>具体例</th></tr>
  <tr><td><span class="kw">双方向性</span></td><td>企業→顧客だけでなく顧客→企業のフィードバックも発生</td><td>SNSへのコメント・レビュー投稿</td></tr>
  <tr><td><span class="kw">即時性</span></td><td>情報発信・効果測定・改善がリアルタイム可能</td><td>広告の成果を翌日に確認・修正</td></tr>
  <tr><td><span class="kw">測定可能性</span></td><td>クリック数・CV数等を正確に数値化</td><td>Googleアナリティクスでのデータ分析</td></tr>
  <tr><td><span class="kw">低コスト・高拡散</span></td><td>マスメディアより低コストで広範囲に届く</td><td>ブログ記事が検索で100万PV獲得</td></tr>
</table>
<h4>トリプルメディア（自分の家・買った看板・口コミ）</h4>
<table class="tbl">
  <tr><th>種類</th><th>例え</th><th>例</th></tr>
  <tr><td><span class="kw">オウンドメディア</span></td><td>自分の家（完全にコントロール可能）</td><td>自社Webサイト・ブログ・公式SNS</td></tr>
  <tr><td><span class="kw">ペイドメディア</span></td><td>費用を払って借りた看板</td><td>リスティング広告・SNS広告</td></tr>
  <tr><td><span class="kw">アーンドメディア</span></td><td>他人がしてくれる口コミ</td><td>SNSシェア・レビュー・プレス掲載</td></tr>
</table>
` },
    { title:'Chapter 2｜SEO・SEM・Web広告', body:`
<h4>SEO vs SEM の違い</h4>
<table class="tbl">
  <tr><th>用語</th><th>内容</th><th>費用</th></tr>
  <tr><td><span class="kw">SEO</span>（Search Engine Optimization）</td><td>自然検索順位を上げる施策のみ</td><td>基本無料（工数は必要）</td></tr>
  <tr><td><span class="kw">SEM</span>（Search Engine Marketing）</td><td>SEO＋リスティング広告を含む検索活用全般</td><td>広告費あり</td></tr>
</table>
<h4>主なWeb広告の種類と課金方式</h4>
<table class="tbl">
  <tr><th>広告種類</th><th>特徴</th><th>課金方式</th></tr>
  <tr><td>リスティング広告</td><td>検索キーワード連動型テキスト広告</td><td>CPC（クリック課金）</td></tr>
  <tr><td>ディスプレイ広告</td><td>バナー・動画等の画像広告</td><td>CPC・CPM</td></tr>
  <tr><td>SNS広告</td><td>Facebook・Instagram・X・LINE等</td><td>CPC・CPM</td></tr>
  <tr><td>動画広告</td><td>YouTube等の動画形式</td><td>CPV（視聴課金）</td></tr>
  <tr><td>アフィリエイト広告</td><td>成果報酬型（成約時のみ費用）</td><td>CPA（成果報酬）</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：SEMはSEOだけでなくリスティング広告も含む概念です。「SEMとSEOは同じ意味か？」→ 違います。SEMの方が広い概念です。</div>
` },
    { title:'Chapter 3｜SNSマーケティング', body:`
<h4>主要SNSの特性と使い分け</h4>
<table class="tbl">
  <tr><th>SNS</th><th>主なユーザー層</th><th>特徴</th><th>向くコンテンツ</th></tr>
  <tr><td>X（旧Twitter）</td><td>幅広い・情報感度高め</td><td>リアルタイム・拡散力</td><td>ニュース・キャンペーン情報</td></tr>
  <tr><td>Instagram</td><td>10〜40代・女性中心</td><td>ビジュアル重視・購買意欲高め</td><td>商品写真・ライフスタイル</td></tr>
  <tr><td>Facebook</td><td>30〜50代・B2Bに強い</td><td>実名制・詳細ターゲティング</td><td>ビジネス情報・イベント</td></tr>
  <tr><td>LINE</td><td>全年代・国内月間9,700万人</td><td>プッシュ通知・公式アカウント</td><td>クーポン・顧客対応</td></tr>
  <tr><td>TikTok</td><td>10〜20代中心</td><td>動画バイラル・エンタメ性</td><td>ショート動画・チャレンジ</td></tr>
</table>
<h4>インフルエンサーマーケティングと注意点</h4>
<p>フォロワーへの影響力が大きい人物（インフルエンサー）を活用した口コミ拡散施策です。</p>
<div class="warn"><strong>ステルスマーケティングは違法</strong>：広告であることを隠した投稿は2023年の景品表示法改正で規制強化。「PR」「広告」「Sponsored」等の明示が義務化されました。違反すると課徴金・措置命令の対象になります。</div>
` },
    { title:'Chapter 4｜Webサイト解析の基礎', body:`
<h4>主要なWebサイト指標</h4>
<table class="tbl">
  <tr><th>指標</th><th>定義</th><th>目標の例</th></tr>
  <tr><td><span class="kw">PV（ページビュー）</span></td><td>ページが閲覧された総回数</td><td>月間10万PV</td></tr>
  <tr><td><span class="kw">UU（ユニークユーザー）</span></td><td>期間内に訪問した重複のないユーザー数</td><td>月間3万UU</td></tr>
  <tr><td><span class="kw">直帰率（UA定義）</span></td><td>1ページだけ閲覧して離脱した割合</td><td>50%以下が目安</td></tr>
  <tr><td><span class="kw">コンバージョン率（CVR）</span></td><td>CV数÷訪問数×100</td><td>2〜3%が一般的</td></tr>
</table>
<h4>カスタマージャーニーとタッチポイント</h4>
<p>顧客が認知から購買・継続するまでの一連の体験を可視化したもの。オンライン（検索・SNS・Web）とオフライン（店舗・口コミ・電話）のタッチポイントを統合して最適な体験を設計します。</p>
` },
    { title:'Chapter 5｜関連法規（景品表示法・特商法・個人情報保護法）', body:`
<h4>必ず覚える法律3本</h4>
<table class="tbl">
  <tr><th>法律</th><th>主な規制内容</th><th>違反例</th></tr>
  <tr><td><span class="kw">景品表示法</span></td><td>不当な表示・誇大広告・過大景品の禁止</td><td>根拠のない「No.1」・実際より安く見せる二重価格</td></tr>
  <tr><td><span class="kw">特定商取引法</span></td><td>EC・通信販売における規制・表示義務</td><td>事業者情報非表示・返品条件の不明示</td></tr>
  <tr><td><span class="kw">個人情報保護法</span></td><td>個人情報の取得・利用・管理のルール</td><td>取得目的外の利用・同意なしの第三者提供</td></tr>
</table>
<h4>ECサイトで特定商取引法上必要な表示</h4>
<ul>
  <li>事業者の氏名（名称）・住所・電話番号</li>
  <li>商品の販売価格（消費税込み）</li>
  <li>送料の負担者</li>
  <li>返品・交換の条件と期限</li>
  <li>支払方法と時期</li>
</ul>
<div class="exam"><strong>試験頻出</strong>：特定商取引法でECサイトに必要な表示項目は毎回出ます。「競合との価格比較表」は義務ではないので注意！</div>
<div class="warn"><strong>薬機法にも注意</strong>：医薬品・化粧品の「治る」「若返る」等の効能表示は薬機法違反になる場合があります。</div>
` },
    { title:'Chapter 6｜試験対策まとめ', body:`
<h4>ネットマーケティング検定 出題範囲</h4>
<table class="tbl">
  <tr><th>優先度</th><th>テーマ</th></tr>
  <tr><td>最高</td><td>トリプルメディア・SEO/SEM・広告課金方式（CPC・CPM・CPA・CPV）</td></tr>
  <tr><td>高</td><td>関連法規（景表法・特商法・個情法）・SNS特性・Web指標</td></tr>
  <tr><td>中</td><td>インフルエンサーマーケティング・カスタマージャーニー</td></tr>
</table>
<h4>試験概要</h4>
<table class="tbl">
  <tr><th>項目</th><th>内容</th></tr>
  <tr><td>試験形式</td><td>在宅Web試験（随時受験）</td></tr>
  <tr><td>問題数</td><td>選択式40問</td></tr>
  <tr><td>合格基準</td><td>70%以上の正答率</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：サーティファイ公式テキストと問題集が基本。特に法規（景品表示法・特商法）は毎回出るので違反事例を具体的に覚えましょう。合格率60〜70%と比較的取りやすい資格です。</div>
` }
  ],
  quiz:[
    { q:'SEMの説明として最も適切なものはどれか。', choices:['A. 検索エンジンで自然検索順位を上げる施策のみ','B. SEO＋リスティング広告を含む検索エンジン活用全般','C. ソーシャルメディアを活用したマーケティング活動','D. メールを使ったダイレクトマーケティング活動'], answer:1, explanation:'SEM（Search Engine Marketing）はSEO＋リスティング広告を含む検索エンジン活用全般です。SEOだけを指すのではない点に注意。SEMはSEOよりも広い概念で、検索からの集客全体を指します。C.はSMM（Social Media Marketing）、D.はメールマーケティングです。' },
    { q:'CPM課金方式の説明として正しいものはどれか。', choices:['A. クリックが発生したときに費用が発生','B. コンバージョンが発生したときに費用が発生','C. 1,000回表示ごとに費用が発生','D. 動画を視聴されたときに費用が発生'], answer:2, explanation:'CPM（Cost Per Mille）は広告が1,000回表示されるごとに費用が発生する課金方式です。A.はCPC（クリック課金）、B.はCPA（成果報酬）、D.はCPV（視聴課金）です。CPMはブランド認知拡大に向いており、広告が見られるだけで費用が発生するためターゲティング精度が重要です。' },
    { q:'特定商取引法においてECサイトへの表示が義務付けられていないものはどれか。', choices:['A. 事業者の氏名・住所・電話番号','B. 商品の販売価格','C. 返品・交換の条件','D. 競合他社との価格比較表'], answer:3, explanation:'特定商取引法でECサイトに必要な表示は事業者情報・価格・送料・返品条件・支払方法等です。競合との価格比較表は義務ではありません。むしろ虚偽の比較広告は景品表示法違反になる可能性があります。' },
    { q:'ステルスマーケティングの問題として正しいのはどれか。', choices:['A. フォロワー数が少なく拡散力が低い','B. 広告であることを隠した投稿が景品表示法に違反する','C. 費用対効果がリスティング広告より常に低い','D. SNSアルゴリズムで投稿が表示されにくい'], answer:1, explanation:'ステルスマーケティングは広告であることを明示せずに商品を宣伝する行為です。2023年の景品表示法改正で規制され、「PR」「広告」「Sponsored」等の明示が義務化されました。違反すると消費者庁から措置命令・課徴金の対象になります。' },
    { q:'トリプルメディアの「ペイドメディア」に該当するものはどれか。', choices:['A. 自社のWebサイト・ブログ','B. 顧客のSNS口コミ・レビュー','C. Google検索広告・SNS広告','D. 自社メールマガジン'], answer:2, explanation:'ペイドメディア（Paid Media）は費用を払って使う広告メディアです。自社Webサイト・ブログ・メルマガはオウンドメディア、口コミ・レビュー・プレス掲載はアーンドメディアです。ペイドメディアは即効性があるが、出稿をやめると効果がなくなるのが特徴です。' },
    { q:'インターネットマーケティングの特性として正しいものはどれか。', choices:['A. 効果測定が困難でROIを正確に把握できない','B. 一方向のメッセージ発信のみが可能','C. リアルタイムで効果測定・改善ができる双方向メディア','D. 大企業のみが活用できる高コストな手法'], answer:2, explanation:'インターネットマーケティングの最大の特性は①双方向性（顧客からのフィードバック受信）②即時性（リアルタイムでの効果測定・改善）③測定可能性（クリック数・CV数等の正確な計測）④低コスト・高拡散性です。効果測定が容易なことがテレビCM等の従来手法との最大の違いです。' },
    { q:'Instagramの特性として最も適切なものはどれか。', choices:['A. テキスト主体でリアルタイムの情報拡散に向く','B. 実名制で30〜50代のビジネスパーソンに強い','C. ビジュアル重視で10〜40代女性中心、購買意欲の高い層が多い','D. 10〜20代向けのショート動画プラットフォーム'], answer:2, explanation:'Instagramはビジュアルコンテンツ（写真・動画）が中心で、10〜40代の女性ユーザーが多く購買意欲が高い層にリーチしやすいSNSです。A.はX（旧Twitter）、B.はFacebook、D.はTikTokの特性です。インスタ映えを意識したコンテンツや、ショッピング機能を活用したEC連携が効果的です。' },
    { q:'景品表示法違反の例として正しいものはどれか。', choices:['A. 実際に最も高いシェアを持つ商品に「No.1」と表示する','B. 根拠なく「業界No.1」「全国1位」と表示する','C. セール品に「通常価格15,000円→セール価格9,800円」と実際の販売実績に基づいて表示する','D. 商品の長所と短所を正直に記載したレビューを公開する'], answer:1, explanation:'景品表示法は不当な表示・誇大広告を禁止しています。根拠なく「No.1」「全国1位」と表示することは優良誤認表示（不当表示）に該当します。A.は根拠がある場合は問題なし、C.は実際の価格に基づく比較表示で適法、D.は正直な表示で問題ありません。' }
  ]
},

{
  id:'ga4', diff:2, dlabel:'易しい', free:true,
  name:'Google アナリティクス4（GA4）認定資格', org:'Google（Skillshop）',
  hours:'20〜40時間', rate:'非公開', cost:'無料',
  chapters:[
    { title:'Chapter 1｜GA4の基礎とUAとの違い', body:`
<h4>GA4（Google Analytics 4）とは</h4>
<p>2023年7月にUA（ユニバーサルアナリティクス）から完全移行したGoogleの分析ツール。Webサイト・アプリのユーザー行動を計測・分析します。</p>
<h4>UAとGA4の主な違い</h4>
<table class="tbl">
  <tr><th>項目</th><th>UA（旧）</th><th>GA4（現在）</th></tr>
  <tr><td>計測モデル</td><td>セッション（訪問）ベース</td><td><span class="kw">イベントベース</span>（行動単位）</td></tr>
  <tr><td>プラットフォーム</td><td>Web専用</td><td>Web＋アプリ統合計測</td></tr>
  <tr><td>直帰率</td><td>1ページ離脱の割合（高いと悪い）</td><td>エンゲージなしセッションの割合（定義逆転）</td></tr>
  <tr><td>コンバージョン</td><td>ゴール設定</td><td>キーイベント設定</td></tr>
  <tr><td>プライバシー対応</td><td>Cookieベース中心</td><td>機械学習・Cookieless対応</td></tr>
</table>
<div class="memory"><strong>覚え方「出席簿から行動日記へ」</strong>：UAはクラスの出席簿（「来た・来ない」のセッション単位）。GA4はLINEのメッセージ履歴（「何をしたか」というイベント単位）に例えられます。</div>
<div class="tip"><strong>試験ポイント</strong>：UAとGA4の計測モデルの違い（セッションベース→イベントベース）と、直帰率の定義の違いは必須の知識です。</div>
` },
    { title:'Chapter 2｜主要ディメンションと指標', body:`
<h4>ディメンション（切り口）vs 指標（数値）</h4>
<p><span class="kw">ディメンション</span>はデータを分類する属性（例：デバイス・地域・チャネル）、<span class="kw">指標</span>は数値データ（例：セッション数・CV数）です。</p>
<h4>主要な指標</h4>
<table class="tbl">
  <tr><th>指標</th><th>定義</th></tr>
  <tr><td><span class="kw">ユーザー数</span></td><td>期間内に訪問したユニークユーザー数</td></tr>
  <tr><td><span class="kw">セッション数</span></td><td>ユーザーの訪問回数（30分無操作でリセット）</td></tr>
  <tr><td><span class="kw">エンゲージメント率</span></td><td>エンゲージメントセッション÷全セッション</td></tr>
  <tr><td><span class="kw">平均エンゲージメント時間</span></td><td>ユーザーがサイトに積極的に関与した時間</td></tr>
  <tr><td><span class="kw">キーイベント数</span></td><td>設定したコンバージョンの発生件数</td></tr>
</table>
<h4>主要なディメンション例</h4>
<ul>
  <li>デバイスカテゴリ（PC / スマートフォン / タブレット）</li>
  <li>国・地域</li>
  <li>流入チャネル（Organic Search / Paid Search 等）</li>
  <tr><td>ページタイトル・URL</td></tr>
  <li>イベント名</li>
</ul>
` },
    { title:'Chapter 3｜集客・エンゲージメント分析', body:`
<h4>集客レポートの2種類</h4>
<ul>
  <li><strong>ユーザー獲得</strong>：新規ユーザーがどのチャネルから最初に来たか</li>
  <li><strong>トラフィック獲得</strong>：セッション単位でチャネル別の流入を確認</li>
</ul>
<h4>チャネル別の集客分析</h4>
<table class="tbl">
  <tr><th>チャネル</th><th>内容</th><th>改善施策</th></tr>
  <tr><td>Organic Search</td><td>自然検索流入</td><td>SEO強化</td></tr>
  <tr><td>Paid Search</td><td>リスティング広告</td><td>広告最適化</td></tr>
  <tr><td>Direct</td><td>URL直打ち・ブックマーク</td><td>ブランド認知強化</td></tr>
  <tr><td>Referral</td><td>他サイトのリンク経由</td><td>被リンク獲得</td></tr>
</table>
<h4>UTMパラメータによる正確な計測</h4>
<p>広告・メール・SNS投稿のURLに?utm_source=google&utm_medium=cpc&utm_campaign=spring_saleのようなパラメータを付与することで、GA4でどの施策からの流入かを正確に識別できます。</p>
` },
    { title:'Chapter 4｜キーイベント（コンバージョン）設定', body:`
<h4>キーイベント（旧：コンバージョン）とは</h4>
<p>GA4でコンバージョンと呼んでいた機能の新名称（2024年〜）。ビジネス上の重要な行動を設定します。</p>
<h4>イベントの3種類</h4>
<table class="tbl">
  <tr><th>種類</th><th>内容</th><th>例</th></tr>
  <tr><td><span class="kw">自動収集イベント</span></td><td>GA4が自動で計測</td><td>page_view・session_start・first_visit</td></tr>
  <tr><td><span class="kw">拡張計測イベント</span></td><td>設定ONで計測（デフォルトOFF）</td><td>scroll・外部リンクclick・動画再生</td></tr>
  <tr><td><span class="kw">カスタムイベント</span></td><td>独自に定義するイベント</td><td>purchase・generate_lead（GTM等で実装）</td></tr>
</table>
<h4>主なキーイベントの例</h4>
<ul>
  <li>purchase（購買完了）</li>
  <li>generate_lead（リード獲得・問い合わせ）</li>
  <li>sign_up（会員登録）</li>
  <li>begin_checkout（購入手続き開始）</li>
</ul>
<div class="warn"><strong>注意</strong>：purchase（購買完了）は自動収集イベントではありません。ECサイト固有のイベントで、コードの埋め込みまたはGTM（Googleタグマネージャー）での実装が必要です。</div>
` },
    { title:'Chapter 5｜探索レポートとデータ活用', body:`
<h4>探索レポートの4種類</h4>
<table class="tbl">
  <tr><th>レポート</th><th>活用シーン</th></tr>
  <tr><td><span class="kw">フリーフォーム</span></td><td>ディメンション×指標を自由に組み合わせて分析</td></tr>
  <tr><td><span class="kw">ファネル探索</span></td><td>購買・申込までのステップ別の離脱率を可視化</td></tr>
  <tr><td><span class="kw">経路探索</span></td><td>ユーザーがどのページをどの順で閲覧したか</td></tr>
  <tr><td><span class="kw">コホート探索</span></td><td>特定時期に獲得したユーザーのリテンション率</td></tr>
</table>
<h4>ファネル探索の使い方（ECサイト例）</h4>
<ol>
  <li>商品一覧ページ閲覧（100人）</li>
  <li>商品詳細ページ閲覧（60人 → 40%離脱）</li>
  <li>カートに追加（20人 → 67%離脱）</li>
  <li>購入完了（5人 → 75%離脱）</li>
</ol>
<p>この場合、カート→購入の75%離脱が最大ボトルネック。決済ページのUX改善が最優先課題です。</p>
<div class="tip"><strong>合格のコツ</strong>：Google Skillshopの公式動画を視聴後にテストを受けるスタイル。GA4のデモアカウント（Googleが公開）で実際に操作する練習が最も効果的です。有効期限1年・無料で受験可能。</div>
` },
    { title:'Chapter 6｜GA4 試験対策まとめ', body:`
<h4>頻出テーマ一覧</h4>
<table class="tbl">
  <tr><th>優先度</th><th>テーマ</th></tr>
  <tr><td>最高</td><td>UAとGA4の違い（イベントベース・直帰率の逆転）</td></tr>
  <tr><td>最高</td><td>エンゲージメントセッションの定義（3条件）</td></tr>
  <tr><td>高</td><td>流入チャネルの種類と定義</td></tr>
  <tr><td>高</td><td>探索レポートの4種類と用途</td></tr>
  <tr><td>中</td><td>UTMパラメータ（utm_source・utm_medium・utm_campaign）</td></tr>
  <tr><td>中</td><td>イベントの3種類（自動収集・拡張計測・カスタム）</td></tr>
</table>
<h4>GA4 認定試験の概要</h4>
<table class="tbl">
  <tr><th>項目</th><th>内容</th></tr>
  <tr><td>受験費用</td><td>無料（Google Skillshopアカウントで受験）</td></tr>
  <tr><td>有効期限</td><td>1年（期限切れ後は再受験で更新）</td></tr>
  <tr><td>出題形式</td><td>選択式・時間制限あり</td></tr>
</table>
` }
  ],
  quiz:[
    { q:'GA4がUAと比べて大きく変わった点として正しいものはどれか。', choices:['A. セッションベースからイベントベースの計測モデルに変わった','B. ページビューの計測ができなくなった','C. リアルタイムレポートが廃止された','D. 無料での利用ができなくなった'], answer:0, explanation:'GA4の最大の変化はセッションベース→イベントベースへの移行です。全てのユーザー行動（クリック・スクロール・購買等）をイベントとして統一的に計測します。ページビュー・リアルタイムレポート・無料利用は継続しています。また直帰率の定義も逆転し、WebとアプリのクロスデバイスでUnifiedな計測が可能になりました。' },
    { q:'GA4のエンゲージメントセッションの定義として正しいものはどれか。', choices:['A. 全セッション数 ÷ ユーザー数','B. エンゲージメントセッション数 ÷ 全セッション数','C. CV数 ÷ セッション数','D. ページビュー数 ÷ ユーザー数'], answer:1, explanation:'エンゲージメント率 ＝ エンゲージメントセッション数 ÷ 全セッション数です。エンゲージメントセッションとは①10秒以上継続 ②2ページ以上閲覧 ③CV発生のいずれかを満たすセッションです。なおGA4の直帰率は「エンゲージメントなしセッションの割合」でUAとは逆の定義です。' },
    { q:'UTMパラメータ「utm_medium」が表す情報はどれか。', choices:['A. 流入元サービス名（例：google）','B. メディアの種類・手法（例：cpc, email）','C. キャンペーン名（例：spring_sale）','D. ランディングページのURL'], answer:1, explanation:'utm_mediumはメディアの種類を表します（cpc＝検索広告、email＝メール、social＝SNS等）。utm_sourceが流入元（google・newsletter等）、utm_campaignがキャンペーン名（spring_sale_2026等）です。これらを組み合わせることでGA4で施策別の効果を正確に計測できます。' },
    { q:'GA4の「ファネル探索」レポートを使う主な目的はどれか。', choices:['A. ユーザーがどのページをどの順で閲覧したか確認する','B. 購買・申込完了までの各ステップの離脱率を可視化する','C. 特定期間に獲得したユーザーのリテンション率を分析する','D. ディメンションと指標を自由に組み合わせて分析する'], answer:1, explanation:'ファネル探索は購買・申込等の目標達成までのステップ（例：商品一覧→商品詳細→カート→決済完了）で各ステップの離脱率を可視化し、改善箇所を特定するために使います。A.は経路探索、C.はコホート探索、D.はフリーフォームの用途です。' },
    { q:'GA4で「自動収集イベント」に含まれないものはどれか。', choices:['A. page_view（ページビュー）','B. session_start（セッション開始）','C. purchase（購買完了）','D. first_visit（初回訪問）'], answer:2, explanation:'purchase（購買完了）はECサイト固有のイベントで、コードの埋め込みまたはGTM（Googleタグマネージャー）による実装が必要なカスタムイベントです。page_view・session_start・first_visitはGA4が自動的に収集するイベントです。なおscrollは自動収集ではなく「拡張計測イベント」（設定ONで収集）です。' },
    { q:'GA4の「キーイベント」（旧：コンバージョン）の説明として正しいものはどれか。', choices:['A. Webサイトのページビュー数のこと','B. ビジネス上の重要なユーザー行動として設定したイベント','C. 広告のクリック数のこと','D. ユーザーのセッション開始数のこと'], answer:1, explanation:'キーイベント（旧：コンバージョン）はビジネス目標として設定した重要なユーザー行動です。例：purchase（購買完了）・generate_lead（問い合わせ）・sign_up（会員登録）。GA4では2024年から「コンバージョン」という名称が「キーイベント」に変更されました。Google広告との連携では引き続き「コンバージョン」と呼ぶ場合があります。' },
    { q:'GA4のデフォルトレポートに含まれないものはどれか。', choices:['A. 集客レポート','B. エンゲージメントレポート','C. 競合サイトとのベンチマーク比較レポート','D. 維持率レポート'], answer:2, explanation:'GA4のデフォルトレポートには集客・エンゲージメント・収益化・維持率・ユーザーの5カテゴリがあります。競合サイトとのベンチマーク比較機能はGA4には存在しません。競合分析には別途Googleサーチコンソールやサードパーティツール（SimilarWeb等）を使います。' },
    { q:'GA4でページの詳細分析に使うディメンションとして正しいものはどれか。', choices:['A. エンゲージメント率','B. セッション数','C. ページタイトルまたはページURL','D. コンバージョン数'], answer:2, explanation:'ディメンションはデータを分類する「切り口（属性）」です。ページタイトルやページURLは「どのページか」を分類するディメンションです。エンゲージメント率・セッション数・コンバージョン数はすべて「指標（数値）」です。ディメンション×指標の組み合わせでGA4の分析を行います。' }
  ]
},

{
  id:'yahoo_ads', diff:2, dlabel:'易しい', free:true,
  name:'Yahoo!広告認定資格', org:'Yahoo! JAPAN',
  hours:'10〜20時間', rate:'非公開', cost:'無料',
  chapters:[
    { title:'Chapter 1｜Yahoo!広告の概要と特徴', body:`
<h4>Yahoo!広告の2種類</h4>
<table class="tbl">
  <tr><th>種類</th><th>特徴</th><th>課金</th></tr>
  <tr><td><span class="kw">検索広告</span></td><td>Yahoo! JAPANの検索結果に表示されるテキスト広告</td><td>CPC（クリック課金）</td></tr>
  <tr><td><span class="kw">ディスプレイ広告（YDA）</span></td><td>Yahoo! JAPANや提携サイトに表示されるバナー・テキスト広告</td><td>CPC / CPM</td></tr>
</table>
<h4>Google広告 vs Yahoo!広告</h4>
<table class="tbl">
  <tr><th>項目</th><th>Yahoo!広告</th><th>Google広告</th></tr>
  <tr><td>主なユーザー層</td><td>40〜60代に強い・女性比率高め</td><td>幅広い・若年層も多い</td></tr>
  <tr><td>国内検索シェア</td><td>約15〜20%（Google検索エンジンを使用）</td><td>約75〜80%</td></tr>
  <tr><td>ディスプレイネットワーク</td><td>YDA（Yahoo!提携サイト・アプリ）</td><td>GDN（Googleディスプレイネットワーク）</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：Yahoo!広告の特徴「40〜60代・女性・国内決済意欲高め」と、Google広告とのユーザー層の違いを覚えましょう。両方を組み合わせてカバーするのが効果的な運用です。</div>
` },
    { title:'Chapter 2｜検索広告の仕組みと品質インデックス', body:`
<h4>広告掲載順位の決定</h4>
<div class="formula">広告掲載順位 ＝ 入札価格 × 品質インデックス</div>
<h4>品質インデックスの3要素（採用面接に例える）</h4>
<table class="tbl">
  <tr><th>要素</th><th>採用面接の例え</th><th>改善方法</th></tr>
  <tr><td><span class="kw">推定クリック率</span></td><td>書類選考突破率（この人は呼びたい率）</td><td>魅力的な広告文・数字・CTA活用</td></tr>
  <tr><td><span class="kw">広告の関連性</span></td><td>面接での適性評価（職種に合っているか）</td><td>キーワードと広告文を一致させる</td></tr>
  <tr><td><span class="kw">ランディングページの利便性</span></td><td>実際の職場環境の適性（職場に馴染めるか）</td><td>LP速度改善・関連コンテンツ配置</td></tr>
</table>
<h4>マッチタイプ（Yahoo!広告）</h4>
<table class="tbl">
  <tr><th>種類</th><th>内容</th></tr>
  <tr><td>絞り込み部分一致</td><td>設定キーワードと意味的に近い検索に表示（デフォルト）</td></tr>
  <tr><td>フレーズ一致</td><td>キーワードのフレーズ順を含む検索に表示</td></tr>
  <tr><td>完全一致</td><td>キーワードと同一またはほぼ同一の検索にのみ表示</td></tr>
</table>
` },
    { title:'Chapter 3｜ディスプレイ広告（YDA）のターゲティング', body:`
<h4>主なターゲティング手法</h4>
<table class="tbl">
  <tr><th>種類</th><th>内容</th></tr>
  <tr><td><span class="kw">サーチキーワード</span></td><td>特定キーワードを検索したことがあるユーザーに表示</td></tr>
  <tr><td><span class="kw">興味・関心</span></td><td>特定カテゴリに関心を持つユーザーに表示</td></tr>
  <tr><td><span class="kw">サイトリターゲティング</span></td><td>自社サイトを過去に訪問したユーザーに再表示</td></tr>
  <tr><td><span class="kw">デモグラフィック</span></td><td>年齢・性別・家族構成等の属性でターゲティング</td></tr>
  <tr><td><span class="kw">類似ユーザー</span></td><td>既存顧客リストに似た新規ユーザーに表示</td></tr>
</table>
<h4>サイトリターゲティング（追いかける広告）</h4>
<p>ネットショッピングで商品を見たら、別のサイトでも同じ商品の広告が表示される経験はありませんか？これがリターゲティングです。自社サイト訪問済みユーザーへの再アプローチで、すでに興味を持っているため高CVRが期待できます。</p>
<div class="memory"><strong>覚え方</strong>：「一度興味を持った人への再アプローチ」＝リターゲティング。Re（再び）+Targeting（ターゲティング）のイメージです。</div>
` },
    { title:'Chapter 4｜効果測定とレポートの活用', body:`
<h4>基本的な計測指標と計算式</h4>
<table class="tbl">
  <tr><th>指標</th><th>計算式</th><th>例</th></tr>
  <tr><td><span class="kw">インプレッション</span></td><td>広告が表示された回数（計算不要）</td><td>10,000回</td></tr>
  <tr><td><span class="kw">CTR（クリック率）</span></td><td>クリック数 ÷ インプレッション × 100</td><td>500÷10,000×100＝5%</td></tr>
  <tr><td><span class="kw">CPC（クリック単価）</span></td><td>費用 ÷ クリック数</td><td>50,000÷500＝100円</td></tr>
  <tr><td><span class="kw">CPA（CV単価）</span></td><td>費用 ÷ コンバージョン数</td><td>50,000÷10＝5,000円</td></tr>
</table>
<h4>コンバージョン計測の設定</h4>
<p>Yahoo!広告のコンバージョンタグをLP完了ページに設置することで、広告経由の購入・問い合わせをカウントできます。適切なCV計測が入札最適化・効果検証の前提です。</p>
<h4>レポートの活用ポイント</h4>
<ul>
  <li>CTRが低い → 広告文の改善（見出しのA/Bテスト）</li>
  <li>CTRは高いがCVRが低い → LPの改善（CTA・デザイン・表示速度）</li>
  <li>CPAが目標より高い → ターゲティング絞り込み・除外キーワード追加</li>
</ul>
` },
    { title:'Chapter 5｜Yahoo!広告 試験対策まとめ', body:`
<h4>試験概要</h4>
<table class="tbl">
  <tr><th>項目</th><th>内容</th></tr>
  <tr><td>受験費用</td><td>無料（Yahoo!広告キャンパスで受験）</td></tr>
  <tr><td>有効期限</td><td>1年（期限切れ後は再受験で更新）</td></tr>
  <tr><td>試験種別</td><td>検索広告・ディスプレイ広告の2種類</td></tr>
</table>
<h4>頻出テーマ一覧</h4>
<table class="tbl">
  <tr><th>優先度</th><th>テーマ</th></tr>
  <tr><td>最高</td><td>品質インデックスの3要素・広告掲載順位の計算式</td></tr>
  <tr><td>高</td><td>マッチタイプ（完全・フレーズ・絞り込み部分一致）・KPI計算式</td></tr>
  <tr><td>中</td><td>YDAのターゲティング種類・サイトリターゲティング</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：Yahoo!広告キャンパスの公式学習コンテンツを視聴してから受験するのが最短ルート。Google広告との比較問題も出るため、両方の特徴を押さえておきましょう。</div>
` }
  ],
  quiz:[
    { q:'Yahoo!広告の品質インデックスを構成する3要素として正しいものはどれか。', choices:['A. 推定クリック率・広告の関連性・ランディングページの利便性','B. 入札額・広告の関連性・広告掲載頻度','C. クリック率・コンバージョン率・インプレッション数','D. 広告費・ページ速度・クリック単価'], answer:0, explanation:'Yahoo!広告の品質インデックスもGoogle広告の品質スコアと同様に①推定クリック率 ②広告の関連性 ③ランディングページの利便性の3要素で構成されます。この3要素×入札価格で広告掲載順位が決まります。3つの要素名と役割を正確に覚えましょう。' },
    { q:'Yahoo!ディスプレイ広告のサイトリターゲティングの説明として正しいものはどれか。', choices:['A. 特定のキーワードを検索したユーザーのみに表示','B. 過去に自社サイトを訪問したユーザーに再度広告を表示','C. 特定の地域に住むユーザーのみに表示','D. 年齢・性別を絞ってターゲティングする手法'], answer:1, explanation:'サイトリターゲティングは自社サイトを訪問済みのユーザーに対して広告を再表示する手法です。すでに興味を持っているユーザーへのアプローチなので、一般的にCVRが高くなります。A.はサーチキーワードターゲティング、C.は地域ターゲティング、D.はデモグラフィックターゲティングです。' },
    { q:'インプレッション数の説明として正しいものはどれか。', choices:['A. 広告がクリックされた回数','B. 広告が表示された回数','C. コンバージョンが発生した回数','D. 広告が承認された回数'], answer:1, explanation:'インプレッションは広告が表示された回数です。クリックされた回数はクリック数、CVが発生した回数はコンバージョン数です。CTR＝クリック数÷インプレッション数×100で計算します。インプレッションが多くてもクリック数が少ないと、広告文の魅力度が低いと判断できます。' },
    { q:'Yahoo!広告の検索広告で広告掲載順位を決める計算式として正しいものはどれか。', choices:['A. 広告主の過去の累計広告費','B. 入札価格 × 品質インデックス','C. クリック数 × コンバージョン率','D. ランディングページのアクセス数'], answer:1, explanation:'Yahoo!広告の検索広告の掲載順位は「入札価格 × 品質インデックス」で決まります。品質インデックスを高めることで、入札額が低くても上位表示が狙えます。これはGoogle広告の「広告ランク＝入札額×品質スコア×広告表示オプション」と同じ考え方です。' },
    { q:'広告費50,000円でコンバージョンが10件発生した場合のCPAはいくらか。', choices:['A. 500円','B. 2,500円','C. 5,000円','D. 10,000円'], answer:2, explanation:'CPA（Cost Per Acquisition）＝ 広告費 ÷ CV数 ＝ 50,000円 ÷ 10件 ＝ 5,000円です。CPAは「1件のコンバージョンを獲得するのにかかった費用」を表します。目標CPAよりも実際のCPAが低ければ効率的に運用できています。' },
    { q:'CTR（クリック率）が低い場合の最も適切な改善方法はどれか。', choices:['A. ランディングページのデザインを改善する','B. ターゲティングの地域を広げる','C. 広告文の見出しやコピーを改善してA/Bテストを実施する','D. 入札価格を大幅に引き上げる'], answer:2, explanation:'CTR（クリック率）が低い原因は「広告文がユーザーの興味を引いていない」ことです。見出しの変更・数字の活用・CTAの見直しなど広告文のA/Bテストが最も直接的な改善策です。A.はCVR（コンバージョン率）が低い場合の対策、B.はリーチ拡大、D.は掲載順位の改善に効果的ですがCTR改善の本質ではありません。' },
    { q:'Yahoo!広告とGoogle広告のユーザー層の違いとして正しいものはどれか。', choices:['A. Yahoo!広告は若年層に強く、Google広告は40〜60代に強い','B. Yahoo!広告は40〜60代・女性に強く、Google広告は幅広い層をカバー','C. 両者はまったく同じユーザー層にリーチする','D. Yahoo!広告はBtoB専用、Google広告はBtoC専用'], answer:1, explanation:'Yahoo!広告は40〜60代・女性比率が高く・国内消費意欲の高い層にリーチしやすいのが特徴です。Google広告は幅広い年齢層をカバーし、若年層や検索ボリュームが多い点が強みです。両方を組み合わせることでより広いユーザー層にリーチできます。' },
    { q:'Yahoo!ディスプレイ広告（YDA）の「サーチキーワードターゲティング」の説明として正しいものはどれか。', choices:['A. 現在検索中のユーザーに検索結果で広告を表示','B. 過去に特定のキーワードを検索したことがあるユーザーにディスプレイ広告を表示','C. 特定のWebサイトを閲覧中のユーザーに表示','D. 自社サイトの訪問者にリターゲティングする'], answer:1, explanation:'YDAのサーチキーワードターゲティングは「過去に特定のキーワードを検索したユーザー」を追いかけてディスプレイ広告（バナー等）を表示する手法です。例：「英会話スクール 渋谷」で検索したユーザーに後日バナー広告を表示。A.は検索広告の説明、D.はサイトリターゲティングです。' }
  ]
},

{
  id:'seo3', diff:2, dlabel:'易しい', free:false,
  name:'SEO検定 3級', org:'一般社団法人 全日本SEO協会',
  hours:'20〜40時間', rate:'約60〜70%', cost:'7,700円',
  chapters:[
    { title:'Chapter 1｜キーワード戦略', body:`
<h4>キーワードの種類（細い川の集まり＝ロングテール）</h4>
<table class="tbl">
  <tr><th>種類</th><th>特徴</th><th>例</th></tr>
  <tr><td><span class="kw">ビッグキーワード</span></td><td>検索ボリューム大・競合激しい・CVR低め</td><td>「英会話」「ダイエット」</td></tr>
  <tr><td><span class="kw">ミドルキーワード</span></td><td>中程度の検索数・適度な競合</td><td>「英会話 渋谷」「糖質制限 ダイエット」</td></tr>
  <tr><td><span class="kw">ロングテールキーワード</span></td><td>検索数少ないが意図が明確・CVR高め・競合少ない</td><td>「英会話 渋谷 社会人 初心者 週2回」</td></tr>
</table>
<div class="memory"><strong>覚え方「ロングテール＝細い川がたくさん集まる大河」</strong>：個々のロングテールキーワードの流入は少ないですが、多数のロングテールキーワードで上位表示すると合計で大きな流入になります。</div>
<h4>検索意図（インテント）の4タイプ</h4>
<table class="tbl">
  <tr><th>タイプ</th><th>目的</th><th>例</th></tr>
  <tr><td>ナビゲーショナル</td><td>特定サイトへ行きたい</td><td>「Amazon ログイン」</td></tr>
  <tr><td>インフォメーショナル</td><td>情報を知りたい</td><td>「SEOとは 初心者」</td></tr>
  <tr><td>コマーシャル</td><td>比較・検討したい</td><td>「英会話スクール 比較 渋谷」</td></tr>
  <tr><td>トランザクショナル</td><td>購入・申込したい</td><td>「英会話スクール 申し込み」</td></tr>
</table>
<div class="tip"><strong>試験ポイント</strong>：ロングテールキーワードの特性（検索数少ない・競合少ない・CVR高い）と、検索意図の4タイプは必須です。</div>
` },
    { title:'Chapter 2｜コンテンツSEOとE-E-A-T', body:`
<h4>E-E-A-Tを高めるコンテンツ作り</h4>
<table class="tbl">
  <tr><th>要素</th><th>実践方法</th><th>例</th></tr>
  <tr><td><span class="kw">Experience（経験）</span></td><td>実際に体験・使用した内容を書く</td><td>実際に使った製品のレビュー・写真</td></tr>
  <tr><td><span class="kw">Expertise（専門性）</span></td><td>著者プロフィールで専門資格・実績を明示</td><td>「〇〇医師監修」「〇〇協会認定講師」</td></tr>
  <tr><td><span class="kw">Authoritativeness（権威性）</span></td><td>業界メディアへの掲載・被リンク獲得</td><td>「日経新聞に掲載」「〇〇大学が引用」</td></tr>
  <tr><td><span class="kw">Trustworthiness（信頼性）</span></td><td>HTTPS化・会社情報明示・参照元の明記</td><td>SSL証明書・プライバシーポリシー・出典リンク</td></tr>
</table>
<h4>YMYL（Your Money or Your Life）コンテンツ</h4>
<p>健康・医療・金融・法律など、人々の生活・命・財産に影響する分野は<span class="kw">YMYL</span>と呼ばれ、GoogleはE-E-A-Tをより厳しく評価します。「素人がなんとなく書いた健康情報」はYMYL分野では大幅に評価が下がります。</p>
` },
    { title:'Chapter 3｜内部SEOの深化（Core Web Vitals等）', body:`
<h4>Core Web Vitals（コアウェブバイタル）</h4>
<p>Googleが定めるページ体験の指標。ランキング要素の一つです。</p>
<table class="tbl">
  <tr><th>指標</th><th>測定内容</th><th>目標値</th></tr>
  <tr><td><span class="kw">LCP</span>（Largest Contentful Paint）</td><td>最大コンテンツの描画時間</td><td>2.5秒以内</td></tr>
  <tr><td><span class="kw">INP</span>（Interaction to Next Paint）</td><td>ユーザー操作への応答速度</td><td>200ms以内</td></tr>
  <tr><td><span class="kw">CLS</span>（Cumulative Layout Shift）</td><td>レイアウトのズレの大きさ</td><td>0.1以下</td></tr>
</table>
<h4>canonicalタグ（重複コンテンツ対策）</h4>
<p>複数URLで同じコンテンツが表示される場合に正規URLを指定し、SEO評価を集約します。</p>
<table class="tbl">
  <tr><th>タグ</th><th>役割</th></tr>
  <tr><td>canonical</td><td>重複コンテンツの正規URL指定→評価を集約</td></tr>
  <tr><td>noindex</td><td>Googlebotにインデックスを禁止</td></tr>
  <tr><td>robots.txt</td><td>Googlebotにクロールを禁止</td></tr>
</table>
<h4>モバイルファーストインデックス</h4>
<p>Googleはモバイル版コンテンツを主に評価します。レスポンシブデザイン（画面サイズに合わせて自動調整）が必須です。</p>
` },
    { title:'Chapter 4｜外部SEOと被リンク戦略', body:`
<h4>良い被リンクと悪い被リンク</h4>
<table class="tbl">
  <tr><th>種類</th><th>特徴</th><th>例</th></tr>
  <tr><td>高品質な被リンク</td><td>権威あるサイト・関連性高い・自然な文脈</td><td>日経新聞に掲載・大学の研究引用</td></tr>
  <tr><td>低品質な被リンク</td><td>スパムサイト・無関係・大量購入</td><td>リンクファーム・有料リンク</td></tr>
</table>
<h4>リンクの種類</h4>
<ul>
  <li><span class="kw">フォローリンク（dofollow）</span>：通常のリンク。SEO評価が伝わる</li>
  <li><span class="kw">ノーフォローリンク（nofollow）</span>：rel="nofollow"属性付き。SEO評価の伝達が限定的</li>
  <li><span class="kw">スポンサードリンク</span>：rel="sponsored"。広告・有料リンクに使用</li>
</ul>
<h4>自然な被リンク獲得の方法</h4>
<ul>
  <li>独自調査データ・統計の公開（引用されやすい一次情報）</li>
  <li>業界メディアへの寄稿・インタビュー回答</li>
  <li>無料ツール・テンプレートの提供</li>
  <li>プレスリリース配信</li>
</ul>
<div class="warn"><strong>被リンクの否認ツール</strong>：スパムリンクがついてしまった場合はGoogleサーチコンソールの「リンクの否認ツール」で否認申請できます。</div>
` },
    { title:'Chapter 5｜Googleサーチコンソールの活用', body:`
<h4>サーチコンソールで確認できる主な情報</h4>
<table class="tbl">
  <tr><th>機能</th><th>確認できること</th><th>活用方法</th></tr>
  <tr><td><span class="kw">検索パフォーマンス</span></td><td>クリック数・インプレッション・CTR・平均掲載順位</td><td>CTRの低い11〜20位ページを特定して改善</td></tr>
  <tr><td><span class="kw">カバレッジ</span></td><td>インデックス済みページ数・エラーページ</td><td>インデックスされていないページを発見・対処</td></tr>
  <tr><td><span class="kw">ページエクスペリエンス</span></td><td>Core Web Vitals・モバイルユーザビリティ</td><td>LCP・INP・CLS の改善箇所を特定</td></tr>
  <tr><td><span class="kw">リンク</span></td><td>被リンクの数・リンク元ドメイン・内部リンク</td><td>被リンク状況の確認・スパムリンクの否認</td></tr>
</table>
<h4>CTR改善のPDCAサイクル（実践例）</h4>
<ol>
  <li><strong>Plan</strong>：掲載順位10〜20位でCTRが低いページを特定</li>
  <li><strong>Do</strong>：titleタグ・meta descriptionを書き直す</li>
  <li><strong>Check</strong>：2〜4週間後にCTRの変化をサーチコンソールで確認</li>
  <li><strong>Action</strong>：効果があれば他ページにも展開、なければ別の改善策を試す</li>
</ol>
<div class="tip"><strong>試験ポイント</strong>：サーチコンソールで確認できる指標と確認できない指標（例：ページ読み込み速度の詳細・競合サイト情報）の区別が問われます。</div>
` },
    { title:'Chapter 6｜SEO改善PDCAと試験対策まとめ', body:`
<h4>SEO検定3級 出題範囲の重要度</h4>
<table class="tbl">
  <tr><th>テーマ</th><th>重要度</th></tr>
  <tr><td>ロングテールキーワードの特性</td><td>★★★</td></tr>
  <tr><td>検索意図の4タイプ</td><td>★★★</td></tr>
  <tr><td>E-E-A-Tの実践方法</td><td>★★★</td></tr>
  <tr><td>Core Web Vitals（LCP・INP・CLS）</td><td>★★★</td></tr>
  <tr><td>canonicalタグの役割</td><td>★★</td></tr>
  <tr><td>サーチコンソールの活用</td><td>★★</td></tr>
  <tr><td>被リンクの質の判断</td><td>★★</td></tr>
</table>
<h4>試験概要</h4>
<table class="tbl">
  <tr><th>項目</th><th>内容</th></tr>
  <tr><td>受験料</td><td>7,700円（税込）</td></tr>
  <tr><td>合格率</td><td>約60〜70%</td></tr>
  <tr><td>学習目安</td><td>4級合格後に20〜40時間の追加学習</td></tr>
</table>
<div class="tip"><strong>合格のコツ</strong>：SEO検定4級の内容を前提として、3級はより実践的な内容が増えます。Googleサーチコンソールを実際に使った経験があると試験問題のイメージがつかみやすいです。</div>
` }
  ],
  quiz:[
    { q:'ロングテールキーワードの特性として正しいものはどれか。', choices:['A. 検索ボリュームが非常に大きく競合も多い','B. 検索ボリュームは少ないが具体的で購買意欲の高いユーザーを集めやすい','C. Googleが推奨する必ず使うべきキーワードリスト','D. 過去に高順位を取得したキーワードのみを指す'], answer:1, explanation:'ロングテールキーワードは3語以上の複合語で検索数は少ないですが、意図が明確で購買・問い合わせに近いユーザーを集めやすいです。ビッグキーワードより競合が少なく上位表示を狙いやすいのも特徴です。「英会話 渋谷 社会人 初心者」のような具体的なキーワードが該当します。' },
    { q:'E-E-A-Tの「E（Experience）」が重視されるコンテンツの例として正しいものはどれか。', choices:['A. 理論・概念を詳しく解説した専門家の学術論文','B. 大手メディアが発信したニュース記事','C. 実際に商品を購入・使用した人が書いたリアルなレビュー記事','D. 政府機関が公式発表したデータ'], answer:2, explanation:'Experience（経験）は実際の体験・経験に基づくコンテンツへの評価です。商品を実際に使ったリアルなレビューや旅行の実体験記などが高く評価されます。A.はExpertise（専門性）、B.・D.はAuthoritativeness（権威性）に近い例です。AIが生成した体験のないコンテンツはExperience評価が低くなります。' },
    { q:'Googleサーチコンソールの「検索パフォーマンス」で確認できない指標はどれか。', choices:['A. インプレッション数（検索結果への表示回数）','B. クリック数','C. 平均掲載順位','D. ページの読み込み速度（LCPの値）'], answer:3, explanation:'ページの読み込み速度（LCP等のCore Web Vitals）はサーチコンソールの「ページエクスペリエンス」セクションで確認します。検索パフォーマンスではインプレッション・クリック・CTR・平均掲載順位を確認できます。' },
    { q:'canonicalタグの主な役割として正しいものはどれか。', choices:['A. Googlebotにクロールを禁止するページを伝える','B. 重複コンテンツ問題を解決し正規URLにSEO評価を集約する','C. ページのサイトマップをGoogleに送信する','D. ページをAMP形式に指定する'], answer:1, explanation:'canonicalタグは複数URLで同一コンテンツが表示される「重複コンテンツ」問題への対策です。正規URLを指定することでGoogleのSEO評価を一つのURLに集約できます。A.はrobots.txt/noindexタグ、C.はサイトマップ（sitemap.xml）の役割です。' },
    { q:'Core Web Vitalsに含まれない指標はどれか。', choices:['A. LCP（Largest Contentful Paint）','B. INP（Interaction to Next Paint）','C. CLS（Cumulative Layout Shift）','D. CTR（Click Through Rate）'], answer:3, explanation:'Core Web VitalsはLCP（描画速度・2.5秒以内）・INP（応答速度・200ms以内）・CLS（レイアウト安定性・0.1以下）の3指標です。CTR（クリック率）はGoogle広告・SEO分析の指標ですがCore Web Vitalsには含まれません。' },
    { q:'サーチコンソールを活用したSEO改善の実践として正しいものはどれか。', choices:['A. 競合サイトの詳細なSEO状況を確認してベンチマーク分析する','B. 検索パフォーマンスでCTRが低い11〜20位ページを特定しtitleタグを改善する','C. 自サイトのSNSフォロワー数を確認する','D. 広告費の予算配分を管理する'], answer:1, explanation:'サーチコンソールの検索パフォーマンスで「掲載順位が11〜20位（2ページ目）でCTRが低いページ」を特定し、titleタグ・meta descriptionを改善することで1ページ目に引き上げ、大幅なクリック増が狙えます。A.は自サイトのデータのみ確認可能（競合サイトは不可）、C.・D.はサーチコンソールの機能外です。' },
    { q:'ロングテールキーワード戦略のメリットとして正しいものはどれか。', choices:['A. 月間検索数が多いため短期間で大量のトラフィックを獲得できる','B. 競合が少なく上位表示しやすい上に購買意欲の高いユーザーを集めやすい','C. Googleが公式に推奨するため品質スコアが自動的に高くなる','D. 内部リンクを大量に設置するだけで自動的に上位表示される'], answer:1, explanation:'ロングテールキーワードのメリットは①競合が少ない②検索意図が明確で購買・CVに近い③上位表示しやすいの3点です。個々の検索数は少ないですが、多数のロングテールで上位表示できれば合計では大きなトラフィックになります。SEO初心者はまずロングテールキーワードから攻略するのが定石です。' },
    { q:'被リンクの「nofollow属性」に関する説明として正しいものはどれか。', choices:['A. nofollowリンクは通常のリンクよりSEO効果が高い','B. nofollowリンクはSEO評価の伝達が限定的で、スパムリンク対策としても活用される','C. nofollowリンクはGooglebotのクロールを完全に禁止する','D. nofollowリンクは被リンクとして一切カウントされない'], answer:1, explanation:'rel="nofollow"は「このリンクはSEO評価を渡さない」という属性です。コメント欄・外部リンク・スポンサードコンテンツ等に使われます。Googleは基本的にnofollowリンクのPageRankを渡しませんが、完全に無視するわけでなくヒントとして使う場合もあります。クロールは禁止されません（クロール禁止はrobots.txt）。' }
  ]
}
];

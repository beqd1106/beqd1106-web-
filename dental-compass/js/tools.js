// =====================================================
// 歯科経営コンパス — 10種 インタラクティブツール
// =====================================================

const TOOL_DEFS = {

  // ─── Tool 1: 開業資金シミュレーター ───
  tool1: {
    title: '<i class="ic ic-coin"></i> 開業資金シミュレーター',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">各費用を入力すると、必要総資金・融資目安額・月返済額を自動計算します。</p>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>物件取得費（敷金・礼金・仲介料）</label>
            <input type="number" id="t1_property" value="1500" placeholder="万円">
            <span class="form-hint">家賃の6〜12ヶ月分が相場</span>
          </div>
          <div class="form-group">
            <label>内装工事費</label>
            <input type="number" id="t1_interior" value="2500" placeholder="万円">
            <span class="form-hint">1坪あたり50〜80万円が目安</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>歯科ユニット（台数×単価）</label>
            <input type="number" id="t1_unit" value="1200" placeholder="万円">
            <span class="form-hint">1台350〜600万円 × 台数</span>
          </div>
          <div class="form-group">
            <label>X線・CT設備</label>
            <input type="number" id="t1_xray" value="500" placeholder="万円">
            <span class="form-hint">パノラマ200〜350万円、CT追加350〜700万円</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>レセコン・電子カルテ</label>
            <input type="number" id="t1_system" value="150" placeholder="万円">
          </div>
          <div class="form-group">
            <label>その他医療機器（滅菌器・口腔内カメラ等）</label>
            <input type="number" id="t1_misc" value="300" placeholder="万円">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>広告・HP・看板費</label>
            <input type="number" id="t1_ad" value="200" placeholder="万円">
          </div>
          <div class="form-group">
            <label>運転資金（月額）</label>
            <input type="number" id="t1_monthly" value="200" placeholder="万円/月">
            <span class="form-hint">家賃＋人件費＋材料費の合計目安</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>運転資金確保月数</label>
            <input type="number" id="t1_months" value="6" placeholder="ヶ月">
            <span class="form-hint">開業後の収入安定まで6〜12ヶ月推奨</span>
          </div>
          <div class="form-group">
            <label>自己資金額</label>
            <input type="number" id="t1_equity" value="1000" placeholder="万円">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>融資金利（年率 %）</label>
            <input type="number" id="t1_rate" value="1.5" step="0.1" placeholder="%">
          </div>
          <div class="form-group">
            <label>返済期間（年）</label>
            <input type="number" id="t1_years" value="15" placeholder="年">
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool1()">試算する →</button>
        <div class="result-box" id="t1_result">
          <div class="result-grid">
            <div class="result-item">
              <div class="result-label">必要総資金</div>
              <div class="result-value" id="t1_total">—<span class="unit">万円</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">必要融資額</div>
              <div class="result-value" id="t1_loan">—<span class="unit">万円</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">月返済額（概算）</div>
              <div class="result-value" id="t1_repay">—<span class="unit">万円/月</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">自己資金比率</div>
              <div class="result-value" id="t1_equityRatio">—<span class="unit">%</span></div>
            </div>
          </div>
          <p class="result-note" id="t1_comment"></p>
        </div>
      </div>`
  },

  // ─── Tool 2: 月商・利益シミュレーター ───
  tool2: {
    title: '<i class="ic ic-chart-bar"></i> 月商・利益シミュレーター',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">患者数・単価・経費率から月商・営業利益・院長手取りを試算します。</p>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>ユニット台数</label>
            <input type="number" id="t2_units" value="3" placeholder="台">
          </div>
          <div class="form-group">
            <label>月間診療日数</label>
            <input type="number" id="t2_days" value="22" placeholder="日">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>1日あたり新患数</label>
            <input type="number" id="t2_newpt" value="3" placeholder="人">
          </div>
          <div class="form-group">
            <label>1日あたり再診数（新患除く）</label>
            <input type="number" id="t2_rept" value="20" placeholder="人">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>保険患者 平均単価</label>
            <input type="number" id="t2_ins_price" value="5000" placeholder="円/人">
          </div>
          <div class="form-group">
            <label>自費率（%）</label>
            <input type="number" id="t2_jihi_ratio" value="25" placeholder="%">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>自費患者 平均単価</label>
            <input type="number" id="t2_jihi_price" value="50000" placeholder="円/人">
          </div>
          <div class="form-group">
            <label>人件費率（%）</label>
            <input type="number" id="t2_labor" value="45" placeholder="%">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>材料費率（%）</label>
            <input type="number" id="t2_material" value="12" placeholder="%">
          </div>
          <div class="form-group">
            <label>月間家賃（万円）</label>
            <input type="number" id="t2_rent" value="30" placeholder="万円">
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool2()">試算する →</button>
        <div class="result-box" id="t2_result">
          <div class="result-grid">
            <div class="result-item"><div class="result-label">月間総患者数</div><div class="result-value" id="t2_total_pt">—<span class="unit">人</span></div></div>
            <div class="result-item"><div class="result-label">月商（概算）</div><div class="result-value" id="t2_revenue">—<span class="unit">万円</span></div></div>
            <div class="result-item"><div class="result-label">自費売上</div><div class="result-value" id="t2_jihi_rev">—<span class="unit">万円</span></div></div>
            <div class="result-item"><div class="result-label">営業利益（概算）</div><div class="result-value" id="t2_profit">—<span class="unit">万円</span></div></div>
          </div>
          <p class="result-note" id="t2_comment"></p>
        </div>
      </div>`
  },

  // ─── Tool 3: 開業スケジュール自動生成 ───
  tool3: {
    title: '<i class="ic ic-calendar"></i> 開業スケジュール自動生成',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">開業予定月を入力すると、逆算スケジュールを自動生成します。</p>
      <div class="tool-form">
        <div class="form-group">
          <label>開業予定年月</label>
          <input type="month" id="t3_opendate" value="2027-04">
        </div>
        <div class="form-group">
          <label>開業形態</label>
          <select id="t3_type">
            <option value="tenant">テナント開業（個人）</option>
            <option value="building">戸建て開業（個人）</option>
            <option value="corp">医療法人開設</option>
          </select>
        </div>
        <button class="btn-calc" onclick="calcTool3()">スケジュール生成 →</button>
        <div id="t3_result" style="display:none;margin-top:1.5rem;">
          <h4 style="color:var(--navy);margin-bottom:1rem;"><i class="ic ic-calendar"></i> 開業逆算スケジュール</h4>
          <div class="schedule-table" id="t3_table"></div>
        </div>
      </div>`
  },

  // ─── Tool 4: 行政届出チェックリスト ───
  tool4: {
    title: '<i class="ic ic-clipboard"></i> 行政届出チェックリスト',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">開業形態を選択すると、必要な届出リストを自動生成します。</p>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>開業形態</label>
            <select id="t4_form">
              <option value="individual">個人開業</option>
              <option value="corp">医療法人開設</option>
            </select>
          </div>
          <div class="form-group">
            <label>X線装置</label>
            <select id="t4_xray">
              <option value="yes">あり（パノラマ・デンタル等）</option>
              <option value="ct">あり（CT・CBCT含む）</option>
              <option value="no">なし</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>保険診療</label>
            <select id="t4_ins">
              <option value="yes">行う</option>
              <option value="no">自費のみ</option>
            </select>
          </div>
          <div class="form-group">
            <label>訪問歯科</label>
            <select id="t4_visit">
              <option value="no">行わない</option>
              <option value="yes">行う</option>
            </select>
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool4()">届出リストを生成 →</button>
        <div id="t4_result" style="display:none;margin-top:1.5rem;"></div>
      </div>`
  },

  // ─── Tool 5: 施設基準・加算チェックツール ───
  tool5: {
    title: '<i class="ic ic-hospital"></i> 施設基準・加算チェックツール（令和8年度）',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">体制・設備・研修の充足状況をチェックし、算定可能な加算を判定します。</p>
      <div class="tool-form">
        <div class="checklist" id="t5_checklist">
          <label class="check-item"><input type="checkbox" id="t5_c1"><div class="check-box"></div><div class="check-text">AEDを設置している<div class="check-sub">歯科外来診療医療安全対策加算の要件</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c2"><div class="check-box"></div><div class="check-text">医療安全研修を年2回以上実施し記録している<div class="check-sub">同上</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c3"><div class="check-box"></div><div class="check-text">院内感染防止対策の研修を年2回以上実施している<div class="check-sub">歯科外来診療感染対策加算の要件</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c4"><div class="check-box"></div><div class="check-text">マイナ保険証のオンライン資格確認を導入している<div class="check-sub">医療DX推進体制整備加算の要件</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c5"><div class="check-box"></div><div class="check-text">電子処方箋発行に対応している<div class="check-sub">同上（加算点が異なる）</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c6"><div class="check-box"></div><div class="check-text">歯科衛生士が常勤1名以上在籍している<div class="check-sub">口腔管理体制強化加算・各種加算の要件</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c7"><div class="check-box"></div><div class="check-text">過去1年間に歯周病継続支援治療を30回以上算定している<div class="check-sub">口腔管理体制強化加算の要件</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c8"><div class="check-box"></div><div class="check-text">過去1年間に歯科訪問診療を5回以上実施している（または在宅体制確保）<div class="check-sub">口腔管理体制強化加算の要件（在宅実績）</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c9"><div class="check-box"></div><div class="check-text">口腔内写真撮影を日常的に実施している<div class="check-sub">口腔機能管理・口腔管理体制強化加算の要件</div></div></label>
          <label class="check-item"><input type="checkbox" id="t5_c10"><div class="check-box"></div><div class="check-text">歯科訪問診療の実施体制がある（24時間連絡可能）<div class="check-sub">在宅療養支援歯科診療所の要件</div></div></label>
        </div>
        <button class="btn-calc" onclick="calcTool5()" style="margin-top:1rem;">算定可能加算を判定 →</button>
        <div id="t5_result" style="display:none;margin-top:1.5rem;"></div>
      </div>`
  },

  // ─── Tool 6: KPIダッシュボード ───
  tool6: {
    title: '<i class="ic ic-chart-up"></i> KPIダッシュボード',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">主要KPIを入力してグラフで可視化し、目標値との比較を確認します。</p>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>月商（万円）</label>
            <input type="number" id="t6_rev" value="350" placeholder="万円">
          </div>
          <div class="form-group">
            <label>新患数（人/月）</label>
            <input type="number" id="t6_newpt" value="45" placeholder="人">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>キャンセル率（%）</label>
            <input type="number" id="t6_cancel" value="18" placeholder="%">
          </div>
          <div class="form-group">
            <label>リコール率（%）</label>
            <input type="number" id="t6_recall" value="55" placeholder="%">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>自費率（%）</label>
            <input type="number" id="t6_jihi" value="28" placeholder="%">
          </div>
          <div class="form-group">
            <label>人件費率（%）</label>
            <input type="number" id="t6_labor" value="48" placeholder="%">
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool6()">グラフ表示 →</button>
        <div id="t6_result" style="display:none;margin-top:1.5rem;">
          <div class="chart-container"><canvas id="t6_chart"></canvas></div>
          <div id="t6_comments" style="margin-top:1rem;display:flex;flex-direction:column;gap:0.5rem;"></div>
        </div>
      </div>`
  },

  // ─── Tool 7: 医療広告ガイドラインチェッカー ───
  tool7: {
    title: '<i class="ic ic-alert"></i>医療広告ガイドラインチェッカー',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">HP・LP・SNS文章を貼り付けると、NG表現の可能性がある箇所を警告します。</p>
      <div class="tool-form">
        <div class="form-group">
          <label>チェックしたいテキストを入力</label>
          <textarea id="t7_text" rows="6" placeholder="例：当院は最高レベルの治療を提供しています。インプラントは必ず成功します。患者様の体験談：痛みが完全に消えました。"></textarea>
        </div>
        <button class="btn-calc" onclick="calcTool7()">チェックする →</button>
        <div id="t7_result" style="display:none;margin-top:1.5rem;"></div>
      </div>`
  },

  // ─── Tool 8: 自費カウンセリング台本ジェネレーター ───
  tool8: {
    title: '<i class="ic ic-message"></i> 自費カウンセリング台本ジェネレーター',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">診療種類を選択すると、説明台本・患者への伝え方のポイントを生成します。</p>
      <div class="tool-form">
        <div class="form-group">
          <label>カウンセリング対象</label>
          <select id="t8_type">
            <option value="implant">インプラント</option>
            <option value="ortho">矯正（マウスピース）</option>
            <option value="ceramic">セラミッククラウン</option>
            <option value="whitening">ホワイトニング</option>
          </select>
        </div>
        <div class="form-group">
          <label>患者の主訴・状況（任意）</label>
          <textarea id="t8_situation" rows="2" placeholder="例：抜歯後の補綴を検討中。費用について不安がある。"></textarea>
        </div>
        <button class="btn-calc" onclick="calcTool8()">台本を生成 →</button>
        <div id="t8_result" style="display:none;margin-top:1.5rem;"></div>
      </div>`
  },

  // ─── Tool 9: 求人票ジェネレーター ───
  tool9: {
    title: '<i class="ic ic-users"></i> 求人票ジェネレーター',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">職種・医院の特徴を入力すると、採用力の高い求人票文を自動生成します。</p>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>募集職種</label>
            <select id="t9_job">
              <option value="dh">歯科衛生士</option>
              <option value="da">歯科助手</option>
              <option value="rec">受付</option>
              <option value="dt">歯科技工士</option>
            </select>
          </div>
          <div class="form-group">
            <label>雇用形態</label>
            <select id="t9_employ">
              <option value="full">正社員（常勤）</option>
              <option value="part">パート・アルバイト</option>
              <option value="both">正社員・パート両方</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>給与（万円/月）</label>
            <input type="number" id="t9_salary" value="22" placeholder="万円">
          </div>
          <div class="form-group">
            <label>医院の強み（最大2つ選択）</label>
            <select id="t9_strength" multiple size="4" style="border-radius:8px;">
              <option value="予防歯科に力を入れている">予防歯科重視</option>
              <option value="子育て中のスタッフが多い">子育て環境良好</option>
              <option value="最新設備（口腔内スキャナー等）を導入">最新設備あり</option>
              <option value="週4日勤務OK・残業ほぼなし">ワークライフバランス</option>
            </select>
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool9()">求人票を生成 →</button>
        <div id="t9_result" style="display:none;margin-top:1.5rem;"></div>
      </div>`
  },

  // ─── Tool 10: 収益改善セルフチェック ───
  tool10: {
    title: '<i class="ic ic-check"></i> 収益改善セルフチェック（50項目）',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem;">当てはまる項目にチェックして、医院の収益課題をスコアリングします。</p>
      <div class="tool-form">
        <h4 style="color:var(--navy);margin-bottom:0.75rem;">【集患・予約管理】</h4>
        <div class="checklist">
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="集患"><div class="check-box"></div><div class="check-text">Googleマップ口コミ件数が50件以上ある</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="集患"><div class="check-box"></div><div class="check-text">HPがスマートフォン最適化されている</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="集患"><div class="check-box"></div><div class="check-text">Web予約（24時間受付）を導入している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="集患"><div class="check-box"></div><div class="check-text">LINE公式アカウントを運用している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="集患"><div class="check-box"></div><div class="check-text">前日リマインドSMS/LINEを実施している</div></label>
        </div>
        <h4 style="color:var(--navy);margin:1rem 0 0.75rem;">【自費収益・カウンセリング】</h4>
        <div class="checklist">
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="自費"><div class="check-box"></div><div class="check-text">自費率が30%以上ある</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="自費"><div class="check-box"></div><div class="check-text">カウンセリングルーム（専用スペース）がある</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="自費"><div class="check-box"></div><div class="check-text">口腔内写真を初診時に必ず撮影している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="自費"><div class="check-box"></div><div class="check-text">治療計画書を患者に文書で渡している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="自費"><div class="check-box"></div><div class="check-text">デンタルローン・分割払いの案内をしている</div></label>
        </div>
        <h4 style="color:var(--navy);margin:1rem 0 0.75rem;">【リコール・定着】</h4>
        <div class="checklist">
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="リコール"><div class="check-box"></div><div class="check-text">リコール率が60%以上ある</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="リコール"><div class="check-box"></div><div class="check-text">会計時に次回予約を必ず入れている</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="リコール"><div class="check-box"></div><div class="check-text">衛生士が専任でSPTを担当している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="リコール"><div class="check-box"></div><div class="check-text">キャンセル率が15%以下に収まっている</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="リコール"><div class="check-box"></div><div class="check-text">フッ化物局所応用を定期的に実施している</div></label>
        </div>
        <h4 style="color:var(--navy);margin:1rem 0 0.75rem;">【診療報酬・施設基準】</h4>
        <div class="checklist">
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="保険"><div class="check-box"></div><div class="check-text">口腔管理体制強化加算を取得している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="保険"><div class="check-box"></div><div class="check-text">医療DX推進体制整備加算を算定している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="保険"><div class="check-box"></div><div class="check-text">算定漏れ点検を月1回以上実施している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="保険"><div class="check-box"></div><div class="check-text">口腔機能管理（低下症・発達不全症）を算定している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="保険"><div class="check-box"></div><div class="check-text">レセプト返戻・査定の原因分析を毎月行っている</div></label>
        </div>
        <h4 style="color:var(--navy);margin:1rem 0 0.75rem;">【人材・組織】</h4>
        <div class="checklist">
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="人材"><div class="check-box"></div><div class="check-text">歯科衛生士が2名以上在籍している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="人材"><div class="check-box"></div><div class="check-text">スタッフ離職率が年10%以下である</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="人材"><div class="check-box"></div><div class="check-text">月1回以上スタッフミーティングを実施している</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="人材"><div class="check-box"></div><div class="check-text">評価制度・昇給基準が明文化されている</div></label>
          <label class="check-item"><input type="checkbox" class="t10_check" data-cat="人材"><div class="check-box"></div><div class="check-text">院長依存度が低く、スタッフが自律的に動ける</div></label>
        </div>
        <button class="btn-calc" onclick="calcTool10()" style="margin-top:1rem;">スコア診断 →</button>
        <div id="t10_result" style="display:none;margin-top:1.5rem;"></div>
      </div>`
  },

  // ─── Tool 11: 令和8年度改定 自院インパクト診断 ───
  tool11: {
    title: '<i class="ic ic-chart-up"></i> 令和8年度改定 自院インパクト診断',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:0.6rem;">令和8年度（2026年6月施行）改定で、あなたの医院の収益がいくら変わるかを概算し、今すぐやるべきアクションを提示します。</p>
      <div class="alert alert-info" style="margin-bottom:1.25rem;"><span class="alert-icon">ℹ</span><span>保険1点=10円で概算。初再診の増点と物価対応料は<strong>届出不要で全患者に自動適用</strong>（確実なプラス）です。</span></div>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>月間 初診数</label>
            <input type="number" id="t11_sho" value="80" placeholder="人/月">
            <span class="form-hint">初診料+5点＋物価対応料+3点＝<b>+8点</b>が自動加算</span>
          </div>
          <div class="form-group">
            <label>月間 再診数</label>
            <input type="number" id="t11_sai" value="600" placeholder="人/月">
            <span class="form-hint">再診料+1点＋物価対応料+1点＝<b>+2点</b>が自動加算</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>歯科疾患管理料 月間算定回数</label>
            <input type="number" id="t11_shikan" value="300" placeholder="回/月">
            <span class="form-hint">100点→90点（通常月 -10点）。不明なら再診数の半分が目安</span>
          </div>
          <div class="form-group">
            <label>口腔機能管理料「検査なし」運用の回数</label>
            <input type="number" id="t11_kokuki" value="0" placeholder="回/月">
            <span class="form-hint">検査あり化で1件 +40点（50→90点）の上乗せ余地</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group" style="flex:1 1 100%;">
            <label>歯科外来ベースアップ評価料Ⅰの届出状況</label>
            <select id="t11_baseup">
              <option value="done">新基準で再届出済み（2026/6/1までに完了）</option>
              <option value="not">未届 ／ 再届出していない</option>
              <option value="unknown">わからない</option>
            </select>
            <span class="form-hint">改定で初診21点・再診4点に増点。再届出が必要だった項目です</span>
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool11()">改定インパクトを診断 →</button>
        <div class="result-box" id="t11_result">
          <div class="result-grid">
            <div class="result-item">
              <div class="result-label">自動増収（確実・届出不要）</div>
              <div class="result-value" id="t11_auto">—<span class="unit">円/月</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">改定後の純増（自動分）</div>
              <div class="result-value" id="t11_net">—<span class="unit">円/月</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">年間ベース（純増）</div>
              <div class="result-value" id="t11_year">—<span class="unit">円/年</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">算定見直しの上乗せ余地</div>
              <div class="result-value" id="t11_upside">—<span class="unit">円/月</span></div>
            </div>
          </div>
          <div id="t11_alerts" style="margin-top:1rem;"></div>
          <p class="result-note" id="t11_comment"></p>
        </div>
      </div>`
  },

  // ─── Tool 12: リコール率改善 増収シミュレーター ───
  tool12: {
    title: '<i class="ic ic-refresh"></i> リコール率改善 増収シミュレーター',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:0.6rem;">リコール（定期メンテ来院）は歯科で最も安定した収益源。リコール率を上げると年間いくら増えるかを試算します。</p>
      <div class="alert alert-info" style="margin-bottom:1.25rem;"><span class="alert-icon">ℹ</span><span>リコール率の目安は<strong>60〜80%</strong>。新患獲得より既存患者の定着の方が低コストで収益が安定します。</span></div>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>メンテ対象（アクティブ）患者数</label>
            <input type="number" id="t12_pt" value="1500" placeholder="人">
            <span class="form-hint">過去2年以内に来院した患者の概数</span>
          </div>
          <div class="form-group">
            <label>リコール1回あたり平均単価</label>
            <input type="number" id="t12_val" value="3000" placeholder="円">
            <span class="form-hint">メンテ1回の保険＋自費の平均（目安2,000〜4,000円）</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>現在のリコール率</label>
            <input type="number" id="t12_cur" value="50" placeholder="%">
            <span class="form-hint">定期来院につながっている患者の割合</span>
          </div>
          <div class="form-group">
            <label>目標リコール率</label>
            <input type="number" id="t12_tgt" value="70" placeholder="%">
            <span class="form-hint">+10〜20%の改善が現実的な目標</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>年間リコール回数／人</label>
            <input type="number" id="t12_freq" value="3" placeholder="回/年">
            <span class="form-hint">通常3〜4回（3〜4ヶ月ごと）</span>
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool12()">増収額を試算 →</button>
        <div class="result-box" id="t12_result">
          <div class="result-grid">
            <div class="result-item">
              <div class="result-label">現在の年間リコール売上</div>
              <div class="result-value" id="t12_cur_rev">—<span class="unit">円/年</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">目標達成時の年間売上</div>
              <div class="result-value" id="t12_tgt_rev">—<span class="unit">円/年</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">年間増収額</div>
              <div class="result-value" id="t12_gain_y">—<span class="unit">円/年</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">月あたり増収</div>
              <div class="result-value" id="t12_gain_m">—<span class="unit">円/月</span></div>
            </div>
          </div>
          <p class="result-note" id="t12_comment"></p>
        </div>
      </div>`
  },

  // ─── Tool 13: 自費 vs 保険 損益比較 ───
  tool13: {
    title: '<i class="ic ic-diamond"></i> 自費 vs 保険 損益比較',
    html: `
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:0.6rem;">自費診療1件が保険の何来院分の粗利に相当するかを試算。自費比率を上げる経営判断を数字で後押しします。</p>
      <div class="alert alert-info" style="margin-bottom:1.25rem;"><span class="alert-icon">ℹ</span><span>自費診療比率の目安は<strong>30%以上</strong>。自費は材料・技工原価を差し引いても1件あたりの粗利が大きいのが特徴です。</span></div>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label>保険 来院数／月</label>
            <input type="number" id="t13_hN" value="900" placeholder="来院/月">
          </div>
          <div class="form-group">
            <label>保険 1来院あたり平均単価</label>
            <input type="number" id="t13_hV" value="1600" placeholder="円">
            <span class="form-hint">点数×10円。歯科は1来院1,300〜1,800円が目安</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>自費 件数／月</label>
            <input type="number" id="t13_jN" value="4" placeholder="件/月">
          </div>
          <div class="form-group">
            <label>自費 1件あたり平均単価</label>
            <input type="number" id="t13_jV" value="120000" placeholder="円">
            <span class="form-hint">インプラント・矯正・セラミック等の平均</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>自費の材料・技工 原価率</label>
            <input type="number" id="t13_jC" value="30" placeholder="%">
            <span class="form-hint">補綴物の材料・技工料の割合（目安20〜40%）</span>
          </div>
        </div>
        <button class="btn-calc" onclick="calcTool13()">損益を比較する →</button>
        <div class="result-box" id="t13_result">
          <div class="result-grid">
            <div class="result-item">
              <div class="result-label">月商合計（保険＋自費）</div>
              <div class="result-value" id="t13_total">—<span class="unit">円/月</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">自費診療比率</div>
              <div class="result-value" id="t13_ratio">—<span class="unit">%</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">自費の粗利／月</div>
              <div class="result-value" id="t13_gross">—<span class="unit">円/月</span></div>
            </div>
            <div class="result-item">
              <div class="result-label">自費1件 ＝ 保険◯来院分の粗利</div>
              <div class="result-value" id="t13_equiv">—<span class="unit">来院</span></div>
            </div>
          </div>
          <p class="result-note" id="t13_comment"></p>
        </div>
      </div>`
  }
};

// =====================================================
// モーダル制御
// =====================================================
let t6Chart = null;

function openModal(toolId) {
  const tool = TOOL_DEFS[toolId];
  if (!tool) return;
  document.getElementById('modalTitle').innerHTML = tool.title;
  document.getElementById('modalBody').innerHTML = tool.html;
  document.getElementById('modalOverlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
  if (typeof lenis !== 'undefined') lenis.stop();
  if (toolId === 't6Chart') t6Chart = null;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
  if (typeof lenis !== 'undefined') lenis.start();
  if (t6Chart) { t6Chart.destroy(); t6Chart = null; }
}

function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// =====================================================
// Tool 1: 開業資金
// =====================================================
function calcTool1() {
  const prop = +document.getElementById('t1_property').value || 0;
  const int  = +document.getElementById('t1_interior').value || 0;
  const unit = +document.getElementById('t1_unit').value || 0;
  const xray = +document.getElementById('t1_xray').value || 0;
  const sys  = +document.getElementById('t1_system').value || 0;
  const misc = +document.getElementById('t1_misc').value || 0;
  const ad   = +document.getElementById('t1_ad').value || 0;
  const mon  = +document.getElementById('t1_monthly').value || 0;
  const mths = +document.getElementById('t1_months').value || 0;
  const eq   = +document.getElementById('t1_equity').value || 0;
  const rate = (+document.getElementById('t1_rate').value || 1.5) / 100 / 12;
  const yrs  = (+document.getElementById('t1_years').value || 15) * 12;

  const total = prop + int + unit + xray + sys + misc + ad + (mon * mths);
  const loan = Math.max(0, total - eq);
  const eqRatio = total > 0 ? (eq / total * 100).toFixed(1) : 0;
  const repay = loan > 0 && rate > 0
    ? Math.round(loan * 10000 * rate * Math.pow(1 + rate, yrs) / (Math.pow(1 + rate, yrs) - 1) / 10000 * 10) / 10
    : Math.round(loan / (yrs / 12) * 10) / 10;

  document.getElementById('t1_total').innerHTML = `${total.toLocaleString()}<span class="unit">万円</span>`;
  document.getElementById('t1_loan').innerHTML = `${loan.toLocaleString()}<span class="unit">万円</span>`;
  document.getElementById('t1_repay').innerHTML = `${repay.toFixed(1)}<span class="unit">万円/月</span>`;
  document.getElementById('t1_equityRatio').innerHTML = `${eqRatio}<span class="unit">%</span>`;

  let comment = '';
  if (+eqRatio < 10) comment += '<i class="ic ic-alert"></i>自己資金比率が10%未満です。日本政策金融公庫は自己資金10%以上を推奨しています。 ';
  if (repay > mon * 0.2) comment += '<i class="ic ic-alert"></i>月返済額が運転資金の20%を超えています。資金計画の見直しを検討してください。 ';
  if (comment === '') comment = '<i class="ic ic-check"></i> 基本的な資金バランスは問題なさそうです。詳細は金融機関・税理士にご確認ください。';
  document.getElementById('t1_comment').innerHTML = comment;

  document.getElementById('t1_result').classList.add('show');
}

// =====================================================
// Tool 2: 月商・利益
// =====================================================
function calcTool2() {
  const units = +document.getElementById('t2_units').value || 3;
  const days  = +document.getElementById('t2_days').value || 22;
  const newpt = +document.getElementById('t2_newpt').value || 3;
  const rept  = +document.getElementById('t2_rept').value || 20;
  const insP  = +document.getElementById('t2_ins_price').value || 5000;
  const jihiR = +document.getElementById('t2_jihi_ratio').value / 100 || 0.25;
  const jihiP = +document.getElementById('t2_jihi_price').value || 50000;
  const laborR= +document.getElementById('t2_labor').value / 100 || 0.45;
  const matR  = +document.getElementById('t2_material').value / 100 || 0.12;
  const rent  = +document.getElementById('t2_rent').value || 30;

  const totalPt = (newpt + rept) * days;
  const jihiPt  = Math.round(totalPt * jihiR);
  const insPt   = totalPt - jihiPt;
  const revenue = Math.round((insPt * insP + jihiPt * jihiP) / 10000);
  const jihiRev = Math.round(jihiPt * jihiP / 10000);
  const laborCost = Math.round(revenue * laborR);
  const matCost   = Math.round(revenue * matR);
  const profit    = revenue - laborCost - matCost - rent;

  document.getElementById('t2_total_pt').innerHTML = `${totalPt.toLocaleString()}<span class="unit">人</span>`;
  document.getElementById('t2_revenue').innerHTML  = `${revenue.toLocaleString()}<span class="unit">万円</span>`;
  document.getElementById('t2_jihi_rev').innerHTML = `${jihiRev.toLocaleString()}<span class="unit">万円</span>`;
  document.getElementById('t2_profit').innerHTML   = `${profit.toLocaleString()}<span class="unit">万円</span>`;

  let comment = `1日あたり患者数：${newpt + rept}人 | 月間患者数：${totalPt}人（自費：${jihiPt}人）\n`;
  comment += `人件費：${laborCost}万円 | 材料費：${matCost}万円 | 家賃：${rent}万円\n`;
  if (profit < 50) comment += '<i class="ic ic-alert"></i>利益が低い状態です。自費率向上・キャンセル削減・経費見直しを検討してください。';
  else if (profit >= 50 && profit < 100) comment += '<i class="ic ic-chart-bar"></i> 利益は出ていますが、改善余地があります。自費率アップが最も効果的です。';
  else comment += '<i class="ic ic-check"></i> 良好な利益水準です。スタッフ教育・設備投資で更なる成長を目指しましょう。';
  document.getElementById('t2_comment').innerHTML = comment;
  document.getElementById('t2_result').classList.add('show');
}

// =====================================================
// Tool 3: 開業スケジュール
// =====================================================
function calcTool3() {
  const dateStr = document.getElementById('t3_opendate').value;
  if (!dateStr) return;
  const [year, month] = dateStr.split('-').map(Number);

  const getDate = (mOffset) => {
    const d = new Date(year, month - 1 + mOffset, 1);
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
  };

  const schedule = [
    { offset: -18, tasks: 'コンセプト設計・診療方針決定・資金計画開始・税理士・コンサルタント選定' },
    { offset: -15, tasks: '診療圏調査・競合分析・融資相談（日本政策金融公庫・銀行）開始' },
    { offset: -12, tasks: '物件探し開始・事業計画書の作成・融資申請書類の準備' },
    { offset: -10, tasks: '融資申請・物件候補の絞り込み・設計事務所の選定' },
    { offset: -9,  tasks: '物件契約・設計開始（平面図・内装プランの検討）' },
    { offset: -7,  tasks: '融資承認・内装工事業者決定・医療機器メーカーと打ち合わせ' },
    { offset: -6,  tasks: '内装工事開始・レセコン・電子カルテ選定・スタッフ採用活動開始' },
    { offset: -4,  tasks: 'X線装置届出（使用開始30日前まで）・保健所事前相談' },
    { offset: -3,  tasks: '内装工事完了・医療機器搬入・保健所立入検査・開設届提出準備' },
    { offset: -2,  tasks: '診療所開設届提出・保険医療機関指定申請・スタッフ研修開始' },
    { offset: -1,  tasks: 'ホームページ公開・Googleビジネスプロフィール登録・チラシ・看板設置・内覧会' },
    { offset:  0,  tasks: '開業！試験診療（1〜2週間）→ 本格診療開始' },
    { offset:  1,  tasks: '各種施設基準の届出（加算算定開始）・月次レセプト確認' },
    { offset:  3,  tasks: '開業後3ヶ月KPIレビュー・キャンセル対策・リコール導線の見直し' },
    { offset:  6,  tasks: '開業後6ヶ月レビュー・損益分岐点確認・必要に応じて広告・採用強化' },
  ];

  let html = '';
  schedule.forEach(s => {
    const label = s.offset === 0 ? '開業月' : s.offset < 0 ? `${Math.abs(s.offset)}ヶ月前` : `開業後${s.offset}ヶ月`;
    const isOpen = s.offset === 0;
    html += `
      <div class="schedule-row" style="${isOpen ? 'background:rgba(0,201,167,0.08);padding:0.65rem 0.5rem;border-radius:8px;' : ''}">
        <div class="schedule-month" style="${isOpen ? 'color:var(--teal-dark);' : ''}">${getDate(s.offset)}<br><span style="font-size:0.78rem;font-weight:400;color:var(--gray-400);">${label}</span></div>
        <div class="schedule-tasks">${s.tasks}</div>
      </div>`;
  });

  document.getElementById('t3_table').innerHTML = html;
  document.getElementById('t3_result').style.display = 'block';
}

// =====================================================
// Tool 4: 行政届出チェックリスト
// =====================================================
function calcTool4() {
  const form  = document.getElementById('t4_form').value;
  const xray  = document.getElementById('t4_xray').value;
  const ins   = document.getElementById('t4_ins').value;
  const visit = document.getElementById('t4_visit').value;

  const items = [];

  if (form === 'individual') {
    items.push({ label: '診療所開設届', detail: '開設後10日以内 → 所轄保健所', required: true });
    items.push({ label: '管理者届（院長＝開設者の場合は不要）', detail: '管理者が異なる場合のみ', required: false });
  } else {
    items.push({ label: '医療法人設立認可申請', detail: '都道府県知事へ → 処理期間2〜6ヶ月', required: true });
    items.push({ label: '医療法人診療所開設許可申請', detail: '保健所経由 → 都道府県知事', required: true });
    items.push({ label: '定款・社員総会・理事会記録の整備', detail: '法人設立後に必要', required: true });
  }

  if (xray === 'yes' || xray === 'ct') {
    items.push({ label: 'エックス線装置備え付け届', detail: '使用開始30日前まで → 所轄保健所', required: true });
    if (xray === 'ct') {
      items.push({ label: 'CT・CBCT の管理区域設定届', detail: '放射線障害防止法に基づく届出', required: true });
      items.push({ label: '放射線障害防止管理者の選任届', detail: '使用前に届出', required: true });
    }
  }

  if (ins === 'yes') {
    items.push({ label: '保険医療機関指定申請', detail: '開設届後速やかに → 地方厚生（支）局', required: true });
    items.push({ label: '保険医登録（歯科医師本人）', detail: '既登録の場合は勤務先変更届', required: true });
    items.push({ label: '施設基準届出（算定する加算ごと）', detail: '算定開始前に → 地方厚生（支）局', required: false });
  }

  if (visit === 'yes') {
    items.push({ label: '在宅療養支援歯科診療所の届出（任意）', detail: '24時間連絡可能体制を整えて届出', required: false });
  }

  items.push({ label: '個人情報保護法に基づく安全管理措置の整備', detail: '院内規程・プライバシーポリシーの作成', required: true });
  items.push({ label: 'Googleビジネスプロフィール・HPの医療広告規制確認', detail: '開業前にチェック推奨', required: false });

  let html = `<h4 style="color:var(--navy);margin-bottom:0.75rem;"><i class="ic ic-clipboard"></i> 必要届出リスト（${form === 'individual' ? '個人開業' : '医療法人'}）</h4>`;
  items.forEach(item => {
    const badge = item.required
      ? '<span class="tag red" style="flex-shrink:0;">必須</span>'
      : '<span class="tag" style="flex-shrink:0;">推奨</span>';
    html += `
      <div class="point-item" style="margin-bottom:0.5rem;">
        ${badge}
        <div class="pi-text"><strong>${item.label}</strong><br><span style="color:var(--text-muted);font-size:0.82rem;">${item.detail}</span></div>
      </div>`;
  });
  html += `<div class="alert alert-warn" style="margin-top:1rem;"><span class="alert-icon"><i class="ic ic-alert"></i></span><span>届出要件は都道府県・保健所によって異なる場合があります。必ず所轄の保健所・地方厚生局に事前確認してください。</span></div>`;

  const result = document.getElementById('t4_result');
  result.innerHTML = html;
  result.style.display = 'block';
}

// =====================================================
// Tool 5: 施設基準チェック
// =====================================================
function calcTool5() {
  const checks = [
    document.getElementById('t5_c1').checked,
    document.getElementById('t5_c2').checked,
    document.getElementById('t5_c3').checked,
    document.getElementById('t5_c4').checked,
    document.getElementById('t5_c5').checked,
    document.getElementById('t5_c6').checked,
    document.getElementById('t5_c7').checked,
    document.getElementById('t5_c8').checked,
    document.getElementById('t5_c9').checked,
    document.getElementById('t5_c10').checked,
  ];

  const [aed, safety, infect, myna, rx, dh, kanri100, visit24, photo, homecare] = checks;

  const results = [];
  const missing = [];

  if (aed && safety) {
    results.push({ name: '歯科外来診療医療安全対策加算1', note: 'AED設置＋安全研修2回/年の要件を充足' });
  } else {
    if (!aed) missing.push('AEDの設置');
    if (!safety) missing.push('医療安全研修（年2回以上）の記録');
  }

  if (infect) {
    results.push({ name: '歯科外来診療感染対策加算1', note: '感染対策研修2回/年の要件を充足' });
  } else {
    missing.push('感染防止対策研修（年2回以上）の記録');
  }

  if (myna) {
    results.push({ name: '医療DX推進体制整備加算（基本）', note: 'マイナ保険証・オンライン資格確認導入済み' });
    if (rx) results.push({ name: '医療DX推進体制整備加算（拡充要件）', note: '電子処方箋対応でさらに高い点数' });
  } else {
    missing.push('マイナ保険証（オンライン資格確認）の導入');
  }

  if (dh && kanri100 && visit24 && photo) {
    results.push({ name: '口腔管理体制強化加算', note: '主要要件を充足。詳細は地方厚生局に確認' });
  } else {
    if (!dh) missing.push('歯科衛生士の常勤配置（1名以上）');
    if (!kanri100) missing.push('歯科疾患管理料100回/年以上の実績');
    if (!visit24) missing.push('歯科訪問診療24回/年以上の実績');
    if (!photo) missing.push('口腔内写真の日常的な撮影');
  }

  if (homecare) {
    results.push({ name: '在宅療養支援歯科診療所（歯援診）の届出要件充足', note: '24時間連絡体制あり' });
  }

  let html = '';
  if (results.length > 0) {
    html += '<h4 style="color:var(--teal-dark);margin-bottom:0.75rem;"><i class="ic ic-check"></i> 算定可能と思われる加算</h4>';
    results.forEach(r => {
      html += `<div class="point-item" style="margin-bottom:0.5rem;"><div class="pi-num teal">✓</div><div class="pi-text"><strong>${r.name}</strong><br><span style="color:var(--text-muted);font-size:0.82rem;">${r.note}</span></div></div>`;
    });
  }
  if (missing.length > 0) {
    html += '<h4 style="color:var(--navy);margin:1rem 0 0.75rem;"><i class="ic ic-bolt"></i> 不足している要件（対応で算定可能に）</h4>';
    missing.forEach(m => {
      html += `<div class="point-item" style="margin-bottom:0.5rem;"><div class="pi-num" style="background:var(--gold);color:var(--navy);">!</div><div class="pi-text">${m}</div></div>`;
    });
  }
  html += `<div class="alert alert-warn" style="margin-top:1rem;"><span class="alert-icon"><i class="ic ic-alert"></i></span><span>本ツールは簡易判定です。実際の施設基準届出は、必ず最新の告示・通知を確認のうえ地方厚生（支）局にお問い合わせください。</span></div>`;

  const result = document.getElementById('t5_result');
  result.innerHTML = html;
  result.style.display = 'block';
}

// =====================================================
// Tool 6: KPIダッシュボード
// =====================================================
function calcTool6() {
  const rev    = +document.getElementById('t6_rev').value || 350;
  const newpt  = +document.getElementById('t6_newpt').value || 45;
  const cancel = +document.getElementById('t6_cancel').value || 18;
  const recall = +document.getElementById('t6_recall').value || 55;
  const jihi   = +document.getElementById('t6_jihi').value || 28;
  const labor  = +document.getElementById('t6_labor').value || 48;

  document.getElementById('t6_result').style.display = 'block';

  if (t6Chart) { t6Chart.destroy(); t6Chart = null; }
  const ctx = document.getElementById('t6_chart').getContext('2d');
  t6Chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['月商(×100万)', '新患数(×5)', 'キャンセル率\n（低いほど良）', 'リコール率', '自費率', '人件費率\n（低いほど良）'],
      datasets: [
        {
          label: '現状',
          data: [rev / 100, newpt / 5, cancel, recall, jihi, labor],
          borderColor: 'rgba(0,201,167,0.8)',
          backgroundColor: 'rgba(0,201,167,0.15)',
          pointBackgroundColor: 'rgba(0,201,167,1)',
        },
        {
          label: '目標値',
          data: [5, 10, 10, 65, 40, 42],
          borderColor: 'rgba(201,168,76,0.7)',
          backgroundColor: 'rgba(201,168,76,0.08)',
          pointBackgroundColor: 'rgba(201,168,76,1)',
          borderDash: [5, 5],
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { r: { min: 0, max: 100, ticks: { stepSize: 20 } } },
      plugins: { legend: { position: 'bottom' } }
    }
  });

  const comments = [];
  if (cancel > 15) comments.push({ type: 'warn', text: `<i class="ic ic-alert"></i>キャンセル率 ${cancel}%：目標15%以下。前日リマインドSMS/LINEの導入で10〜30%削減できます。` });
  if (recall < 60) comments.push({ type: 'warn', text: `<i class="ic ic-alert"></i>リコール率 ${recall}%：目標60〜70%。会計時の次回予約導入が最も効果的です。` });
  if (jihi < 30) comments.push({ type: 'info', text: `<i class="ic ic-chart-bar"></i> 自費率 ${jihi}%：全国平均30〜40%。口腔内写真活用とカウンセリング強化で改善できます。` });
  if (labor > 50) comments.push({ type: 'danger', text: `<i class="ic ic-alert"></i> 人件費率 ${labor}%：50%超は危険ライン。採用計画・業務効率化の見直しが急務です。` });
  if (comments.length === 0) comments.push({ type: 'success', text: '<i class="ic ic-check"></i> 全体的に良好なKPI水準です。さらなる成長に向けて自費率・リコール率の向上を目指しましょう。' });

  const commentsEl = document.getElementById('t6_comments');
  commentsEl.innerHTML = comments.map(c => `<div class="alert alert-${c.type}"><span>${c.text}</span></div>`).join('');
}

// =====================================================
// Tool 7: 医療広告チェッカー
// =====================================================
function calcTool7() {
  const text = document.getElementById('t7_text').value;
  if (!text.trim()) return;

  const rules = [
    { pattern: /(日本一|最高|最先端|ナンバーワン|No\.1|№1|国内最高)/gi, level: 'danger', msg: '最上級表現・比較広告', detail: '根拠のない「最高」「日本一」等の表現は原則禁止（医療広告ガイドライン）' },
    { pattern: /(必ず|100%|絶対|完全に治|保証)/gi, level: 'danger', msg: '効果保証表現', detail: '治癒・完治を保証する表現は禁止。「個人差があります」「必ずしも〜ではない」等に修正を' },
    { pattern: /(体験談|口コミ|患者様の声|患者の声|お客様の声)/gi, level: 'danger', msg: '患者の体験談・口コミの掲載', detail: '患者の体験談はHPへの掲載が原則禁止。限定解除要件を満たした場合のみ可' },
    { pattern: /(ビフォー|before|after|アフター|症例写真|治療前後)/gi, level: 'warn', msg: 'Before/After写真・症例写真', detail: '限定解除要件（費用・リスク表示等）を満たさない場合は掲載不可。確認が必要' },
    { pattern: /(他院より|他の医院|どこよりも|最安値|最低価格)/gi, level: 'danger', msg: '比較広告', detail: '他院との比較広告は原則禁止（根拠のある比較でも要確認）' },
    { pattern: /(痛みがない|無痛|全く痛くない)/gi, level: 'warn', msg: '「痛みがない」表現', detail: '個人差があるため、断定的な表現は避け「痛みを抑えた治療に努めています」等に修正を' },
    { pattern: /(サクラ|やらせ|ステマ)/gi, level: 'danger', msg: 'ステルスマーケティング', detail: '景品表示法違反。口コミ依頼時は関係性の開示が必要' },
    { pattern: /(スタッフ一同|チーム全員)/gi, level: 'info', msg: '掲載可能表現（問題なし）', detail: 'スタッフ紹介等は問題ありません' },
  ];

  let findings = [];
  rules.forEach(rule => {
    const matches = text.match(rule.pattern);
    if (matches && rule.level !== 'info') {
      findings.push({ level: rule.level, msg: rule.msg, detail: rule.detail, matches: [...new Set(matches)] });
    }
  });

  let html = '';
  if (findings.length === 0) {
    html = `<div class="alert alert-success"><span class="alert-icon"><i class="ic ic-check"></i></span><span>明らかなNG表現は検出されませんでした。ただし、このツールはすべての違反を検出するものではありません。医療広告ガイドライン（厚労省）で最終確認することを推奨します。</span></div>`;
  } else {
    html = `<h4 style="color:var(--navy);margin-bottom:0.75rem;"><i class="ic ic-alert"></i>チェック結果：${findings.length}件の懸念事項</h4>`;
    findings.forEach(f => {
      html += `<div class="alert alert-${f.level}" style="flex-direction:column;gap:0.4rem;">
        <div style="font-weight:700;">【${f.msg}】検出ワード：「${f.matches.join('」「')}」</div>
        <div style="font-size:0.83rem;">${f.detail}</div>
      </div>`;
    });
    html += `<div class="alert alert-info" style="margin-top:0.75rem;"><span class="alert-icon">ℹ</span><span>このツールは簡易チェックです。最終判断は医療広告ガイドライン・Q&A（厚生労働省公式サイト）およびHP掲載前の専門家確認を推奨します。</span></div>`;
  }

  const result = document.getElementById('t7_result');
  result.innerHTML = html;
  result.style.display = 'block';
}

// =====================================================
// Tool 8: 自費カウンセリング台本
// =====================================================
function calcTool8() {
  const type = document.getElementById('t8_type').value;
  const scripts = {
    implant: {
      title: 'インプラント カウンセリング台本',
      flow: ['①主訴・現状の確認', '②口腔内写真・CTを用いた現状説明', '③インプラントのメリット・デメリット説明', '④治療費・治療期間・回数の提示', '⑤リスク・副作用の説明', '⑥支払い方法・ローンの案内', '⑦患者の疑問への回答', '⑧次回予約または再考期間の設定'],
      points: ['「欠損部を放置するとどうなるか」を先に説明（患者の課題認識を高める）', '「天然歯に最も近い機能回復」という価値訴求', '費用は「1本25〜45万円」と明示し、治療費明細書を渡す', '保証・アフターケアの内容を伝える（安心感の提供）', 'デンタルローン（分割払い）を提示し支払い障壁を下げる'],
      risk: ['インプラント体の脱落リスク（成功率98%前後）', '骨量不足時の骨造成が必要な場合あり', '喫煙・糖尿病等が成功率に影響する旨を説明', '定期的なメンテナンスが必須（年1〜2回）', '健康保険適用外（全額自費）であることの説明'],
    },
    ortho: {
      title: 'マウスピース矯正 カウンセリング台本',
      flow: ['①主訴（歯並び・口元の悩み）の確認', '②口腔内スキャン・写真・レントゲンによる現状説明', '③マウスピース矯正の仕組みと適応症例の説明', '④費用・治療期間（1〜3年）の提示', '⑤メリット・デメリット（着脱可能、目立たないが管理が必要）', '⑥保定期間について説明', '⑦支払い方法の案内', '⑧精密検査・治療計画の提案'],
      points: ['「目立たない・取り外せる」という生活への支障の少なさを訴求', '「治療中の写真OK」「食事制限なし」という日常生活のメリット強調', '治療前後のシミュレーション画像を見せる（成果の可視化）', '分割払い・ローンの提示'],
      risk: ['すべての症例に適応可能ではない（重度の骨格性の問題等は不可）', '1日20〜22時間の装着が必要（患者のコンプライアンスが重要）', '保定装置の使用を怠ると後戻りするリスク'],
    },
    ceramic: {
      title: 'セラミッククラウン カウンセリング台本',
      flow: ['①現在の歯（変色・金属アレルギー・審美不満）の確認', '②口腔内写真で現状を説明', '③セラミックの種類（オールセラミック・ジルコニア等）の説明', '④費用・治療期間（2〜3回で完了）の提示', '⑤保険の白い歯（CAD/CAM冠）との違いを比較説明', '⑥リスク・メンテナンス説明', '⑦支払い方法'],
      points: ['「金属アレルギー対応」「審美性の高さ」「耐久性」の3つが強み', '「一生ものの投資」という視点で価値を伝える', '保険のCAD/CAM冠との違い（耐久性・審美性）を比較表で見せる'],
      risk: ['硬い食べ物による破損リスク（ジルコニアは比較的強固）', '天然歯の削除量が多い場合あり', '定期的なクリーニングが必要'],
    },
    whitening: {
      title: 'ホワイトニング カウンセリング台本',
      flow: ['①ホワイトニングの希望度・目標の確認', '②現在の歯の色（シェードガイドで測定）', '③オフィス・ホーム・デュアルの選択肢を提示', '④費用・効果持続期間・回数の説明', '⑤知覚過敏リスクの説明', '⑥アフターケア・色戻り防止の説明', '⑦カウンセリング後の予約'],
      points: ['「今日から始められる」の即決性を訴求', '「特別なイベント（結婚式・成人式）に向けて」等の動機付け', 'オフィス（1回）とホーム（2〜4週間）の組み合わせ（デュアル）が最も効果的'],
      risk: ['知覚過敏が一時的に発生する場合あり', 'コーヒー・赤ワイン・タバコで色戻りしやすい', 'セラミック・義歯等には効果がない'],
    }
  };

  const s = scripts[type];
  let html = `
    <h4 style="color:var(--navy);margin-bottom:1rem;"><i class="ic ic-clipboard"></i> ${s.title}</h4>
    <div style="margin-bottom:1rem;">
      <h5 style="color:var(--teal-dark);margin-bottom:0.5rem;font-size:0.9rem;">カウンセリングフロー</h5>
      ${s.flow.map((f, i) => `<div class="point-item"><div class="pi-num teal">${i + 1}</div><div class="pi-text">${f}</div></div>`).join('')}
    </div>
    <div style="margin-bottom:1rem;">
      <h5 style="color:var(--navy);margin-bottom:0.5rem;font-size:0.9rem;"><i class="ic ic-check"></i> 伝えるべきポイント</h5>
      ${s.points.map(p => `<div class="point-item"><div class="pi-num">›</div><div class="pi-text">${p}</div></div>`).join('')}
    </div>
    <div>
      <h5 style="color:var(--text-muted);margin-bottom:0.5rem;font-size:0.9rem;"><i class="ic ic-alert"></i>必ず説明するリスク・副作用（医療広告規制上も必須）</h5>
      ${s.risk.map(r => `<div class="point-item"><div class="pi-num" style="background:#e74c3c;">!</div><div class="pi-text">${r}</div></div>`).join('')}
    </div>
    <div class="alert alert-info" style="margin-top:1rem;"><span class="alert-icon">ℹ</span><span>費用・リスク・副作用の説明は医療広告規制上の義務です。必ず書面（治療計画書）で患者に渡してください。</span></div>`;

  const result = document.getElementById('t8_result');
  result.innerHTML = html;
  result.style.display = 'block';
}

// =====================================================
// Tool 9: 求人票ジェネレーター
// =====================================================
function calcTool9() {
  const jobMap = { dh: '歯科衛生士', da: '歯科助手', rec: '受付', dt: '歯科技工士' };
  const empMap = { full: '正社員（常勤）', part: 'パート・アルバイト', both: '正社員・パートどちらも歓迎' };
  const job     = document.getElementById('t9_job').value;
  const employ  = document.getElementById('t9_employ').value;
  const salary  = document.getElementById('t9_salary').value;
  const strengths = [...document.getElementById('t9_strength').selectedOptions].map(o => o.value);

  const strengthText = strengths.length > 0 ? strengths.join('・') : 'アットホームな職場環境';

  const template = `
    <div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:12px;padding:1.5rem;">
      <div style="font-weight:700;color:var(--navy);font-size:1.1rem;margin-bottom:0.5rem;">【求人票】${jobMap[job]} 募集</div>
      <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">雇用形態：${empMap[employ]}</div>
      <hr style="border:1px solid var(--gray-200);margin-bottom:1rem;">
      <p style="font-size:0.9rem;line-height:1.8;color:var(--text);">
        当院では、${strengthText}を大切にしながら、患者様一人ひとりに寄り添う歯科医療を提供しています。
        スタッフが長く・楽しく・やりがいをもって働ける環境づくりに力を入れています。<br><br>
        <strong>経験者はもちろん、ブランクがある方・育児中の方もぜひご相談ください。</strong>
        まずは見学・体験勤務から始めることもできます。
      </p>
      <hr style="border:1px solid var(--gray-200);margin:1rem 0;">
      <table style="width:100%;font-size:0.85rem;border-collapse:collapse;">
        <tr><td style="padding:0.4rem 0;width:120px;color:var(--text-muted);font-weight:600;">給与</td><td style="color:var(--navy);">月給 ${salary}万円〜（経験・スキルを考慮）</td></tr>
        <tr><td style="padding:0.4rem 0;color:var(--text-muted);font-weight:600;">雇用形態</td><td>${empMap[employ]}</td></tr>
        <tr><td style="padding:0.4rem 0;color:var(--text-muted);font-weight:600;">勤務時間</td><td>9:00〜18:00（休憩1時間）※曜日・コマ数は相談可</td></tr>
        <tr><td style="padding:0.4rem 0;color:var(--text-muted);font-weight:600;">休日</td><td>日曜・祝日・週1日（曜日応相談）</td></tr>
        <tr><td style="padding:0.4rem 0;color:var(--text-muted);font-weight:600;">待遇・福利厚生</td><td>社会保険完備・有給休暇・産前産後休暇・育児休暇・交通費支給</td></tr>
        <tr><td style="padding:0.4rem 0;color:var(--text-muted);font-weight:600;">その他</td><td>${strengthText}</td></tr>
        <tr><td style="padding:0.4rem 0;color:var(--text-muted);font-weight:600;">応募方法</td><td>まずはお電話またはメールにてご連絡ください。見学のみも歓迎。</td></tr>
      </table>
    </div>
    <div class="alert alert-info" style="margin-top:1rem;"><span class="alert-icon">ℹ</span><span>求人票の内容は雇用契約書・労働条件通知書と齟齬がないよう作成し、採用後に必ず書面交付してください（労働基準法第15条）。</span></div>`;

  const result = document.getElementById('t9_result');
  result.innerHTML = template;
  result.style.display = 'block';
}

// =====================================================
// Tool 10: 収益改善セルフチェック
// =====================================================
function calcTool10() {
  const checks = document.querySelectorAll('.t10_check');
  const catScores = {};
  let total = 0;

  checks.forEach(c => {
    const cat = c.dataset.cat;
    if (!catScores[cat]) catScores[cat] = { checked: 0, total: 0 };
    catScores[cat].total++;
    if (c.checked) { catScores[cat].checked++; total++; }
  });

  const maxTotal = checks.length;
  const pct = Math.round(total / maxTotal * 100);

  let grade, color, advice;
  if (pct >= 80) { grade = 'S'; color = '#00c9a7'; advice = '優秀な経営状態です！さらなる高みを目指して、分院展開・医療法人化・M&A準備を検討する時期かもしれません。'; }
  else if (pct >= 60) { grade = 'A'; color = '#3b9eca'; advice = '良好な経営状態です。未チェックの項目を重点的に改善することで、さらに大きな収益向上が期待できます。'; }
  else if (pct >= 40) { grade = 'B'; color = '#c9a84c'; advice = '改善の余地があります。自費率向上・リコール率改善・採用定着の3点から優先的に取り組みましょう。'; }
  else { grade = 'C'; color = '#e74c3c'; advice = '緊急の改善が必要です。まずはキャンセル率の低下とリコール体制の整備から着手し、専門コンサルタントへの相談も検討してください。'; }

  let html = `
    <div style="text-align:center;background:var(--navy);border-radius:16px;padding:1.5rem;margin-bottom:1rem;color:var(--white);">
      <div style="font-size:3rem;font-weight:700;color:${color};">${grade}</div>
      <div style="font-size:1.5rem;font-weight:700;">${total} / ${maxTotal} 項目達成</div>
      <div style="font-size:1rem;color:rgba(255,255,255,0.6);">スコア：${pct}%</div>
    </div>
    <div class="alert alert-${grade === 'S' ? 'success' : grade === 'A' ? 'info' : grade === 'B' ? 'warn' : 'danger'}">
      <span>${advice}</span>
    </div>
    <h4 style="color:var(--navy);margin:1rem 0 0.75rem;">カテゴリ別スコア</h4>`;

  const catLabels = { '集患': '集患・予約管理', '自費': '自費収益・カウンセリング', 'リコール': 'リコール・定着', '保険': '診療報酬・施設基準', '人材': '人材・組織' };
  Object.entries(catScores).forEach(([cat, s]) => {
    const p = Math.round(s.checked / s.total * 100);
    html += `
      <div style="margin-bottom:0.75rem;">
        <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.3rem;">
          <span style="font-weight:600;color:var(--navy);">${catLabels[cat] || cat}</span>
          <span style="color:var(--text-muted);">${s.checked}/${s.total} (${p}%)</span>
        </div>
        <div style="background:var(--gray-200);border-radius:4px;height:8px;overflow:hidden;">
          <div style="background:${p >= 80 ? 'var(--teal)' : p >= 60 ? 'var(--gold)' : '#e74c3c'};width:${p}%;height:100%;border-radius:4px;transition:width 0.5s;"></div>
        </div>
      </div>`;
  });

  const result = document.getElementById('t10_result');
  result.innerHTML = html;
  result.style.display = 'block';
}

// =====================================================
// Tool 11: 令和8年度改定 自院インパクト診断
// =====================================================
function calcTool11() {
  const sho    = +document.getElementById('t11_sho').value || 0;
  const sai    = +document.getElementById('t11_sai').value || 0;
  const shikan = +document.getElementById('t11_shikan').value || 0;
  const kokuki = +document.getElementById('t11_kokuki').value || 0;
  const baseup = document.getElementById('t11_baseup').value;
  const YEN = 10; // 保険1点 = 10円

  const auto       = (8 * sho + 2 * sai) * YEN;
  const shikanLoss = (10 * shikan) * YEN;
  const net        = auto - shikanLoss;
  const upside     = (40 * kokuki) * YEN;

  const fmt = n => (n < 0 ? '-' : '') + '¥' + Math.abs(Math.round(n)).toLocaleString();

  document.getElementById('t11_auto').innerHTML   = `${fmt(auto)}<span class="unit">円/月</span>`;
  document.getElementById('t11_net').innerHTML    = `${fmt(net)}<span class="unit">円/月</span>`;
  document.getElementById('t11_year').innerHTML   = `${fmt(net * 12)}<span class="unit">円/年</span>`;
  document.getElementById('t11_upside').innerHTML = `${fmt(upside)}<span class="unit">円/月</span>`;

  let a = '';
  if (baseup === 'not' || baseup === 'unknown') {
    const miss = (21 * sho + 4 * sai) * YEN;
    a += `<div class="alert alert-danger" style="margin-bottom:0.6rem;"><span class="alert-icon"><i class="ic ic-alert"></i></span><span><strong>要対応：</strong>歯科外来ベースアップ評価料Ⅰは改定で初診21点・再診4点に増点。<strong>新基準での再届出（2026/6/1期限）</strong>が必要でした。未了だと月<strong>${miss.toLocaleString()}円</strong>相当を取り逃します。至急ご確認を。</span></div>`;
  }
  if (kokuki > 0) {
    a += `<div class="alert alert-info" style="margin-bottom:0.6rem;"><span class="alert-icon">ℹ</span><span>口腔機能管理料を「検査あり」運用に切り替えると、月<strong>${upside.toLocaleString()}円</strong>の上乗せ余地。検査体制の整備で実現できます。</span></div>`;
  }
  a += `<div class="alert alert-warn"><span class="alert-icon"><i class="ic ic-alert"></i></span><span>SPT・P重防は「歯周病継続支援治療」へ統合。レセコンのマスタ変更が必要です（移行漏れは算定エラーの原因に）。</span></div>`;
  document.getElementById('t11_alerts').innerHTML = a;

  let c = '<i class="ic ic-check"></i> 初再診の自動増点＋物価対応料だけでも確実にプラスです。さらに口腔機能管理の算定強化（検査あり化）が収益維持の鍵になります。';
  if (net < 0) {
    c = '<i class="ic ic-alert"></i> 歯科疾患管理料の減点が自動増収を上回っています。口腔機能管理料の算定強化（検査あり90点）で十分カバー可能です。算定構成の見直しを推奨します。';
  }
  c += '<br><small style="color:var(--text-muted);">※保険1点=10円での概算。初診月の歯科疾患管理料は逓減廃止によりプラス要因（本試算は通常月ベース）。正確な算定は青本2026・レセコンでご確認ください。</small>';
  document.getElementById('t11_comment').innerHTML = c;

  document.getElementById('t11_result').classList.add('show');
}

// =====================================================
// Tool 12: リコール率改善 増収シミュレーター
// =====================================================
function calcTool12() {
  const pt   = +document.getElementById('t12_pt').value || 0;
  const val  = +document.getElementById('t12_val').value || 0;
  const cur  = (+document.getElementById('t12_cur').value || 0) / 100;
  const tgt  = (+document.getElementById('t12_tgt').value || 0) / 100;
  const freq = +document.getElementById('t12_freq').value || 0;

  const curRev   = Math.round(pt * cur * freq * val);
  const tgtRev   = Math.round(pt * tgt * freq * val);
  const gainYear = tgtRev - curRev;
  const gainMon  = Math.round(gainYear / 12);

  const fmt = n => (n < 0 ? '-' : '') + '¥' + Math.abs(Math.round(n)).toLocaleString();

  document.getElementById('t12_cur_rev').innerHTML = `${fmt(curRev)}<span class="unit">円/年</span>`;
  document.getElementById('t12_tgt_rev').innerHTML = `${fmt(tgtRev)}<span class="unit">円/年</span>`;
  document.getElementById('t12_gain_y').innerHTML  = `${fmt(gainYear)}<span class="unit">円/年</span>`;
  document.getElementById('t12_gain_m').innerHTML  = `${fmt(gainMon)}<span class="unit">円/月</span>`;

  let c = '';
  if (tgt <= cur) {
    c = '<i class="ic ic-alert"></i> 目標リコール率が現在値以下です。現実的な改善目標（現状+10〜20%）を設定してください。';
  } else {
    const addPatients = Math.round(pt * (tgt - cur));
    c = `<i class="ic ic-check"></i> リコール率を${(cur*100).toFixed(0)}%→${(tgt*100).toFixed(0)}%に改善すると、定着患者が約<strong>${addPatients.toLocaleString()}人</strong>増え、年間<strong>${fmt(gainYear)}円</strong>の増収が見込めます。次回予約の院内固定・LINE/ハガキリマインド・担当衛生士制が効果的です。`;
  }
  c += '<br><small style="color:var(--text-muted);">※入力値に基づく概算。単価は自院のメンテ1回あたり平均で調整してください。新患の生涯価値（LTV）向上にも直結します。</small>';
  document.getElementById('t12_comment').innerHTML = c;

  document.getElementById('t12_result').classList.add('show');
}

// =====================================================
// Tool 13: 自費 vs 保険 損益比較
// =====================================================
function calcTool13() {
  const hN = +document.getElementById('t13_hN').value || 0;
  const hV = +document.getElementById('t13_hV').value || 0;
  const jN = +document.getElementById('t13_jN').value || 0;
  const jV = +document.getElementById('t13_jV').value || 0;
  const jC = (+document.getElementById('t13_jC').value || 0) / 100;

  const hokenRev = hN * hV;
  const jihiRev  = jN * jV;
  const total    = hokenRev + jihiRev;
  const ratio    = total > 0 ? (jihiRev / total * 100) : 0;
  const jihiGross = jihiRev * (1 - jC);
  const jihiGrossPer = jV * (1 - jC);
  const hokenGrossPer = hV * 0.85; // 保険粗利率は材料費15%想定の概算
  const equiv = hokenGrossPer > 0 ? (jihiGrossPer / hokenGrossPer) : 0;

  const fmt = n => '¥' + Math.round(n).toLocaleString();

  document.getElementById('t13_total').innerHTML  = `${fmt(total)}<span class="unit">円/月</span>`;
  document.getElementById('t13_ratio').innerHTML  = `${ratio.toFixed(1)}<span class="unit">%</span>`;
  document.getElementById('t13_gross').innerHTML  = `${fmt(jihiGross)}<span class="unit">円/月</span>`;
  document.getElementById('t13_equiv').innerHTML  = `${equiv.toFixed(0)}<span class="unit">来院分</span>`;

  let c = '';
  if (ratio < 30) {
    c = `<i class="ic ic-alert"></i> 自費比率が目安30%を下回っています。自費1件は保険<strong>約${equiv.toFixed(0)}来院分</strong>の粗利に相当。自費を月+2件増やすだけで粗利が年<strong>${fmt(jihiGrossPer * 2 * 12)}円</strong>増えます。カウンセリング強化が収益改善の近道です。`;
  } else {
    c = `<i class="ic ic-check"></i> 自費比率は目安30%をクリア。自費1件は保険<strong>約${equiv.toFixed(0)}来院分</strong>の粗利に相当します。質を保ちつつ自費の成約率・単価維持を続けましょう。`;
  }
  c += '<br><small style="color:var(--text-muted);">※保険の粗利率は材料費15%想定の概算。自費原価率・単価は自院の実績で調整してください。チェア時間あたりの効率は自費が大きく上回ります。</small>';
  document.getElementById('t13_comment').innerHTML = c;

  document.getElementById('t13_result').classList.add('show');
}

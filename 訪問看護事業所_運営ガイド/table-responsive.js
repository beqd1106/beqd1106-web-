/* ================================================================
   テーブルレスポンシブ変換
   - 各 <td> に data-label 属性（ヘッダーテキスト）を自動付与
   - CSS が 480px 以下でカード形式に変換
================================================================ */
(function () {
  function initResponsiveTables() {
    var tables = document.querySelectorAll('.table-wrap table');
    tables.forEach(function (table) {
      var headers = [];
      var ths = table.querySelectorAll('thead th, tr:first-child th');

      // ヘッダー行がない場合、最初の <tr> の <th> を使う
      if (ths.length === 0) return;

      ths.forEach(function (th) {
        headers.push(th.textContent.trim().replace(/\n/g, ' ').replace(/\s+/g, ' '));
      });

      var rows = table.querySelectorAll('tbody tr, tr:not(:first-child)');

      // tbody がない場合は全 tr から最初を除いたもの
      if (rows.length === 0) {
        var allRows = table.querySelectorAll('tr');
        rows = Array.prototype.slice.call(allRows, 1);
      }

      rows.forEach(function (row) {
        var cells = row.querySelectorAll('td');
        cells.forEach(function (td, i) {
          if (headers[i]) {
            td.setAttribute('data-label', headers[i]);
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResponsiveTables);
  } else {
    initResponsiveTables();
  }
})();

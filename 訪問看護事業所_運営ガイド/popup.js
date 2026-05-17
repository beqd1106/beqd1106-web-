(function(){
  // backdrop click → close
  document.addEventListener('click', function(e){
    if(e.target.tagName === 'DIALOG') e.target.close();
  });
  // ESC key → close all
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('dialog[open]').forEach(function(d){ d.close(); });
    }
  });
})();
function openPopup(id){
  var d = document.getElementById(id);
  if(d) d.showModal();
}

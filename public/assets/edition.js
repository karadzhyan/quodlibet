/* Adds accessible selected-state readback without replacing the source interactions. */
(() => {
  const selectors = '.lo-opt,.dial-opt,.rev-tab';
  function sync(){document.querySelectorAll(selectors).forEach(button=>{
    const value=button.classList.contains('on')?'true':'false';
    if(button.getAttribute('aria-pressed')!==value)button.setAttribute('aria-pressed',value);
    if(!button.getAttribute('type'))button.setAttribute('type','button');
  });}
  function start(){
    ['latheBuild','dialFlow','revStages','pfReadout'].forEach(id=>{const el=document.getElementById(id);if(el){el.setAttribute('aria-live','polite');el.setAttribute('aria-atomic','true');}});
    sync();
    new MutationObserver(sync).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();

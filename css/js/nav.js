export function initNav(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('.has-submenu > button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.nextElementSibling.classList.toggle('open');
    });
    btn.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowDown'){ e.preventDefault(); btn.nextElementSibling.classList.add('open'); btn.nextElementSibling.querySelector('a')?.focus(); }
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.has-submenu')){
      document.querySelectorAll('.submenu.open').forEach(s=>s.classList.remove('open'));
      document.querySelectorAll('.has-submenu>button[aria-expanded="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));
    }
  });
}
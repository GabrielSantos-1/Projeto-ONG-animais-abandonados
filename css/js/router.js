export function initRouter({
  mainSelector = '#main',
  routes = {
    '': 'index.html',
    '#/': 'index.html',
    '#/sobre':'sobre.html',
    '#/projetos':'projetos.html',
    '#/cadastro':'cadastro.html'
  }
}={}){
  async function render(hash){
    const url = routes[hash] || routes['#/'];
    try{
      const res = await fetch(url);
      if(!res.ok) return;
      const html = await res.text();
      const dom = new DOMParser().parseFromString(html,'text/html');
      const newMain = dom.querySelector('main');
      const mainEl = document.querySelector(mainSelector);
      if(mainEl && newMain){
        mainEl.innerHTML = newMain.innerHTML;
        document.dispatchEvent(new CustomEvent('spa:loaded',{detail:{url}}));
      }
    }catch(err){ console.warn('router:',err); }
  }
  window.addEventListener('hashchange', ()=> render(location.hash));
  render(location.hash || '#/');
}
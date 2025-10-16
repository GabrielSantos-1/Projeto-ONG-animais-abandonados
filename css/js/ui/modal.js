export function openModal({title='Informação', html=''}) {
  const root = document.createElement('div');
  root.className = 'modal-backdrop open';
  root.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
      <h2 style="margin-bottom:8px">${title}</h2>
      <div class="modal-content">${html}</div>
      <div style="margin-top:12px;text-align:right">
        <button class="btn btn--outline" id="modal-close">Fechar</button>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  root.addEventListener('click', (e)=>{ if(e.target === root) closeModal(root); });
  root.querySelector('#modal-close').addEventListener('click', ()=> closeModal(root));
}
function closeModal(root){ root.remove(); }
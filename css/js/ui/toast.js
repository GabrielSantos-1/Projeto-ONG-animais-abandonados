let _t;
export function showToast(message, timeout = 3000){
  if(!_t){
    _t = document.createElement('div');
    _t.id = 'toast';
    _t.className = 'toast';
    _t.setAttribute('role','status');
    _t.setAttribute('aria-live','polite');
    document.body.appendChild(_t);
  }
  _t.textContent = message;
  _t.classList.add('show');
  clearTimeout(_t._timer);
  _t._timer = setTimeout(()=> _t.classList.remove('show'), timeout);
}
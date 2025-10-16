export function validaCPF(cpf){
  if(!cpf) return false;
  cpf = cpf.replace(/\D/g,'');
  if(cpf.length!==11 || /^(\d)\1+$/.test(cpf)) return false;
  let s=0; for(let i=0;i<9;i++) s+=+cpf[i]*(10-i);
  let r=11-(s%11); if(r>=10) r=0; if(r!==+cpf[9]) return false;
  s=0; for(let i=0;i<10;i++) s+=+cpf[i]*(11-i);
  r=11-(s%11); if(r>=10) r=0; if(r!==+cpf[10]) return false;
  return true;
}
export function setMaxBirth(selector='nasc', years=18){
  const el=document.getElementById(selector); if(!el) return;
  const d=new Date(); d.setFullYear(d.getFullYear()-years);
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
  el.max=`${y}-${m}-${day}`;
}
export function showFieldError(input, msg){
  if(!input) return;
  input.classList.add('form-error'); input.setAttribute('aria-invalid','true');
  let id=input.id+'-msg'; let m=document.getElementById(id);
  if(!m){ m=document.createElement('div'); m.id=id; m.className='field-message'; input.insertAdjacentElement('afterend',m); }
  m.textContent=msg;
}
export function clearFieldError(input){
  if(!input) return;
  input.classList.remove('form-error'); input.removeAttribute('aria-invalid');
  const m=document.getElementById(input.id+'-msg'); if(m) m.remove();
}
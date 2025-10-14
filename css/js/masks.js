// masks.js — máscara básica (não substitui lib robusta em produção)
(function(){
  function setMask(input, maskFn) {
    input.addEventListener('input', function() {
      const pos = input.selectionStart;
      const before = input.value;
      input.value = maskFn(input.value);
      // tentar preservar posição (simples)
      if (input.selectionStart < pos) {
        input.selectionStart = input.selectionEnd = input.value.length;
      }
    });
  }

  function cpfMask(v) {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{3})(\d)/, '$1.$2');
    v = v.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    return v.slice(0,14);
  }

  function phoneMask(v) {
    v = v.replace(/\D/g, '');
    if (v.length <= 10) {
      v = v.replace(/^(\d{2})(\d)/, '($1) $2');
      v = v.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      v = v.replace(/^(\d{2})(\d)/, '($1) $2');
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return v.slice(0,15);
  }

  function cepMask(v) {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{5})(\d)/, '$1-$2');
    return v.slice(0,9);
  }

  document.addEventListener('DOMContentLoaded', function(){
    var cpf = document.getElementById('cpf');
    var tel = document.getElementById('tel');
    var cep = document.getElementById('cep');

    if (cpf) setMask(cpf, cpfMask);
    if (tel) setMask(tel, phoneMask);
    if (cep) setMask(cep, cepMask);
  });
})();

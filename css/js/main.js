// main.js
document.addEventListener('DOMContentLoaded', () => {
  // ====== Mobile nav (sem tarja no desktop) ======
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Fecha o menu ao clicar em qualquer link
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ====== Modo escuro/alto contraste com persistência ======
  const toggle = document.querySelector('.contrast-toggle');
  const applyTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark);
    if (toggle) toggle.setAttribute('aria-pressed', String(dark));
    localStorage.setItem('anjos:dark', dark ? '1' : '0');
  };
  const stored = localStorage.getItem('anjos:dark') === '1';
  applyTheme(stored);
  if (toggle) {
    toggle.addEventListener('click', () => applyTheme(!document.documentElement.classList.contains('dark')));
  }

  // ====== Feedback Toast ======
  const showToast = (msg='Ação realizada com sucesso!') => {
    const t = document.createElement('div');
    t.className = 'toast';
    t.role = 'status';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2800);
  };

  // ====== Validação gentil (contato + cadastro) ======
  const forms = [document.getElementById('contactForm'), document.getElementById('cadastroForm')].filter(Boolean);
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      // Deixa o HTML5 validar primeiro
      if (!form.checkValidity()) {
        e.preventDefault();
        form.querySelectorAll('input,select,textarea').forEach(el => {
          el.setAttribute('aria-invalid', el.validity.valid ? 'false' : 'true');
        });
        form.reportValidity();
        return;
      }
      e.preventDefault(); // simula envio assíncrono para a entrega
      showToast('Formulário enviado com sucesso!');
      form.reset();
      form.querySelectorAll('[aria-invalid="true"]').forEach(el => el.setAttribute('aria-invalid','false'));
    });

    // Marcação live de campos inválidos
    form.querySelectorAll('input,select,textarea').forEach(el => {
      el.addEventListener('input', () => {
        el.setAttribute('aria-invalid', el.validity.valid ? 'false' : 'true');
      });
    });
  });
});

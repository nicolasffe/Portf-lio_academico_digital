// Pequeno script para controlar o menu responsivo e validações
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-navigation');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      menu.classList.toggle('open');
    });

    // Fecha o menu ao clicar em um link (UX)
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Validação simples para inputs 'ano' (deve ser número)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const anoInput = form.querySelector('input[name="ano"]');
      if (anoInput) {
        const val = anoInput.value.trim();
        if (!/^\d{4}$/.test(val)) {
          e.preventDefault();
          alert('Por favor, informe um ano válido com 4 dígitos.');
          anoInput.focus();
          return false;
        }
      }

      // Additional basic URL validation for repository links
      const repoInput = form.querySelector('input[name="linkRepositorio"]');
      if (repoInput && repoInput.value.trim() !== '') {
        try {
          new URL(repoInput.value);
        } catch (_) {
          e.preventDefault();
          alert('Por favor, informe um link de repositório válido.');
          repoInput.focus();
          return false;
        }
      }

      return true;
    });
  });
});

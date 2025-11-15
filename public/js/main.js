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
  
  // Toasts: auto-dismiss and close button
  const toastsContainer = document.querySelector('.toasts');
  if (toastsContainer) {
    toastsContainer.querySelectorAll('.toast').forEach((toast, idx) => {
      // add close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'toast-close';
      closeBtn.setAttribute('aria-label', 'Fechar');
      closeBtn.textContent = '×';
      closeBtn.style.border = 'none';
      closeBtn.style.background = 'transparent';
      closeBtn.style.color = 'inherit';
      closeBtn.style.fontSize = '1.1rem';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.marginLeft = '8px';
      closeBtn.style.float = 'right';
      closeBtn.addEventListener('click', () => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 220);
      });
      toast.appendChild(closeBtn);

      // auto dismiss
      let timeout = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 220);
      }, 4500 + idx * 300);

      // pause on hover
      toast.addEventListener('mouseenter', () => clearTimeout(timeout));
      toast.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 220);
        }, 1800);
      });
    });
  }
});

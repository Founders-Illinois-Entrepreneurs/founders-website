(() => {
  let initialized = false;

  function initMobileMenu() {
    if (initialized) return;

    const toggle = document.getElementById('mobile-menu-toggle');
    const links = document.getElementById('mobile-nav-links');
    if (!toggle || !links) return;

    initialized = true;

    function isOpen() {
      return document.body.classList.contains('nav-open');
    }

    function setOpen(nextOpen) {
      document.body.classList.toggle('nav-open', nextOpen);
      toggle.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', nextOpen ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      setOpen(!isOpen());
    });

    links.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.closest && target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      const target = e.target;
      if (!target) return;
      if (toggle.contains(target) || links.contains(target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();


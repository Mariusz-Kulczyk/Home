/* v107 — accessible mobile navigation for static pages. */
(function () {
  function init() {
    var header = document.querySelector('.main-header.mk-nav');
    if (!header || header.dataset.mobileMenuReady === 'true') return;
    var nav = header.querySelector('nav');
    var shell = header.querySelector('.header-flex');
    if (!nav || !shell) return;
    var lang = (document.documentElement.lang || 'pl').slice(0, 2).toLowerCase();
    var labels = {
      pl: { open: 'Otwórz menu', close: 'Zamknij menu' },
      en: { open: 'Open menu', close: 'Close menu' },
      de: { open: 'Menü öffnen', close: 'Menü schließen' }
    };
    var copy = labels[lang] || labels.pl;
    function closeMenu() {
      header.classList.remove('is-mobile-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', copy.open);
    }
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-menu-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', copy.open);
    button.innerHTML = '<span class="mobile-menu-toggle__bars" aria-hidden="true"></span>';
    shell.appendChild(button);
    header.dataset.mobileMenuReady = 'true';
    button.addEventListener('click', function () {
      var open = !header.classList.contains('is-mobile-open');
      header.classList.toggle('is-mobile-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? copy.close : copy.open);
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());

/* Google Analytics 4 — shared across all site languages and pages. */
(function () {
  var measurementId = 'G-VXYQW5TR2J';
  if (!/^https?:$/.test(window.location.protocol) || window.__mkGa4Ready) return;
  window.__mkGa4Ready = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(tag);
}());

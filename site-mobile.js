/* Mobile navigation shared by all static pages. */
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

/* Google Analytics 4 loads only after the visitor accepts analytics cookies. */
(function () {
  var measurementId = 'G-VXYQW5TR2J';
  var storageKey = 'mk_cookie_analytics_choice_v1';
  if (window.location.protocol === 'file:') return;

  function getLanguage() {
    var lang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    if (lang === 'pl' || lang === 'en' || lang === 'de') return lang;
    var path = window.location.pathname.toLowerCase();
    if (/(^|[-/])de([-/\. ]|$)/.test(path)) return 'de';
    if (/(^|[-/])en([-/\. ]|$)/.test(path)) return 'en';
    return 'pl';
  }

  var language = getLanguage();
  var copy = {
    pl: {
      title: 'Twoja prywatność',
      intro: 'Zapamiętujemy Twoją decyzję dotyczącą plików cookies, aby nie pytać o nią przy każdym wejściu.',
      detail: 'Za Twoją zgodą korzystamy z Google Analytics, aby sprawdzać, które treści są najczęściej odwiedzane i jak możemy poprawiać działanie serwisu. Dane analityczne wykorzystujemy wyłącznie do celów statystycznych — nie służą do personalizowania reklam.',
      accept: 'Akceptuję analitykę',
      reject: 'Tylko niezbędne',
      settings: 'Ustawienia prywatności',
      close: 'Zamknij ustawienia prywatności'
    },
    en: {
      title: 'Your privacy',
      intro: 'We remember your cookie choice so that you do not have to make the same decision every time you visit.',
      detail: 'With your consent, we use Google Analytics to understand which content is visited most often and how we can improve the website. Analytics data is used for statistical purposes only and is not used to personalise advertising.',
      accept: 'Accept analytics',
      reject: 'Essential only',
      settings: 'Privacy settings',
      close: 'Close privacy settings'
    },
    de: {
      title: 'Ihre Privatsphäre',
      intro: 'Wir speichern Ihre Cookie-Auswahl, damit Sie diese Entscheidung nicht bei jedem Besuch erneut treffen müssen.',
      detail: 'Mit Ihrer Zustimmung nutzen wir Google Analytics, um zu verstehen, welche Inhalte am häufigsten besucht werden und wie wir die Website verbessern können. Analysedaten werden ausschließlich zu statistischen Zwecken verwendet und nicht zur Personalisierung von Werbung.',
      accept: 'Analyse akzeptieren',
      reject: 'Nur notwendige',
      settings: 'Datenschutzeinstellungen',
      close: 'Datenschutzeinstellungen schließen'
    }
  }[language];

  function readChoice() {
    try { return window.localStorage.getItem(storageKey); }
    catch (error) { return null; }
  }

  function writeChoice(choice) {
    try { window.localStorage.setItem(storageKey, choice); }
    catch (error) { /* The banner will reappear next visit if storage is unavailable. */ }
  }

  function startAnalytics() {
    if (window.__mkGa4Ready) return;
    window.__mkGa4Ready = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });

    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
  }

  function removeAnalyticsCookies() {
    var names = document.cookie ? document.cookie.split(';') : [];
    for (var i = 0; i < names.length; i += 1) {
      var name = names[i].split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + window.location.hostname + '; SameSite=Lax';
      }
    }
  }

  function injectStyles() {
    if (document.getElementById('mk-cookie-consent-styles')) return;
    var style = document.createElement('style');
    style.id = 'mk-cookie-consent-styles';
    style.textContent = '' +
      '.mk-cookie-consent{position:fixed;right:18px;bottom:18px;left:18px;z-index:2147483647;display:none;max-width:620px;margin:0 auto;padding:18px 18px 16px;border:1px solid rgba(255,255,255,.18);border-radius:14px;background:#1d1713;color:#fff;box-shadow:0 18px 55px rgba(0,0,0,.3);font:15px/1.45 Arial,sans-serif}' +
      '.mk-cookie-consent.is-visible{display:block}' +
      '.mk-cookie-consent__title{margin:0 34px 6px 0;font-size:17px;line-height:1.25;font-weight:700}' +
      '.mk-cookie-consent__text{margin:0;color:rgba(255,255,255,.9)}' +
      '.mk-cookie-consent__detail{margin:8px 0 0;color:rgba(255,255,255,.76)}' +
      '.mk-cookie-consent__actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}' +
      '.mk-cookie-consent__button{appearance:none;border:1px solid transparent;border-radius:999px;padding:10px 15px;cursor:pointer;font:700 14px/1 Arial,sans-serif}' +
      '.mk-cookie-consent__button--accept{background:#d22222;color:#fff}' +
      '.mk-cookie-consent__button--reject{background:transparent;border-color:rgba(255,255,255,.46);color:#fff}' +
      '.mk-cookie-settings{position:fixed;left:14px;bottom:14px;z-index:2147483646;display:none;border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:8px 11px;background:#1d1713;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.22);cursor:pointer;font:700 12px/1 Arial,sans-serif}' +
      '.mk-cookie-settings.is-visible{display:block}' +
      '@media (max-width:560px){.mk-cookie-consent{right:10px;bottom:10px;left:10px;padding:16px}.mk-cookie-consent__actions{display:grid;grid-template-columns:1fr 1fr}.mk-cookie-consent__button{width:100%;padding:12px 10px}.mk-cookie-settings{left:10px;bottom:10px}}';
    document.head.appendChild(style);
  }

  function createUi() {
    injectStyles();

    var banner = document.createElement('section');
    banner.className = 'mk-cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', copy.title);
    banner.innerHTML =
      '<h2 class="mk-cookie-consent__title">' + copy.title + '</h2>' +
      '<p class="mk-cookie-consent__text">' + copy.intro + '</p>' +
      '<p class="mk-cookie-consent__detail">' + copy.detail + '</p>' +
      '<div class="mk-cookie-consent__actions">' +
        '<button type="button" class="mk-cookie-consent__button mk-cookie-consent__button--accept">' + copy.accept + '</button>' +
        '<button type="button" class="mk-cookie-consent__button mk-cookie-consent__button--reject">' + copy.reject + '</button>' +
      '</div>';

    var settings = document.createElement('button');
    settings.type = 'button';
    settings.className = 'mk-cookie-settings';
    settings.textContent = copy.settings;
    settings.setAttribute('aria-label', copy.settings);

    document.body.appendChild(banner);
    document.body.appendChild(settings);

    function showBanner() {
      banner.classList.add('is-visible');
      settings.classList.remove('is-visible');
      var accept = banner.querySelector('.mk-cookie-consent__button--accept');
      if (accept) accept.focus();
    }

    function hideBanner() {
      banner.classList.remove('is-visible');
      settings.classList.add('is-visible');
    }

    banner.querySelector('.mk-cookie-consent__button--accept').addEventListener('click', function () {
      writeChoice('accepted');
      startAnalytics();
      hideBanner();
    });

    banner.querySelector('.mk-cookie-consent__button--reject').addEventListener('click', function () {
      writeChoice('rejected');
      window['ga-disable-' + measurementId] = true;
      removeAnalyticsCookies();
      hideBanner();
    });

    settings.addEventListener('click', showBanner);

    var choice = readChoice();
    if (choice === 'accepted') {
      startAnalytics();
      settings.classList.add('is-visible');
    } else if (choice === 'rejected') {
      window['ga-disable-' + measurementId] = true;
      settings.classList.add('is-visible');
    } else {
      showBanner();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createUi);
  else createUi();
}());

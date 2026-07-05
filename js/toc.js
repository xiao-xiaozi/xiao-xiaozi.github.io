(function () {
  'use strict';

  var body = document.body;
  var toggle = document.querySelector('.toc-toggle');
  var panel = document.getElementById('toc-panel');
  var overlay = document.querySelector('.toc-overlay');

  if (!toggle || !panel || !overlay) {
    return;
  }

  var wideScreen = window.matchMedia('(min-width: 90em)');

  function setOpen(open, restoreFocus) {
    if (wideScreen.matches) {
      open = false;
    }

    body.classList.toggle('toc-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open && !wideScreen.matches));

    if (open) {
      var firstLink = panel.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
    } else if (restoreFocus) {
      toggle.focus();
    }
  }

  function syncLayout() {
    body.classList.remove('toc-open');
    toggle.setAttribute('aria-expanded', 'false');

    if (wideScreen.matches) {
      toggle.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-hidden', 'false');
    } else {
      toggle.setAttribute('aria-hidden', 'false');
      toggle.removeAttribute('tabindex');
      panel.setAttribute('aria-hidden', 'true');
    }
  }

  toggle.addEventListener('click', function () {
    setOpen(!body.classList.contains('toc-open'), false);
  });

  overlay.addEventListener('click', function () {
    setOpen(false, true);
  });

  panel.addEventListener('click', function (event) {
    if (event.target.closest('a') && !wideScreen.matches) {
      setOpen(false, false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('toc-open')) {
      setOpen(false, true);
    }
  });

  if (wideScreen.addEventListener) {
    wideScreen.addEventListener('change', syncLayout);
  } else {
    wideScreen.addListener(syncLayout);
  }

  syncLayout();
}());

/* Parkdale Cleaners — small enhancements, no dependencies */
(function () {
  'use strict';

  /* ---- Store hours (24h, America/New_York) ------------------------
     Edit here and the header status + "Today" badge follow along.
     Keep index.html's table and JSON-LD in sync if you change these. */
  var HOURS = {
    0: null,            // Sunday — closed
    1: [7, 18],
    2: [7, 18],
    3: [7, 18],
    4: [7, 18],
    5: [7, 18],
    6: [8, 17]          // Saturday
  };

  /* Current time at the shop, regardless of the visitor's timezone. */
  function shopNow() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
    }).formatToParts(new Date());

    var get = function (t) {
      var p = parts.find(function (x) { return x.type === t; });
      return p ? p.value : '';
    };
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var hour = parseInt(get('hour'), 10);

    return {
      day: days[get('weekday')],
      minutes: (hour === 24 ? 0 : hour) * 60 + parseInt(get('minute'), 10)
    };
  }

  function fmt(hour24) {
    var h = hour24 % 12 || 12;
    return h + (hour24 >= 12 ? ' PM' : ' AM');
  }

  function nextOpening(fromDay) {
    for (var i = 1; i <= 7; i++) {
      var d = (fromDay + i) % 7;
      if (HOURS[d]) {
        var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (i === 1 ? 'tomorrow' : names[d]) + ' at ' + fmt(HOURS[d][0]);
      }
    }
    return null;
  }

  function updateStatus() {
    var strip = document.getElementById('status-strip');
    var text = document.getElementById('status-text');
    var bar = document.querySelector('.topbar');
    if (!strip || !text || !bar) return;

    var now = shopNow();
    var today = HOURS[now.day];
    var open = !!today && now.minutes >= today[0] * 60 && now.minutes < today[1] * 60;

    bar.classList.toggle('is-open', open);
    bar.classList.toggle('is-closed', !open);

    if (open) {
      text.textContent = 'Open now · until ' + fmt(today[1]) + ' today';
    } else if (today && now.minutes < today[0] * 60) {
      text.textContent = 'Closed · opens today at ' + fmt(today[0]);
    } else {
      var next = nextOpening(now.day);
      text.textContent = next ? 'Closed · opens ' + next : 'Closed';
    }

    /* Highlight today's row in the hours table */
    var row = document.querySelector('#hours-table tr[data-day="' + now.day + '"]');
    if (row) {
      var prev = document.querySelector('#hours-table tr.is-today');
      if (prev && prev !== row) prev.classList.remove('is-today');
      row.classList.add('is-today');
    }
  }

  /* ---- Mobile menu ------------------------------------------------ */
  function initMenu() {
    var burger = document.getElementById('hamburger');
    var nav = document.getElementById('nav');
    if (!burger || !nav) return;

    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---- Sticky header shadow -------------------------------------- */
  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Reveal on scroll ------------------------------------------ */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = (i * 70) + 'ms';
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Go ---------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  initMenu();
  initHeader();
  initReveal();
  updateStatus();
  setInterval(updateStatus, 60000);
})();

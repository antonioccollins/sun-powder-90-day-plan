/* Sun Powder — 90-Day Program: minimal JS */
(function () {
  /* Smooth scroll for anchor links */
  document.querySelectorAll('.sp-90d a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var bannerHeight = document.querySelector('.sp-90d-banner')?.offsetHeight || 44;
      var top = target.getBoundingClientRect().top + window.pageYOffset - bannerHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* Module toggles — click anywhere on the card */
  document.querySelectorAll('.sp-90d-module').forEach(function (mod) {
    mod.style.cursor = 'pointer';
    mod.addEventListener('click', function () {
      var desc = this.querySelector('.sp-90d-module__desc');
      var btn = this.querySelector('.sp-90d-module__toggle');
      var isOpen = desc.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.querySelector('.sp-90d-toggle-label').textContent = isOpen ? 'Hide Details' : 'Show Details';
    });
  });

  /* Banner: auto-detect next session and mobile rotation */
  var banner = document.querySelector('.sp-90d-banner');
  if (!banner) return;

  var sessions = JSON.parse(banner.getAttribute('data-sessions') || '[]');
  var desktopText = banner.querySelector('.sp-90d-banner__text');
  var mobileText = banner.querySelector('.sp-90d-banner__text-mobile');
  var cta = banner.querySelector('.sp-90d-banner__cta');

  function getNextSession() {
    var now = new Date();
    for (var i = 0; i < sessions.length; i++) {
      if (new Date(sessions[i].date + 'T23:59:59') >= now) return sessions[i];
    }
    return sessions[sessions.length - 1];
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  var next = getNextSession();
  if (next) {
    desktopText.innerHTML = '<strong>NEXT SESSION</strong> &middot; ' + next.title + ' &middot; ' + next.doctor + ' &middot; ' + formatDate(next.date);
    mobileText.textContent = 'NEXT SESSION — ' + next.title;
  }

  /* Mobile: rotate between session text and CTA every 10s */
  var showingText = true;
  setInterval(function () {
    if (window.innerWidth >= 768) return;

    if (showingText) {
      mobileText.classList.add('is-hidden');
      setTimeout(function () {
        mobileText.style.display = 'none';
        cta.style.display = '';
        cta.classList.remove('is-hidden');
      }, 400);
    } else {
      cta.classList.add('is-hidden');
      setTimeout(function () {
        cta.style.display = 'none';
        mobileText.style.display = 'block';
        mobileText.classList.remove('is-hidden');
      }, 400);
    }
    showingText = !showingText;
  }, 10000);
})();

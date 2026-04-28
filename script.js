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
})();

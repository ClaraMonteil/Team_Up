// Apparitions légères avec IntersectionObserver
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.add('in');
      io.unobserve(el);
    }
  }
}, { threshold: 0.18 });

document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

// “Pinning” Apple-like: calcule --progress (0 -> 1) pour chaque .section.sticky
function setupStickyProgress() {
  const sections = document.querySelectorAll('.section.sticky');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function update() {
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const totalScrollable = rect.height - vh;
      const passed = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const progress = totalScrollable > 0 ? (passed / totalScrollable) : 0;

      if (!reduceMotion) {
        section.style.setProperty('--progress', progress.toFixed(4));
      } else {
        section.style.setProperty('--progress', '1');
      }

      const steps = section.querySelectorAll('.step');
      if (steps.length) {
        const activeIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
        steps.forEach((s, i) => s.classList.toggle('is-active', i === activeIndex));
      }
    }
  }

  let ticking = false;
  function onScrollOrResize() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }

  update();
  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
}
setupStickyProgress();

/*
  Tip: tu peux remplacer ce JS par des “Scroll-Linked Animations” CSS
  (Chrome/Edge/Safari récents) en progressive enhancement.
*/

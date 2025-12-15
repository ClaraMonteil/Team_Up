// Apparitions légères avec IntersectionObserver
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.18 });

document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

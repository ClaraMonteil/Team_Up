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

// Scrollspy: met en surbrillance la puce correspondant à la fiche visible
function setupScrollSpy() {
  const chips = Array.from(document.querySelectorAll('.chips .chip'));
  const sections = chips.map(chip => {
    const id = chip.getAttribute('href');
    return document.querySelector(id);
  }).filter(Boolean);

  // Observer chaque section fiche
  const spy = new IntersectionObserver((entries) => {
    // Trouver la section la plus visible
    let mostVisible = null;
    let maxRatio = 0;
    for (const e of entries) {
      if (e.intersectionRatio > maxRatio) {
        maxRatio = e.intersectionRatio;
        mostVisible = e.target;
      }
    }
    if (!mostVisible) return;

    // Activer la chip correspondante
    const id = `#${mostVisible.id}`;
    chips.forEach(chip => chip.classList.toggle('is-active', chip.getAttribute('href') === id));
  }, { threshold: [0.2, 0.4, 0.6, 0.8] });

  sections.forEach(sec => spy.observe(sec));

  // Au clic, mise à jour immédiate de l'état actif
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });
}

setupScrollSpy();

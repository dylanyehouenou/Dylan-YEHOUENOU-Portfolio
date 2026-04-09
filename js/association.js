// ====================================================
// ASSOCIATION.JS - Page Association NAXUS
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------
    // Animation du compteur de statistiques
    // Se déclenche quand les cartes deviennent visibles
    // -----------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString('fr-FR');
        }, 16);
    };

    // Utilise IntersectionObserver pour lancer l'animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));

});

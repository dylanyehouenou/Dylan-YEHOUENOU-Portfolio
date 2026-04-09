// ====================================================
// CV.JS - Page Curriculum Vitae
// ====================================================

// Animation des barres de compétences au chargement
document.addEventListener('DOMContentLoaded', () => {
    const fills = document.querySelectorAll('.cv-bar-fill');
    fills.forEach(fill => {
        const target = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = target;
        }, 400);
    });
});

// ====================================================
// SCRIPTS SPECIFIQUES - PAGE PROJETS
// ====================================================

// Gère les logs holographiques au clic : optionnel.
const cards = document.querySelectorAll('.holo-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Vous pouvez ajouter un son UI cyberpunk ici via JavaScript Audio API (".play()")
    });
});

// ====================================================
// SCRIPTS SPECIFIQUES - PAGE CONTACT
// ====================================================

// Optionnel : Vous pouvez écouter l'événement 'submit' du form
// pour afficher un message glitch "PREPARE TRANSMISSION..." 
// avant que FormSpree ne prenne le relai.

const form = document.querySelector('.cyber-form');
if(form) {
    form.addEventListener('submit', function() {
        console.log('Connexion établie. Transfert du paquet en cours...');
    });
}

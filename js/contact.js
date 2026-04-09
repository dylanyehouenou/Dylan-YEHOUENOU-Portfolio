// ====================================================
// SCRIPTS SPECIFIQUES - PAGE CONTACT
// ====================================================

// Optionnel : Vous pouvez écouter l'événement 'submit' du form
// pour afficher un message glitch "PREPARE TRANSMISSION..." 
// avant que FormSpree ne prenne le relai.

const form = document.getElementById('contactForm');
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Visual success manipulation
        const btn = document.getElementById('submitBtn');
        btn.innerHTML = '<span>Transmission_Terminée</span>';
        btn.style.borderColor = '#00ffcc';
        btn.style.color = '#00ffcc';
        
        document.getElementById('form-success').style.display = 'block';

        // Open mail client with user payload
        window.location.href = `mailto:dylanyehouenou344@gmail.com?subject=Contact via Portfolio (${name})&body=${encodeURIComponent(message)}%0A%0A--%0AContact Echo: ${email}`;

        setTimeout(() => {
            form.reset();
            btn.innerHTML = '<span>Lancer_Transmission</span>';
            btn.style.borderColor = '';
            btn.style.color = '';
            document.getElementById('form-success').style.display = 'none';
        }, 5000);
    });
}

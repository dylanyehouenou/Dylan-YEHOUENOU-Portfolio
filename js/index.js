// ====================================================
// SCRIPTS SPECIFIQUES - PAGE D'ACCUEIL
// ====================================================

// 1. Gestion de l'écran de chargement (Bootstrap Système)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                startTypewriter(); // Lance l'effet Cyber Typewriter après le boot
            }, 500);
        }, 1500);
    } else {
        startTypewriter();
    }
});

// 2. Machine à écrire (Hero Section)
const textArray = [
    "Étudiant BTS CIEL — Cybersécurité & Réseaux",
    "Développeur Python & C++",
    "Alternant YNOV Campus Lyon",
    "Passionné de sécurité des systèmes"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startTypewriter() {
    const typingElement = document.getElementById('typewriter');
    if (!typingElement) return;

    if (textIndex < textArray.length) {
        // Condition d'écriture vers l'avant
        if (!isDeleting && charIndex <= textArray[textIndex].length) {
            typingElement.innerHTML = textArray[textIndex].substring(0, charIndex);
            charIndex++;
            setTimeout(startTypewriter, Math.random() * 100 + 50); // Vitesse aléatoire pour un style terminal
        } 
        // Condition de suppression
        else if (isDeleting && charIndex >= 0) {
            typingElement.innerHTML = textArray[textIndex].substring(0, charIndex);
            charIndex--;
            setTimeout(startTypewriter, 30);
        }
        // Fin d'écriture d'une phrase
        else if (charIndex > textArray[textIndex].length) {
            isDeleting = true;
            setTimeout(startTypewriter, 2000); // Pause à la fin
        }
        // Fin de suppression
        else if (charIndex < 0) {
            isDeleting = false;
            textIndex++;
            // Reboucle si fin du tableau
            if(textIndex >= textArray.length) { textIndex = 0; }
            setTimeout(startTypewriter, 500);
        }
    }
}

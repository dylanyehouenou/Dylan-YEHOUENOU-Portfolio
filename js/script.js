// ====================================================
// SCRIPT.JS — Global (chargé par toutes les pages)
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------
    // 1. TRANSITION DE PAGE (Overlay d'entrée universel)
    //    Une fine barre de scan + fade-in au chargement
    //    S'applique à toutes les pages SAUF index.html
    //    (qui a son propre loader plein écran)
    // ------------------------------------------------
    const isHomePage = document.getElementById('loader') !== null;

    if (!isHomePage) {
        // Crée l'overlay dynamiquement si non présent
        const overlay = document.createElement('div');
        overlay.id = 'page-transition';
        document.body.appendChild(overlay);

        // Enlève l'overlay après l'animation CSS
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
        setTimeout(() => {
            overlay.classList.add('done');
        }, 600);
    }

    // ------------------------------------------------
    // 2. THEME TOGGLE — Bouton bascule Soleil / Lune
    // ------------------------------------------------
    const toggleBtn    = document.getElementById('theme-toggle');
    const htmlEl       = document.documentElement;
    const DARK  = 'dark';
    const LIGHT = 'light';

    // Détermine le thème initial (localStorage > système)
    const systemDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved       = localStorage.getItem('theme') || (systemDark ? DARK : LIGHT);

    applyTheme(saved);

    toggleBtn.addEventListener('click', () => {
        const next = htmlEl.getAttribute('data-theme') === DARK ? LIGHT : DARK;
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        // Met à jour l'icône dans le bouton toggle
        const icon = toggleBtn.querySelector('.toggle-icon');
        if (icon) {
            icon.textContent = theme === DARK ? '🌙' : '☀️';
            icon.title       = theme === DARK ? 'Passer en mode clair' : 'Passer en mode sombre';
        }
        // Ajoute la classe sur le bouton pour l'animation CSS du slider
        toggleBtn.classList.toggle('is-light', theme === LIGHT);
    }

    // ------------------------------------------------
    // 3. NAVBAR — Fond au scroll + lien actif
    // ------------------------------------------------
    const navbar = document.getElementById('navbar');

    // Marque le lien actif par rapport à la page actuelle
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) link.classList.add('active');
    });

    // Fond opaque de la navbar au scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 40;
        navbar.style.background    = scrolled ? 'var(--glass-bg)'               : 'transparent';
        navbar.style.boxShadow     = scrolled ? '0 2px 30px rgba(0,0,0,0.55)'  : 'none';
        navbar.style.backdropFilter = scrolled ? 'blur(18px)' : 'blur(14px)';
    }, { passive: true });

    // ------------------------------------------------
    // 4. TRANSITION SORTANTE — fade-out au clic de lien
    // ------------------------------------------------
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Ignorer les ancres, les mails, et les onglets externes
        if (!href || href.startsWith('#') || href.startsWith('mailto') || link.target === '_blank') return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const dest = href;

            // Crée ou récupère l'overlay de sortie
            let out = document.getElementById('page-transition');
            if (!out) {
                out = document.createElement('div');
                out.id = 'page-transition';
                document.body.appendChild(out);
            }

            out.classList.remove('done');
            out.classList.add('active', 'exit');

            setTimeout(() => {
                window.location.href = dest;
            }, 380);
        });
    });

    // ------------------------------------------------
    // 5. SCROLL REVEAL — Anime les éléments .reveal
    //    au passage dans le viewport
    // ------------------------------------------------
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // déclenché une seule fois
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ------------------------------------------------
    // 6. MENU HAMBURGER MOBILE
    // ------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Crée l'overlay de fond dynamiquement
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        function openMenu() {
            hamburger.classList.add('open');
            navLinks.classList.add('open');
            overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.contains('open') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

});

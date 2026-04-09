// ============================================================
// NAXUS ASSOCIATION — Global JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. THEME TOGGLE ──
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');
    const saved = localStorage.getItem('naxus-theme') || 'dark';
    html.dataset.theme = saved;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
            html.dataset.theme = next;
            localStorage.setItem('naxus-theme', next);
        });
    }

    // ── 2. HAMBURGER MENU ──
    const burger  = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:998;display:none;';
        document.body.appendChild(overlay);

        const open = () => {
            burger.classList.add('open');
            navLinks.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        const close = () => {
            burger.classList.remove('open');
            navLinks.classList.remove('open');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        };

        burger.addEventListener('click', () => burger.classList.contains('open') ? close() : open());
        overlay.addEventListener('click', close);
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    }

    // ── 3. ACTIVE NAV LINK ──
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
    });

    // ── 4. STICKY HEADER SHADOW ──
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow = window.scrollY > 20
                ? '0 2px 24px rgba(0,0,0,0.3)'
                : 'none';
        }, { passive: true });
    }

    // ── 5. SCROLL REVEAL ──
    const ro = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                ro.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

    // ── 6. COUNTER ANIMATION ──
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            obs.disconnect();
            const tick = () => {
                current = Math.min(current + step, target);
                el.textContent = Math.floor(current).toLocaleString('fr-FR');
                if (current < target) requestAnimationFrame(tick);
            };
            tick();
        }, { threshold: 0.5 });
        obs.observe(el);
    });

});

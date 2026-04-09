// ====================================================
// BACKGROUND.JS — Particules flottantes animées
// Chargé globalement sur toutes les pages
// ====================================================

(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');

    // --- Config ---
    const PARTICLE_COUNT = 55;
    const MAX_DIST       = 130;   // distance max pour relier deux particules
    const SPEED          = 0.35;

    let W, H, particles = [];

    function getColor() {
        const dark = document.documentElement.getAttribute('data-theme') !== 'light';
        // Mode sombre : Cyan néon | Mode clair : Bleu marine profond (contrasté sur fond blanc)
        return dark ? '0, 255, 204' : '20, 50, 160';
    }

    function getAlphaMultiplier() {
        // En mode clair on pousse l'opacité pour que les points soient lisibles
        return document.documentElement.getAttribute('data-theme') === 'light' ? 2.2 : 1;
    }

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(true); }

        reset(init = false) {
            this.x  = Math.random() * W;
            this.y  = init ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
            this.vx = (Math.random() - 0.5) * SPEED;
            this.vy = (Math.random() - 0.5) * SPEED;
            this.r  = Math.random() * 1.5 + 0.5;
            this.a  = Math.random() * 0.6 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Rebond sur les bords
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
        }

        draw(color, mult) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${Math.min(this.a * mult, 1)})`;
            ctx.fill();
        }
    }

    function init() {
        particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    function connectParticles(color, mult) {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.25 * mult;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${color}, ${Math.min(alpha, 0.85)})`;
                    ctx.lineWidth   = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        const color = getColor();
        const mult  = getAlphaMultiplier();
        particles.forEach(p => { p.update(); p.draw(color, mult); });
        connectParticles(color, mult);
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => { resize(); });
    resize();
    init();
    loop();
})();

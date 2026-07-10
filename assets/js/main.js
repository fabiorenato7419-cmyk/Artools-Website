        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);

        const media = document.getElementById('media');
        gsap.set(media, { scale: 1.06 });

        /* ---------- HERO entrance ---------- */
        document.querySelectorAll('[data-split]').forEach((el) => new SplitType(el, { types: 'chars' }));
        gsap.timeline({
            defaults: { ease: 'expo.out' },
            onComplete: () => gsap.set('.hero__title .line', { overflow: 'visible' })
        })
            .from('#media', { autoAlpha: 0, duration: 1.6 }, 0)
            .from('#nav', { yPercent: -100, autoAlpha: 0, duration: 1 }, 0.1)
            .from('.hero__title', { filter: 'blur(14px)', duration: 1.5, ease: 'power2.out' }, 0.3)
            .from('.line--1 .char', { yPercent: 115, duration: 1.1, stagger: 0.035 }, 0.3)
            .from('.line--2 .char', { yPercent: 115, duration: 1.1, stagger: 0.035 }, 0.45)
            .from('#lineGhost', { yPercent: 115, duration: 1.25 }, 0.65)
            .from('[data-fade]', { y: 26, autoAlpha: 0, filter: 'blur(10px)', duration: 1, stagger: 0.12 }, 0.9)
            .from('.side-indicator', { x: 30, autoAlpha: 0, duration: 1 }, 1.1);

        /* ---------- HERO pin + video progress ---------- */
        let progress = 0;
        let heroVisible = true;
        ScrollTrigger.create({
            trigger: '#hero', start: 'top top', end: '+=280%',
            pin: true, scrub: true, anticipatePin: 1,
            onUpdate: (self) => {
                progress = self.progress;
                gsap.set('#indicatorFill', { scaleY: progress });
                gsap.set('#scrollHint', { autoAlpha: 1 - Math.min(progress * 6, 1) });
            },
        });

        /* ---------- HERO exit ---------- */
        gsap.timeline({
            defaults: { ease: 'none', immediateRender: false },
            scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=150%', scrub: true }
        })
            .to('.hero__eyebrow',     { autoAlpha: 0, y: -36, filter: 'blur(12px)' }, 0.00)
            .to('.hero__title .line', { autoAlpha: 0, y: -56, filter: 'blur(16px)', stagger: 0.05 }, 0.04)
            .to('.hero__desc',        { autoAlpha: 0, y: -40, filter: 'blur(12px)' }, 0.16)
            .to('.hero__ctas',        { autoAlpha: 0, y: -40, filter: 'blur(12px)' }, 0.22)
            .to('.hero__plaque',      { autoAlpha: 0, y: 30,  filter: 'blur(12px)' }, 0.10);

        /* ============================================================
           SECOND FOLD — symmetric enter/exit (blur · fade · scale)
           ============================================================ */
        (function techMotion() {
            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: { trigger: '#tecnologia', start: 'top 88%', end: 'bottom 12%', scrub: 1 }
            });
            // ENTER
            tl.fromTo('.tech__eyebrow', { autoAlpha: 0, y: 20, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.6 }, 0)
              .fromTo('.tech__title .ln', { autoAlpha: 0, yPercent: 60, filter: 'blur(14px)' }, { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 2, stagger: 0.35 }, 0.1)
              .fromTo('.tech__lead', { autoAlpha: 0, y: 26, filter: 'blur(10px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 2 }, 0.5)
              .fromTo('.tech__panel', { autoAlpha: 0, scale: 0.92, filter: 'blur(14px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 2.4 }, 0.4)
              .fromTo('.feat', { autoAlpha: 0, x: 44, filter: 'blur(10px)' }, { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 2, stagger: 0.3 }, 0.8)
              .fromTo('.tech__marquee', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.6 }, 1.4);
            // EXIT
            tl.to('.tech__eyebrow', { autoAlpha: 0, y: -24, filter: 'blur(10px)', duration: 2 }, 8.2)
              .to('.tech__title .ln', { autoAlpha: 0, yPercent: -50, filter: 'blur(16px)', duration: 2, stagger: 0.2 }, 8.0)
              .to('.tech__lead', { autoAlpha: 0, y: -30, filter: 'blur(12px)', duration: 2 }, 8.2)
              .to('.tech__panel', { autoAlpha: 0, scale: 1.05, filter: 'blur(14px)', duration: 2.2 }, 8.1)
              .to('.feat', { autoAlpha: 0, x: 30, filter: 'blur(10px)', duration: 2, stagger: 0.2 }, 8.0)
              .to('.tech__marquee', { autoAlpha: 0, y: -20, duration: 2 }, 8.4);
        })();


        /* ---------- THIRD FOLD : experience motion ---------- */
        (function expMotion() {
            const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#experiencia', start: 'top 85%', end: 'bottom 12%', scrub: 1 } });
            tl.fromTo('.exp__eyebrow', { autoAlpha: 0, y: 20, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.6 }, 0)
              .fromTo('.exp__title .ln', { autoAlpha: 0, yPercent: 60, filter: 'blur(14px)' }, { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 2, stagger: 0.3 }, 0.1)
              .fromTo('.exp__lead', { autoAlpha: 0, y: 24, filter: 'blur(10px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 2 }, 0.5)
              .fromTo('.exp__stage', { autoAlpha: 0, y: 60, scale: 0.96, filter: 'blur(14px)' }, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 2.4 }, 0.5)
              .fromTo('.spec-card', { autoAlpha: 0, y: 30, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.8, stagger: 0.18 }, 1.1)
              .fromTo('.exp__quote', { autoAlpha: 0, y: 30, filter: 'blur(10px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 2 }, 1.5);
            tl.to('.exp__head', { autoAlpha: 0, y: -30, filter: 'blur(12px)', duration: 2 }, 8.4)
              .to('.exp__stage', { autoAlpha: 0, y: -30, scale: 1.03, filter: 'blur(12px)', duration: 2.2 }, 8.2)
              .to('.exp__specs', { autoAlpha: 0, y: -20, filter: 'blur(10px)', duration: 2 }, 8.3)
              .to('.exp__quote', { autoAlpha: 0, y: -20, filter: 'blur(10px)', duration: 2 }, 8.5);
        })();
        (function expTilt() {
            const stage = document.getElementById('expStage');
            if (!stage || !window.matchMedia('(pointer: fine)').matches) return;
            const rx = gsap.quickTo(stage, 'rotationX', { duration: .8, ease: 'power3.out' });
            const ry = gsap.quickTo(stage, 'rotationY', { duration: .8, ease: 'power3.out' });
            stage.addEventListener('mousemove', (e) => {
                const r = stage.getBoundingClientRect();
                ry(((e.clientX - r.left) / r.width - .5) * 6);
                rx(((e.clientY - r.top) / r.height - .5) * -6);
            });
            stage.addEventListener('mouseleave', () => { rx(0); ry(0); });
        })();


        /* ---------- FOURTH FOLD : cta motion + flashlight + 3D tilt ---------- */
        (function ctaMotion() {
            gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: '#oferta', start: 'top 78%', toggleActions: 'play none none reverse' } })
              .from('.cta__eyebrow', { autoAlpha: 0, y: 20, filter: 'blur(8px)', duration: 1 }, 0)
              .from('.cta__title .ln', { autoAlpha: 0, yPercent: 80, filter: 'blur(14px)', duration: 1.2, stagger: 0.12 }, 0.1)
              .from('.cta__lead', { autoAlpha: 0, y: 24, filter: 'blur(10px)', duration: 1 }, 0.45)
              .from('.offer__glow', { autoAlpha: 0, y: 70, scale: 0.94, filter: 'blur(16px)', duration: 1.4 }, 0.55);
        })();
        (function offerInteract() {
            const glow = document.getElementById('offerCard') && document.getElementById('offerCard').parentElement;
            const card = document.getElementById('offerCard');
            if (!card) return;
            const fine = window.matchMedia('(pointer: fine)').matches;
            const rx = fine ? gsap.quickTo(glow, 'rotationX', { duration: .8, ease: 'power3.out' }) : null;
            const ry = fine ? gsap.quickTo(glow, 'rotationY', { duration: .8, ease: 'power3.out' }) : null;
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--fx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--fy', (e.clientY - r.top) + 'px');
                if (fine) { ry(((e.clientX - r.left) / r.width - .5) * 7); rx(((e.clientY - r.top) / r.height - .5) * -7); }
            });
            if (fine) card.addEventListener('mouseleave', () => { rx(0); ry(0); });
        })();

        /* ---------- Perf: gate hero canvas + pause CTA video off-screen ---------- */
        (function perfGate() {
            const hero = document.getElementById('hero');
            if (hero) new IntersectionObserver((e) => { heroVisible = e[0].isIntersecting; }, { threshold: 0 }).observe(hero);
            const v = document.querySelector('.cta__video'), sec = document.getElementById('oferta');
            if (v && sec) new IntersectionObserver((e) => { if (e[0].isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.05 }).observe(sec);
        })();

        /* ---------- Hide hero side-indicator once past hero ---------- */
        ScrollTrigger.create({
            trigger: '#tecnologia', start: 'top 92%',
            onEnter: () => gsap.to('.side-indicator', { autoAlpha: 0, duration: 0.4 }),
            onLeaveBack: () => gsap.to('.side-indicator', { autoAlpha: 1, duration: 0.4 }),
        });

        /* ---------- Panel : flashlight glow + pen parallax ---------- */
        const panel = document.getElementById('techPanel');
        const penImg = panel.querySelector('.panel__pen');
        gsap.set(penImg, { scale: 1.08 });
        const fineP = window.matchMedia('(pointer: fine)').matches;
        if (fineP) {
            const px = gsap.quickTo(penImg, 'x', { duration: 1, ease: 'power3.out' });
            const py = gsap.quickTo(penImg, 'y', { duration: 1, ease: 'power3.out' });
            panel.addEventListener('mousemove', (e) => {
                const r = panel.getBoundingClientRect();
                const nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
                panel.style.setProperty('--mx', (nx * 100) + '%');
                panel.style.setProperty('--my', (ny * 100) + '%');
                px((nx - 0.5) * 14); py((ny - 0.5) * 14);
            });
            panel.addEventListener('mouseleave', () => { px(0); py(0); });
        }

        /* ============================================================
           VIDEO ENGINE — canvas frame sequence (A) / video (B)
           ============================================================ */
        const FRAME_DIR = 'assets/frames/', FRAME_EXT = '.webp';
        const frameURL = (i) => FRAME_DIR + 'frame_' + String(i).padStart(4, '0') + FRAME_EXT;
        const loadImg = (src) => new Promise((res) => {
            const img = new Image();
            img.onload = () => res(img); img.onerror = () => res(null); img.src = src;
        });

        (async function initSequence() {
            const first = await loadImg(frameURL(1));
            if (!first) { startVideoEngine(); return; }
            const frames = [first];
            let i = 2, alive = true;
            while (alive && i <= 3000) {
                const batch = [];
                for (let k = 0; k < 16; k++) batch.push(loadImg(frameURL(i + k)));
                const imgs = await Promise.all(batch);
                for (let k = 0; k < 16; k++) {
                    if (imgs[k]) frames[i + k - 1] = imgs[k];
                    else { alive = false; break; }
                }
                i += 16;
            }
            startCanvasEngine(frames.filter(Boolean));
        })();

        function startCanvasEngine(frames) {
            const COUNT = frames.length;
            if (COUNT < 2) { startVideoEngine(); return; }
            const canvas = document.getElementById('seq-canvas');
            const ctx = canvas.getContext('2d');
            const video = document.getElementById('product-video');
            canvas.classList.add('on');
            let cw = 0, ch = 0;
            function sizeCanvas() {
                const r = canvas.getBoundingClientRect();
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
                if (w && h && (w !== cw || h !== ch)) { canvas.width = w; canvas.height = h; cw = w; ch = h; }
            }
            function draw(idx) {
                const img = frames[Math.max(0, Math.min(COUNT - 1, idx))];
                if (!img || !cw) return;
                const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
                let dw, dh;
                if (ir > cr) { dh = ch; dw = ch * ir; } else { dw = cw; dh = cw / ir; }
                ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
            }
            let currentFrame = 0;
            gsap.ticker.add(() => {
                if (!heroVisible) return;
                sizeCanvas();
                const target = progress * (COUNT - 1);
                currentFrame += (target - currentFrame) * 0.2;
                draw(Math.round(currentFrame));
            });
            requestAnimationFrame(() => requestAnimationFrame(() => {
                sizeCanvas(); draw(0);
                setTimeout(() => video.classList.add('hide'), 120);
            }));
        }

        function startVideoEngine() {
            const video = document.getElementById('product-video');
            let seeking = false, ready = false;
            video.addEventListener('seeked', () => { seeking = false; });
            function prime() {
                video.play().then(() => { video.pause(); video.currentTime = 0; ready = true; })
                             .catch(() => { ready = true; });
            }
            if (video.readyState >= 1) prime();
            else video.addEventListener('loadedmetadata', prime, { once: true });
            gsap.ticker.add(() => {
                if (!ready || !video.duration || seeking) return;
                const target = progress * (video.duration - 0.05);
                if (Math.abs(video.currentTime - target) > 0.033) { seeking = true; video.currentTime = target; }
            });
        }

        /* ---------- Hero depth + mouse parallax ---------- */
        gsap.to('#media', { scale: 1.14, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=280%', scrub: true } });

        const fine = window.matchMedia('(pointer: fine)').matches;
        if (fine) {
            const mx = gsap.quickTo(media, 'x', { duration: 1, ease: 'power3.out' });
            const my = gsap.quickTo(media, 'y', { duration: 1, ease: 'power3.out' });
            window.addEventListener('mousemove', (e) => {
                const nx = e.clientX / window.innerWidth - 0.5;
                const ny = e.clientY / window.innerHeight - 0.5;
                mx(nx * -24); my(ny * -24);
            });
            document.querySelectorAll('[data-magnetic]').forEach((btn) => {
                const qx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
                const qy = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
                btn.addEventListener('mousemove', (e) => {
                    const r = btn.getBoundingClientRect();
                    qx((e.clientX - r.left - r.width / 2) * 0.22);
                    qy((e.clientY - r.top - r.height / 2) * 0.22);
                });
                btn.addEventListener('mouseleave', () => { qx(0); qy(0); });
            });
        }
    

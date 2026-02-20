/**
 * Surya Sundaram Architect Portfolio — scroll.js
 * ─────────────────────────────────────────────
 * 1. Sticky nav + scroll class
 * 2. Parallax blobs on scroll
 * 3. Scroll-reveal elements
 * 4. Animated counters
 * 5. Custom cursor (desktop)
 * 6. Mobile nav toggle
 * 7. Project modal
 * 8. Contact form handler
 * 9. Active nav link highlight
 * 10. Process step active on scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. Sticky nav ──────────────────────────── */
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ─── 2. Parallax blobs ──────────────────────── */
    const blobs = document.querySelectorAll('.blob[data-speed]');
    let heroH = document.querySelector('.hero')?.offsetHeight || 0;
    let ticking = false;

    function updateBlobs() {
        const sy = window.scrollY;
        blobs.forEach(blob => {
            const speed = parseFloat(blob.dataset.speed);
            // Only parallax while near the hero
            const shift = sy * speed * 0.7;
            blob.style.transform = `translateY(${shift}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateBlobs);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        heroH = document.querySelector('.hero')?.offsetHeight || 0;
    });

    /* ─── 3. Scroll-reveal ───────────────────────── */
    const revealEls = document.querySelectorAll(
        '.project-card, .service-card, .process-step, .about__text, .about__portrait, .contact__info, .contact__form, .section__header'
    );

    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        // Stagger cards in a grid
        if (el.classList.contains('project-card') || el.classList.contains('service-card')) {
            el.classList.add(`reveal--delay-${(i % 4) + 1}`);
        }
        if (el.classList.contains('about__portrait')) el.classList.add('reveal--left');
        if (el.classList.contains('about__text')) el.classList.add('reveal--right');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    /* ─── 4. Animated counters ───────────────────── */
    const statNums = document.querySelectorAll('.stat__num[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 40));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current;
                }, 40);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));

    /* ─── 5. Custom cursor — removed ───────────── */

    /* ─── 6. Mobile nav toggle ───────────────────── */
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            toggle.classList.toggle('active', open);
        });

        // Close on link click
        navLinks.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    /* ─── 7. Project modal ───────────────────────── */
    const projects = {
        p1: {
            cat: 'Facade Treatment · Residential',
            title: 'Ullagaram Duplex House',
            details: [
                { label: 'Client', value: 'Private' },
                { label: 'Location', value: 'Ullagaram, Chennai' },
                { label: 'Type', value: 'Residential Duplex' },
                { label: 'Style', value: 'Industrial Chic' },
                { label: 'Works', value: '3D Views, Renders, Client Meetings' },
            ],
            desc: `The client wished for an elevation that was as uber-chic and effortlessly cool as they were. After a bit of back and forth, we settled on an industrial design aesthetic — because nothing says personality quite like exposed brick walls and deconstructed décor.
             The design plays with honest materials and bold geometric articulations on the facade, balancing street presence with a warm, liveable interior.`,
        },
        p2: {
            cat: 'Premium Residential Interiors',
            title: 'Vedha, Clover & Capella Residences',
            details: [
                { label: 'Client', value: 'Multiple Private Clients' },
                { label: 'Location', value: 'Chennai & Bangalore, India' },
                { label: 'Type', value: 'Residential Interior' },
                { label: 'Style', value: 'Modern Rustic & Monochrome' },
                { label: 'Works', value: 'Concept, Material Palette, 3D Renders' },
            ],
            desc: `A series of premium residential interior projects crafted with curated material palettes and bespoke furniture selections.
             The Capella Residence embraces modern rustic decor — warmth of natural accents meets contemporary refinement in a fancy yet chill living space. The Catheyst kitchen uses shades of cream in panels and cabinets to create a monochrome yet spacious feel, while Clover showcases textured wallpapers in a cocoon-like bedroom environment.`,
        },
        p3: {
            cat: 'Commercial Interiors',
            title: 'Glo Clinic & Janata Seva HQ',
            details: [
                { label: 'Client 1', value: 'Glo Clinic (Private)' },
                { label: 'Client 2', value: 'Janata Seva Co-op Bank' },
                { label: 'Location', value: 'Vijayanagara, Bangalore, KA' },
                { label: 'Area', value: '7,950 sq ft (Janata Seva)' },
                { label: 'Works', value: 'Sanction Drawings, 2D Plans, 3D Renders' },
            ],
            desc: `For Glo Clinic, the brief was to add a treatment room and eliminate dead zones in the generator area. Smart partition planning extended the space efficiently without compromising workflow.
             The Janata Seva Co-operative Bank Headquarters project involved full sanction drawings, 2D floor plans, and photorealistic 3D visualisations for a 7,950 sq ft commercial building in Vijayanagara, Bangalore.`,
        },
        p4: {
            cat: 'Facade Treatment · Planning',
            title: '30×40 Residence — Tumkur',
            details: [
                { label: 'Client', value: 'Mr. Sadashiva' },
                { label: 'Location', value: 'Mahalakshmipuram, Tumkur, KA' },
                { label: 'Area', value: '1,200 sq ft (30×40)' },
                { label: 'Works', value: '2D Floor Plans, 3D Views, Renders' },
                { label: 'Studio', value: 'Prism Innovations' },
            ],
            desc: `A compact 30×40 site in Tumkur — every square foot counts. The project involved complete 2D floor planning and 3D facade visualisation for the client, Mr. Sadashiva. Design decisions prioritised natural light, efficient circulation and a contemporary elevation that suits the suburban Tumkur context.`,
        },
    };

    window.openProject = (id) => {
        const p = projects[id];
        if (!p) return;
        const detailRows = p.details.map(d => `<div><dt>${d.label}</dt><dd>${d.value}</dd></div>`).join('');
        document.getElementById('modalContent').innerHTML = `
      <span class="modal-cat">${p.cat}</span>
      <h2>${p.title}</h2>
      <dl class="modal__details">${detailRows}</dl>
      <p class="modal__desc">${p.desc.split('\n').join('<br><br>')}</p>
    `;
        document.getElementById('modalOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeProject = () => {
        document.getElementById('modalOverlay').classList.remove('active');
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.closeProject();
    });

    /* ─── 8. Contact form ────────────────────────── */
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            btn.textContent = 'Sending…';
            btn.disabled = true;

            // Simulate async send
            setTimeout(() => {
                form.querySelectorAll('input,select,textarea').forEach(el => el.value = '');
                btn.textContent = 'Send Message →';
                btn.disabled = false;
                if (successMsg) successMsg.classList.add('visible');
                setTimeout(() => successMsg?.classList.remove('visible'), 5000);
            }, 1400);
        });
    }

    /* ─── 9. Active nav on scroll ────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav__link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => navObserver.observe(s));

    /* ─── 10. Process steps auto-activate ────────── */
    const processSteps = document.querySelectorAll('.process-step');
    const procObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('active', entry.isIntersecting);
        });
    }, { threshold: 0.5 });

    processSteps.forEach(s => procObserver.observe(s));

});

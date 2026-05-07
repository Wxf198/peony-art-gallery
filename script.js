/* ============================================================
   Fengya Gallery – JavaScript
   ============================================================ */

(function () {
    'use strict';

    // ----- NAVBAR SCROLL EFFECT -----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ----- MOBILE HAMBURGER -----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ----- GALLERY DATA -----
    const paintings = [
        {
            name: '国色天香 (National Beauty)',
            nameEn: 'National Beauty — Vertical Peony Scroll',
            size: 'Vertical scroll',
            style: 'Gongbi (Fine Brush)',
            img: 'images/painting-1.jpg',
            desc: 'A magnificent vertical scroll featuring vibrant red peonies in full bloom. The rich red petals symbolize prosperity and joy, masterfully rendered in traditional fine-brush technique.'
        },
        {
            name: '春至 (Spring Arrives)',
            nameEn: 'Spring Arrives — Plum Blossom Painting',
            size: 'Vertical scroll',
            style: 'Xieyi (Freehand)',
            img: 'images/painting-2.jpg',
            desc: 'The arrival of spring captured in elegant ink washes. Delicate blossoms emerge against graceful branches, conveying the spirit of renewal and hope.'
        },
        {
            name: '春酣 (Spring Intoxication)',
            nameEn: 'Spring Intoxication — Small Format',
            size: 'Small scroll',
            style: 'Ink Wash',
            img: 'images/painting-3.jpg',
            desc: 'An intimate portrayal of peonies in the height of spring. The soft ink washes and subtle colors evoke the dreamy, intoxicating beauty of the season.'
        },
        {
            name: '盛世中华 (Prosperous China)',
            nameEn: 'Prosperous China — Grand Central Scroll',
            size: 'Grand central scroll (Zhongtang)',
            style: 'Gongbi & Xieyi',
            img: 'images/painting-4.jpg',
            desc: 'A grand central scroll (中堂) celebrating the splendor of a flourishing era. Rich colors, masterful composition, and multiple peony varieties come together in this statement piece.'
        }
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        paintings.forEach((p) => {
            const card = document.createElement('article');
            card.className = 'gallery-card animate-in';
            card.innerHTML = `
                <div class="gallery-card-image">
                    <img src="${p.img}" alt="${p.nameEn} — Fengya Gallery" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div class="gallery-card-content">
                    <h3>${p.name}</h3>
                    <div class="dimensions">${p.size} · ${p.style}</div>
                    <p class="description">${p.desc}</p>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }

    // ----- FAQ ACCORDION -----
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            item.classList.toggle('active');
            btn.setAttribute('aria-expanded', item.classList.contains('active'));
        });
    });

    // ----- SCROLL ANIMATIONS -----
    const animateElements = document.querySelectorAll('.animate-in');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        animateElements.forEach(el => observer.observe(el));
    } else {
        animateElements.forEach(el => el.classList.add('visible'));
    }

    // ----- COUNTER ANIMATION -----
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    if (target && !el.dataset.counted) {
                        el.dataset.counted = 'true';
                        animateCounter(el, target);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    // ----- CONTACT FORM -----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.textContent = '✓ Message Sent!';
            btn.style.background = '#4a7c59';
            btn.disabled = true;
            setTimeout(() => {
                const note = contactForm.querySelector('.form-note');
                note.textContent = 'Thank you! We\'ll be in touch within 24 hours.';
                note.style.color = '#4a7c59';
                btn.textContent = 'Send Another Message';
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // ============================================================
    // 🎵 背景音乐控制 — MP3 播放
    // 将你的古风 MP3 文件放到 images/bg-music.mp3 即可
    // ============================================================
    (function initMusic() {
        let audio = null;
        let isPlaying = false;

        // 创建音乐控制按钮
        const btn = document.createElement('button');
        btn.id = 'musicBtn';
        btn.setAttribute('aria-label', 'Toggle background music');
        btn.innerHTML = '♫';
        btn.style.cssText = [
            'position:fixed',
            'bottom:24px',
            'right:24px',
            'width:48px',
            'height:48px',
            'border-radius:50%',
            'background:rgba(201,169,110,0.9)',
            'border:none',
            'color:#fff',
            'font-size:1.4rem',
            'cursor:pointer',
            'z-index:999',
            'box-shadow:0 2px 12px rgba(0,0,0,0.15)',
            'transition:all .3s',
            'opacity:0',
            'transform:scale(0)',
            'display:flex',
            'align-items:center',
            'justify-content:center'
        ].join(';');

        const label = document.createElement('span');
        label.id = 'musicLabel';
        label.textContent = 'Background Music';
        label.style.cssText = [
            'position:fixed',
            'bottom:36px',
            'right:80px',
            'font-family:Inter,sans-serif',
            'font-size:0.75rem',
            'color:#7a6f5e',
            'background:rgba(255,255,255,0.9)',
            'padding:5px 12px',
            'border-radius:20px',
            'z-index:999',
            'opacity:0',
            'transition:opacity .3s',
            'pointer-events:none',
            'box-shadow:0 1px 6px rgba(0,0,0,0.08)'
        ].join(';');

        document.body.appendChild(label);
        document.body.appendChild(btn);

        // 渐入显示
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        }, 2000);

        function toggleMusic() {
            if (!audio) {
                audio = new Audio('images/bg-music.mp3');
                audio.loop = true;
                audio.volume = 0.4;
            }

            if (!isPlaying) {
                audio.play().then(() => {
                    isPlaying = true;
                    btn.style.background = 'rgba(74,124,89,0.9)';
                    btn.innerHTML = '♫';
                    showLabel('♫ Playing');
                }).catch(() => {
                    showLabel('⚠️ Click to play');
                });
            } else {
                audio.pause();
                isPlaying = false;
                btn.style.background = 'rgba(201,169,110,0.9)';
                btn.innerHTML = '♪';
                showLabel('Music Off');
            }
        }

        function showLabel(text) {
            label.textContent = text;
            label.style.opacity = '1';
            setTimeout(() => { label.style.opacity = '0'; }, 2000);
        }

        btn.addEventListener('click', toggleMusic);

        btn.addEventListener('mouseenter', () => {
            label.textContent = isPlaying ? '♫ Playing' : '♪ Play Music';
            label.style.opacity = '1';
        });
        btn.addEventListener('mouseleave', () => {
            setTimeout(() => { label.style.opacity = '0'; }, 300);
        });

    })();

})();

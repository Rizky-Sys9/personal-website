// script.js - interaksi modern dengan tema cyan dan background hidup

document.addEventListener('DOMContentLoaded', () => {
    // ===== PARTICLES BACKGROUND =====
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;
    
    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            // update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            // draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;
            ctx.fill();
        });
        
        // draw connections
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${0.05 * (1 - distance/100)})`;
                    ctx.stroke();
                }
            }
        }
        
        animationFrame = requestAnimationFrame(drawParticles);
    }
    
    initParticles();
    drawParticles();
    
    window.addEventListener('resize', () => {
        initParticles();
    });

    // ===== HIGHLIGHT NAVIGASI =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavigation() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMASI PROGRESS BAR =====
    const progressBars = document.querySelectorAll('.progress-fill, .progress-thumb');
    
    function checkProgressBars() {
        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barPosition < windowHeight - 50) {
                bar.style.transition = 'width 1.2s cubic-bezier(0.2, 0.9, 0.3, 1)';
            }
        });
    }
    
    window.addEventListener('load', checkProgressBars);
    window.addEventListener('scroll', checkProgressBars);
    checkProgressBars();
    
    // ===== EFEK GLOW MENGIKUTI MOUSE =====
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const gridBg = document.querySelector('.hero-grid-bg');
            if (gridBg) {
                gridBg.style.background = `
                    radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
                    linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
                `;
            }
        });
    }
    
    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // ===== LOG KEREN DI CONSOLE =====
    console.log('%c┌─────────────────────────────────┐', 'color: #00FFFF');
    console.log('%c│  SEPTIAN RIZKY IZZA RAMADHAN   │', 'color: #00FFFF; font-weight: bold');
    console.log('%c│        17 · sysadmin            │', 'color: #00FFFF');
    console.log('%c│    septian.rizky@example.com   │', 'color: #00FFFF');
    console.log('%c│    @septianrizky_              │', 'color: #00FFFF');
    console.log('%c└─────────────────────────────────┘', 'color: #00FFFF');
});
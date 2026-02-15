// script.js - Network/Cyber Theme with Bitcoin Elements

document.addEventListener('DOMContentLoaded', () => {
    // ===== NETWORK TOPOLOGY BACKGROUND =====
    const canvas = document.getElementById('topology-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let connections = [];
    let animationFrame;
    let mouseX = 0, mouseY = 0;
    
    // Network topology configuration
    const NODE_COUNT = 25;
    const CONNECTION_DISTANCE = 200;
    
    function initNetwork() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Create network nodes
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 3 + 2,
                pulsePhase: Math.random() * Math.PI * 2,
                type: Math.floor(Math.random() * 3), // 0: router, 1: switch, 2: host
                isBitcoin: Math.random() > 0.7 // 30% chance jadi Bitcoin node
            });
        }
        
        // Create connections between nearby nodes
        connections = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONNECTION_DISTANCE) {
                    connections.push({
                        from: i,
                        to: j,
                        pulseOffset: Math.random() * Math.PI * 2
                    });
                }
            }
        }
    }
    
    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update node positions
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Keep in bounds
            node.x = Math.max(0, Math.min(canvas.width, node.x));
            node.y = Math.max(0, Math.min(canvas.height, node.y));
        });
        
        // Draw connections
        connections.forEach(conn => {
            const from = nodes[conn.from];
            const to = nodes[conn.to];
            
            if (!from || !to) return;
            
            const dx = from.x - to.x;
            const dy = from.y - to.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const opacity = Math.max(0, 1 - distance / CONNECTION_DISTANCE) * 0.2;
            
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            
            // Warna koneksi berdasarkan tipe node
            if (from.isBitcoin || to.isBitcoin) {
                ctx.strokeStyle = `rgba(247, 147, 26, ${opacity})`;
            } else {
                ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            }
            
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw data pulse
            const pulseTime = Date.now() / 1000;
            const pulsePos = (Math.sin(pulseTime * 2 + conn.pulseOffset) + 1) / 2;
            
            const pulseX = from.x + (to.x - from.x) * pulsePos;
            const pulseY = from.y + (to.y - from.y) * pulsePos;
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
            
            if (from.isBitcoin || to.isBitcoin) {
                ctx.fillStyle = 'rgba(247, 147, 26, 0.5)';
            } else {
                ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
            }
            
            ctx.fill();
        });
        
        // Draw nodes
        nodes.forEach(node => {
            const pulseScale = 1 + Math.sin(Date.now() / 500 + node.pulsePhase) * 0.2;
            
            // Node glow
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
            
            if (node.isBitcoin) {
                ctx.fillStyle = 'rgba(247, 147, 26, 0.2)';
                ctx.shadowColor = '#F7931A';
            } else {
                ctx.fillStyle = `rgba(0, 255, 255, 0.2)`;
                ctx.shadowColor = '#00FFFF';
            }
            
            ctx.fill();
            
            // Node core
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * pulseScale, 0, Math.PI * 2);
            
            if (node.isBitcoin) {
                ctx.fillStyle = '#F7931A';
                ctx.shadowColor = '#F7931A';
            } else {
                if (node.type === 0) {
                    ctx.fillStyle = '#00FFFF';
                    ctx.shadowColor = '#00FFFF';
                } else if (node.type === 1) {
                    ctx.fillStyle = '#00CCCC';
                    ctx.shadowColor = '#00CCCC';
                } else {
                    ctx.fillStyle = '#009999';
                    ctx.shadowColor = '#009999';
                }
            }
            
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // Mouse interaction
        if (mouseX && mouseY) {
            nodes.forEach(node => {
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouseX, mouseY);
                    
                    if (node.isBitcoin) {
                        ctx.strokeStyle = `rgba(247, 147, 26, ${0.3 * (1 - distance/100)})`;
                    } else {
                        ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * (1 - distance/100)})`;
                    }
                    
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        }
        
        animationFrame = requestAnimationFrame(drawNetwork);
    }
    
    initNetwork();
    drawNetwork();
    
    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    window.addEventListener('resize', () => {
        initNetwork();
    });

    // ===== BITCOIN TICKER UPDATE =====
    function updateBitcoinTicker() {
        const tickerItems = document.querySelectorAll('.ticker-item');
        
        // Simulasi update harga Bitcoin
        const btcPrice = (Math.random() * 10000 + 60000).toFixed(0);
        const hashrate = (Math.random() * 100 + 500).toFixed(0);
        const blockHeight = 845321 + Math.floor(Math.random() * 100);
        const difficulty = (Math.random() * 10 + 80).toFixed(1);
        const dominance = (Math.random() * 10 + 48).toFixed(1);
        
        if (tickerItems.length >= 5) {
            tickerItems[0].textContent = `₿ BTC / USD = ${parseInt(btcPrice).toLocaleString()}`;
            tickerItems[1].textContent = `⚡ Network Hashrate: ${hashrate} EH/s`;
            tickerItems[2].textContent = `🔗 Block Height: ${parseInt(blockHeight).toLocaleString()}`;
            tickerItems[3].textContent = `⛏️ Mining Difficulty: ${difficulty}T`;
            tickerItems[4].textContent = `₿ Bitcoin Dominance: ${dominance}%`;
        }
    }
    
    // Update ticker setiap 10 detik
    setInterval(updateBitcoinTicker, 10000);

    // ===== COPY BITCOIN ADDRESS =====
    window.copyBTCAddress = function() {
        const btcAddress = document.querySelector('.btc-hash')?.textContent;
        
        if (btcAddress) {
            navigator.clipboard.writeText(btcAddress).then(() => {
                showNotification('Bitcoin address copied!', 'btc');
            }).catch(() => {
                showNotification('Failed to copy address', 'error');
            });
        }
    };

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const existingNotif = document.querySelector('.custom-notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        
        let icon = 'ℹ';
        let color = '#00FFFF';
        
        if (type === 'success') {
            icon = '✓';
            color = '#00FFFF';
        } else if (type === 'btc') {
            icon = '₿';
            color = '#F7931A';
        } else if (type === 'error') {
            icon = '✗';
            color = '#FF4444';
        }
        
        notification.innerHTML = `
            <div class="notif-content">
                <span class="notif-icon">${icon}</span>
                <span class="notif-message">${message}</span>
            </div>
            <div class="notif-progress"></div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(20, 24, 31, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid ${color};
            border-radius: 8px;
            padding: 16px 24px;
            color: white;
            font-family: 'Fira Code', monospace;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 0 30px ${color}40;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
            }
            .notif-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notif-icon {
                color: ${color};
                font-size: 1.2rem;
            }
            .notif-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: ${color};
                animation: progress 3s linear forwards;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }

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
    
    // ===== ANIMASI PERSENTASE DI SKILL =====
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animatePercentage(element, targetPercent) {
        let currentPercent = 0;
        const duration = 1500;
        const increment = targetPercent / (duration / 16);
        const targetValue = targetPercent;
        
        function updatePercentage() {
            if (currentPercent < targetValue) {
                currentPercent = Math.min(currentPercent + increment, targetValue);
                element.textContent = Math.round(currentPercent) + '%';
                requestAnimationFrame(updatePercentage);
            } else {
                element.textContent = targetValue + '%';
            }
        }
        
        updatePercentage();
    }
    
    const skillsSection = document.querySelector('#keahlian');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevels = document.querySelectorAll('.skill-level');
                    skillLevels.forEach(level => {
                        const percent = parseInt(level.textContent);
                        if (!isNaN(percent)) {
                            animatePercentage(level, percent);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
    
    // ===== TYPING EFFECT =====
    const terminalCommand = document.querySelector('.terminal-command');
    if (terminalCommand) {
        const text = terminalCommand.textContent;
        terminalCommand.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                terminalCommand.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(terminalCommand);
    }
    
    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        const grid = document.querySelector('.cyber-grid');
        
        if (hero && grid) {
            hero.style.transform = `translateY(${scrolled * 0.2}px)`;
            grid.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // ===== 3D CARD EFFECT =====
    const cards = document.querySelectorAll('.about-card, .skill-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ===== DYNAMIC IP ADDRESS =====
    const ipElement = document.querySelector('.metric-value');
    if (ipElement) {
        const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        ipElement.textContent = ip;
    }
    
    // ===== BITCOIN MINI STATS INTERACTION =====
    const miniStats = document.querySelectorAll('.mini-stat');
    miniStats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            const icon = stat.querySelector('.mini-icon');
            icon.style.animation = 'none';
            icon.offsetHeight;
            icon.style.animation = 'btcPulse 0.5s infinite';
        });
        
        stat.addEventListener('mouseleave', () => {
            const icon = stat.querySelector('.mini-icon');
            icon.style.animation = 'btcPulse 2s infinite';
        });
    });
    
    // ===== BITCOIN PRICE SIMULATOR =====
    class BitcoinPriceSimulator {
        constructor() {
            this.price = 64321;
            this.changeInterval = null;
        }
        
        start() {
            this.changeInterval = setInterval(() => {
                const change = (Math.random() - 0.5) * 100;
                this.price += change;
                
                const tickerItems = document.querySelectorAll('.ticker-item');
                if (tickerItems[0]) {
                    tickerItems[0].textContent = `₿ BTC / USD = ${this.price.toFixed(0).toLocaleString()}`;
                }
            }, 5000);
        }
        
        stop() {
            if (this.changeInterval) {
                clearInterval(this.changeInterval);
            }
        }
    }
    
    const btcSimulator = new BitcoinPriceSimulator();
    btcSimulator.start();
    
    window.addEventListener('beforeunload', () => {
        btcSimulator.stop();
    });
    
    // ===== CONSOLE ART =====
    console.log('%c╔══════════════════════════════════════╗', 'color: #00FFFF');
    console.log('%c║     NETWORK ENGINEER PORTFOLIO       ║', 'color: #00FFFF; font-weight: bold');
    console.log('%c╠══════════════════════════════════════╣', 'color: #00FFFF');
    console.log('%c║  Septian Rizky Izza Ramadhan        ║', 'color: #00FFFF');
    console.log('%c║  17 · Network Engineer / Sysadmin   ║', 'color: #00FFFF');
    console.log('%c║                                      ║', 'color: #00FFFF');
    console.log('%c║  ▶ revyengineering@gmail.com        ║', 'color: #00FFFF');
    console.log('%c║  ▶ @rizkyxyz67                       ║', 'color: #00FFFF');
    console.log('%c║                                      ║', 'color: #00FFFF');
    console.log('%c║  ₿ Bitcoin Network: ACTIVE           ║', 'color: #F7931A');
    console.log('%c║  ⚡ Hashrate: 524 EH/s                ║', 'color: #F7931A');
    console.log('%c╚══════════════════════════════════════╝', 'color: #00FFFF');
    
    console.log('%c\n' + 
        '    01001110 01100101 01110100 01110111 01101111 01110010 01101011 00100000 01000101 01101110 01100111 01101001 01101110 01100101 01100101 01110010\n' +
        '    00101100 00100000 01010011 01111001 01110011 01110100 01100101 01101101 00100000 01000001 01100100 01101101 01101001 01101110 01101001 01110011 01110100 01110010 01100001 01110100 01101111 01110010\n', 
        'color: #00FFFF; font-size: 10px; font-family: monospace');
    
    console.log('%c₿ Bitcoin Status:', 'color: #F7931A; font-weight: bold');
    console.log('%c  Price: $64,321 USD', 'color: #F7931A');
    console.log('%c  Hashrate: 524 EH/s', 'color: #F7931A');
    console.log('%c  Block: 845,321', 'color: #F7931A');
    console.log('%c  "The Internet of Money"', 'color: #F7931A; font-style: italic');
});
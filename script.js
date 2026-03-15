// Script untuk personal website Septian - Unix Theme
// Menambahkan interaktivitas sederhana

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fitur
    initTerminalEffects();
    initProgressBars();
    initCurrentTime();
});

// Efek terminal: mengubah teks command secara periodik
function initTerminalEffects() {
    const commandElement = document.querySelector('.command');
    if (!commandElement) return;
    
    const commands = [
        'rm -rf',
        'ls -la',
        'whoami',
        'neofetch',
        'python3 --version',
        'sudo apt update'
    ];
    
    let index = 0;
    
    setInterval(() => {
        index = (index + 1) % commands.length;
        commandElement.style.opacity = '0.5';
        
        setTimeout(() => {
            commandElement.textContent = commands[index];
            commandElement.style.opacity = '1';
        }, 100);
    }, 3000);
}

// Animasi progress bars
function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        // Simpan lebar asli
        const originalWidth = fill.style.width;
        
        // Efek pulse ringan
        setInterval(() => {
            fill.style.transform = 'scaleX(1.02)';
            fill.style.transformOrigin = 'left';
            
            setTimeout(() => {
                fill.style.transform = 'scaleX(1)';
            }, 200);
        }, 2000);
    });
}

// Update uptime setiap detik (dengan efek realistis)
function initCurrentTime() {
    const uptimeElement = document.querySelector('.uptime');
    if (!uptimeElement) return;
    
    // Parse uptime awal
    let uptimeText = uptimeElement.textContent;
    let days = 42; // default
    
    const daysMatch = uptimeText.match(/(\d+)y\s+(\d+)d/);
    if (daysMatch) {
        days = parseInt(daysMatch[2]);
    }
    
    // Update uptime setiap menit (biar keliatan hidup)
    setInterval(() => {
        days += 0.0007; // nambah dikit (realistis)
        const years = 17;
        const displayDays = Math.floor(days);
        
        uptimeElement.textContent = `⏃ uptime ${years}y ${displayDays}d`;
    }, 60000); // tiap menit
}

// Efek klik pada window buttons
document.addEventListener('DOMContentLoaded', function() {
    const windowButtons = document.querySelectorAll('.window-btn');
    
    windowButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Efek visual
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Pesan sesuai button
            if (this.classList.contains('close')) {
                console.log('Close button clicked - but this is just a demo!');
            } else if (this.classList.contains('minimize')) {
                console.log('Minimize clicked - terminal session minimized (simulated)');
            } else if (this.classList.contains('maximize')) {
                console.log('Maximize clicked - fullscreen mode (simulated)');
            }
        });
    });
});

// Efek hover pada skill items
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressFill = this.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.filter = 'brightness(1.3)';
                progressFill.style.boxShadow = '0 0 15px currentColor';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const progressFill = this.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.filter = 'brightness(1)';
                progressFill.style.boxShadow = '0 0 6px #1e6bc0';
            }
        });
    });
});

// Menambahkan interaksi pada prompt
document.addEventListener('DOMContentLoaded', function() {
    const promptSign = document.querySelector('.prompt-sign');
    
    if (promptSign) {
        promptSign.addEventListener('click', function() {
            // Ubah prompt sementara
            const originalText = this.textContent;
            this.textContent = 'root@unix:~#';
            this.style.color = '#ff4444';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '#6edc8c';
            }, 1500);
        });
    }
});

// Animasi teks pada man snippet
document.addEventListener('DOMContentLoaded', function() {
    const manContents = document.querySelectorAll('.man-content');
    
    manContents.forEach((content, index) => {
        content.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#2d3f4f';
            this.style.padding = '0 4px';
            this.style.borderRadius = '4px';
            this.style.transition = 'all 0.2s ease';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
        });
    });
});

// Easter egg: ketik "btc" di console
console.log(`
  ██████╗ ████████╗ ██████╗
  ██╔══██╗╚══██╔══╝██╔════╝
  ██████╔╝   ██║   ██║     
  ██╔══██╗   ██║   ██║     
  ██████╔╝   ██║   ╚██████╗
  ╚═════╝    ╚═╝    ╚═════╝
  
  Septian Rizky Izza Ramadhan - 17 tahun
  Unix Theme - Personal Data
`);

// Deteksi jika user mengetik "unix" di keyboard (easter egg berurutan)
let typed = '';
document.addEventListener('keydown', function(e) {
    typed += e.key.toLowerCase();
    typed = typed.slice(-4); // keep only last 4 chars
    
    if (typed === 'unix') {
        document.body.style.backgroundColor = '#2d1b3a';
        document.body.style.transition = 'background-color 1s ease';
        
        setTimeout(() => {
            document.body.style.backgroundColor = '#0d1117';
        }, 2000);
        
        typed = ''; // reset
    }
});

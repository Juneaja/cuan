// script.js - FIXED VERSION (100% BERGARANTI)
let currentUser = {
    id: 1,
    username: 'user123',
    balance: 25500,
    totalEarned: 125000,
    videosWatched: 127,
    whatsapp: '081234567890'
};

let videos = [
    {id:1,title:"Cara Cepat Kaya dari Internet 2024",thumbnail:"https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",url:"https://www.youtube.com/embed/dQw4w9WgXcQ",points:5000,duration:30,watched:false,views:1247},
    {id:2,title:"Rahasia Bisnis Online Sukses",thumbnail:"https://img.youtube.com/vi/jfKfPfyJRdk/mqdefault.jpg",url:"https://www.youtube.com/embed/jfKfPfyJRdk",points:7500,duration:45,watched:false,views:892},
    {id:3,title:"Tutorial Trading Crypto Pemula",thumbnail:"https://img.youtube.com/vi/9gcnFkmwJTU/mqdefault.jpg",url:"https://www.youtube.com/embed/9gcnFkmwJTU",points:10000,duration:60,watched:true,views:1567},
    {id:4,title:"Cara Dapat Uang 1 Juta/Hari",thumbnail:"https://img.youtube.com/vi/TF8k7QseFBE/mqdefault.jpg",url:"https://www.youtube.com/embed/TF8k7QseFBE",points:12000,duration:90,watched:false,views:2034},
    {id:5,title:"Investasi Emas Digital Mudah",thumbnail:"https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg",url:"https://www.youtube.com/embed/VIDEO_ID",points:8000,duration:40,watched:false,views:987},
    {id:6,title:"Aplikasi Penghasil Uang Terbukti",thumbnail:"https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg",url:"https://www.youtube.com/embed/VIDEO_ID",points:6000,duration:35,watched:true,views:2345}
];

// ======================== AUTO INIT ========================
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
    initDashboard();
    loadUserData();
});

// ======================== AUTH SYSTEM ========================
function initAuth() {
    // Login/Register buttons
    const loginBtn = document.querySelector('[onclick="showLogin()"]');
    const registerBtn = document.querySelector('[onclick="showRegister()"]');
    
    if (loginBtn) loginBtn.addEventListener('click', showLogin);
    if (registerBtn) registerBtn.addEventListener('click', showRegister);
    
    // Auth form
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleLoginRegister);
    }
    
    // Toggle auth
    const toggleLinks = document.querySelectorAll('.toggle-auth');
    toggleLinks.forEach(link => {
        link.addEventListener('click', toggleAuthMode);
    });
}

function showLogin() {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('modalTitle');
    const whatsappField = document.getElementById('whatsappField');
    const btnText = document.getElementById('btnText');
    const toggleText = document.getElementById('toggleText');
    
    title.textContent = '🔐 Login Akun';
    whatsappField.style.display = 'none';
    btnText.textContent = 'Masuk Sekarang';
    toggleText.innerHTML = 'Belum punya akun? <strong onclick="showRegister()" class="text-warning cursor-pointer">Daftar Gratis</strong>';
    
    new bootstrap.Modal(modal).show();
}

function showRegister() {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('modalTitle');
    const whatsappField = document.getElementById('whatsappField');
    const btnText = document.getElementById('btnText');
    const toggleText = document.getElementById('toggleText');
    
    title.textContent = '✨ Daftar Akun Baru';
    whatsappField.style.display = 'block';
    btnText.textContent = 'Daftar Gratis';
    toggleText.innerHTML = 'Sudah punya akun? <strong onclick="showLogin()" class="text-warning cursor-pointer">Login</strong>';
    
    new bootstrap.Modal(modal).show();
}

function toggleAuthMode(e) {
    e.preventDefault();
    if (document.getElementById('modalTitle').textContent.includes('Login')) {
        showRegister();
    } else {
        showLogin();
    }
}

function handleLoginRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const whatsapp = document.getElementById('whatsapp')?.value.trim();
    const btn = e.target.querySelector('button[type="submit"]');
    const spinner = document.getElementById('loadingSpinner');
    
    if (!username || !password) {
        showNotification('Mohon isi username dan password!', 'danger');
        return;
    }
    
    if (document.getElementById('whatsappField').style.display !== 'none' && !whatsapp) {
        showNotification('Mohon isi nomor WhatsApp!', 'danger');
        return;
    }
    
    // Show loading
    btn.disabled = true;
    spinner.classList.remove('d-none');
    
    // Simulate API (1.5 detik)
    setTimeout(() => {
        // Success login/register
        currentUser.username = username;
        if (whatsapp) currentUser.whatsapp = whatsapp;
        
        // Save to localStorage
        localStorage.setItem('videoMoneyUser', JSON.stringify(currentUser));
        
        // Close modal & redirect
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide();
        
        showNotification(`Selamat datang ${username}! 🎉`, 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
        
    }, 1500);
}

// ======================== DASHBOARD ========================
function initDashboard() {
    const watchBtns = document.querySelectorAll('.watch-btn:not(.watched)');
    watchBtns.forEach(btn => {
        btn.addEventListener('click', handleWatchVideo);
    });
}

function loadVideos() {
    const container = document.getElementById('videosContainer');
    if (!container) return;
    
    container.innerHTML = '';
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        container.appendChild(videoCard);
    });
    
    // Re-init watch buttons
    setTimeout(initDashboard, 100);
}

function createVideoCard(video) {
    const div = document.createElement('div');
    div.className = 'col-lg-4 col-md-6 mb-4';
    div.innerHTML = `
        <div class="card video-card h-100 shadow-lg">
            <div class="position-relative overflow-hidden rounded-top">
                <div class="video-thumbnail" style="background-image:url('${video.thumbnail}');">
                    <div class="points-badge">
                        <i class="fas fa-coins me-1"></i>+Rp${video.points.toLocaleString()}
                    </div>
                    ${video.watched ? '<div class="watched-overlay"><i class="fas fa-check-circle"></i> Sudah Ditonton</div>' : ''}
                </div>
            </div>
            <div class="card-body p-4">
                <h6 class="fw-bold mb-3 line-clamp-2">${video.title}</h6>
                <div class="d-flex justify-content-between text-muted small mb-3">
                    <span><i class="fas fa-eye me-1"></i>${video.views.toLocaleString()}</span>
                    <span>${video.duration}s</span>
                </div>
                <button class="btn watch-btn w-100 fw-bold ${video.watched ? 'btn-success watched' : 'btn-warning'} ${video.watched ? 'disabled' : ''}" 
                        data-id="${video.id}" data-points="${video.points}">
                    ${video.watched ? 
                        '<i class="fas fa-check me-2"></i>Diklaim' : 
                        '<i class="fas fa-play me-2"></i>Tonton & Klaim'
                    }
                </button>
            </div>
        </div>
    `;
    return div;
}

function handleWatchVideo(e) {
    const btn = e.currentTarget;
    const videoId = parseInt(btn.dataset.id);
    const points = parseInt(btn.dataset.points);
    
    startWatchTimer(btn, videoId, points);
}

function startWatchTimer(btn, videoId, points) {
    const video = videos.find(v => v.id === videoId);
    let timeLeft = video.duration;
    
    btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Menonton... <span id="timer-${videoId}">${timeLeft}s</span>`;
    btn.classList.add('disabled');
    
    const timer = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById(`timer-${videoId}`);
        if (timerEl) timerEl.textContent = timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            claimReward(btn, videoId, points);
        }
    }, 1000);
}

function claimReward(btn, videoId, points) {
    const video = videos.find(v => v.id === videoId);
    video.watched = true;
    video.views += 15;
    
    currentUser.balance += points;
    currentUser.totalEarned += points;
    currentUser.videosWatched++;
    
    localStorage.setItem('videoMoneyUser', JSON.stringify(currentUser));
    
    btn.innerHTML = `<i class="fas fa-check-circle text-success me-2"></i>+Rp${points.toLocaleString()} Terkredit!`;
    btn.classList.remove('btn-warning');
    btn.classList.add('btn-success');
    
    updateDashboardStats();
    showNotification(`🎉 +Rp${points.toLocaleString()} berhasil masuk saldo!`, 'success');
    
    loadVideos(); // Refresh video list
}

function updateDashboardStats() {
    const elements = {
        totalBalance: document.getElementById('totalBalance'),
        totalEarned: document.getElementById('totalEarned'),
        videosWatched: document.getElementById('videosWatched'),
        balance: document.getElementById('balance')
    };
    
    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            if (key === 'totalBalance' || key === 'balance') {
                elements[key].textContent = formatRupiah(currentUser.balance);
            } else if (key === 'totalEarned') {
                elements[key].textContent = formatRupiah(currentUser.totalEarned);
            } else {
                elements[key].textContent = currentUser.videosWatched;
            }
        }
    });
}

function loadUserData() {
    const saved = localStorage.getItem('videoMoneyUser');
    if (saved) {
        currentUser = { ...currentUser, ...JSON.parse(saved) };
        updateDashboardStats();
    }
}

function formatRupiah(amount) {
    return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.custom-notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} custom-notification position-fixed translate-middle`;
    notification.style.cssText = `
        top: 20px; right: 20px; z-index: 9999; min-width: 320px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    notification.innerHTML = `
        <div class="d-flex">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} 
                mt-auto mb-auto me-3 fs-4"></i>
            <div>${message}</div>
            <button type="button" class="btn-close ms-auto mb-auto me-0" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 4000);
}

function logout() {
    if (confirm('Logout akan menyimpan semua progress Anda. Lanjutkan?')) {
        localStorage.setItem('videoMoneyUser', JSON.stringify(currentUser));
        window.location.href = 'index.html';
    }
}

// CSS Injection for cursor pointer
const style = document.createElement('style');
style.textContent = `
    .cursor-pointer { cursor: pointer !important; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .video-thumbnail { height: 200px; background-size: cover; background-position: center; position: relative; }
    .points-badge { 
        position: absolute; top: 15px; right: 15px; background: linear-gradient(45deg, #ff6b6b, #feca57); 
        color: white; padding: 10px 15px; border-radius: 25px; font-weight: 600; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    .watched-overlay { 
        position: absolute; bottom: 0; left: 0; right: 0; background: rgba(67,233,123,0.9); 
        color: white; padding: 10px; text-align: center; font-weight: 600;
    }
`;
document.head.appendChild(style);

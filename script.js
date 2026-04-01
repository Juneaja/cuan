// script.js - VERSI LENGKAP
let currentUser = {
    id: 1,
    username: 'user123',
    balance: 25500,
    totalEarned: 125000,
    videosWatched: 127,
    whatsapp: '081234567890'
};

let videos = [
    {
        id: 1,
        title: "Cara Cepat Kaya dari Internet 2024",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        points: 5000,
        duration: 30,
        watched: false,
        views: 1247
    },
    {
        id: 2,
        title: "Rahasia Bisnis Online Sukses",
        thumbnail: "https://img.youtube.com/vi/jfKfPfyJRdk/mqdefault.jpg",
        url: "https://www.youtube.com/embed/jfKfPfyJRdk",
        points: 7500,
        duration: 45,
        watched: false,
        views: 892
    },
    {
        id: 3,
        title: "Tutorial Trading Crypto Pemula",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID",
        points: 10000,
        duration: 60,
        watched: true,
        views: 1567
    },
    {
        id: 4,
        title: "Cara Dapat Uang 1 Juta/Hari",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID",
        points: 12000,
        duration: 90,
        watched: false,
        views: 2034
    },
    {
        id: 5,
        title: "Investasi Emas Digital Mudah",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID",
        points: 8000,
        duration: 40,
        watched: false,
        views: 987
    },
    {
        id: 6,
        title: "Aplikasi Penghasil Uang Terbukti",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID",
        points: 6000,
        duration: 35,
        watched: true,
        views: 2345
    }
];

// ======================== AUTH FUNCTIONS ========================
function showLogin() {
    document.getElementById('modalTitle').textContent = 'Login Akun';
    document.getElementById('whatsappField').style.display = 'none';
    document.getElementById('btnText').textContent = 'Masuk';
    document.getElementById('toggleText').innerHTML = 'Belum punya akun? <a href="#" class="text-warning fw-bold" onclick="toggleAuth()">Daftar sekarang</a>';
    new bootstrap.Modal(document.getElementById('authModal')).show();
}

function showRegister() {
    document.getElementById('modalTitle').textContent = 'Daftar Akun Baru';
    document.getElementById('whatsappField').style.display = 'block';
    document.getElementById('btnText').textContent = 'Daftar Gratis';
    document.getElementById('toggleText').innerHTML = 'Sudah punya akun? <a href="#" class="text-warning fw-bold" onclick="toggleAuth()">Login disini</a>';
    new bootstrap.Modal(document.getElementById('authModal')).show();
}

function toggleAuth() {
    const title = document.getElementById('modalTitle');
    const whatsappField = document.getElementById('whatsappField');
    const btnText = document.getElementById('btnText');
    const toggleText = document.getElementById('toggleText');
    
    if (title.textContent.includes('Login')) {
        showRegister();
    } else {
        showLogin();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Auth form handler
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }
    
    // Check if on dashboard
    if (document.getElementById('videosContainer')) {
        loadVideos();
        updateDashboardStats();
    }
});

// Auth handler
function handleAuth(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const spinner = document.getElementById('loadingSpinner');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const whatsapp = document.getElementById('whatsapp')?.value;
    
    // Show loading
    btn.disabled = true;
    spinner.classList.remove('d-none');
    
    // Simulate login/register
    setTimeout(() => {
        if (username && password) {
            // Success
            currentUser.username = username;
            currentUser.whatsapp = whatsapp || currentUser.whatsapp;
            localStorage.setItem('videoMoneyUser', JSON.stringify(currentUser));
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
            modal.hide();
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        } else {
            alert('Mohon isi semua field!');
            btn.disabled = false;
            spinner.classList.add('d-none');
        }
    }, 1500);
}

// ======================== DASHBOARD FUNCTIONS ========================
function loadVideos() {
    const container = document.getElementById('videosContainer');
    container.innerHTML = '';
    
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        container.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    
    col.innerHTML = `
        <div class="card video-card h-100">
            <div class="position-relative">
                <div class="video-thumbnail rounded-top" 
                     style="background-image: url('${video.thumbnail}'); background-size: cover; background-position: center;">
                    <div class="points-badge pulse-animation">
                        <i class="fas fa-coins me-1"></i>+Rp${video.points.toLocaleString()}
                    </div>
                    ${video.watched ? '<div class="position-absolute bottom-0 start-0 w-100 bg-success bg-opacity-90 text-white text-center py-2"><i class="fas fa-check me-1"></i>Sudah Ditonton</div>' : ''}
                </div>
            </div>
            <div class="card-body p-4">
                <h6 class="fw-bold mb-3">${video.title}</h6>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <small class="text-muted">
                        <i class="fas fa-eye me-1"></i>${video.views.toLocaleString()} views
                    </small>
                    <small class="text-muted">${video.duration}s</small>
                </div>
                <button class="btn watch-btn w-100 ${video.watched ? 'watched disabled' : ''}" 
                        data-video-id="${video.id}" data-points="${video.points}"
                        ${video.watched ? 'disabled' : ''}>
                    ${video.watched ? 
                        '<i class="fas fa-check-circle me-2"></i>Sudah Diklaim' : 
                        '<i class="fas fa-play-circle me-2"></i>Tonton & Klaim Rp' + video.points.toLocaleString()
                    }
                </button>
            </div>
        </div>
    `;
    
    // Add event listener
    const watchBtn = col.querySelector('.watch-btn');
    if (!video.watched) {
        watchBtn.addEventListener('click', handleWatchVideo);
    }
    
    return col;
}

function handleWatchVideo(e) {
    const btn = e.target.closest('.watch-btn');
    const videoId = parseInt(btn.dataset.videoId);
    const points = parseInt(btn.dataset.points);
    
    // Start watching timer
    startWatchTimer(btn, videoId, points);
}

function startWatchTimer(btn, videoId, points) {
    const video = videos.find(v => v.id === videoId);
    const duration = video.duration;
    
    btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Menonton... <span id="timer">${duration}s</span>`;
    btn.disabled = true;
    
    let timeLeft = duration;
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            claimReward(btn, videoId, points);
        }
    }, 1000);
}

function claimReward(btn, videoId, points) {
    // Mark as watched
    const video = videos.find(v => v.id === videoId);
    video.watched = true;
    video.views += Math.floor(Math.random() * 50) + 10;
    
    // Update user stats
    currentUser.balance += points;
    currentUser.totalEarned += points;
    currentUser.videosWatched += 1;
    
    localStorage.setItem('videoMoneyUser', JSON.stringify(currentUser));
    
    // Update UI
    btn.classList.add('watched');
    btn.innerHTML = `<i class="fas fa-check-circle me-2 text-success"></i>+Rp${points.toLocaleString()} Terkredit`;
    btn.style.background = 'linear-gradient(45deg, #43e97b, #38f9d7)';
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Success notification
    showNotification(`+Rp${points.toLocaleString()} berhasil dikreditkan!`, 'success');
}

function updateDashboardStats() {
    if (document.getElementById('totalBalance')) {
        document.getElementById('totalBalance').textContent = formatRupiah(currentUser.balance);
        document.getElementById('totalEarned').textContent = formatRupiah(currentUser.totalEarned);
        document.getElementById('videosWatched').textContent = currentUser.videosWatched;
        document.getElementById('balance').textContent = formatRupiah(currentUser.balance);
    }
}

function formatRupiah(amount) {
    return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
}

// ======================== NOTIFICATION SYSTEM ========================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ======================== UTILITY FUNCTIONS ========================
function logout() {
    if (confirm('Yakin ingin logout? Progress akan tersimpan.')) {
        localStorage.removeItem('videoMoneyUser');
        window.location.href = 'index.html';
    }
}

// Auto login if user exists
if (localStorage.getItem('videoMoneyUser')) {
    currentUser = JSON.parse(localStorage.getItem('videoMoneyUser'));
}

// ======================== WITHDRAW FUNCTIONS (untuk withdraw.html) ========================
if (document.getElementById('currentBalance')) {
    // Withdraw page logic sudah ada di withdraw.html
    document.addEventListener('DOMContentLoaded', function() {
        const userData = JSON.parse(localStorage.getItem('videoMoneyUser') || '{}');
        if (userData.balance) {
            document.getElementById('currentBalance').textContent = formatRupiah(userData.balance);
            document.getElementById('balance').textContent = formatRupiah(userData.balance);
        }
    });
}

// PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

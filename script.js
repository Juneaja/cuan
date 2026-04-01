// script.js
let currentUser = {
    id: 1,
    username: 'user123',
    balance: 25500,
    totalEarned: 125000,
    videosWatched: 127
};

let videos = [
    {
        id: 1,
        title: "Cara Cepat Kaya dari Internet",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        points: 5000,
        duration: 30,
        watched: false
    },
    {
        id: 2,
        title: "Rahasia Bisnis Online 2024",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID",
        points: 7500,
        duration: 45,
        watched: false
    },
    {
        id: 3,
        title: "Tutorial Trading Crypto",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID",
        points: 10000,
        duration: 60,
        watched: true
    }
    // Tambah video lainnya...
];

// Auth Functions
function showLogin() {
    document.getElementById('modalTitle').textContent = 'Login Akun';
    document.getElementById('whatsappField').style.display = 'none';
    document.getElementById('btnText').textContent = 'Masuk';
    document.getElementById('toggleText').innerHTML = 'Belum punya akun? <a href="#" class="text-warning fw-bold" onclick="toggleAuth()">Daftar</a>';
    new bootstrap.Modal(document.getElementById('authModal')).show();
}

function showRegister() {
    document.getElementById('modalTitle').textContent = 'Daftar Akun Baru';
    document.getElementById('whatsappField').style.display = 'block';
    document.getElementById('btnText').textContent = 'Daftar';
    document.getElementById('toggleText').innerHTML = 'Sudah punya akun? <a href="#" class="text-warning fw-bold" onclick="toggleAuth()">Login</a>';
    new bootstrap.Modal(document.getElementById('authModal')).show();
}

function toggleAuth() {
    if (document.getElementById

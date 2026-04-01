// Data simulasi
const videos = [
    { id: 1, title: "Tutorial Trading Crypto", reward: 500, duration: 30 },
    { id: 2, title: "Review HP Terbaru 2024", reward: 700, duration: 45 },
    { id: 3, title: "Cara Dapat Uang Online", reward: 600, duration: 35 },
    { id: 4, title: "Motivasi Sukses", reward: 400, duration: 25 },
    { id: 5, title: "Tips Hemat Uang", reward: 550, duration: 40 }
];

let currentVideoIndex = 0;
let balance = 0;
let videosWatched = 0;
let totalEarned = 0;
let isWatching = false;
let watchStartTime = 0;
let videoPlayer = null;
let watchInterval = null;

// DOM Elements
const elements = {
    balance: document.getElementById('balance'),
    videosWatched: document.getElementById('videosWatched'),
    totalEarned: document.getElementById('totalEarned'),
    hourlyRate: document.getElementById('hourlyRate'),
    videoPlayer: document.getElementById('videoPlayer'),
    videoTitle: document.getElementById('videoTitle'),
    videoReward: document.getElementById('videoReward'),
    nextBtn: document.getElementById('nextBtn'),
    videoQueue: document.getElementById('videoQueue'),
    withdrawModal: document.getElementById('withdrawModal')
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    videoPlayer = elements.videoPlayer;
    loadVideoQueue();
    setupVideoEvents();
    updateDisplay();
});

// Setup video events
function setupVideoEvents() {
    videoPlayer.addEventListener('play', onVideoPlay);
    videoPlayer.addEventListener('pause', onVideoPause);
    videoPlayer.addEventListener('ended', onVideoEnd);
    videoPlayer.addEventListener('timeupdate', onVideoProgress);
}

// Load video queue
function loadVideoQueue() {
    elements.videoQueue.innerHTML = videos.map((video, index) => `
        <div class="video-item" onclick="playVideo(${index})">
            <img src="https://via.placeholder.com/300x150/4CAF50/FFFFFF?text=Video+${video.id}" alt="${video.title}">
            <h4>${video.title}</h4>
            <div class="reward">Rp ${video.reward}</div>
        </div>
    `).join('');
}

// Play video
function playVideo(index) {
    currentVideoIndex = index;
    const video = videos[index];
    
    elements.videoTitle.textContent = video.title;
    elements.videoReward.innerHTML = `Hadiah: <strong>Rp ${video.reward}</strong>`;
    elements.nextBtn.disabled = true;
    
    // Simulate video source change
    videoPlayer.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    videoPlayer.load();
    videoPlayer.play();
}

// Video events
function onVideoPlay() {
    if (!isWatching) {
        isWatching = true;
        watchStartTime = Date.now();
        watchInterval = setInterval(updateWatchProgress, 1000);
    }
}

function onVideoPause() {
    if (isWatching) {
        isWatching = false;
        if (watchInterval) {
            clearInterval(watchInterval);
        }
    }
}

function onVideoEnd() {
    if (isWatching) {
        completeVideo();
    }
}

function onVideoProgress() {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function updateWatchProgress() {
    // Simulate watching progress
}

function completeVideo() {
    isWatching = false;
    if (watchInterval) {
        clearInterval(watchInterval);
    }
    
    const video = videos[currentVideoIndex];
    balance += video.reward;
    totalEarned += video.reward;
    videosWatched++;
    
    elements.nextBtn.disabled = false;
    updateDisplay();
    
    // Auto next video after 2 seconds
    setTimeout(() => {
        nextVideo();
    }, 2000);
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    playVideo(currentVideoIndex);
}

function updateDisplay() {
    elements.balance.textContent = `Rp ${balance.toLocaleString()}`;
    elements.videosWatched.textContent = videosWatched;
    elements.totalEarned.textContent = `Rp ${totalEarned.toLocaleString()}`;
    elements.hourlyRate.textContent = `Rp ${Math.floor((totalEarned / Math.max(videosWatched, 1)) * 60).toLocaleString()}`;
}

function withdraw() {
    if (balance >= 10000) {
        elements.withdrawModal.style.display = 'block';
    } else {
        alert('Minimum penarikan Rp 10.000');
    }
}

function confirmWithdraw() {
    const amount = parseInt(document.getElementById('withdrawAmount').value);
    if (amount >= 10000 && amount <= balance) {
        alert(`Penarikan Rp ${amount.toLocaleString()} berhasil!`);
        balance -= amount;
        updateDisplay();
        closeModal();
    } else {
        alert('Jumlah tidak valid atau kurang dari minimum');
    }
}

function closeModal() {
    elements.withdrawModal.style.display = 'none';
    document.getElementById('withdrawAmount').value = '';
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target == elements.withdrawModal) {
        closeModal();
    }
}

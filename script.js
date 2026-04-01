// YouTube Videos Real (ID YouTube asli)
const youtubeVideos = [
    { 
        id: 'dQw4w9WgXcQ', // Rick Roll (funny)
        title: 'Never Gonna Give You Up - Rick Astley', 
        channel: 'RickAstleyVEVO',
        reward: 750,
        duration: '3:32'
    },
    { 
        id: 'kJQP7kiw5Fk', // Alan Walker
        title: 'Faded - Alan Walker', 
        channel: 'Alan Walkers',
        reward: 900,
        duration: '4:15'
    },
    { 
        id: 'c8TX2SoX9aI', // Dangdut viral
        title: 'Siti Badriah - Lagi Syantik', 
        channel: 'SitiBadriahOfficial',
        reward: 650,
        duration: '4:02'
    },
    { 
        id: '9bZkp7q19f0', // Gaming
        title: 'GTA 6 Trailer', 
        channel: 'Rockstar Games',
        reward: 1200,
        duration: '1:45'
    },
    { 
        id: 'kXYiU_JCYtU', // Motivasi
        title: 'Cara Kaya dengan Trading', 
        channel: 'Motivasi Sukses',
        reward: 850,
        duration: '10:23'
    }
];

let player;
let currentVideoIndex = 0;
let balance = 0;
let videosWatched = 0;
let totalEarned = 0;
let isWatching = false;
let watchStartTime = 0;
let watchPercentage = 0;
let requiredWatchPercent = 70; // Harus nonton 70% video

// DOM Elements
const elements = {
    balance: document.getElementById('balance'),
    videosWatched: document.getElementById('videosWatched'),
    totalEarned: document.getElementById('totalEarned'),
    avgReward: document.getElementById('avgReward'),
    videoTitle: document.getElementById('videoTitle'),
    channelName: document.getElementById('channelName'),
    videoDuration: document.getElementById('videoDuration'),
    videoReward: document.getElementById('videoReward'),
    nextBtn: document.getElementById('nextBtn'),
    videoQueue: document.getElementById('videoQueue'),
    progress: document.getElementById('progress'),
    withdrawModal: document.getElementById('withdrawModal'),
    youtubeContainer: document.getElementById('youtubePlayerContainer')
};

// Initialize
function init() {
    loadVideoQueue();
    updateDisplay();
}

// YouTube Iframe API Ready
function onYouTubeIframeAPIReady() {
    init();
}

// Create YouTube Player
function createPlayer() {
    player = new YT.Player('youtubePlayerContainer', {
        height: '100%',
        width: '100%',
        videoId: youtubeVideos[0].id,
        playerVars: {
            'playsinline': 1,
            'rel': 0,
            'modestbranding': 1,
            'controls': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackQualityChange': onPlaybackQualityChange
        }
    });
}

// Player Events
function onPlayerReady(event) {
    loadCurrentVideo();
}

function onPlayerStateChange(event) {
    switch(event.data) {
        case YT.PlayerState.PLAYING:
            onVideoPlay();
            break;
        case YT.PlayerState.PAUSED:
            onVideoPause();
            break;
        case YT.PlayerState.ENDED:
            onVideoEnd();
            break;
    }
}

function onPlaybackQualityChange(event) {
    updateProgress();
}

// Load Current Video Info
function loadCurrentVideo() {
    const video = youtubeVideos[currentVideoIndex];
    elements.videoTitle.textContent = video.title;
    elements.channelName.textContent = video.channel;
    elements.videoDuration.textContent = video.duration;
    elements.videoReward.innerHTML = `Hadiah: <strong>Rp ${video.reward}</strong>`;
    elements.nextBtn.disabled = true;
    
    if (player) {
        player.loadVideoById(video.id);
    }
}

// Video Events
function onVideoPlay() {
    if (!isWatching) {
        isWatching = true;
        watchStartTime = Date.now();
        updateProgress();
    }
}

function onVideoPause() {
    if (isWatching) {
        isWatching = false;
    }
}

function onVideoEnd() {
    checkVideoCompletion();
}

function updateProgress() {
    if (player && player.getDuration()) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        watchPercentage = (currentTime / duration) * 100;
        elements.progress.style.width = Math.min(watchPercentage, 100) + '%';
        
        // Update UI
        const percentText = document.createElement('span');
        if (!document.querySelector('.progress-text')) {
            const text = document.createElement('span');
            text.className = 'progress-text';
            elements.progress.parentNode.appendChild(text);
        }
        document.querySelector('.progress-text').textContent = 
            Math.floor(watchPercentage) + '% ditonton';
    }
}

function checkVideoCompletion() {
    if (watchPercentage >= requiredWatchPercent) {
        completeVideo();
    } else {
        alert(`Video harus ditonton ${requiredWatchPercent}% untuk dapat reward!`);
        nextVideo();
    }
}

function completeVideo() {
    isWatching = false;
    const video = youtubeVideos[currentVideoIndex];
    balance += video.reward;
    totalEarned += video.reward;
    videosWatched++;
    
    elements.nextBtn.disabled = false;
    updateDisplay();
    
    // Auto next video
    setTimeout(() => nextVideo(), 1500);
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % youtubeVideos.length;
    loadCurrentVideo();
}

function playVideo(index) {
    currentVideoIndex = index;
    loadCurrentVideo();
}

// Load Video Queue
function loadVideoQueue() {
    elements.videoQueue.innerHTML = youtubeVideos.map((video, index) => `
        <div class="video-item" onclick="playVideo(${index})">
            <iframe 
                src="https://www.youtube.com/embed/${video.id}?controls=0&showinfo=0&rel=0" 
                frameborder="0" 
                allowfullscreen>
            </iframe>
            <h4>${video.title}</h4>
            <div class="video-meta">${video.channel} • ${video.duration}</div>
            <div class="reward">💰 Rp ${video.reward}</div>
        </div>
    `).join('');
}

function updateDisplay() {
    elements.balance.textContent = `Rp ${balance.toLocaleString()}`;
    elements.videosWatched.textContent = videosWatched;
    elements.totalEarned.textContent = `Rp ${totalEarned.toLocaleString()}`;
    elements.avgReward.textContent = videosWatched > 0 
        ? `Rp ${Math.floor(totalEarned/videosWatched).toLocaleString()}` 
        : 'Rp 0';
}

// Withdraw Functions (sama seperti sebelumnya)
function withdraw() {
    if (balance >= 10000) {
        elements.withdrawModal.style.display = 'block';
    } else {
        alert('💳 Minimum penarikan Rp 10.000');
    }
}

function confirmWithdraw() {
    const amount = parseInt(document.getElementById('withdrawAmount').value);
    if (amount >= 10000 && amount <= balance) {
        alert(`✅ Penarikan Rp ${amount.toLocaleString()} berhasil diproses!`);
        balance -= amount;
        updateDisplay();
        closeModal();
    } else {
        alert('❌ Jumlah tidak valid!');
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

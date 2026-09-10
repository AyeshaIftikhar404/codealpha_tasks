const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("play-btn");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const songs = [
    {
        title: "Dreams",
        artist: "Ayesha",
        file: "song1.mp3"
    },
    {
        title: "Memories",
        artist: "Ayesha",
        file: "song2.mp3"
    },
    {
        title: "Journey",
        artist: "Ayesha",
        file: "song3.mp3"
    }
];

let currentSong = 0;

// Play / Pause
function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

// Load song
function loadSong(index) {
    currentSong = index;

    songTitle.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    audio.src = songs[index].file;
    audio.load();

    playBtn.textContent = "▶";
}

// Next song
function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
}

// Previous song
function previousSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
}

// Select song from playlist
function selectSong(index) {
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
}

// Update progress bar
audio.addEventListener("timeupdate", function() {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }

    currentTime.textContent = formatTime(audio.currentTime);
});

// Show duration
audio.addEventListener("loadedmetadata", function() {
    duration.textContent = formatTime(audio.duration);
});

// Move audio using progress bar
progress.addEventListener("input", function() {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

// Volume control
volume.addEventListener("input", function() {
    audio.volume = volume.value;
});

// Automatically play next song
audio.addEventListener("ended", function() {
    nextSong();
});

// Format time
function formatTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Load first song
loadSong(0);
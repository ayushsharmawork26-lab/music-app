console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "slam-e-ishq", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "My Heart", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "clelo-huma-Hume", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "dil-ishq", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Tonight-feet", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba-Salam", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Different Heven", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Warryo-Mortals", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "DEAFKEV", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Invincible", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

// Update song images and names dynamically
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    }
});

// Helper: reset all small play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
};

// Individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// ▶️ Play next song automatically when current one ends
audioElement.addEventListener('ended', () => {
    songIndex++;
    if (songIndex >= songs.length) songIndex = 0; // loop back to first song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

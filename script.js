let play = document.getElementById('play')
let progressBar = document.getElementById('progressBar')
let audio = new Audio('Audio/salaar.mp3')
let forward = document.getElementById('forward')
let backward = document.getElementById('backward')

let songIndex = 0;

play.addEventListener('click', () => {
  if (audio.paused || audio.currentTime == 0) {
    audio.play();
    play.classList.remove('fa-circle-play')
    play.classList.add('fa-circle-pause')
  }
  else {
    audio.pause();
    play.classList.remove('fa-circle-pause')
    play.classList.add('fa-circle-play')
  }
})

audio.addEventListener('timeupdate', () => {
  if (isNaN(audio.duration) || audio.duration === 0) return;
  let progress = (audio.currentTime / audio.duration) * 100
  progressBar.value = progress
  progressBar.style.background = `linear-gradient(to right,#177200ff ${progress}%,#333 ${progress}%)`
})

progressBar.addEventListener('input', function () {
  let value = this.value;
  this.style.background = `linear-gradient(to right,#177200ff ${value}%,#333 ${value}%)`
  audio.currentTime = (progressBar.value * audio.duration) / 100;
})

let musicPlayerBtns = Array.from(document.getElementsByClassName('music-player-btn'));

const makeAllPlay = () => {
  document.querySelectorAll('.playMusic').forEach((element) => {
    element.classList.remove('fa-pause');
    element.classList.add('fa-play');
  });
};

const songFiles = [
  "salaar",
  "chhichhore",
  "devara",
  "hii nanna",
  "krack",
  "pushpa",
  "rrr"
];

musicPlayerBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    makeAllPlay();

    // Get the inner play icon
    let icon = btn.querySelector('.playMusic');
    if (icon) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');

      // Change main play button icon to pause as well
      play.classList.remove('fa-circle-play');
      play.classList.add('fa-circle-pause');

      // Get the song index (subtract 1 for 0-based array index)
      songIndex = (parseInt(icon.id) - 1) % songFiles.length;

      // Get correct filename using modulo (in case of >7 elements)
      let songName = songFiles[songIndex];

      // Only restart audio if we clicked a new song
      if (!audio.src.includes(encodeURI(songName) + ".mp3")) {
        audio.src = `Audio/${songName}.mp3`;
        audio.currentTime = 0;
      }
      audio.play();
    }
  });
});

const playCurrentSong = () => {
  let songName = songFiles[songIndex];
  audio.src = `Audio/${songName}.mp3`;
  audio.currentTime = 0;
  audio.play();

  // Update main play button
  play.classList.remove('fa-circle-play');
  play.classList.add('fa-circle-pause');

  makeAllPlay();

  // Highlight all instances of the current song globally logic
  document.querySelectorAll('.playMusic').forEach((icon) => {
    if ((parseInt(icon.id) - 1) % songFiles.length === songIndex) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
    }
  });
};

forward.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songFiles.length;
  playCurrentSong();
});

backward.addEventListener('click', () => {
  // Add length to ensure we don't get negative modulo
  songIndex = (songIndex - 1 + songFiles.length) % songFiles.length;
  playCurrentSong();
});
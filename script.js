let play = document.getElementById('play')
let progressBar = document.getElementById('progressBar')
let audio = new Audio('Audio/salaar.mp3')

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
  let progress = (audio.currentTime / audio.duration) * 100
  progressBar.value = progress
  progressBar.style.background = `linear-gradient(to right,#177200ff ${progress}%,#333 ${progress}%)`

})

progressBar.addEventListener('input', function () {
  let value = this.value;
  this.style.background = `linear-gradient(to right,#177200ff ${value}%,#333 ${value}%)`
  audio.currentTime = (progressBar.value * audio.duration) / 100;
})

let playMusic = Array.from(document.getElementsByClassName('playMusic'))
console.log(playMusic);

const makeAllPlay = () => {
  playMusic.forEach((element) => {
    element.classList.remove('fa-pause')
    element.classList.add('fa-play')
  })
}

playMusic.forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlay();
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    play.classList.remove('fa-circle-play')
    play.classList.add('fa-circle-pause')
    index=parseInt(e.target.id);
    console.log(index)
    audio.src=`Audio/${index}.mp3`;
    audio.currentTime=0;
    audio.play();
  })
})
import "./style.css";
import "./time.js";
import { timeCorrector } from "./time.js";
const containerEl = document.querySelector("#container");
const forwardBtn = document.getElementById("forward-btn");
const backwardBtn = document.getElementById("backward-btn");
const playBtn = document.getElementById("play-btn");
const musicTitleEl = document.getElementById("music-title");
const audioEl = document.getElementById("audio");
const changeVolumeEl = document.getElementById("change-volume");
const coverEl = document.getElementById("cover");
const proccessContainer = document.querySelector(".proccess-container");
const proccess = document.querySelector(".proccess");
const fullTime = document.getElementById("full-time");
const startTime = document.getElementById("start-time");
const musicItemtemplate = document.getElementById("music-item-template");
const musicList = document.querySelector(".music-list");
const musicsToggler = document.getElementById("musics-toggler");
const musicContainer = document.getElementsByClassName("musics-container");
const speedBtn = document.querySelectorAll("#speed-btn");
const speedInfo = document.getElementById("speedInfo");

musicsToggler.addEventListener("click", () => {
  musicContainer.classList.toggle("open");
});

audioEl.addEventListener("loadeddata", () => {
  const minutes = timeCorrector(audioEl.duration);
  fullTime.textContent = minutes;
  audioEl.playbackRate = 1;
});

function setSpeed(rate) {
  audioEl.playbackRate=rate;
  speedInfo.textContent="Current Speed:"+rate+"x"
}
let currentVolume = +changeVolumeEl.value / 100;
audioEl.volume = currentVolume;
const musics = [
  "Bahrom Nazarov- Uzr Go'zal",
  "Botir Qodirov - Sevgisi yolg'onim",
  "Botir Qodirov - Xoji onam",
  "Doston Ergashev- Kambag'alga",
  "G'aybulla Tursunov-Janona",
  "Gulinur -Janima",
  "Hosila Rahimova- Jetama",
  "Jasmin- Sevganlari bor",
  "Munisa -Aka makasi",
  "Munisa &Jaloliddin yetmadimi",
  "Ozoda ko'k Jiguli",
  "Sardor Mamadaliyev-Dada",
];

musics.forEach((music, index) => {
  const clone = musicItemtemplate.content.cloneNode(true);
  const musicName = clone.querySelector(".music-name");
  const musicCover = clone.querySelector(".music-item-cover");
  const musicItem = clone.querySelector(".music-item");
  musicItem.dataset.id = index;
  musicCover.src = `./cover/${music}.jpg`;
  musicName.textContent = music;
  musicList.appendChild(clone);
});

let currentMusic = 0;

const changeMusic = (curMus) => {
  musicTitleEl.textContent = musics[curMus];
  audioEl.src = `./music/${musics[curMus]}.mp3`;
  coverEl.src = `./cover/${musics[curMus]}.jpg`;
};

changeMusic(currentMusic);

const playMusic = () => {
  containerEl.classList.add("play");
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  audioEl.play();
};

const pauseMusic = () => {
  containerEl.classList.remove("play");
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audioEl.pause();
};

const play = () => {
  const isPlaying = containerEl.classList.contains("play");

  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
};
const nextSong = () => {
  currentMusic++;
  if (currentMusic > musics.length - 1) {
    currentMusic = 0;
  }
  changeMusic(currentMusic);
  playMusic();
};

const prevSong = () => {
  currentMusic--;
  if (currentMusic < 0) {
    currentMusic = musics.length - 1;
  }
  changeMusic(currentMusic);
  playMusic();
};

const changeVolume = () => {
  currentVolume = +changeVolumeEl.value / 100;
  audioEl.volume = currentVolume;
};

const setProgress = () => {
  let currentTime = audioEl.currentTime;
  let duration = audioEl.duration;

  const progress = (currentTime / duration) * 100;
  proccessContainer.style.width = `${progress}%`;
  startTime.textContent = timeCorrector(audioEl.currentTime);
};
function setProgressTime(e) {
  const width = this.clientWidth;
  const offsetX = e.offsetX;
  audioEl.currentTime = (offsetX / width) * audioEl.duration;
}

window.selectMusic = function (e) {
  console.log(e);
  const musicId = e.dataset.id;
  currentMusic = musicId;
  changeMusic(currentMusic);
  playMusic();
  const listItems = musicList.querySelectorAll("li");
  listItems.forEach((item) => {
    item.classList.remove("active");
  });
  e.classList.add("active");
};

playBtn.addEventListener("click", play);
forwardBtn.addEventListener("click", nextSong);
backwardBtn.addEventListener("click", prevSong);
changeVolumeEl.addEventListener("input", changeVolume);
audioEl.addEventListener("timeupdate", setProgress);
audioEl.addEventListener("ended", nextSong);
proccess.addEventListener("click", setProgressTime);

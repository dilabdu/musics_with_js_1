import "./style.css";

const containerEl = document.querySelector("#container");
const forwardBtn = document.getElementById("forward-btn");
const backwardBtn = document.getElementById("backward-btn");
const playBtn = document.getElementById("play-btn");
const musicTitleEl = document.getElementById("music-title");
const audioEl = document.getElementById("audio");
const changeVolumeEl = document.getElementById("change-volume");
const coverEl = document.getElementById("cover");

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
  changeMusic(currentMusic);
  playMusic();
  if (currentMusic > musics.length - 1) {
    currentMusic = 0;
  }
};

const prevSong = () => {
  currentMusic--;
  changeMusic(currentMusic);
  playMusic();
  if (currentMusic < 0) {
    currentMusic = musics.length - 1;
  }
};

const changeVolume = () => {
  currentVolume = +changeVolumeEl.value / 100;
  audioEl.volume = currentVolume;
};

playBtn.addEventListener("click", play);
forwardBtn.addEventListener("click", nextSong);
backwardBtn.addEventListener("click", prevSong);
changeVolumeEl.addEventListener("input", changeVolume);

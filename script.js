const wrapper = document.querySelector(".player-container"),
  songImg = wrapper.querySelector("#banner-img"),
  songName = wrapper.querySelector(".song-details .name"),
  songArtist = wrapper.querySelector(".song-details .artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = progressArea.querySelector(".progress-bar"),
  songsList = document.querySelector(".songs-list"),
  moreSongsBtn = wrapper.querySelector("#more-songs"),
  closemoreSongs = songsList.querySelector("#close"),
  searchInput = songsList.querySelector("#search-input");

const ulTag = document.querySelector("ul");

// [PLAYLIST_START]
let allSongs = [
    {
        "name": "Aquamarine",
        "artist": "Addison Rae",
        "banner": "Aquamarine.jpeg",
        "src": "Addison Rae - Aquamarine.mp3"
    },
    {
        "name": "Living Hell",
        "artist": "Bella Poarch",
        "banner": "Living Hell.jpeg",
        "src": "Bella Poarch - Living Hell.mp3"
    },
    {
        "name": "BIRDS OF A FEATHER",
        "artist": "Billie Eilish",
        "banner": "Birds of A Feather.jpg",
        "src": "Billie Eilish - BIRDS OF A FEATHER.mp3"
    },
    {
        "name": "Lovely",
        "artist": "Billie Eilish",
        "banner": "Lovely.png",
        "src": "Billie Eilish - Lovely.mp3"
    },
    {
        "name": "1985",
        "artist": "Bo Burnham",
        "banner": "1985.jpg",
        "src": "Bo Burnham - 1985.mp3"
    },
    {
        "name": "Im Good",
        "artist": "David Guetta, Bebe Rexha",
        "banner": "Im Good.jpeg",
        "src": "David Guetta, Bebe Rexha - Im Good.mp3"
    },
    {
        "name": "Mask",
        "artist": "Dream",
        "banner": "Mask.jpg",
        "src": "Dream - Mask.mp3"
    },
    {
        "name": "Slow Down",
        "artist": "Dream",
        "banner": "Slow Down.jpeg",
        "src": "Dream - Slow Down.mp3"
    },
    {
        "name": "i walk this earth all by myself",
        "artist": "EKKSTACY",
        "banner": "i walk this earth all by myself.jpeg",
        "src": "EKKSTACY - i walk this earth all by myself.mp3"
    },
    {
        "name": "MIDDLE OF THE NIGHT",
        "artist": "Elley Duhé",
        "banner": "Middle of the Night.jpeg",
        "src": "Elley Duhé - MIDDLE OF THE NIGHT.mp3"
    },
    {
        "name": "Heat Waves",
        "artist": "Glass Animals",
        "banner": "Heat Waves.png",
        "src": "Glass Animals - Heat Waves.mp3"
    },
    {
        "name": "Hope Is the Thing With Feathers",
        "artist": "HOYO-MiX ft. Chevy",
        "banner": "Hope Is The Thing With Feathers.png",
        "src": "HOYO-MiX ft. Chevy - Hope Is the Thing With Feathers.mp3"
    },
    {
        "name": "Blazing Heart",
        "artist": "HOYO-MiX ft. Chrissy Costanza",
        "banner": "Blazing Heart.png",
        "src": "HOYO-MiX ft. Chrissy Costanza - Blazing Heart.mp3"
    },
    {
        "name": "Passing Memories",
        "artist": "HOYO-MiX ft. Faouzia",
        "banner": "Passing Memories.jpg",
        "src": "HOYO-MiX ft. Faouzia - Passing Memories.mp3"
    },
    {
        "name": "Columbina's Lullaby",
        "artist": "HOYO-MiX ft. Shania Yan",
        "banner": "Columbina's Lullaby.png",
        "src": "HOYO-MiX ft. Shania Yan - Columbina's Lullaby.mp3"
    },
    {
        "name": "Star Odyssey",
        "artist": "HOYO-MiX ft.Airi Suzuki",
        "banner": "Star Odyssey.png",
        "src": "HOYO-MiX ft.Airi Suzuki - Star Odyssey.mp3"
    },
    {
        "name": "Right Now",
        "artist": "Harddope, Rovack, J R",
        "banner": "Right Now.jpg",
        "src": "Harddope, Rovack, J R - Right Now.mp3"
    },
    {
        "name": "As It Was",
        "artist": "Harry Styles",
        "banner": "As It Was.jpg",
        "src": "Harry Styles - As It Was.mp3"
    },
    {
        "name": "Demons",
        "artist": "Imagine Dragons",
        "banner": "Demons.jpg",
        "src": "Imagine Dragons- Demons.mp3"
    },
    {
        "name": "LOVE STORY",
        "artist": "Indila",
        "banner": "LOVE STORY.png",
        "src": "Indila - LOVE STORY.mp3"
    },
    {
        "name": "golden hour",
        "artist": "JVKE",
        "banner": "golden hour.jpg",
        "src": "JVKE - golden hour.mp3"
    },
    {
        "name": "Infinity",
        "artist": "Jaymes Young",
        "banner": "Infinity.jpg",
        "src": "Jaymes Young-Infinity.mp3"
    },
    {
        "name": "E.T.",
        "artist": "Katy Perry",
        "banner": "E.T..jpeg",
        "src": "Katy Perry - E.T..mp3"
    },
    {
        "name": "worry (ultra slowed)",
        "artist": "LONOWN, riserayss",
        "banner": "worry (ultra slowed).jpeg",
        "src": "LONOWN, riserayss - worry (ultra slowed).mp3"
    },
    {
        "name": "Summertime Sadness",
        "artist": "Lana Del Rey",
        "banner": "Summertime Sadness.jpg",
        "src": "Lana Del Rey - Summertime Sadness.mp3"
    },
    {
        "name": "Dreams pt. II",
        "artist": "Lost Sky ft. Sara Skinner",
        "banner": "Dreams pt. II.jpeg",
        "src": "Lost Sky ft. Sara Skinner - Dreams pt. II.mp3"
    },
    {
        "name": "Overboard",
        "artist": "Madds Buckley",
        "banner": "Overboard.png",
        "src": "Madds Buckley - Overboard.mp3"
    },
    {
        "name": "All In",
        "artist": "Marino",
        "banner": "All in.jpeg",
        "src": "Marino - All In.mp3"
    },
    {
        "name": "The Lost Soul Down",
        "artist": "NBSPL",
        "banner": "The Lost Soul Down.jpeg",
        "src": "NBSPL - The Lost Soul Down.mp3"
    },
    {
        "name": "Grateful",
        "artist": "NEFFEX",
        "banner": "Grateful.png",
        "src": "NEFFEX - Grateful.mp3"
    },
    {
        "name": "NOTHING",
        "artist": "Unknown",
        "banner": "NOTHING.jpg",
        "src": "NOTHING.mp3"
    },
    {
        "name": "Break It Off",
        "artist": "PinkPantheress",
        "banner": "Break It Off.png",
        "src": "PinkPantheress - Break It Off.mp3"
    },
    {
        "name": "Stateside + Zara Larsson",
        "artist": "PinkPantheress ft. Zara Larsson",
        "banner": "Stateside + Zara Larsson.jpeg",
        "src": "PinkPantheress ft. Zara Larsson - Stateside + Zara Larsson.mp3"
    },
    {
        "name": "Boy's a liar Pt. 2",
        "artist": "PinkPantheress, Ice Spice",
        "banner": "Boy's a liar Pt. 2.jpeg",
        "src": "PinkPantheress, Ice Spice - Boy's a liar Pt. 2.mp3"
    },
    {
        "name": "Sunflower",
        "artist": "Post Malone, Swae Lee",
        "banner": "Sunflower.png",
        "src": "Post Malone, Swae Lee - Sunflower.mp3"
    },
    {
        "name": "I Really Want to Stay at Your House",
        "artist": "Rosa Walton & Hallie Coggins",
        "banner": "I Really Want To Stay At Your House.jpeg",
        "src": "Rosa Walton & Hallie Coggins - I Really Want to Stay at Your House.mp3"
    },
    {
        "name": "My Heart Full Of Flames",
        "artist": "SDN Nation",
        "banner": "My Heart Full of Flames.png",
        "src": "SDN Nation - My Heart Full Of Flames.mp3"
    },
    {
        "name": "I Really Want To Stay At Your House Remix",
        "artist": "Samuel Kim ft. Lorien",
        "banner": "I Really Want To Stay At Your House Remix.jpeg",
        "src": "Samuel Kim ft. Lorien - I Really Want To Stay At Your House Remix.mp3"
    },
    {
        "name": "You are Not Alone",
        "artist": "Saosin",
        "banner": "You are Not alone.jpg",
        "src": "Saosin - You are Not Alone.mp3"
    },
    {
        "name": "Ravings",
        "artist": "Sleep1st, HOYO-MiX",
        "banner": "Ravings.jpeg",
        "src": "Sleep1st, HOYO-MiX - Ravings.mp3"
    },
    {
        "name": "Freaks",
        "artist": "Surf Curse",
        "banner": "Freaks.jpg",
        "src": "Surf Curse - Freaks.mp3"
    },
    {
        "name": "Light in Abyss",
        "artist": "Suyi, Hamelin",
        "banner": "Light in Abyss.jpg",
        "src": "Suyi, Hamelin - Light in Abyss.mp3"
    },
    {
        "name": "Cruel Summer",
        "artist": "Taylor Swift",
        "banner": "Cruel Summer.jpg",
        "src": "Taylor Swift - Cruel Summer.mp3"
    },
    {
        "name": "august",
        "artist": "Taylor Swift",
        "banner": "august.jpg",
        "src": "Taylor Swift - august.mp3"
    },
    {
        "name": "Stay",
        "artist": "The Kid LAROI, Justin Bieber",
        "banner": "Stay.jpg",
        "src": "The Kid LAROI, Justin Bieber - Stay.mp3"
    },
    {
        "name": "Keep It To Yourself",
        "artist": "ThxSoMch",
        "banner": "Keep It To Yourself.jpeg",
        "src": "ThxSoMch - Keep It To Yourself.mp3"
    },
    {
        "name": "threwitallaway!",
        "artist": "Vxlious",
        "banner": "threwitallaway!.png",
        "src": "Vxlious - threwitallaway! .mp3"
    },
    {
        "name": "Unfaithful",
        "artist": "Yohan Gerber",
        "banner": "Unfaithful.jpeg",
        "src": "Yohan Gerber - Unfaithful.mp3"
    },
    {
        "name": "Afsanay",
        "artist": "Young Stunners",
        "banner": "Afsanay.jpeg",
        "src": "Young Stunners - Afsanay.mp3"
    },
    {
        "name": "did i tell u that i miss u",
        "artist": "adore",
        "banner": "did i tell u that i miss u.jpg",
        "src": "adore -  did i tell u that i miss u.mp3"
    },
    {
        "name": "Please",
        "artist": "wiv",
        "banner": "Please.png",
        "src": "wiv - Please.mp3"
    }
];
// [PLAYLIST_END]

const repeatBtn = wrapper.querySelector("#repeat-plist");

let song = localStorage.getItem("Songs");

let songIndex = !!song
  ? JSON.parse(song).songIndex
  : Math.floor(Math.random() * allSongs.length + 1);
console.log(songIndex);
let currentTime = !!song ? JSON.parse(song).currentTime : 0;

window.addEventListener("load", () => {
  loadSongs(currentTime);
  playingSong();

  const actionHandlers = {
    play: () => playSong(),
    pause: () => pauseSong(),
    previoustrack: () => prevSong(),
    nexttrack: () => nextSong(),
    seekbackward: (details) =>
      (mainAudio.currentTime -= details.seekOffset || 10),
    seekforward: (details) =>
      (mainAudio.currentTime += details.seekOffset || 10),
  };

  for (const [action, handler] of Object.entries(actionHandlers)) {
    try {
      navigator.mediaSession.setActionHandler(action, handler);
    } catch (error) {
      console.log(`The action "${action}" is not supported.`);
    }
  }
});

function saveToLocalStorage() {
  let data = {
    songIndex: songIndex,
    currentTime: currentTime,
  };
  localStorage.setItem("Songs", JSON.stringify(data));
}

function loadSongs(currTime = 0) {
  let Imgurl = `songs_banner/${allSongs[songIndex - 1].banner}`;
  songName.innerText = allSongs[songIndex - 1].name;
  songArtist.innerText = allSongs[songIndex - 1].artist;
  songImg.src = Imgurl;
  mainAudio.src = `songs/${allSongs[songIndex - 1].src}`;
  mainAudio.currentTime = currTime;
  console.log(`songs/${allSongs[songIndex - 1].src}`);
  navigator.mediaSession.metadata = new MediaMetadata({
    title: allSongs[songIndex - 1].name,
    artist: allSongs[songIndex - 1].artist,
    artwork: [{ src: Imgurl, sizes: "512x512", type: "image/png" }],
  });

  document.getElementById("bg-blur").style.backgroundImage = `url("${Imgurl}")`;
}

function playSong() {
  wrapper.classList.add("playing");
  playPauseBtn.querySelector("img").src = "./assets/icons/pause.svg";
  mainAudio.play();
}

function pauseSong() {
  wrapper.classList.remove("playing");
  playPauseBtn.querySelector("img").src = "./assets/icons/play_arrow.svg";
  mainAudio.pause();
}

function prevSong() {
  let getText = repeatBtn.title;
  switch (getText) {
    case "repeat":
      songIndex--;
      songIndex < 1 ? (songIndex = allSongs.length) : (songIndex = songIndex);
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * allSongs.length + 1);
      do {
        randIndex = Math.floor(Math.random() * allSongs.length + 1);
      } while (songIndex == randIndex);
      songIndex = randIndex;
      break;
  }
  loadSongs();
  playSong();
  playingSong();
}

function nextSong() {
  let getText = repeatBtn.title;
  switch (getText) {
    case "repeat":
      songIndex++;
      songIndex > allSongs.length ? (songIndex = 1) : (songIndex = songIndex);
      break;
    case "shuffle":
      let randIndex;
      do {
        randIndex = Math.floor(Math.random() * allSongs.length + 1);
      } while (songIndex == randIndex);
      songIndex = randIndex;
      break;
  }
  loadSongs();
  playSong();
  playingSong();
}

playPauseBtn.addEventListener("click", () => {
  const isPlaying = wrapper.classList.contains("playing");
  isPlaying ? pauseSong() : playSong();
  playingSong();
});

document.addEventListener("keydown", (event) => {
  if (event.code == "Space") {
    const isPlaying = wrapper.classList.contains("playing");
    isPlaying ? pauseSong() : playSong();
    playingSong();
  } else if (event.code == "ArrowLeft") {
    prevSong();
  } else if (event.code == "ArrowRight") {
    nextSong();
  }
});

prevBtn.addEventListener("click", () => {
  prevSong();
});

nextBtn.addEventListener("click", () => {
  nextSong();
});

mainAudio.addEventListener("timeupdate", (e) => {
  currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let songCurrentTime = wrapper.querySelector(".current-time"),
    songDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    songDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  songCurrentTime.innerText = `${currentMin}:${currentSec}`;
  saveToLocalStorage();
});

let isDragging = false;

function updateProgress(e) {
  const rect = progressArea.getBoundingClientRect();
  let clientX = e.clientX;

  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
  }

  const percentage = Math.max(
    0,
    Math.min(1, (clientX - rect.left) / rect.width),
  );
  const newTime = percentage * mainAudio.duration;

  if (!isNaN(newTime)) {
    mainAudio.currentTime = newTime;
    progressBar.style.width = `${percentage * 100}%`;
  }
}

function dragStart(e) {
  isDragging = true;
  updateProgress(e);
  mainAudio.pause();
}
progressArea.addEventListener("mousedown", (e) => dragStart(e));
progressArea.addEventListener("touchstart", (e) => dragStart(e));

function dragging(e) {
  if (isDragging) {
    if (e.type === "touchmove") {
      e.preventDefault();
    }
    updateProgress(e);
  }
}
document.addEventListener("mousemove", (e) => dragging(e));
document.addEventListener("touchmove", (e) => dragging(e), { passive: false });

function dragEnd() {
  if (isDragging) {
    isDragging = false;
    const isPlaying = wrapper.classList.contains("playing");
    if (isPlaying) {
      mainAudio.play();
    }
  }
}
document.addEventListener("mouseup", () => dragEnd());
document.addEventListener("touchend", () => dragEnd());

progressArea.addEventListener("click", (e) => {
  if (!isDragging) {
    updateProgress(e);
  }
});

repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.src;
  getText = getText.split("/").pop();
  switch (getText) {
    case "repeat.svg":
      repeatBtn.src = "./assets/icons/shuffle.svg";
      repeatBtn.setAttribute("title", "shuffle");
      break;
    case "shuffle.svg":
      repeatBtn.src = "./assets/icons/repeat.svg";
      repeatBtn.setAttribute("title", "repeat");
      break;
  }
});

mainAudio.addEventListener("ended", () => {
  nextSong();
});

moreSongsBtn.addEventListener("click", () => {
  songsList.classList.toggle("show");
});
closemoreSongs.addEventListener("click", () => {
  moreSongsBtn.click();
});

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const allLiTags = ulTag.querySelectorAll("li");

  allLiTags.forEach((li) => {
    const songName = li.querySelector(".row span").innerText.toLowerCase();
    const artistName = li.querySelector(".row p").innerText.toLowerCase();

    if (songName.includes(searchValue) || artistName.includes(searchValue)) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
});

for (let i = 0; i < allSongs.length; i++) {
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allSongs[i].name}</span>
                  <p>${allSongs[i].artist}</p>
                </div>
                <span id="duration-${i}" class="audio-duration">3:40</span>
                <audio id="audio-${i}" src="songs/${allSongs[i].src}"></audio>
              </li>`;
  console.log(`./songs/${allSongs[i].src}`);
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuartionTag = ulTag.querySelector(`#duration-${i}`);
  let liAudioTag = ulTag.querySelector(`#audio-${i}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

function playingSong() {
  const allLiTag = ulTag.querySelectorAll("li");

  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");

    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if (allLiTag[j].getAttribute("li-index") == songIndex) {
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  songIndex = parseInt(getLiIndex); //passing that liindex to songIndex
  loadSongs();
  playSong();
  playingSong();
}

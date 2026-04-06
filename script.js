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
        "name": "On My Way",
        "artist": "Alan Walker ft. Sabrina Carpenter & Farruko",
        "banner": "On My Way.png",
        "src": "Alan Walker ft. Sabrina Carpenter & Farruko - On My Way.mp3"
    },
    {
        "name": "Lovely",
        "artist": "Billie Eilish ft. Khalid",
        "banner": "Lovely.png",
        "src": "Billie Eilish ft. Khalid - Lovely.mp3"
    },
    {
        "name": "I Really Want to Stay at Your House",
        "artist": "Cyber Punk ft. Rosa Walton & Hallie Coggins",
        "banner": "I Really Want To Stay At Your House.png",
        "src": "Cyber Punk ft. Rosa Walton & Hallie Coggins - I Really Want to Stay at Your House.mp3"
    },
    {
        "name": "Middle of the Night",
        "artist": "Elley Duhé",
        "banner": "Middle of the Night.jpeg",
        "src": "Elley Duhé - Middle of the Night.mp3"
    },
    {
        "name": "Star Odyssey",
        "artist": "Hoyo Mix ft. Airi Suzuki",
        "banner": "Star Odyssey.png",
        "src": "Hoyo Mix ft. Airi Suzuki - Star Odyssey.mp3"
    },
    {
        "name": "Hope Is the Thing With Feathers",
        "artist": "Hoyo Mix ft. Chevy",
        "banner": "Hope Is The Thing With Feathers.png",
        "src": "Hoyo Mix ft. Chevy - Hope Is the Thing With Feathers.mp3"
    },
    {
        "name": "Blazing Heart",
        "artist": "Hoyo Mix ft. Chrissy Costanza",
        "banner": "Blazing Heart.png",
        "src": "Hoyo Mix ft. Chrissy Costanza -  Blazing Heart.mp3"
    },
    {
        "name": "Columbina's Lullaby",
        "artist": "Hoyo Mix ft. Elim",
        "banner": "Columbina's Lullaby.png",
        "src": "Hoyo Mix ft. Elim - Columbina's Lullaby.mp3"
    },
    {
        "name": "Passing Memories",
        "artist": "Hoyo Mix ft. Faouzia",
        "banner": "Passing Memories.jpg",
        "src": "Hoyo Mix ft. Faouzia - Passing Memories.mp3"
    },
    {
        "name": "MoeChakkaFire",
        "artist": "Issey",
        "banner": "MoeChakkaFire.png",
        "src": "Issey - MoeChakkaFire.mp3"
    },
    {
        "name": "Golden Hour",
        "artist": "JVKE",
        "banner": "Golden Hour.png",
        "src": "JVKE - Golden Hour.mp3"
    },
    {
        "name": "Summertime Sadness",
        "artist": "Lana Del Rey",
        "banner": "Summertime Sadness.png",
        "src": "Lana Del Rey - Summertime Sadness.mp3"
    },
    {
        "name": "Dreams pt II",
        "artist": "Lost Sky ft. Sara Skinner",
        "banner": "Dreams pt II.jpeg",
        "src": "Lost Sky ft. Sara Skinner - Dreams pt II.mp3"
    },
    {
        "name": "Overboard",
        "artist": "Madds Buckley",
        "banner": "Overboard.png",
        "src": "Madds Buckley - Overboard.mp3"
    },
    {
        "name": "Kimi no toriko ♪ •  Summertime",
        "artist": "Maggie ft. Nyan",
        "banner": "Kimi no toriko ♪ •  Summertime.jpg",
        "src": "Maggie ft. Nyan - Kimi no toriko ♪ •  Summertime.mp3"
    },
    {
        "name": "Grateful",
        "artist": "NEFFEX",
        "banner": "Grateful.png",
        "src": "NEFFEX - Grateful.mp3"
    },
    {
        "name": "My Heart Full Of Flames",
        "artist": "PUBG ft. Mars Atlas",
        "banner": "My Heart Full of Flames.png",
        "src": "PUBG ft. Mars Atlas - My Heart Full Of Flames.mp3"
    },
    {
        "name": "Break It Off",
        "artist": "Pink Pantheress",
        "banner": "Break It Off.png",
        "src": "Pink Pantheress - Break It Off.mp3"
    },
    {
        "name": "Sunflower",
        "artist": "Post Malone ft. Swae Lee",
        "banner": "Sunflower.png",
        "src": "Post Malone ft. Swae Lee - Sunflower.mp3"
    },
    {
        "name": "Stay",
        "artist": "The Kid LAROI ft. Justin Bieber",
        "banner": "Stay.jpg",
        "src": "The Kid LAROI ft. Justin Bieber - Stay.mp3"
    },
    {
        "name": "threwitallaway!",
        "artist": "Vxlious",
        "banner": "threwitallaway!.png",
        "src": "Vxlious - threwitallaway!.mp3"
    },
    {
        "name": "Please",
        "artist": "wiv",
        "banner": "Please.png",
        "src": "wiv - Please.mp3"
    }
];
// [PLAYLIST_END]

// MediaMetadata will be initialized in loadSongs

let song = localStorage.getItem('Songs');

let songIndex = !!song ? JSON.parse(song).songIndex : Math.floor((Math.random() * allSongs.length) + 1);
console.log(songIndex)
let currentTime = !!song ? JSON.parse(song).currentTime : 0;


window.addEventListener("load", () => {
    loadSongs(currentTime);
    playingSong();

    const actionHandlers = {
        play: () => playSong(),
        pause: () => pauseSong(),
        previoustrack: () => prevSong(),
        nexttrack: () => nextSong(),
        seekbackward: (details) => mainAudio.currentTime -= (details.seekOffset || 10),
        seekforward: (details) => mainAudio.currentTime += (details.seekOffset || 10)
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
        currentTime: currentTime
    }
    localStorage.setItem('Songs', JSON.stringify(data));
}

function loadSongs(currTime = 0) {
    let Imgurl = `songs_banner/${allSongs[songIndex - 1].banner}`;
    songName.innerText = allSongs[songIndex - 1].name;
    songArtist.innerText = allSongs[songIndex - 1].artist;
    songImg.src = Imgurl;
    mainAudio.src = `songs/${allSongs[songIndex - 1].src}`;

    mainAudio.currentTime = currTime;

    // setting up the metadata for media notification bar
    navigator.mediaSession.metadata = new MediaMetadata({
        title: allSongs[songIndex - 1].name,
        artist: allSongs[songIndex - 1].artist,
        artwork: [
            { src: Imgurl, sizes: '512x512', type: 'image/png' }
        ]
    });

    // Update background blur
    document.getElementById("bg-blur").style.backgroundImage = `url("${Imgurl}")`;
}

function playSong() {
    wrapper.classList.add("playing");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

function pauseSong() {
    wrapper.classList.remove("playing");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function prevSong() {
    songIndex--; //decrement of songIndex by 1
    //if songIndex is less than 1 then songIndex will be the array length so the last song play
    songIndex < 1 ? songIndex = allSongs.length : songIndex = songIndex;
    loadSongs();
    playSong();
    playingSong();
}

function nextSong() {
    songIndex++; //increment of songIndex by 1
    //if songIndex is greater than array length then songIndex will be 1 so the first song play
    songIndex > allSongs.length ? songIndex = 1 : songIndex = songIndex;
    loadSongs();
    playSong();
    playingSong();
}

playPauseBtn.addEventListener("click", () => {
    const isPlaying = wrapper.classList.contains("playing");
    //if isPlaySong is true then call pauseSong else call playSong
    isPlaying ? pauseSong() : playSong();
    playingSong();
});

document.addEventListener("keydown", (event) => {
    if (event.code == 'Space') {
        const isPlaying = wrapper.classList.contains("playing");
        //if isPlaySong is true then call pauseSong else call playSong
        isPlaying ? pauseSong() : playSong();
        playingSong();
    } else if (event.code == 'ArrowLeft') {
        prevSong();
    } else if (event.code == 'ArrowRight') {
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
    currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let songCurrentTime = wrapper.querySelector(".current-time"),
        songDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }
        songDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }
    songCurrentTime.innerText = `${currentMin}:${currentSec}`;

    // saving current song time and index
    saveToLocalStorage();
});

// Make progress bar draggable
let isDragging = false;

function updateProgress(e) {
    const rect = progressArea.getBoundingClientRect();
    let clientX = e.clientX;

    // Handle touch events
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
    }

    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
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
};
// Attach dragStart to progressArea for better touch target
progressArea.addEventListener('mousedown', e => dragStart(e));
progressArea.addEventListener('touchstart', e => dragStart(e));

function dragging(e) {
    if (isDragging) {
        if (e.type === 'touchmove') {
            e.preventDefault(); // Prevent scrolling while dragging
        }
        updateProgress(e);
    }
};
document.addEventListener('mousemove', (e) => dragging(e));
document.addEventListener('touchmove', (e) => dragging(e), { passive: false });

function dragEnd() {
    if (isDragging) {
        isDragging = false;
        const isPlaying = wrapper.classList.contains("playing");
        if (isPlaying) {
            mainAudio.play();
        }
    }
};
document.addEventListener('mouseup', () => dragEnd());
document.addEventListener('touchend', () => dragEnd());

// Also support click for quick seeking
progressArea.addEventListener('click', (e) => {
    if (!isDragging) {
        updateProgress(e);
    }
});

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText; //getting this tag innerText
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText; //getting this tag innerText
    switch (getText) {
        case "repeat":
            nextSong(); //calling nextSong function
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; //setting audio current time to 0
            loadSongs(); //calling loadSongs function with argument, in the argument there is a index of current song
            playSong(); //calling playSong function
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allSongs.length) + 1); //genereting random index/numb with max range of array length
            do {
                randIndex = Math.floor((Math.random() * allSongs.length) + 1);
            } while (songIndex == randIndex); //this loop run until the next random number won't be the same of current songIndex
            songIndex = randIndex; //passing randomIndex to songIndex
            loadSongs();
            playSong();
            playingSong();
            break;
    }
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

    allLiTags.forEach(li => {
        const songName = li.querySelector(".row span").innerText.toLowerCase();
        const artistName = li.querySelector(".row p").innerText.toLowerCase();

        if (songName.includes(searchValue) || artistName.includes(searchValue)) {
            li.style.display = "";
        } else {
            li.style.display = "none";
        }
    });
});

// let create li tags according to array length for list
for (let i = 0; i < allSongs.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allSongs[i].name}</span>
                  <p>${allSongs[i].artist}</p>
                </div>
                <span id="duration-${i}" class="audio-duration">3:40</span>
                <audio id="audio-${i}" src="songs/${allSongs[i].src}"></audio>
              </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuartionTag = ulTag.querySelector(`#duration-${i}`);
    let liAudioTag = ulTag.querySelector(`#audio-${i}`);


    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }
        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
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

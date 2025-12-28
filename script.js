const wrapper = document.querySelector(".player-container"),
    musicImg = wrapper.querySelector("#banner-img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = document.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closemoreMusic = musicList.querySelector("#close"),
    searchInput = musicList.querySelector("#search-input");

const ulTag = document.querySelector("ul");

// [PLAYLIST_START]
let allMusic = [
    {
        "name": "Blazing Heart",
        "artist": "HOYO MIX",
        "img": "Blazing_Heart",
        "src": "Blazing_Heart-HOYO_MIX.m4a"
    },
    {
        "name": "Columbina's Lullaby",
        "artist": "Unknown",
        "img": "Columbina's_Lullaby",
        "src": "Columbina's_Lullaby.m4a"
    },
    {
        "name": "Dream",
        "artist": "Lost Sky",
        "img": "Dream",
        "src": "Dream-Lost_Sky.m4a"
    },
    {
        "name": "Fly Away",
        "artist": "TheFatRat ft Anjulie",
        "img": "Fly_Away",
        "src": "Fly_Away-TheFatRat_ft_Anjulie.m4a"
    },
    {
        "name": "GODS",
        "artist": "Newjeans",
        "img": "GODS",
        "src": "GODS-Newjeans.m4a"
    },
    {
        "name": "Grateful",
        "artist": "NEFFEX",
        "img": "Grateful",
        "src": "Grateful-NEFFEX.m4a"
    },
    {
        "name": "Headlights",
        "artist": "Alan Waker ft Kiddo",
        "img": "Headlights",
        "src": "Headlights-Alan_Waker_ft_Kiddo.m4a"
    },
    {
        "name": "Hope Is The Thing With Feathers",
        "artist": "HOYO MIX",
        "img": "Hope_Is_The_Thing_With_Feathers",
        "src": "Hope_Is_The_Thing_With_Feathers-HOYO_MIX.m4a"
    },
    {
        "name": "I Really Want To Stay At Your House",
        "artist": "Rosa Walton & Hallie Coggins",
        "img": "I_Really_Want_To_Stay_At_Your_House",
        "src": "I_Really_Want_To_Stay_At_Your_House-Rosa_Walton_&_Hallie_Coggins.m4a"
    },
    {
        "name": "In The End",
        "artist": "Mellen Gi & Tommee Profitt",
        "img": "In_The_End",
        "src": "In_The_End-Mellen_Gi_&_Tommee_Profitt.m4a"
    },
    {
        "name": "Love Story",
        "artist": "Indila",
        "img": "Love_Story",
        "src": "Love_Story- Indila.m4a"
    },
    {
        "name": "Lovely",
        "artist": "Billie Eilish",
        "img": "Lovely",
        "src": "Lovely-Billie_Eilish.m4a"
    },
    {
        "name": "MoeChakkaFire",
        "artist": "issey",
        "img": "MoeChakkaFire",
        "src": "MoeChakkaFire-issey.m4a"
    },
    {
        "name": "My Heart Full Of Flames",
        "artist": "PUBG Mobile",
        "img": "My_Heart_Full_Of_Flames",
        "src": "My_Heart_Full_Of_Flames-PUBG_Mobile.m4a"
    },
    {
        "name": "Ordinary",
        "artist": "Alex Warren",
        "img": "Ordinary",
        "src": "Ordinary-Alex_Warren.m4a"
    },
    {
        "name": "Overboard",
        "artist": "Madds Buckley",
        "img": "Overboard",
        "src": "Overboard-Madds_Buckley.m4a"
    },
    {
        "name": "Passing Memories",
        "artist": "Fouzia",
        "img": "Passing_Memories",
        "src": "Passing_Memories-Fouzia.m4a"
    },
    {
        "name": "Pastlives",
        "artist": "sapientdream",
        "img": "Pastlives",
        "src": "Pastlives-sapientdream.m4a"
    },
    {
        "name": "Please",
        "artist": "wiv",
        "img": "Please",
        "src": "Please-wiv.mp3"
    },
    {
        "name": "Seventh Heaven",
        "artist": "milet",
        "img": "Seventh_Heaven",
        "src": "Seventh_Heaven-milet.mp3"
    },
    {
        "name": "Somewhere Only We Know",
        "artist": "Gustixa & Rhianne",
        "img": "Somewhere_Only_We_Know",
        "src": "Somewhere_Only_We_Know-Gustixa_&_Rhianne.m4a"
    },
    {
        "name": "Star Odyssey",
        "artist": "HOYO MIX",
        "img": "Star_Odyssey",
        "src": "Star_Odyssey-HOYO_MIX.mp3"
    },
    {
        "name": "Summertime",
        "artist": "Maggie",
        "img": "Summertime",
        "src": "Summertime-Maggie.m4a"
    },
    {
        "name": "Summertime Sadness",
        "artist": "Lana Del Rey",
        "img": "Summertime_Sadness",
        "src": "Summertime_Sadness-Lana_Del_Rey.m4a"
    },
    {
        "name": "Sunflower",
        "artist": "Post Malone & Swae Lee",
        "img": "Sunflower",
        "src": "Sunflower-Post_Malone_&_Swae_Lee.m4a"
    },
    {
        "name": "Where We Started",
        "artist": "Lost Sky ft Jex",
        "img": "music",
        "src": "Where_We_Started-Lost_Sky_ft_Jex.m4a"
    }
];
// [PLAYLIST_END]

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);


window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `music_banner/${allMusic[indexNumb - 1].img}.png`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}`;

    // Update background blur
    document.getElementById("bg-blur").style.backgroundImage = `url('music_banner/${allMusic[indexNumb - 1].img}.png')`;
}

function playMusic() {
    wrapper.classList.add("playing");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("playing");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function prevMusic() {
    musicIndex--; //decrement of musicIndex by 1
    //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function nextMusic() {
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("playing");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); //calling playMusic function
    playingSong();
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
            nextMusic(); //calling nextMusic function
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; //setting audio current time to 0
            loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
            playMusic(); //calling playMusic function
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
            musicIndex = randIndex; //passing randomIndex to musicIndex
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});

moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
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
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}"></audio>
              </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuartionTag = ulTag.querySelector(`[id="${allMusic[i].src}"]`);
    let liAudioTag = ulTag.querySelector(`[class="${allMusic[i].src}"]`);
    
    
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

        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }

        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //passing that liindex to musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

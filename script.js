// Loader

window.addEventListener('load', function() {
    document.getElementById('loader-container').style.display = 'none';
});

// Array Of Object For Songs List
const songs = [
    {
        id: 1,
        song: "./assets/songs/Luis_Fonsi_Ft_Daddy_Yankee_-_Despacito.mp3",
        image: "./assets/thumbnails/despacito.jpeg",
        title: "DESPACITO",
        writtenBy: "Luis Fonsi, Erika Ender, Daddy Yankee"
    },
    {
        id: 2,
        song: "./assets/songs/No-Lie(PagalWorld).mp3",
        image: "./assets/thumbnails/nolie.jpeg",
        title: "NO LIE",
        writtenBy: "Sean Paul, Emily Warren, Andrew Jackson"
    },
    {
        id: 3,
        song: "./assets/songs/11088_Ed Sheeran - Shape of You SHOW2BABI.COM.mp3",
        image: "./assets/thumbnails/shapeofyou.jpeg",
        title: "SHAPE OF YOU",
        writtenBy: "Ed Sheeran, Johnny McDaid"
    },
    {
        id: 4,
        song: "./assets/songs/One Love - (Raag.Fm).mp3",
        image: "./assets/thumbnails/onelove.jpeg",
        title: "ONE LOVE",
        writtenBy: "Bob Marley, Curtis Mayfield"
    },
    {
        id: 5,
        song: "./assets/songs/Party On My Mind (Race ) - K.K - 320Kbps.mp3",
        image: "./assets/thumbnails/partyonmymind.jpeg",
        title: "PARTY ON MY MIND",
        writtenBy: "Pritam, Prashant Ingole, Yo Yo Honey Singh"
    },
    {
        id: 6,
        song: "./assets/songs/Malang Sajna_320(PagalWorld.com.sb).mp3",
        image: "./assets/thumbnails/malangsajna.jpeg",
        title: "MALANG SAJNA",
        writtenBy: "Sachet Tandon, Parampara Thakur"
    },
    {
        id: 7,
        song: "./assets/songs/Ding Dong - Kucch To Hai.mp3",
        image: "./assets/thumbnails/dingdongdole.jpeg",
        title: "DING DONG DOLE",
        writtenBy: "Nadeem-Shravan, Sameer"
    },
    {
        id: 8,
        song: "./assets/songs/Dekha Tenu Pehli Pehli Baar Ve_320(PagalWorld.com.sb).mp3",
        image: "./assets/thumbnails/dekhhatenu.jpg",
        title: "DEKHHA TENU",
        writtenBy: "A. R. Rahman, Gulzar"
    },
    {
        id: 9,
        song: "./assets/songs/Teri Jhuki Nazar - Murder 3 128 Kbps.mp3",
        image: "./assets/thumbnails/terijhukinazar.jpeg",
        title: "TERI JHUKI NAZAR",
        writtenBy: "Pritam, Sayeed Quadri"
    },
    {
        id: 10,
        song: "./assets/songs/Tum Mile - Tum Mile 128 Kbps.mp3",
        image: "./assets/thumbnails/tummile.jpeg",
        title: "TUM MILE",
        writtenBy: "Pritam, Kumaar"
    }
];

// Getting Elements

let currentIndex = 0
const progress = document.getElementById("progress")
const ctrlIcon = document.getElementById("ctrlIcon")
const container = document.getElementById("songContainer")
const volumeIcon = document.querySelector('.volume-icon');
const volSlider = document.querySelector('.vol input');
const volInput = document.querySelector('.volume-input');
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector(".menu")
const playlistContainer = document.querySelector('.playlist');
const body = document.querySelector("body")
let audio = null

// Function To Load and Show Song Card
function loadSong(index) {
    const songObj = songs[index];
    currentIndex = index;
    const card = `
        <div class="card-img">
            <img id="image" src="${songObj.image}" alt="">
        </div>
        <div class="text">
            <h3 class="title">${songObj.title}</h3>
            <p class="written-by">${songObj.writtenBy}</p>
        </div>
        <div class="range">
        <span class="current-song-time">0:00</span>
        <input type="range" value="0" class="progress" id="progress-${songObj.id}">
        <span class="total-song-time"></span>
        </div>
        <audio id="song">
            <source src="${songObj.song}" type="audio/mpeg">
        </audio>`;
    container.innerHTML = card;

    // Dynamic Body Background Image
    body.style.backgroundImage = `url(${songObj.image})`;

    // Reinitializing Elements
    const audio = document.getElementById("song");
    const progress = document.getElementById(`progress-${songObj.id}`);

    // Getting Volume
    audio.volume = volSlider.value;

    // Assigning Volume Value 1 - 100 and Showing In Volume Input

    volSlider.addEventListener('input', () => {
        audio.volume = volSlider.value;
        let volumeValue = audio.volume * 200;
        volInput.innerHTML = volumeValue.toFixed(0)
    });


    // Volume Icons By Volume Value  

    volSlider.addEventListener('input', () => {

        audio.volume = volSlider.value

        if (volSlider.value == 0) {
            volumeIcon.classList.remove("fa-volume-high")
            volumeIcon.classList.remove("fa-volume-low")
            volumeIcon.classList.add("fa-volume-mute")
        }

        else if (volSlider.value < 0.50) {
            volumeIcon.classList.remove("fa-volume-high")
            volumeIcon.classList.remove("fa-volume-mute")
            volumeIcon.classList.add("fa-volume-low")
        }

        else {
            volumeIcon.classList.add("fa-volume-high")
            volumeIcon.classList.remove("fa-volume-low")
            volumeIcon.classList.remove("fa-volume-mute")
        }

    })

    // Volume Mute & Unmute Control

    volumeIcon.addEventListener("click", () => {

        if (audio.volume === 0) {
            audio.volume = 0.5;
            volSlider.value = audio.volume;
            volumeIcon.classList.remove("fa-volume-low")
            volumeIcon.classList.remove("fa-volume-mute")
            volumeIcon.classList.add("fa-volume-high")
            volInput.innerHTML = 100
        }

        else {
            audio.volume = 0;
            volSlider.value = 0;
            volumeIcon.classList.add("fa-volume-mute")
            volumeIcon.classList.remove("fa-volume-low")
            volumeIcon.classList.remove("fa-volume-high")
            volInput.innerHTML = 0
        }

    })


    // Song Progress Bar Duration By Song Current Time

    audio.addEventListener('loadedmetadata', () => {
        progress.max = audio.duration;
        const totalTime = document.querySelector('.total-song-time');

        const minutes = Math.floor(progress.max / 60);
        const seconds = Math.floor(progress.max % 60);

        const totalSongTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        totalTime.innerHTML = totalSongTime
        console.log("total Time", totalSongTime);
    });

    audio.addEventListener('timeupdate', () => {
        progress.value = audio.currentTime
        const currentTime = document.querySelector('.current-song-time');

        const minutes = Math.floor(progress.value / 60);
        const seconds = Math.floor(progress.value % 60);

        const currentTimeDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        currentTime.innerHTML = currentTimeDuration
        console.log("current Time", currentTimeDuration)
    });

    progress.addEventListener('input', () => {
        audio.currentTime = progress.value;
    });

    audio.addEventListener('ended', () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadSong(currentIndex);
        const nextSong = document.getElementById("song");
        nextSong.play();
    });

}

// Song Play Pause Functionality

function playPause() {
    const audio = document.getElementById("song");
    const image = document.querySelector("#image");
    if (audio) {
        if (ctrlIcon.classList.contains("fa-pause")) {
            audio.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
            image.style.animationPlayState = "paused";
            highlightPlayingSong(-1);
        }

        else {
            audio.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
            image.style.animationPlayState = "running";
            highlightPlayingSong(currentIndex);
        }
    }
}

// Next & Previous Button Functionalites

document.querySelector(".next-btn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    const image = document.querySelector("#image");
    const audio = document.getElementById("song");
    audio.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    highlightPlayingSong(currentIndex);
    image.style.animationPlayState = "running";

});

document.querySelector(".prev-btn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    const audio = document.getElementById("song");
    const image = document.querySelector("#image");
    audio.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    highlightPlayingSong(currentIndex);
    image.style.animationPlayState = "running";
});

loadSong(currentIndex);

// Toggle Menu

const toggleMenu = () => {

    if (menuIcon.classList.contains("fa-bars")) {
        menuIcon.classList.remove("fa-bars")
        menuIcon.classList.add("fa-close")
        menu.classList.remove("display-none")
        menu.classList.add("display-block")
    }
    else {
        menuIcon.classList.add("fa-bars")
        menuIcon.classList.remove("fa-close")
        menu.classList.remove("display-block")
        menu.classList.add("display-none")
    }

}

menuIcon.addEventListener("click", () => {
    toggleMenu()
})


// Playlist

songs.forEach(song => {
    const cardHTML = `
    <div class="cardlist">
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
                <img src="${song.image}" alt="${song.title}">
                <div style="margin-left: 10px;">
                    <h3 style="margin-right: 5px; display: inline-block;">${song.title}</h3>
                    <span class="now-playing display-none" style="color:rgb(0, 197, 0);">(Now Playing)</span>    
                    <p style="margin: 0; font-size: 14px; color: #aaa;">${song.writtenBy}</p>
                </div>
            </div>
            <button class="list-play" style="background: none; border: none; cursor: pointer;">
                <i class="list-icon fa fa-play" style="font-size: 18px; color: white;"></i>
            </button>
        </div>
        <audio class="audio-element" src="${song.song}"></audio>
    </div>
    `;
    playlistContainer.innerHTML += cardHTML;
});



const listPlays = document.querySelectorAll('.list-play');
const nowPlayings = document.querySelectorAll('.now-playing');
const audioElements = document.querySelectorAll('.audio-element');


// Playlist - Play Selected Song
listPlays.forEach((button, index) => {
    button.addEventListener("click", () => {
        const listIcon = button.querySelector('.list-icon');
        const nowPlaying = nowPlayings[index];

        audioElements.forEach((otherAudio, otherIndex) => {
            if (otherIndex !== index) {
                otherAudio.pause();
                listPlays[otherIndex].querySelector('.list-icon').classList.add("fa-play");
                listPlays[otherIndex].querySelector('.list-icon').classList.remove("fa-pause");
                nowPlayings[otherIndex].classList.add("display-none");
                nowPlayings[otherIndex].classList.remove("display-inline-block");
            }
        });

        if (listIcon.classList.contains("fa-play")) {
            loadSong(index); // Load the selected song
            const image = document.querySelector("#image");
            const audio = document.getElementById("song");
            audio.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
            listIcon.classList.remove("fa-play");
            listIcon.classList.add("fa-pause");
            nowPlaying.classList.remove("display-none");
            nowPlaying.classList.add("display-inline-block");
            image.style.animationPlayState = "running";
        } else {
            const image = document.querySelector("#image");
            const audio = document.getElementById("song");
            audio.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
            listIcon.classList.add("fa-play");
            listIcon.classList.remove("fa-pause");
            nowPlaying.classList.add("display-none");
            nowPlaying.classList.remove("display-inline-block");
            image.style.animationPlayState = "paused"
        }
    });
});

// Function to highlight the playing song in the playlist

function highlightPlayingSong(index) {
    listPlays.forEach((button, idx) => {
        const listIcon = button.querySelector('.list-icon');
        const nowPlaying = nowPlayings[idx];

        if (idx === index) {
            listIcon.classList.remove("fa-play");
            listIcon.classList.add("fa-pause");
            nowPlaying.classList.remove("display-none");
            nowPlaying.classList.add("display-inline-block");
        } else {
            listIcon.classList.add("fa-play");
            listIcon.classList.remove("fa-pause");
            nowPlaying.classList.add("display-none");
            nowPlaying.classList.remove("display-inline-block");
        }
    });
}


const music = [
    {
        artistEn: "Ali Zand Vakili",
        albumEn: "Royaye Bi tekrar",
        musicEn: "Atash Dar Ab",
        artistFa: "علی زند وکیلی",
        albumFa: "رویای بی تکرار",
        musicFa: "آتش در آب",
        src: "./music/music1.mp3",
        logo: "./img/logo.jpg"
    },
    {
        artistEn: "Mohsen Chavoshi",
        albumEn: "Mahi kenar miravad",
        musicEn: "Mahi",
        artistFa: "محسن چاووشی",
        albumFa: "ماهی کنار رود",
        musicFa: "ماهی",
        src: "./music/music2.mp3",
        logo: "./img/logo2.jpg"
    }
]
const singerEn = document.getElementById("englishTitle--artist");
const titleEn = document.getElementById("englishTitle--album");
const songEn = document.getElementById("englishTitle--song");
const singerFa = document.getElementById("persianTitle--artist");
const titleFa = document.getElementById("persianTitle--album");
const songFa = document.getElementById("persianTitle--song");
const audio = document.getElementById("audio");
const cover = document.getElementById("logo");
const play = document.getElementById("play");
const currTime = document.body.querySelector(".current-time")
const durTime = document.body.querySelector(".song-duration");
const progress = document.body.querySelector(".progress-container")
const proBar = document.body.querySelector("#progress")
const heart = document.body.querySelector("#like")
const like = document.body.querySelector("#likes")
const repeat = document.getElementById("repeat")

let songIndex = 0;
loadSong(music[songIndex])

//update the data of the song
function loadSong({artistEn = "not available", albumEn, musicEn, artistFa, albumFa, musicFa, src, logo}) {
    singerEn.innerHTML = artistEn;
    songEn.innerHTML = musicEn;
    titleEn.innerHTML = albumEn;
    singerFa.innerHTML = artistFa;
    songFa.innerHTML = musicFa
    titleFa.innerHTML = albumFa
    audio.src = src;
    cover.src = logo;
}
//run the music
function playMusic() {
    //add class play to parent and check playing or not in add event listener
    progress.classList.add("playing")
    //change the icon
    play.classList.remove("bi-play-fill");
    play.classList.add("bi-pause-fill");
    audio.play()
}

function pauseMusic() {
    progress.classList.remove("playing")
    play.classList.remove("bi-pause-fill");
    play.classList.add("bi-play-fill");
    audio.pause()
}

function preMusic() {
    --songIndex
    //check if it is the first song in list update the index to last item for have a loop
    if (songIndex < 0) songIndex = music.length - 1
    loadSong(music[songIndex])
    playMusic()

}

function nextMusic() {
    songIndex++
    //check if it is the last song in list update the index to first item for have a loop
    if (songIndex > music.length - 1) songIndex = 0
    loadSong(music[songIndex])
    playMusic()

}

function updateProgBar(event) {
    //get duration and current Time from audio obj
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    //calc width of progressbar and update it
    proBar.style.width = `${percent}%`
}

function changevolume(amount) {
    //get valye from silde range by change and set it audio object
    const audioObject = document.getElementById("audio");
    audioObject.volume = amount;
}

function duration(event) {
    const {duration, currentTime} = event.srcElement;
    let sec;
    let secDuration;
    let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? "0" + min : min;

    function getSecond(x) {
        if (Math.floor(x) >= 60) {
            sec = Math.round(x % 60);
            sec = sec < 10 ? "0" + sec : sec;
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? "0" + sec : sec
        }
    }

    getSecond(currentTime)
    currTime.innerHTML = min + ":" + sec;

    let minDuration = (isNaN(duration)) ? 0 : Math.floor(duration / 60);
    minDuration = minDuration < 10 ? "0" + minDuration : minDuration;

    function getSecondDuration(x) {
        if (isNaN(x)) secDuration = "00"
        else {
            if (Math.floor(x) >= 60) {
                secDuration = Math.round(x % 60);
                secDuration = secDuration < 10 ? "0" + secDuration : secDuration;
            } else {
                secDuration = Math.floor(x);
                secDuration = secDuration < 10 ? "0" + secDuration : secDuration
            }
        }

    }

    getSecondDuration(duration)

    durTime.innerHTML = minDuration + ":" + secDuration;

}
// set the progressbar by click on it and go to the selected time
function setProgressbyClick(event) {
    //get the width of parent
    const width = this.clientWidth
    //get the location of click in X  Ax
    const locationMyClick = event.offsetX;
    const duration = audio.duration
    //update the current time
    audio.currentTime = (locationMyClick / width) * duration;
}

play.addEventListener("click", () => {
    const isPlaying = progress.classList.contains("playing")
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic()
    }
})
heart.addEventListener("click", () => {
    const fill = heart.classList.contains("bi-suit-heart-fill")
    if (fill) {
        heart.classList.remove("bi-suit-heart-fill");
        heart.classList.add("bi-suit-heart");
        like.innerHTML = "3899"
    } else {
        heart.classList.remove("bi-suit-heart");
        heart.classList.add("bi-suit-heart-fill");
        like.innerHTML = "3900"
    }
})

repeat.addEventListener("click", () => {
    const active = repeat.classList.contains("bi-repeat");
    if (active) {
        repeat.classList.remove("bi-repeat");
        repeat.classList.add("bi-repeat-1");
        audio.loop = true
    } else {
        repeat.classList.remove("bi-repeat-1");
        repeat.classList.add("bi-repeat");
        audio.loop = false
    }
})
//add event to progress bar to set it doesn't work by onclick;
progress.addEventListener("click",setProgressbyClick)
audio.addEventListener("timeupdate", updateProgBar)
audio.addEventListener("ended", nextMusic)
audio.addEventListener("timeupdate", duration)
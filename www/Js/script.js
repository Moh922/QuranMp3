let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let recent_volume = document.querySelector('#volume')
let title = document.querySelector('#title')
let volume_show = document.querySelector('#volume_show')
let slider = document.querySelector('#duration_slider')
let show_duration = document.querySelector('#show')
let quranpix = document.querySelector('#quranpix')
let auto_play = document.querySelector('#auto')
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let reciter = document.querySelector('#reciter');

let timer;
let autoplay = 0;
let index_no = 0;
let Playing_quran = false;


//Create audio element

let quran = document.createElement('audio')

//All Chapters

let All_chapters = [
    {
        name: "suratul fathia",
        path: "Mp3/Quran1.mp3",
        img: "img/quranpix.jpg.jpeg",
        reciter: "1"
    },
    
    {
         name: "Surah Nasir",
         path: "Mp3/110.mp3",
         img: "img/quranpix.jpg.jpg",
         reciter: "Aaar Al Hudhoudi"
    }
];

//All functions

//Loading the Quran

function load_quran(index_no){
    clearInterval(timer)
    reset_slider();

    quran.src = All_chapters[index_no].path
    title.innerHTML = All_chapters[index_no].name

    quranpix.src = All_chapters[index_no].img
    reciter.innerHTML = All_chapters[index_no].reciter

    quran.load()
    timer = setInterval (range_slider, 1000);
    total.innerHTML = All_chapters.length;
    present.innerHTML = index_no + 1;
}  load_quran(index_no)

//mute sound function
function mute_sound(){
    quran.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

//Checking the Quran playing or not

function justplay(){
    if(Playing_quran == false){
        playquran()
    }
    else{
        pausequran();
    }
}


//reset Quran slider
function reset_slider(){
    slider.value = 0
}

//Play Quran
function playquran(){
    quran.play();
    Playing_quran = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
}

//Pause Quran
function pausequran(){
    quran.pause();
    Playing_quran = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
}

//Next Chapter
function next_chapter(){
    if (index_no < All_chapters.length - 1) {
        index_no += 1;
        load_quran(index_no);
        playquran()
    }
    else{
        index_no = 0;
        load_quran(index_no);
        playquran()
    }
}

//Previous Chapter
function previous_chapter(){
    if (index_no > 0) {
        index_no -= 1;
        load_quran(index_no);
        playquran()
    }
    else{
        index_no = All_chapters.length;
        load_quran(index_no);
        playquran()
    }
}

//Change Volume
function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    quran.volume = recent_volume.value/100
    
}

//Change Slider Position
function change_duration(){
    slider_position = quran.duration * (slider.value/100);
    quran.currentTime = slider_position
}

//Autoplay Function
function autoplay_switch() {
    if (autoplay = 1) {
        autoplay = 0;
        auto_play.style.background = 'rgba(255, 255 255, .2)';
    }
    else{
        autoplay = 1;
        auto_play.style.background = '#148f77';
    }
}

//Function Range Slider
function range_slider() {
    let Position = 0;
    //update slider position
    if (isNaN(quran.duration)) {
        position = quran.currentTime * (100/quran.duration);
        slider.value = position;
    }

    //function should go back when theQuran is over
    if (quran.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden = "time" </i>'
        if (autoplay == 1){
            index_no += 1;
            load_quran(index_no);
            playquran();
        }
        
    }
    
}


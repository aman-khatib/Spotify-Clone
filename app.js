const music = new Audio('');


const songs = [
    {
        id:'1',
        songName:` On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster:"img1.jpg"
    },
    {
        
        id:'2',
        songName:` Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker-Fade</div>`,
        poster:"img3.jpg"
       
    },
    {
        
        id:'3',
        songName:` Cartoon - On & On <br>
        <div class="subtitle">Daniel Levi</div>`,
        poster:"img4.jpg"
       
    },
    {
        
        id:'4',
        songName:` Warriyo - Mortals <br>
        <div class="subtitle">Mortals</div>`,
        poster:"img5.jpg"
       
    },
    {
        
        id:'5',
        songName:` Ertugrul Gazi <br>
        <div class="subtitle">Ertugrul</div>`,
        poster:"img6.webp"
       
    },
    {
        
        id:'6',
        songName:` Electronic Music <br>
        <div class="subtitle">Electro</div>`,
        poster:"img7.jpg"
       
    },
    {
        
        id:'7',
        songName:` Agar Tum Sath Ho  <br>
        <div class="subtitle">Tamashaa</div>`,
        poster:"img8.jpg"
        
    },
    {
        
        id:'8',
        songName:` Suna Hai <br>
        <div class="subtitle">Neha Kakkar</div>`,
        poster:"img9.jpg"
       
    },
    {
        
        id:'9',
        songName:` Dilber <br>
        <div class="subtitle">Satymeva Jayate</div>`,
        poster:"img10.jpg"
       
    },
    {
        
        id:'10',
        songName:` Duniya <br>
        <div class="subtitle">Luka Chuppi</div>`,
        poster:"img11.jpg"
       
    },
    {
        
        id:'11',
        songName:` Lagdi Lahore Di <br>
        <div class="subtitle">Street Dancer 3D</div>`,
        poster:"img12.jpg"
       
    },
    {
        
        id:'12',
        songName:` Putt Jatt Da <br>
        <div class="subtitle">Putt Jatt Da</div>`,
        poster:"img13.jpg"
       
    },
    {
        
        id:'13',
        songName:` Baarishein <br>
        <div class="subtitle">Atif Aslam</div>`,
        poster:"img14.jpg"
       
    },
    {
        
        id:'14',
        songName:` Vaste <br>
        <div class="subtitle">Dhvani Bhanushali</div>`,
        poster:"img15.avif"
       
    },
    {
        
        id:'15',
        songName:` Lut Gaye <br>
        <div class="subtitle">Jubin Nautiyal</div>`,
        poster:"img16.jpg"
       
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((Element, i)=>{
    Element.getElementsByTagName('img')[0].src = songs[i].poster;
    Element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((Element)=>{
            Element.classList.add('bi-play-circle-fill');
            Element.classList.remove('bi-pause-circle-fill');
        })
    }

const makeAllBackgrounds = () =>{
        Array.from(document.getElementsByClassName('songItem')).forEach((Element)=>{
               Element.style.background = "rgb(105,105,170,0)";
            })
        }

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((Element)=>{
    Element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src =`image/${index}.mp3`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id ==index;
        })

        song_title.forEach(ele=>{
            let {songName} = ele;
            title.innerHTML=songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('enede',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105,105,170,.1)";
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10){
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;
    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10){
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music/duration*100));
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width= `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('eneded' , ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let val_bar = document.getElementsByClassName('val_bar')[0];


vol.addEventListener('change', ()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})


let back = document.getElementById('back');
let next = document.getElementById('next');


back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`image/${index}.mp3`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id ==index;
    })

    song_title.forEach(ele=>{
        let {songName} = ele;
        title.innerHTML=songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105,105,170,.1)";
})

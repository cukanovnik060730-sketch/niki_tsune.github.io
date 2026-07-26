// ===============================
// NIKI_TSUNE V3.0
// Part 1
// ===============================

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ===============================
// ЗВЁЗДЫ
// ===============================

const stars = [];

for (let i = 0; i < 900; i++) {

    stars.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        size: Math.random() * 2.2,

        speed: Math.random() * 0.35 + 0.05,

        alpha: Math.random(),

        blink: Math.random() * 0.02

    });

}

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.y += star.speed;

        if(star.y > canvas.height){

            star.y = 0;
            star.x = Math.random() * canvas.width;

        }

        star.alpha += star.blink;

        if(star.alpha > 1 || star.alpha < 0.2){

            star.blink *= -1;

        }

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI*2
        );

        ctx.fillStyle =
        `rgba(255,255,255,${star.alpha})`;

        ctx.fill();

    });

}

const comets = [];

function spawnComet(){

    comets.push({

        x:-200,

        y:Math.random()*250,

        speed:8+Math.random()*6,

        length:180+Math.random()*120

    });

}

setInterval(spawnComet,4500);

function drawComets(){

    for(let i=comets.length-1;i>=0;i--){

        let c=comets[i];

        c.x+=c.speed;

        c.y+=c.speed*0.45;

        const g=ctx.createLinearGradient(
            c.x,
            c.y,
            c.x+c.length,
            c.y+c.length*.3
        );

        g.addColorStop(0,"rgba(255,255,255,.9)");
        g.addColorStop(1,"rgba(255,255,255,0)");

        ctx.beginPath();

        ctx.moveTo(c.x,c.y);

        ctx.lineTo(
            c.x+c.length,
            c.y+c.length*.3
        );

        ctx.strokeStyle=g;

        ctx.lineWidth=2;

        ctx.stroke();

        if(c.x>canvas.width+400){

            comets.splice(i,1);

        }

    }

}

function animate(){

    drawStars();

    drawComets();

    requestAnimationFrame(animate);

}

animate();

// ===============================
// CURSOR GLOW
// ===============================

const glow =
document.getElementById("cursorGlow");

document.addEventListener("mousemove",e=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});
// =====================================
// Typing Effect
// =====================================

const typing = document.getElementById("typing");

const words = [
    "Developer",
    "Beta Tester",
    "Game Writer",
    "AI Explorer",
    "Create",
    "Gamer",
    "Open Source"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect(){

    const current = words[wordIndex];

    if(!deleting){

        typing.textContent =
            current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typingEffect,1500);

            return;

        }

    }else{

        typing.textContent =
            current.substring(0,--charIndex);

        if(charIndex <= 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length)
                wordIndex = 0;

        }

    }

    setTimeout(typingEffect,70);

}

typingEffect();


// =====================================
// Loader
// =====================================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        const loader =
            document.getElementById("loader");

        loader.style.opacity="0";

        loader.style.pointerEvents="none";

        setTimeout(()=>{

            loader.remove();

        },1000);

    },2200);

});


// =====================================
// Card 3D
// =====================================

const card =
document.querySelector(".card");

document.addEventListener("mousemove",e=>{

    const rect =
        card.getBoundingClientRect();

    const x =
        (e.clientX-rect.left)/rect.width;

    const y =
        (e.clientY-rect.top)/rect.height;

    const rotateY =
        (x-.5)*16;

    const rotateX =
        (.5-y)*16;

    card.style.transform =

`rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 translateZ(0)`;

});

document.addEventListener("mouseleave",()=>{

    card.style.transform=
    "rotateX(0deg) rotateY(0deg)";

});


// =====================================
// Shine Effect
// =====================================

const shine =
document.querySelector(".shine");

document.addEventListener("mousemove",e=>{

    const rect =
        card.getBoundingClientRect();

    const x =
        ((e.clientX-rect.left)
        /rect.width)*100;

    const y =
        ((e.clientY-rect.top)
        /rect.height)*100;

    shine.style.background =

`radial-gradient(circle at ${x}% ${y}%,
rgba(255,255,255,.18),
transparent 45%)`;

});


// =====================================
// Floating Animation
// =====================================

let t = 0;

function floating(){

    t += 0.01;

    card.style.marginTop =
        Math.sin(t)*6 + "px";

    requestAnimationFrame(floating);

}

floating();


// =====================================
// Buttons
// =====================================

document.querySelectorAll(".btn")
.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.animate([

            {transform:"scale(1)"},

            {transform:"scale(1.03)"},

            {transform:"scale(1.01)"}

        ],{

            duration:250,

            fill:"forwards"

        });

    });

});


// =====================================
// Social Hover
// =====================================

document.querySelectorAll(".social a")
.forEach(icon=>{

    icon.addEventListener("mouseenter",()=>{

        icon.animate([

            {transform:"translateY(0)"},

            {transform:"translateY(-8px) scale(1.18)"}

        ],{

            duration:220,

            fill:"forwards"

        });

    });

    icon.addEventListener("mouseleave",()=>{

        icon.animate([

            {transform:"translateY(-8px) scale(1.18)"},

            {transform:"translateY(0) scale(1)"}

        ],{

            duration:220,

            fill:"forwards"

        });

    });

});

// =====================================
// Console
// =====================================

console.log(
"%cNIKI_TSUNE V3.0",
"color:#38bdf8;font-size:20px;font-weight:bold;"
);
// ===============================
// Music Player
// ===============================

const tracks = [
    {
        title: "Nebula Drift",
        file: "assets/music/01.mp3"
    },
    {
        title: "Echoes of the Void",
        file: "assets/music/02.mp3"
    },
    {
        title: "Dreams",
        file: "assets/music/03.mp3"
    }
];

const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("musicBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const title = document.querySelector(".music-title");
const status = document.querySelector(".music-status");

let current = 0;

function loadTrack(index){

    current = index;

    audio.src = tracks[index].file;

    title.textContent = tracks[index].title;

}

loadTrack(current);

playBtn.onclick = async ()=>{

    if(audio.paused){

        await audio.play();

        status.textContent = "Сейчас играет";

        playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    }else{

        audio.pause();

        status.textContent = "Пауза";

        playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    }

};

nextBtn.onclick = ()=>{

    current++;

    if(current >= tracks.length)
        current = 0;

    loadTrack(current);

    audio.play();

    status.textContent = "Сейчас играет";

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

};

prevBtn.onclick = ()=>{

    current--;

    if(current < 0)
        current = tracks.length - 1;

    loadTrack(current);

    audio.play();

    status.textContent = "Сейчас играет";

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

};

audio.onended = ()=>{

    nextBtn.click();

};

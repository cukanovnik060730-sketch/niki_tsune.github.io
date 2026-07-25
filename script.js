// =========================
// Космос
// =========================

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

resize();
window.addEventListener("resize", resize);

const stars = [];

for (let i = 0; i < 500; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        speed: Math.random() * 0.4 + 0.1,
        alpha: Math.random()
    });
}

function animate() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.y += star.speed;

        if(star.y > canvas.height){
            star.y = 0;
            star.x = Math.random()*canvas.width;
        }

        star.alpha += (Math.random()-0.5)*0.03;

        if(star.alpha < 0.2) star.alpha = 0.2;
        if(star.alpha > 1) star.alpha = 1;

        ctx.beginPath();
        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
        ctx.fillStyle=rgba(255,255,255,${star.alpha});
        ctx.fill();

    });

    requestAnimationFrame(animate);
}

animate();


// =========================
// Кометы
// =========================

function comet(){

    const x=Math.random()*canvas.width;
    const y=Math.random()*250;

    let len=0;

    function draw(){

        ctx.beginPath();

        ctx.moveTo(x+len,y+len*0.5);

        ctx.lineTo(x+len+120,y+len*0.5+30);

        ctx.strokeStyle="rgba(255,255,255,.8)";
        ctx.lineWidth=2;

        ctx.stroke();

        len+=10;

        if(len<320){
            requestAnimationFrame(draw);
        }

    }

    draw();

}

setInterval(comet,6000);


// =========================
// Печатающийся текст
// =========================

const typing = document.getElementById("typing");

const words = [
    "Developer",
    "Gamer",
    "Linux",
    "Open Source"
];

let word=0;
let letter=0;
let erase=false;

function type(){

    const current = words[word];

    if(!erase){

        typing.textContent=current.substring(0,letter++);

        if(letter>current.length){

            erase=true;

            setTimeout(type,1500);

            return;

        }

    }else{

        typing.textContent=current.substring(0,--letter);

        if(letter===0){

            erase=false;

            word++;

            if(word>=words.length)
                word=0;

        }

    }

    setTimeout(type,80);

}

type();


// =========================
// Наклон карточки
// =========================

const card=document.querySelector(".card");

document.addEventListener("mousemove",(e)=>{

    const x=(window.innerWidth/2-e.clientX)/35;

    const y=(window.innerHeight/2-e.clientY)/35;

    card.style.transform=
        rotateY(${x}deg) rotateX(${-y}deg);

});

document.addEventListener("mouseleave",()=>{

    card.style.transform="rotateX(0deg) rotateY(0deg)";

});


// =========================
// Плавное появление
// =========================

card.animate(

[
{
opacity:0,
transform:"translateY(80px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],

{
duration:1200,
fill:"forwards",
easing:"ease-out"
}

);

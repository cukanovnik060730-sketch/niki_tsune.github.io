// =======================
// Космический фон
// =======================

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const stars=[];

for(let i=0;i<250;i++){

    stars.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2+0.5,
        speed:Math.random()*0.4+0.05,
        alpha:Math.random()
    });

}

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.y+=star.speed;

        if(star.y>canvas.height){
            star.y=0;
            star.x=Math.random()*canvas.width;
        }

        star.alpha+=Math.random()*0.02-0.01;

        if(star.alpha<0.2) star.alpha=0.2;
        if(star.alpha>1) star.alpha=1;

        ctx.beginPath();
        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
        ctx.fillStyle=rgba(255,255,255,${star.alpha});
        ctx.fill();

    });

    requestAnimationFrame(drawStars);

}

drawStars();


// =======================
// Падающая звезда
// =======================

function shootingStar(){

    const x=Math.random()*canvas.width;
    const y=Math.random()*canvas.height/2;

    let len=0;

    function animate(){

        ctx.beginPath();

        ctx.moveTo(x+len,y+len*0.5);

        ctx.lineTo(x+len+80,y+len*0.5+20);

        ctx.strokeStyle="rgba(255,255,255,.8)";
        ctx.lineWidth=2;

        ctx.stroke();

        len+=12;

        if(len<250){

            requestAnimationFrame(animate);

        }

    }

    animate();

}

setInterval(shootingStar,7000);


// =======================
// Счётчик кликов
// =======================

let clicks=Number(localStorage.getItem("clicks"))||0;

const counter=document.getElementById("clicks");

counter.textContent=clicks;

document.querySelectorAll(".link").forEach(link=>{

    link.addEventListener("click",()=>{

        clicks++;

        counter.textContent=clicks;

        localStorage.setItem("clicks",clicks);

    });

});


// =======================
// 3D эффект карточки
// =======================

const card=document.querySelector(".card");

document.addEventListener("mousemove",(e)=>{

    const x=(window.innerWidth/2-e.clientX)/28;

    const y=(window.innerHeight/2-e.clientY)/28;

    card.style.transform=
    rotateY(${x}deg) rotateX(${-y}deg);

});

document.addEventListener("mouseleave",()=>{

    card.style.transform="rotateX(0) rotateY(0)";

});


// =======================
// Плавное появление
// =======================

card.animate([

{

opacity:0,

transform:"translateY(60px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:1200,

fill:"forwards",

easing:"ease"

});


// =======================
// Эффект свечения мыши
// =======================

document.addEventListener("mousemove",(e)=>{

document.body.style.backgroundPosition=
${e.clientX/50}px ${e.clientY/50}px;

});
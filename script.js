const personName = "YOUR FAVORITE PERSON";
const fromName = "YOUR NAME";

// List all images here directly
const imageFiles = [
  "pic1.jpg","pic2.jpg","pic3.jpg","pic4.jpg","pic5.jpg","pic6.jpg","pic7.jpg"
];

const slidesContainer = document.querySelector(".slides");
const quoteBox = document.getElementById("quote");
const title = document.getElementById("title");
const music = document.getElementById("bgMusic");

let slides = [];
let quotes = [];
let themes = [];
let index = 0;
let isTransitioning = false;
let experienceStarted = false;

/* Typewriter */
function typeWriter(text, el, i=0){
  if(i<text.length){
    el.innerHTML += text.charAt(i);
    setTimeout(()=>typeWriter(text,el,i+1),70);
  }
}
typeWriter(`Happy Birthday ${personName} 🤍`, title);

/* Create slides dynamically */
imageFiles.forEach(file=>{
  const slide=document.createElement("section");
  slide.className="slide";
  slide.style.backgroundImage=`url('${file}')`;
  slidesContainer.appendChild(slide);
});
slides=document.querySelectorAll(".slide");

/* Quotes */
quotes = [
  "You are my favorite person 🤍",
  "I’ve never met anyone like you in my life",
  "You are special and truly precious to me",
  "You stand by me when I feel low, and understand me even when I’m angry",
  "You are loyal, caring, and protective in your own way",
  "You’re the active ingredient in my good days 💊",
  `Happy Birthday ${personName} 🤍<br>If emotions had a formula, you’d be my constant.<br><br><span style="font-size:1.2rem;">Grateful for you, always</span>`
];
while(quotes.length<slides.length) quotes.push("Wishing you joy and happiness 🤍");

/* Themes */
themes=["#fbcfe8","#bfdbfe","#bbf7d0","#fde68a","#ddd6fe","#fecaca","#e9d5ff"];
while(themes.length<slides.length){
  const hue=Math.floor(Math.random()*360);
  themes.push(`hsl(${hue},70%,85%)`);
}

/* Start experience */
document.body.addEventListener("pointerdown", startOnce,{once:true});
function startOnce(){
  document.querySelector(".start").style.display="none";
  music.play().catch(()=>{}); 
  index=0; experienceStarted=true; showSlide();
}

/* Show slide */
function showSlide(){
  if(!slides.length) return;
  slides.forEach(s=>s.classList.remove("active"));
  slides[index].classList.add("active");
  quoteBox.style.opacity=0;
  setTimeout(()=>{
    quoteBox.innerHTML=quotes[index];
    quoteBox.style.color=themes[index];
    quoteBox.style.opacity=1;
    quoteBox.classList.toggle("final-note", index===slides.length-1);
  },500);
  if(index===slides.length-1) startConfetti();
}

/* Navigation */
function nextSlide(){if(!experienceStarted||isTransitioning||index>=slides.length-1)return; isTransitioning=true; index++; showSlide(); setTimeout(()=>isTransitioning=false,1200);}
function prevSlide(){if(!experienceStarted||isTransitioning||index<=0)return; isTransitioning=true; index--; showSlide(); setTimeout(()=>isTransitioning=false,1200);}

/* Swipe + Tap */
let startX=0, moved=false;
document.addEventListener("pointerdown", e=>{ startX=e.clientX; moved=false; });
document.addEventListener("pointermove", ()=>moved=true);
document.addEventListener("pointerup", e=>{
  const endX=e.clientX; const diff=startX-endX;
  if(Math.abs(diff)>60) diff>0?nextSlide():prevSlide();
  else if(!moved){const mid=window.innerWidth/2; e.clientX<mid?prevSlide():nextSlide();}
});

/* Hearts */
setInterval(()=>{
  const heart=document.createElement("span"); heart.innerText="🤍";
  heart.style.left=Math.random()*100+"vw";
  heart.style.animationDuration=(6+Math.random()*4)+"s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(()=>heart.remove(),10000);
},450);

/* Confetti */
function startConfetti(){
  const canvas=document.getElementById("confetti");
  const ctx=canvas.getContext("2d"); canvas.width=innerWidth; canvas.height=innerHeight;
  const pieces=Array.from({length:160},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*6+2,d:Math.random()*5+2}));
  (function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);pieces.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;ctx.fill();p.y+=p.d;if(p.y>canvas.height)p.y=0;});requestAnimationFrame(draw);})();
}

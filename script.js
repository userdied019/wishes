const personName = "YOUR FAVORITE PERSON";
const fromName = "YOUR NAME";

/* ===== SLIDES & QUOTES ===== */
const quotes = [
  "You are my favorite person 🤍",
  "I’ve never met anyone like you in my life",
  "You are special and truly precious to me",
  "You stand by me when I feel low, and understand me even when I’m angry",
  "You are loyal, caring, and protective in your own way",
  "You’re the active ingredient in my good days 💊",
  `Happy Birthday ${personName} 🤍<br>
   If emotions had a formula, you’d be my constant.<br><br>
   <span style="font-size:1.2rem;">Grateful for you, always</span><br>
   — ${fromName}`
];

const themes = [
  "#fbcfe8",
  "#bfdbfe",
  "#bbf7d0",
  "#fde68a",
  "#ddd6fe",
  "#fecaca",
  "#e9d5ff"
];

let index = 0;
let isTransitioning = false;
let experienceStarted = false;

const slides = document.querySelectorAll(".slide");
const quoteBox = document.getElementById("quote");
const title = document.getElementById("title");
const music = document.getElementById("bgMusic");

/* ===== TYPEWRITER TITLE ===== */
function typeWriter(text, el, i = 0) {
  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, el, i + 1), 70);
  }
}

typeWriter(`Happy Birthday ${personName} 🤍`, title);

/* ===== START EXPERIENCE ===== */
document.body.addEventListener("pointerdown", startOnce, { once: true });

function startOnce() {
  document.querySelector(".start").style.display = "none";
  music.play().catch(() => {});
  index = 0;
  experienceStarted = true;
  showSlide();
}

/* ===== SHOW SLIDE ===== */
function showSlide() {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");

  quoteBox.style.opacity = 0;

  setTimeout(() => {
    quoteBox.innerHTML = quotes[index];
    quoteBox.style.color = themes[index];
    quoteBox.style.opacity = 1;

    quoteBox.classList.toggle(
      "final-note",
      index === quotes.length - 1
    );
  }, 500);

  if (index === slides.length - 1) startConfetti();
}

/* ===== NAVIGATION FUNCTIONS ===== */
function nextSlide() {
  if (!experienceStarted || isTransitioning) return;
  if (index >= slides.length - 1) return;

  isTransitioning = true;
  index++;
  showSlide();

  setTimeout(() => isTransitioning = false, 1200);
}

function prevSlide() {
  if (!experienceStarted || isTransitioning) return;
  if (index <= 0) return;

  isTransitioning = true;
  index--;
  showSlide();

  setTimeout(() => isTransitioning = false, 1200);
}

/* ===== SWIPE SUPPORT (MOBILE + TRACKPAD) ===== */
let startX = 0;
let endX = 0;
let moved = false;

document.addEventListener("pointerdown", e => {
  startX = e.clientX;
  moved = false;
});

document.addEventListener("pointermove", () => {
  moved = true;
});

document.addEventListener("pointerup", e => {
  endX = e.clientX;

  const diff = startX - endX;

  if (Math.abs(diff) > 60) {
    if (diff > 0) nextSlide();   // swipe left
    else prevSlide();            // swipe right
  } 
  else if (!moved) {
    // CLICK / TAP (DESKTOP FRIENDLY)
    nextSlide();
  }
});

/* ===== FLOATING HEARTS ===== */
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = "🤍";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 450);

/* ===== CONFETTI ===== */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 5 + 2
  }));

  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
      ctx.fill();
      p.y += p.d;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  })();
}

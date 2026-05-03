function updateCounter() {
  const cards = document.querySelectorAll(".card");
  const count = cards.length;

  const counterElement = document.getElementById("counter-number");
  counterElement.textContent = count;
}

window.addEventListener("load", updateCounter);
function animateCounter(finalCount) {
  let current = 0;
  const counterElement = document.getElementById("counter-number");
  const interval = setInterval(() => {
    current += Math.ceil(finalCount / 30);
    if (current >= finalCount) {
      current = finalCount;
      clearInterval(interval);
    }
    counterElement.textContent = current;
  }, 30);
}

window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".card");
  const count = cards.length;
  animateCounter(count);
});

const COLORS = [
  "#534AB7",
  "#AFA9EC",
  "#FAC775",
  "#EF9F27",
  "#1D9E75",
  "#5DCAA5",
  "#D4537E",
  "#F0997B",
  "#378ADD",
  "#85B7EB",
  "#639922",
  "#E24B4A",
];

const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let pieces = [];
let animId = null;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function spawnPieces(n) {
  for (let i = 0; i < n; i++) {
    const w = randomBetween(7, 14);
    const h = randomBetween(4, 9);
    pieces.push({
      x: randomBetween(0, canvas.width),
      y: randomBetween(-80, -10),
      w,
      h,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: randomBetween(0, Math.PI * 2),
      rotSpeed: randomBetween(-0.08, 0.08),
      vx: randomBetween(-1.5, 1.5),
      vy: randomBetween(2.5, 5.5),
      opacity: 1,
      shape: Math.random() < 0.5 ? "rect" : "circle",
    });
  }
}

function drawPiece(p) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  if (p.shape === "rect") {
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
  } else {
    ctx.beginPath();
    ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;
    p.vy += 0.07;
    if (p.y > canvas.height * 0.75) {
      p.opacity -= 0.025;
    }
    if (p.opacity <= 0) {
      pieces.splice(i, 1);
      continue;
    }
    drawPiece(p);
  }
  if (pieces.length > 0) {
    animId = requestAnimationFrame(tick);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animId = null;
  }
}

function launchConfetti() {
  pieces = [];
  if (animId) cancelAnimationFrame(animId);
  spawnPieces(130);
  setTimeout(() => spawnPieces(80), 250);
  setTimeout(() => spawnPieces(60), 500);
  tick();
}

function showPopup() {
  document.getElementById("overlay").classList.add("active");
  launchConfetti();
}

function closePopup() {
  document.getElementById("overlay").classList.remove("active");
  pieces = [];
  if (animId) {
    cancelAnimationFrame(animId);
    animId = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function copyPost() {
  const text = `🚀 I just made my FIRST Open Source Contribution!

From understanding GitHub to creating my first Pull Request — this feels unreal 🤯

✅ My name is now LIVE on a real website
✅ My GitHub graph just turned GREEN
✅ And this is just the beginning!

Huge thanks to @Parul Prashar for making this beginner-friendly 🚀

If you're starting out, THIS is your sign to begin.

🔗 Check it out: https://parulprashar.github.io/Hall-of-PRs/
🎥 Tutorial I followed: https://www.youtube.com/watch?v=DPShl8GWqS8

#FirstPR #OpenSource #GitHub #LearningInPublic`;
  navigator.clipboard.writeText(text);
  const btn = document.getElementById("copyBtn");
  btn.textContent = "Copied!";
  btn.classList.add("copied");
  setTimeout(() => {
    btn.textContent = "Copy LinkedIn Post";
    btn.classList.remove("copied");
  }, 2000);
}

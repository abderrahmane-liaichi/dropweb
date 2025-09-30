
const video = document.getElementById('mainVideo');
const overlay = document.getElementById('playOverlay');

overlay.addEventListener('click', () => {
  video.play();
  overlay.classList.add('hidden');
});

video.addEventListener('pause', () => {
  overlay.classList.remove('hidden');
});

video.addEventListener('ended', () => {
  overlay.classList.remove('hidden');
});
const countdown = document.getElementById('countdownTimer');
const deadline = new Date("October 31 , 2025 23:59:59").getTime();

const updateTimer = setInterval(() => {
  const now = new Date().getTime();
  const t = deadline - now;

  if (t <= 0) {
    clearInterval(updateTimer);
    countdown.innerHTML = "OFFER EXPIRED";
    return;
  }

  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((t % (1000 * 60)) / 1000);
  const content = document.getElementById("content");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

let currentSlide = 0;
const carousel = document.getElementById('reviewCarousel');
const totalSlides = carousel.children.length;

function slideCarousel(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  const offset = -currentSlide * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

// Optional: Auto slide
setInterval(() => slideCarousel(1), 7000);
// Optional: Add button click events
document.querySelector('.explore').addEventListener('click', () => {
  alert('Redirecting to demo page...');
});

document.querySelector('.buy').addEventListener('click', () => {
  alert('Proceeding to checkout...');
});
function moreGap(){
  content.style.gap = '11960px'
  console.log('hello')
}


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

// ----------------------------------
let visibleCount = 6; // how many items show at first
const cards = document.querySelectorAll(".theme-card");
const loadMoreBtn = document.getElementById("boton-elegante");

// Default: show 6 from "all"
function showInitialThemes() {
  cards.forEach((card, index) => {
    card.style.display = index < visibleCount ? "block" : "none";
  });
}

// Filter by category
function filterThemes(category) {
  const buttons = document.querySelectorAll(".categories button");

  // Active button style
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  let count = 0;
  cards.forEach(card => {
    if (category === "all" || card.dataset.category === category) {
      if (count < visibleCount) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
      count++;
    } else {
      card.style.display = "none";
    }
  });

  // If fewer than visibleCount items exist, hide "Load More"
  const visibleCards = [...cards].filter(
    card => card.style.display === "block"
  );
  loadMoreBtn.style.display = visibleCards.length < count ? "block" : "none";
}

// Load more items
loadMoreBtn.addEventListener("click", () => {
  visibleCount += 6;
  const activeBtn = document.querySelector(".categories button.active");
  const currentCategory = activeBtn ? activeBtn.textContent.toLowerCase() : "all";
  filterThemes(currentCategory.includes("all") ? "all" : activeBtn.getAttribute("onclick").match(/'(.*?)'/)[1]);
});

// Run default
window.onload = function() {
  showInitialThemes();
};
// ===== COUNTDOWN TIMER =====
const countdown = () => {
  const endDate = new Date("April 2, 2026 23:59:59").getTime();
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance < 0) {
    document.querySelector(".countdown").innerHTML = "Offer Expired!";
    return;
  }

  document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
};

setInterval(countdown, 1000);
document.querySelectorAll('.review').forEach(review => {
  const header = review.querySelector('.review-header');
  header.addEventListener('click', () => {
    review.classList.toggle('open');
  });
});

(() => {
  const track = document.getElementById("track");
  const wrap = track.parentElement;
  const cards = Array.from(track.children);
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dotsBox = document.getElementById("dots");

  const isMobile = () => matchMedia("(max-width:767px)").matches;

  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => activate(i, true);
    dotsBox.appendChild(dot);
  });
  const dots = Array.from(dotsBox.children);

  let current = 0;

  function center(i) {
    const card = cards[i];
    const axis = isMobile() ? "top" : "left";
    const size = isMobile() ? "clientHeight" : "clientWidth";
    const start = isMobile() ? card.offsetTop : card.offsetLeft;
    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: "smooth"
    });
  }

  function toggleUI(i) {
    cards.forEach((c, k) => c.toggleAttribute("active", k === i));
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    prev.disabled = i === 0;
    next.disabled = i === cards.length - 1;
  }

  function activate(i, scroll) {
    if (i === current) return;
    current = i;
    toggleUI(i);
    if (scroll) center(i);
  }

  function go(step) {
    activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
  }

  prev.onclick = () => go(-1);
  next.onclick = () => go(1);

  addEventListener(
    "keydown",
    (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    },
    { passive: true }
  );

  cards.forEach((card, i) => {
    card.addEventListener(
      "mouseenter",
      () => matchMedia("(hover:hover)").matches && activate(i, true)
    );
    card.addEventListener("click", () => activate(i, true));
  });

  let sx = 0,
    sy = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60)
        go((isMobile() ? dy : dx) > 0 ? -1 : 1);
    },
    { passive: true }
  );
  if (window.matchMedia("(max-width:767px)").matches) dotsBox.hidden = true;

  addEventListener("resize", () => center(current));

  toggleUI(0);
  center(0);
})();
// ------------------------
document.getElementById("offerForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent page reload

  const formData = new FormData(this);

  fetch("https://formsubmit.co/ajax/smaykafire@gmail.com", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(() => {
    // Redirect to your link after sending email
    window.location.href = "https://dropwebs.gumroad.com/l/Premium-Shopify-Themes"; // replace with your desired link
  })
  .catch(() => {
    alert("Failed to send message. Please try again.");
  });
});


/*
 * shadow-image.js
 * <fabien.dutaud@gmail.com> (https://tungu.me)
 * Released under the MIT License.
 */

document.querySelectorAll(".img").forEach(function(el, index) {
	var src = el.getAttribute("src");
	var shadowElement = document.querySelectorAll(".img-shadow")[index];
	if (!shadowElement) return;
	shadowElement.style.backgroundImage = "url(" + src + ")";
  });

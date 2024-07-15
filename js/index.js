// Home: Auto Slide Carousel
const carousel = document.getElementById('carousel');
const inner = carousel.querySelector('.carousel-inner');
const items = carousel.getElementsByClassName('carousel-item');
let currentIndex = 0;

function showNextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  inner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Set interval for auto-sliding
setInterval(showNextSlide, 3000); // Change slide every 3 seconds
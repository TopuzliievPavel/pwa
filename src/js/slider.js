const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');
const opacity = 0.6;

imgs.forEach(img => img.addEventListener('click', imgClick));

function imgClick(e) {
  imgs.forEach(img => (img.style.opacity = 1));

  current.classList.add('fade-in');
  setTimeout(() => {
    current.classList.remove('fade-in');
  }, 500);

  current.src = e.target.src;

  e.target.style.opacity = opacity;
}



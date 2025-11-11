// Mobile menu toggle
const burger = document.querySelector('.burger');
const mobileNav = document.getElementById('mobile-menu');
if (burger && mobileNav){
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
    burger.setAttribute('aria-expanded', (!expanded).toString());
    mobileNav.hidden = expanded;
  });
}

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
},{ threshold: 0.12 });

document.querySelectorAll('.section, .card, .headline, .lead, .photo-frame').forEach(el=>{
  el.classList.add('reveal'); observer.observe(el);
});

// Dynamic year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();


// Light parallax for hero accent
(function(){
  const root = document.documentElement;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || 0;
    root.style.setProperty('--parallaxY', Math.min(30, y * 0.06) + 'px');
  }, { passive:true });
})();

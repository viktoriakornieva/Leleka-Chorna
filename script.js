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


// Enhanced contact form handler
(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const statusEl = document.getElementById('form-status');
  const endpoint = form.getAttribute('action') || '';
  function setStatus(msg, ok){
    if(!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + (ok ? 'ok' : 'err');
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(endpoint.includes('REPLACE_ME')){
      setStatus('Потрібно додати адресу обробника форми (ендпоінт). Зараз заявка не може бути надіслана.', false);
      return;
    }
    const data = new FormData(form);
    try{
      const res = await fetch(endpoint, {
        method: form.method || 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if(res.ok){
        setStatus('Дякуємо! Я з Вами зв’яжусь у Telegram або телефоном.', true);
        form.reset();
      }else{
        const txt = await res.text();
        setStatus('Не вдалося надіслати форму. Спробуйте написати у Telegram.', false);
        console.error('Form error', txt);
      }
    }catch(err){
      setStatus('Сталася помилка мережі. Напишіть у Telegram.', false);
      console.error(err);
    }
  });
})();


// === Contact form handler with pluggable endpoint (Formspree or similar) ===
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const EP = form.getAttribute('data-endpoint'); // e.g., https://formspree.io/f/xxxx
  const status = document.createElement('div');
  status.className = 'form-status';
  status.style.marginTop = '10px';
  form.appendChild(status);

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = 'Надсилаю...';
    const data = new FormData(form);

    if(!EP){
      status.textContent = 'Форма тимчасово недоступна. Напишіть у Telegram: @leleka_chorna';
      window.open('https://t.me/leleka_chorna', '_blank');
      return;
    }

    try{
      const res = await fetch(EP, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if(res.ok){
        status.textContent = 'Дякую! Я відповім у Telegram.';
        form.reset();
      }else{
        status.textContent = 'Не вдалося надіслати. Напишіть у Telegram: @leleka_chorna';
        window.open('https://t.me/leleka_chorna', '_blank');
      }
    }catch(err){
      status.textContent = 'Сталася помилка. Напишіть у Telegram: @leleka_chorna';
      window.open('https://t.me/leleka_chorna', '_blank');
    }
  });
})();

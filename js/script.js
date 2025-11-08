// main.js — small UX: mobile menu, smooth scroll, CTA, contact form handling

document.addEventListener('DOMContentLoaded', () => {
  // year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // mobile nav toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle && menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          window.scrollTo({
            top: target.offsetTop - 72,
            behavior: 'smooth'
          });
        }
        // close mobile nav if open
        if(mainNav && mainNav.classList.contains('open')) mainNav.classList.remove('open');
      }
    });
  });

  // clickable book-cards (open data-href in new tab)
  document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.href;
      if(url) window.open(url, '_blank');
    });
  });

  // Contact form submit (no backend) - opens mailto
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const name = encodeURIComponent(form.name.value || '');
      const email = encodeURIComponent(form.email.value || '');
      const message = encodeURIComponent(form.message.value || '');
      const subject = encodeURIComponent('Joining / Message from Lets Grow Together');
      // create a mailto link
      const mailto = `mailto:lets.grow.together@example.com?subject=${subject}&body=Name:%20${name}%0AEmail:%20${email}%0A%0A${message}`;
      window.location.href = mailto;
    });

    // reset button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn && resetBtn.addEventListener('click', () => contactForm.reset());
  }

  // small animate-on-scroll: fade-in for sections
  const faders = document.querySelectorAll('.about-text, .feature-card, .book-card, .join-media, .about-media img');
  const appearOptions = { threshold: 0.12, rootMargin: "0px 0px -60px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('inview');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(el => appearOnScroll.observe(el));
});

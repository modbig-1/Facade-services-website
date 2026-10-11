// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
}

// Header shadow on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Simple form handling (demo – replace with real backend)
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    
    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    // In production: send to your backend / email service / WhatsApp API
    // For now we show a friendly confirmation and open WhatsApp with pre-filled message
    const service = form.service.value || 'Window Cleaning';
    const message = form.message.value.trim();
    const email = form.email.value.trim();

    let text = `Hello Facade Services Ltd,%0A%0AI would like a free quote.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}`;
    if (email) text += `%0AEmail: ${encodeURIComponent(email)}`;
    if (service) text += `%0AService: ${encodeURIComponent(service)}`;
    if (message) text += `%0ADetails: ${encodeURIComponent(message)}`;

    // Open WhatsApp (Kenya country code 254)
    const whatsappUrl = `https://wa.me/254721991806?text=${text}`;
    
    // Show confirmation then redirect
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Opening WhatsApp…';
    btn.disabled = true;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      btn.textContent = originalText;
      btn.disabled = false;
      form.reset();
    }, 600);
  });
}

// Smooth active nav highlight (optional)
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.style.color = 'var(--navy)';
      } else {
        link.style.color = '';
      }
    }
  });
});

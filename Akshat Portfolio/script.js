// Theme toggle with localStorage persistence
(function initTheme() {
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') body.classList.add('light');
  updateToggleIcon();
  toggle?.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
    updateToggleIcon();
  });

  function updateToggleIcon() {
    const isLight = document.body.classList.contains('light');
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    toggleBtn.textContent = isLight ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }
})();

// Mobile nav toggle
(function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.style.display = expanded ? 'none' : 'block';
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-link').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        links.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// Smooth scroll for anchor links
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', targetId);
    });
  });
})();

// IntersectionObserver animation on scroll
(function initRevealOnScroll() {
  const items = document.querySelectorAll('.section-observe');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 }
  );
  items.forEach((el) => observer.observe(el));
})();

// Active nav link highlight on scroll
(function initActiveNav() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function setActive(hash) {
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === hash));
  }

  const onScroll = () => {
    const scrollPos = window.scrollY + 120; // header offset
    let current = '#home';
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) current = `#${section.id}`;
    }
    setActive(current);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Project modal
(function initProjectModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  const title = document.getElementById('modalTitle');
  const tech = document.getElementById('modalTech');
  const body = document.getElementById('modalBody');
  const link = document.getElementById('modalLink');

  function openModal(data) {
    title.textContent = data.title || '';
    tech.textContent = data.tech || '';
    body.textContent = data.body || '';
    link.href = data.link || '#';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card .read-more').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.project-card');
      if (!card) return;
      openModal({
        title: card.getAttribute('data-modal-title'),
        tech: card.getAttribute('data-modal-tech'),
        body: card.getAttribute('data-modal-body'),
        link: card.getAttribute('data-modal-link'),
      });
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();

// Contact form -> mailto link builder
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');
    const name = nameEl && 'value' in nameEl ? String(nameEl.value).trim() : '';
    const email = emailEl && 'value' in emailEl ? String(emailEl.value).trim() : '';
    const message = messageEl && 'value' in messageEl ? String(messageEl.value).trim() : '';
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:akshatgupta0105@gmail.com?subject=${subject}&body=${body}`;
  });
})();

// Footer year
document.getElementById('year').textContent = String(new Date().getFullYear());



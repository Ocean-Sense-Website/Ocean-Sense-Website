/* =========================================================
   OceanSense — main.js
   ========================================================= */

// ---- NAVBAR: scroll effect + mobile toggle ----
const navbar  = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translateY(7px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translateY(-7px)')
      : (spans[0].style.transform = '',
         spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });
  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });
}

// ---- PARTICLE ANIMATION (hero only) ----
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#0ea5e9','#06b6d4','#14b8a6','#38bdf8'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*12+8}s;
      animation-delay:-${Math.random()*12}s;
    `;
    container.appendChild(p);
  }
}
initParticles();

// ---- SCROLL REVEAL ----
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}
initReveal();

// ---- COUNTER ANIMATION (hero stats) ----
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = el.textContent.trim();
    const numMatch = target.match(/\d+/);
    if (!numMatch) return;
    const end = parseInt(numMatch[0]);
    const suffix = target.replace(numMatch[0], '');
    let start = 0;
    const step = end / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { el.textContent = end + suffix; clearInterval(timer); }
      else el.textContent = Math.floor(start) + suffix;
    }, 30);
  });
}
window.addEventListener('load', animateCounters);

// ---- SMOOTH ACTIVE STATE on scroll (single page sections) ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(sec.id)) a.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---- PROGRESS BAR ANIMATION (milestones) ----
const progressBar = document.querySelector('[style*="width:48%"]');
if (progressBar) {
  setTimeout(() => { progressBar.style.width = '48%'; }, 500);
}

// ---- GLASS CARD tilt effect ----
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 4;
    const rotateY = (x / rect.width) * 4;
    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- DOCUMENTS: view and download functionality ----
document.querySelectorAll('.doc-item').forEach(item => {
  const fileUrl = item.getAttribute('data-file');
  const viewBtn = item.querySelector('.btn-view');
  const downloadBtn = item.querySelector('.btn-download');
  
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(fileUrl, '_blank');
    });
  }
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const fileName = fileUrl.split('/').pop();
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});

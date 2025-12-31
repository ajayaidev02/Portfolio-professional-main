/* ============================================
   RESPONSIVE PORTFOLIO JAVASCRIPT
   ============================================ */

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('nav-list');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav') && navList.classList.contains('active')) {
    navList.classList.remove('active');
  }
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// SCROLL ANIMATIONS (GSAP Integration)
// ============================================

// Check if GSAP is loaded
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Animate section headers on scroll
  gsap.utils.toArray('.section-content h3').forEach(heading => {
    gsap.from(heading, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Animate projects on scroll
  gsap.utils.toArray('.project').forEach(project => {
    gsap.from(project, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      scrollTrigger: {
        trigger: project,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Animate skills on scroll
  gsap.utils.toArray('.skill').forEach((skill, index) => {
    gsap.from(skill, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: skill.parentElement,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Animate About cards on scroll with staggered timing
  gsap.utils.toArray('.about-card').forEach((card, index) => {
    const delay = parseFloat(card.getAttribute('data-delay')) || index;
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: delay * 0.15,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// ============================================
// ACTIVE NAVIGATION INDICATOR
// ============================================

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ============================================
// RESPONSIVE HEIGHT FIX
// ============================================

function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVh();
window.addEventListener('resize', setVh);

// ============================================
// SKILL HOVER EFFECTS
// ============================================

const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
  skill.addEventListener('mouseenter', function() {
    this.style.zIndex = 10;
  });

  skill.addEventListener('mouseleave', function() {
    this.style.zIndex = 1;
  });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('.skill img').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// FORM SUBMISSION (For Contact Section)
// ============================================

const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form handling logic here
    console.log('Form submitted');
  });
}

// ============================================
// DARK MODE TOGGLE (Optional)
// ============================================

const darkModeToggle = localStorage.getItem('darkMode') === 'true';

if (darkModeToggle) {
  document.body.classList.add('dark-mode');
}

// Uncomment to enable dark mode toggle button
/*
const darkModeBtn = document.getElementById('darkModeToggle');
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}
*/

// Minimal-mode toggle: hide section content and show large label
const minimalToggle = document.getElementById('minimalToggle');
if (minimalToggle) {
  const applyMinimal = (enabled, save = true) => {
    document.body.classList.toggle('minimal-mode', enabled);
    minimalToggle.setAttribute('aria-pressed', enabled);
    if (save) localStorage.setItem('minimalMode', enabled ? 'true' : 'false');
  };

  const saved = localStorage.getItem('minimalMode') === 'true';
  applyMinimal(saved, false);

  minimalToggle.addEventListener('click', () => {
    applyMinimal(!document.body.classList.contains('minimal-mode'));
  });

  // provide keyboard access (Enter/Space)
  minimalToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      minimalToggle.click();
    }
  });
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-left', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2
    });

    gsap.from('.hero-right', {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 0.4
    });
  }
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cWelcome to Ajay\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cMade with ❤️ using HTML, CSS & JavaScript', 'font-size: 12px; color: #64748b;');

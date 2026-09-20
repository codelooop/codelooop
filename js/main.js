// ============================================================
// CodeLoop — Main JS (GSAP Animations & Preloader)
// ============================================================

// ── Preloader Logic ──
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const preloaderPerc = document.getElementById('preloader-percentage');
  const preloaderBar = document.getElementById('preloader-bar');

  if (preloader && preloaderPerc && preloaderBar) {
    let progress = 0;
    let hasLoaded = false;
    
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', () => {
      hasLoaded = true;
    });

    const startTime = Date.now();
    const minLoadTime = 1500; // Force preloader to show for at least 1.5s so the logo animation is visible
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // If window loaded AND minimum time has passed, jump to 100
      if (hasLoaded && elapsed > minLoadTime) {
        progress += 15;
      } else {
        // Otherwise, smoothly simulate up to 90% and wait there
        if (progress < 90) {
          progress += Math.floor(Math.random() * 5) + 1;
        }
      }

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        preloaderPerc.textContent = `${progress}%`;
        preloaderBar.style.width = `${progress}%`;
        
        // Hide preloader after a tiny pause at 100%
        setTimeout(() => {
          preloader.classList.add('preloader--hidden');
          document.body.style.overflow = '';
        }, 300);
      } else {
        preloaderPerc.textContent = `${progress}%`;
        preloaderBar.style.width = `${progress}%`;
      }
    }, 40);
  }
})();

// ── Register GSAP Plugins ──
gsap.registerPlugin(ScrollTrigger);

// ── Check for Reduced Motion Preference & Mobile Viewport ──
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// On mobile (<= 768px) we disable all scroll-triggered animations entirely.
// GSAP's ScrollTrigger thresholds are calibrated for desktop viewport heights;
// on mobile they often never fire, leaving elements permanently at opacity:0.
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const shouldDisableMotion = prefersReducedMotion || isMobile;

// ── Initialize Lenis Smooth Scroll ──
let lenis;
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;
  if (isMobile) return; // native scroll on mobile; Lenis can interfere with touch

  lenis = new Lenis({
    duration: 1.8,
    wheelMultiplier: 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

// ── Hero Section Animations ──
function initHeroAnimation() {
  if (shouldDisableMotion) {
    document.querySelectorAll('.hero-char, .hero-subtitle-word').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const tl = gsap.timeline({ delay: 0.2 });

  // Badge fade in
  tl.from('.hero__badge', {
    opacity: 0,
    y: 20,
    duration: 0.35,
    ease: 'power2.out'
  });

  // Split hero title into characters
  const titleEl = document.querySelector('.hero__title');
  if (titleEl) {
    const words = titleEl.querySelectorAll('.word');
    words.forEach(word => {
      const text = word.textContent;
      word.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        word.appendChild(span);
      });
    });

    tl.from('.hero__title .char', {
      opacity: 0,
      y: 60,
      rotationX: -45,
      stagger: 0.025,
      duration: 0.4,
      ease: 'power3.out',
    }, '-=0.2');
  }

  // Subtitle words
  tl.from('.hero-subtitle-word', {
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 0.35,
    ease: 'power2.out',
  }, '-=0.4');

  // CTA buttons
  tl.from('.hero__cta-group .btn', {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.35,
    ease: 'power2.out',
  }, '-=0.3');

  // Stats
  tl.from('.hero__stat-item', {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.35,
    ease: 'power2.out',
  }, '-=0.2');

  // Scroll indicator
  tl.from('.hero__scroll-indicator', {
    opacity: 0,
    duration: 0.35,
    ease: 'power2.out',
  }, '-=0.1');

  // Counter animation for stats
  initCounters();
}

// ── Animated Counters ──
function initCounters() {
  const counters = document.querySelectorAll('.hero__stat-number[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';

    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      delay: 1,
      ease: 'power2.out',
      onUpdate: function() {
        counter.textContent = Math.round(this.targets()[0].val) + suffix;
      }
    });
  });
}

// ── Section Scroll Reveals ──
function initScrollReveal() {
  if (shouldDisableMotion) return;

  // Generic fade-up elements
  gsap.utils.toArray('.gsap-fade-up').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      y: 40,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  // Generic fade-in
  gsap.utils.toArray('.gsap-fade-in').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  // Fade from left
  gsap.utils.toArray('.gsap-fade-left').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: -40,
      duration: 0.45,
      ease: 'power2.out',
    });
  });

  // Fade from right
  gsap.utils.toArray('.gsap-fade-right').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: 40,
      duration: 0.45,
      ease: 'power2.out',
    });
  });

  // Scale up
  gsap.utils.toArray('.gsap-scale-up').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: 'back.out(1.4)',
    });
  });

  // Trust bar
  gsap.from('.trust-bar', {
    scrollTrigger: {
      trigger: '.trust-bar',
      start: 'top 90%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
  });

  // Section headings with label
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: -20,
      duration: 0.35,
      ease: 'power2.out',
    });
  });
}

// ── Service Cards Stagger ──
function initServiceCards() {
  if (shouldDisableMotion) return;

  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services__grid',
      start: 'top 80%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.4,
    ease: 'power2.out',
  });
}

// ── Portfolio Cards Stagger ──
function initPortfolioCards() {
  if (shouldDisableMotion) return;

  gsap.from('.portfolio-card', {
    scrollTrigger: {
      trigger: '.portfolio__grid',
      start: 'top 80%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    y: 40,
    scale: 0.96,
    stagger: 0.08,
    duration: 0.4,
    ease: 'power2.out',
  });
}

// ── Process Timeline Animation ──
function initProcessTimeline() {
  const steps = document.querySelectorAll('.process__step');
  const fill = document.querySelector('.process__line-fill');

  if (shouldDisableMotion) {
    steps.forEach(s => s.classList.add('animate'));
    if (fill) fill.style.width = '100%';
    return;
  }

  if (!fill || steps.length === 0) return;

  // Initial fade up of the steps
  gsap.from(steps, {
    scrollTrigger: {
      trigger: '.process__timeline',
      start: 'top 85%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.4,
    ease: 'power2.out',
  });

  // Automated timeline for connecting line and icons
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.process__timeline',
      start: 'top 75%',
      toggleActions: 'play reverse play reverse'
    }
  });

  // Animate the line filling up
  tl.to(fill, { width: '100%', duration: 2.5, ease: 'power1.inOut' }, 0);

  // Stagger the icons lighting up as the line hits them
  const totalSteps = steps.length;
  steps.forEach((step, index) => {
    // Calculate roughly when the line reaches this step (based on 2.5s total duration)
    const delay = (index / (totalSteps - 1)) * 2.5;
    
    // Create a tiny tween to trigger the class add/remove on forward/reverse playback
    tl.to(step, {
      duration: 0.01,
      onStart: () => step.classList.add('animate'),
      onReverseComplete: () => step.classList.remove('animate')
    }, delay);
  });
}

// ── About Section Parallax ──
function initAboutParallax() {
  if (shouldDisableMotion) return;

  gsap.to('.about__visual', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    y: -40,
    ease: 'none',
  });

  // Tech badges stagger
  gsap.from('.tech-badge', {
    scrollTrigger: {
      trigger: '.about__tech-grid',
      start: 'top 85%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    y: 20,
    scale: 0.9,
    stagger: 0.06,
    duration: 0.45,
    ease: 'back.out(1.6)',
  });
}

// ── Testimonials ──
function initTestimonials() {
  if (shouldDisableMotion) return;

  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonials__carousel',
      start: 'top 80%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    y: 40,
    stagger: 0.12,
    duration: 0.4,
    ease: 'power2.out',
  });
}

// ── Contact Section ──
function initContactSection() {
  if (shouldDisableMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 78%',
      toggleActions: 'play reverse play reverse',
    }
  });

  tl.from('.contact__inner > *', {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.45,
    ease: 'power2.out',
  });

  // Animated gradient bg shift on scroll
  gsap.to('.contact', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    backgroundPosition: '100% 50%',
    ease: 'none',
  });
}

// ── Footer ──
function initFooter() {
  if (shouldDisableMotion) return;

  gsap.from('.footer__inner > *', {
    scrollTrigger: {
      trigger: '.footer__inner',
      start: 'top 88%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.35,
    ease: 'power2.out',
  });
}

// ── Cursor Glow / Custom Blob Cursor ──
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

  const glow = document.querySelector('.cursor-glow');
  const blob = document.querySelector('.cursor-blob');
  if (!glow || !blob) return;

  // Track cursor instantly
  document.addEventListener('mousemove', (e) => {
    gsap.to(glow, {
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.1, // slight smoothing
      ease: 'power2.out',
    });
  });

  // Reliable GSAP rotation
  const spinTween = gsap.to(blob, {
    rotation: 360,
    duration: 5,
    repeat: -1,
    ease: 'none'
  });

  // Stop rotation on hover over clickable elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .portfolio-card, .service-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      spinTween.pause();
      gsap.to(blob, { scale: 0.6, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      spinTween.play();
      gsap.to(blob, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });
}

// ── Button Micro-interactions ──
function initButtonMicroInteractions() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (shouldDisableMotion) return;
      gsap.to(btn, { scale: 1.04, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      if (shouldDisableMotion) return;
      gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, { scale: 0.97, duration: 0.1, ease: 'power2.out' });
    });
    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { scale: 1.04, duration: 0.1, ease: 'power2.out' });
    });
  });
}

// ── Service Card Micro-interactions ──
function initCardMicroInteractions() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (shouldDisableMotion) return;
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      if (shouldDisableMotion) return;
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

// ── Infinity Logo Pulse ──
function initInfinityPulse() {
  if (shouldDisableMotion) return;
  const inf = document.querySelector('.hero__bg-infinity');
  if (!inf) return;

  gsap.to(inf, {
    opacity: 0.07,
    duration: 4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

// ── Anchor Smooth Scroll ──
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));

      if (lenis) {
        lenis.scrollTo(target, { offset: -navHeight, duration: 1.2 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      // Close mobile menu
      document.querySelector('.navbar__mobile')?.classList.remove('open');
      document.querySelector('.navbar__hamburger')?.classList.remove('open');
      document.querySelector('.mobile-overlay')?.classList.remove('active');
    });
  });
}

// ── Subtitle Word Wrapping (for GSAP) ──
function wrapSubtitleWords() {
  const subtitle = document.querySelector('.hero__subtitle');
  if (!subtitle) return;

  const text = subtitle.textContent;
  subtitle.innerHTML = text.split(' ').map(word =>
    `<span class="hero-subtitle-word">${word}</span>`
  ).join(' ');
}

// ── Background Doodles (Flow Field Style) ──
function initDoodles() {
  const container = document.getElementById('doodle-container');
  if (!container) return;
  
  container.innerHTML = '';

  const numDoodles = 100;
  const sizes = [20, 30, 40, 50, 70]; 
  const particles = [];
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let isMouseMoving = false;
  let mouseTimeout;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => { isMouseMoving = false; }, 2000);
  });

  for (let i = 0; i < numDoodles; i++) {
    const doodle = document.createElement('div');
    doodle.classList.add('doodle');
    
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    doodle.style.width = size + 'px';
    doodle.style.height = (size * 0.33) + 'px'; 

    doodle.style.left = '0';
    doodle.style.top = '0';
    doodle.style.opacity = 0.05 + Math.random() * 0.15; // slightly more visible

    container.appendChild(doodle);

    particles.push({
      el: doodle,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      rot: 0, // Will be calculated based on velocity
      size: size
    });
  }

  function render() {
    for (let i = 0; i < numDoodles; i++) {
      const p = particles[i];
      
      // Wrap around edges to make it feel infinite
      if (p.x < -p.size) p.x = window.innerWidth + p.size;
      else if (p.x > window.innerWidth + p.size) p.x = -p.size;
      
      if (p.y < -p.size) p.y = window.innerHeight + p.size;
      else if (p.y > window.innerHeight + p.size) p.y = -p.size;

      // Flow field / Mouse attraction
      if (isMouseMoving) {
        const dx = mouseX - (p.x + p.size/2);
        const dy = mouseY - (p.y + p.size*0.165);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Follow cursor smoothly if within range
        if (dist < 600 && dist > 20) {
          const force = (600 - dist) / 600; 
          // Add velocity towards mouse, but also a bit of swirl (cross product)
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
          
          // Slight orbital swirl
          p.vx += (dy / dist) * force * 0.05;
          p.vy -= (dx / dist) * force * 0.05;
        }
      }

      // Add slight constant flow (wind) to keep them moving
      p.vx += 0.02; // drifting right
      p.vy -= 0.01; // drifting slightly up

      // Max velocity limit
      const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      const maxSpeed = 3 + (p.size * 0.02); // bigger ones move slightly differently
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }
      
      // Calculate rotation based on velocity direction
      const targetRot = Math.atan2(p.vy, p.vx) * (180 / Math.PI);
      
      // Smooth rotation interpolation (avoiding the 360 wrap glitch)
      let rotDiff = targetRot - p.rot;
      if (rotDiff > 180) rotDiff -= 360;
      if (rotDiff < -180) rotDiff += 360;
      p.rot += rotDiff * 0.1; // Lerp rotation

      p.x += p.vx;
      p.y += p.vy;

      // Hardware accelerated transform
      p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
    }
    requestAnimationFrame(render);
  }
  
  // Start loop
  requestAnimationFrame(render);
}

// ── Init All ──
document.addEventListener('DOMContentLoaded', () => {
  wrapSubtitleWords();
  initSmoothScroll();
  initHeroAnimation();
  initScrollReveal();
  initServiceCards();
  initPortfolioCards();
  initProcessTimeline();
  initAboutParallax();
  initTestimonials();
  initContactSection();
  initFooter();
  initCursorGlow();
  initButtonMicroInteractions();
  initCardMicroInteractions();
  initInfinityPulse();
  initAnchorScroll();
  initDoodles();
});

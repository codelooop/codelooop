// ── Feedback Modal & Storage Logic ──

document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('feedback-inline');
  const openBtn = document.getElementById('open-feedback-btn');
  const form = document.getElementById('feedback-form');
  const ratingContainer = document.getElementById('feedback-rating');
  const stars = ratingContainer ? ratingContainer.querySelectorAll('.star') : [];
  const ratingError = document.getElementById('rating-error');
  const track = document.querySelector('.testimonials__track');

  let currentRating = 0;
  
  // Storage Key
  const STORAGE_KEY = 'codeloop_reviews';

  // --- Inline Form Logic ---
  const toggleForm = () => {
    if (!formContainer) return;
    if (formContainer.style.display === 'none') {
      formContainer.style.display = 'block';
      gsap.from(formContainer, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.out' });
      openBtn.innerHTML = '<span data-i18n="testimonials.cancelReview">Cancel Review</span>';
    } else {
      formContainer.style.display = 'none';
      openBtn.innerHTML = '<span data-i18n="testimonials.leaveReview">Leave a Review</span>';
      form.reset();
      setRating(0);
      ratingError.style.display = 'none';
    }
  };

  const closeForm = () => {
    if (!formContainer) return;
    formContainer.style.display = 'none';
    openBtn.innerHTML = '<span data-i18n="testimonials.leaveReview">Leave a Review</span>';
    form.reset();
    setRating(0);
    ratingError.style.display = 'none';
  };

  if (openBtn) openBtn.addEventListener('click', toggleForm);

  // --- Star Rating Logic ---
  const setRating = (rating) => {
    currentRating = rating;
    ratingContainer.setAttribute('data-rating', rating);
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  };

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      setRating(val);
      ratingError.style.display = 'none';
    });
    
    // Hover effects
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      stars.forEach((s, index) => {
        if (index < val) s.style.color = 'var(--clr-coral)';
        else s.style.color = '';
      });
    });
    
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.style.color = '');
    });
  });

  // --- Storage & Rendering Logic ---
  
  const generateStarsHTML = (rating) => {
    let html = '<div class="testimonial-stars">';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        html += '<span class="star filled">★</span>';
      } else {
        html += '<span class="star empty">★</span>';
      }
    }
    html += '</div>';
    return html;
  };

  const loadReviews = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveReview = (review) => {
    const reviews = loadReviews();
    reviews.push(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  };

  const renderReviews = () => {
    const reviews = loadReviews();
    if (reviews.length === 0 || !track) return;
    
    // Remove placeholders
    const placeholders = track.querySelectorAll('.testimonial-card--empty');
    placeholders.forEach(p => p.remove());
    
    // Clear track if we want to replace, but carousel might have cloned nodes.
    // It's safer to reconstruct the track.
    track.innerHTML = '';
    
    reviews.forEach(review => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.setAttribute('role', 'listitem');
      
      card.innerHTML = `
        <div class="testimonial-card__header">
          ${generateStarsHTML(review.rating)}
        </div>
        <p class="testimonial-card__text">"${review.text}"</p>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">
            ${review.name.charAt(0).toUpperCase()}
          </div>
          <div class="testimonial-card__info">
            <h4>${review.name}</h4>
            <p>${review.role}</p>
          </div>
        </div>
      `;
      track.appendChild(card);
    });
    
    // Re-initialize carousel if the global function exists
    if (typeof window.initCarousel === 'function') {
      window.initCarousel();
    }
  };

  // --- Form Submission ---
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (currentRating === 0) {
        ratingError.style.display = 'block';
        return;
      }
      
      const name = document.getElementById('feedback-name').value.trim();
      const role = document.getElementById('feedback-role').value.trim();
      const text = document.getElementById('feedback-text').value.trim();
      
      const newReview = {
        id: Date.now().toString(),
        name,
        role,
        rating: currentRating,
        text,
        date: new Date().toISOString()
      };
      
      saveReview(newReview);
      closeForm();
      
      // Re-render and re-init carousel
      renderReviews();
      
      // Show simple success toast
      alert('Thank you! Your feedback has been posted.');
    });
  }

  // Initial render
  renderReviews();
});

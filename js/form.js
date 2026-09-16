// ============================================================
// CodeLoop — Contact Form JS
// Validation, EmailJS/Formspree integration, success state
// ============================================================

(function () {
  'use strict';

  const formWrapper = document.getElementById('contact-form');
  const form = document.getElementById('contact-form-el');
  if (!form || !formWrapper) return;

  const submitBtn = form.querySelector('.form-submit');
  const formContent = formWrapper.querySelector('.form-content');
  const formSuccess = formWrapper.querySelector('.form-success');

  // ── Validation Rules ──
  const validators = {
    name: {
      validate: (v) => v.trim().length >= 2,
      message: 'Please enter your full name (at least 2 characters).'
    },
    email: {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Please enter a valid email address.'
    },
    service: {
      validate: (v) => v !== '' && v !== 'default',
      message: 'Please select a service type.'
    },
    message: {
      validate: (v) => v.trim().length >= 20,
      message: 'Please describe your project (at least 20 characters).'
    }
  };

  // ── Show / Hide Error ──
  function showError(group, message) {
    group.classList.add('has-error');
    const input = group.querySelector('.form-input, .form-select, .form-textarea');
    const errEl = group.querySelector('.form-error');
    if (input) input.classList.add('error');
    if (errEl) errEl.textContent = message;
  }

  function clearError(group) {
    group.classList.remove('has-error');
    const input = group.querySelector('.form-input, .form-select, .form-textarea');
    const errEl = group.querySelector('.form-error');
    if (input) input.classList.remove('error');
    if (errEl) errEl.textContent = '';
  }

  // ── Real-time Validation on Blur ──
  Object.keys(validators).forEach(fieldName => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (!input) return;

    input.addEventListener('blur', () => {
      const group = input.closest('.form-group');
      const rule = validators[fieldName];
      if (!rule.validate(input.value)) {
        showError(group, rule.message);
      } else {
        clearError(group);
      }
    });

    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group.classList.contains('has-error')) {
        const rule = validators[fieldName];
        if (rule.validate(input.value)) clearError(group);
      }
    });
  });

  // ── Submit Handler ──
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let hasErrors = false;
    Object.keys(validators).forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (!input) return;

      const group = input.closest('.form-group');
      const rule = validators[fieldName];

      if (!rule.validate(input.value)) {
        showError(group, rule.message);
        hasErrors = true;
      } else {
        clearError(group);
      }
    });

    if (hasErrors) {
      // Shake the form
      gsap.fromTo(form, 
        { x: -8 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
      return;
    }

    // Button loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending…</span> <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // ── Google Sheets via Apps Script ──
    // ⚠️ PLACEHOLDER: Replace with your Google Apps Script deployment URL
    const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL_HERE';

    const payload = {
      fullName: data.name || '',
      email:    data.email || '',
      service:  data.service || '',
      budget:   data.budget || '',
      details:  data.message || ''
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method:  'POST',
        body:    JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      showSuccess();
    } catch (err) {
      console.error('CodeLoop: Form submission error —', err);
      // Restore button so user can retry
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled  = false;
      // Show a non-intrusive inline error
      const existingErr = form.querySelector('.form-submit-error');
      if (!existingErr) {
        const errMsg = document.createElement('p');
        errMsg.className = 'form-submit-error';
        errMsg.style.cssText = 'color:#ff6b7a;font-size:0.8rem;margin-top:0.75rem;text-align:center;';
        errMsg.textContent = 'Something went wrong. Please try again or email us directly.';
        form.appendChild(errMsg);
      }
    }
  });

  function showSuccess() {
    // Animate form out, success in
    gsap.to(formContent, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        formWrapper.classList.add('submitted');
        formContent.style.display = 'none';
        formSuccess.style.display = 'flex';

        gsap.fromTo(formSuccess,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
        );
      }
    });
  }

})();

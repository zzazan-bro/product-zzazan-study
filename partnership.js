document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('partnership-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const charCountSpan = document.getElementById('current-chars');
  const messageTextarea = document.getElementById('message');
  const successCard = document.getElementById('success-message');
  const errorCard = document.getElementById('error-message');
  const resetBtn = document.getElementById('reset-btn');
  const retryBtn = document.getElementById('retry-btn');
  
  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.documentElement;

  // 1. Textarea Character Count
  messageTextarea.addEventListener('input', () => {
    const length = messageTextarea.value.length;
    charCountSpan.textContent = length;
    
    // Add visual cue if approaching limit
    if (length >= 1900) {
      charCountSpan.style.color = 'var(--error-color)';
    } else {
      charCountSpan.style.color = 'var(--text-muted)';
    }
  });

  // 2. Real-time Input Validation
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  
  inputs.forEach(input => {
    // Validate on blur or input changes
    ['blur', 'input', 'change'].forEach(eventType => {
      input.addEventListener(eventType, () => {
        validateField(input);
      });
    });
  });

  function validateField(input) {
    const formGroup = input.closest('.form-group');
    let isValid = true;

    // Check standard HTML5 validation
    if (!input.checkValidity()) {
      isValid = false;
    }

    // Specific validation checks
    if (input.type === 'email' && input.value.trim() !== '') {
      // Simple regex for email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isValid = false;
      }
    }

    if (input.type === 'tel' && input.value.trim() !== '') {
      // Simple phone number length or character checks
      const cleanPhone = input.value.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 9) {
        isValid = false;
      }
    }

    if (input.type === 'checkbox' && !input.checked) {
      isValid = false;
    }

    // Apply error classes
    if (!isValid) {
      formGroup.classList.add('has-error');
    } else {
      formGroup.classList.remove('has-error');
    }

    return isValid;
  }

  // 3. Form Submission Handling via AJAX (Formspree Fetch)
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Perform final check on all fields
    let formIsValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      // Scroll to the first error
      const firstError = form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Check if the Formspree endpoint is default placeholder
    const formAction = form.getAttribute('action');
    if (formAction.includes('YOUR_FORMSPREE_ID')) {
      showErrorState('Formspree ID가 아직 설정되지 않았습니다. partnership.html 파일의 form action URL에 발급받으신 Formspree ID를 입력해 주세요.');
      return;
    }

    // Set Loading State on Button
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    btnText.textContent = '제출하는 중...';

    // Prepare FormData
    const formData = new FormData(form);

    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        form.style.display = 'none';
        successCard.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Response not OK (e.g. invalid form id, limit reached, spam trigger)
        const errorData = await response.json();
        const errorMsg = errorData.error || '접수 서버 응답 에러';
        showErrorState(errorMsg);
      }
    } catch (error) {
      // Network / Fetch error
      showErrorState('네트워크 상태를 확인하고 잠시 후 다시 시도해 주세요.');
    } finally {
      // Reset button states
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      btnText.textContent = '제안서 제출하기';
    }
  });

  function showErrorState(messageText) {
    form.style.display = 'none';
    errorCard.style.display = 'block';
    
    if (messageText) {
      errorCard.querySelector('p').textContent = messageText;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 4. Reset & Retry Handlers
  resetBtn.addEventListener('click', () => {
    form.reset();
    charCountSpan.textContent = '0';
    inputs.forEach(input => {
      input.closest('.form-group').classList.remove('has-error');
    });
    
    successCard.style.display = 'none';
    form.style.display = 'grid';
  });

  retryBtn.addEventListener('click', () => {
    errorCard.style.display = 'none';
    form.style.display = 'grid';
  });

  // 5. Theme Toggle Logic
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', currentTheme);
  updateThemeButton(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const targetTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateThemeButton(targetTheme);
  });

  function updateThemeButton(theme) {
    if (theme === 'dark') {
      themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
      themeToggleBtn.textContent = '🌙 Dark Mode';
    }
  }
});

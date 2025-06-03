document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.form-step');
  const progressBar = document.getElementById('progressBar');
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const form = document.getElementById('contactForm');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const charCount = document.getElementById('charCount');
  const successMessage = document.getElementById('successMessage');
  const completeMessage = document.getElementById('completeMessage');
  const loading = document.getElementById('loading');
  const themeToggle = document.getElementById('themeToggle');
  const backToTop = document.getElementById('backToTop');

  let currentStep = 0;

  function updateStepUI(index) {
    steps.forEach((step, i) => step.classList.toggle('active', i === index));
    stepIndicators.forEach((dot, i) => dot.classList.toggle('active', i <= index));
    progressBar.style.width = `${(index) / (steps.length - 1) * 100}%`;
    currentStep = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateStep(stepIndex) {
    if (stepIndex === 0 && name.value.trim() === '') {
      nameError.textContent = 'Name is required.';
      return false;
    } else if (stepIndex === 1 && !/^\S+@\S+\.\S+$/.test(email.value)) {
      emailError.textContent = 'Please enter a valid email.';
      return false;
    }
    nameError.textContent = '';
    emailError.textContent = '';
    return true;
  }

  document.getElementById('next1').addEventListener('click', () => {
    if (validateStep(0)) updateStepUI(1);
  });

  document.getElementById('next2').addEventListener('click', () => {
    if (validateStep(1)) updateStepUI(2);
  });

  document.getElementById('prev1').addEventListener('click', () => updateStepUI(0));
  document.getElementById('prev2').addEventListener('click', () => updateStepUI(1));

  message.addEventListener('input', () => {
    charCount.textContent = `${message.value.length} / 300`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (message.value.trim() === '') {
      messageError.textContent = 'Message is required.';
      return;
    }
    messageError.textContent = '';
    loading.classList.remove('hidden');

    setTimeout(() => {
      loading.classList.add('hidden');
      successMessage.textContent = "✅ Message sent successfully!";
      completeMessage.textContent = "We’ll get back to you soon.";
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      form.reset();
      charCount.textContent = '0 / 300';
      updateStepUI(0);
    }, 1500);
  });

 
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '🌞';
    themeToggle.classList.add('pulse');
    setTimeout(() => themeToggle.classList.remove('pulse'), 400);
  });


  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  updateStepUI(0);
});

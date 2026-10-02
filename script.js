// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Highlight current page in nav
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar a').forEach((a) => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
    }
  });

  // Order buttons feedback (no backend — demo only)
  document.querySelectorAll('.order-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const itemName = btn.closest('.card')?.querySelector('h3')?.textContent?.trim() || 'الطلب';
      showToast(`تم إضافة "${itemName}" — للطلب الفعلي تواصل معنا عبر صفحة التواصل`);
    });
  });

  // Contact form validation (front-end only demo)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = form.querySelector('#name');
      const contactInput = form.querySelector('#contact-input');
      const message = form.querySelector('#message');
      const nameError = form.querySelector('#name-error');
      const contactError = form.querySelector('#contact-error');
      const messageError = form.querySelector('#message-error');
      const success = form.querySelector('.form-success');

      if (!name.value.trim()) {
        nameError.textContent = 'من فضلك أدخل اسمك';
        valid = false;
      } else {
        nameError.textContent = '';
      }

      const value = contactInput.value.trim();
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhone = /^0\d{9,10}$/.test(value.replace(/\s/g, ''));
      if (!value) {
        contactError.textContent = 'من فضلك أدخل بريدك الإلكتروني أو رقم هاتفك';
        valid = false;
      } else if (!isEmail && !isPhone) {
        contactError.textContent = 'من فضلك تأكد من صحة البريد الإلكتروني أو رقم الهاتف';
        valid = false;
      } else {
        contactError.textContent = '';
      }

      if (!message.value.trim()) {
        messageError.textContent = 'من فضلك اكتب رسالتك';
        valid = false;
      } else {
        messageError.textContent = '';
      }

      if (valid) {
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 5000);
      }
    });
  }
});

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

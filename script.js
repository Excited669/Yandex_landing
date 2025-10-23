const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const scrollLinks = document.querySelectorAll('[data-scroll]');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('is-open');
  });
}

scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    if (!targetId) return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (navMenu.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const ordersInput = document.querySelector('#orders');
const rateInput = document.querySelector('#rate');
const daysInput = document.querySelector('#days');
const bonusInput = document.querySelector('#bonus');
const weeklyIncomeField = document.querySelector('#weekly-income');
const monthlyIncomeField = document.querySelector('#monthly-income');

const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
};

const recalculateIncome = () => {
  const orders = Number(ordersInput?.value) || 0;
  const rate = Number(rateInput?.value) || 0;
  const days = Number(daysInput?.value) || 0;
  const bonus = Number(bonusInput?.value) || 0;

  const weeklyIncome = orders * rate * days + bonus;
  const monthlyIncome = weeklyIncome * 4;

  if (weeklyIncomeField) {
    weeklyIncomeField.textContent = `${formatCurrency(weeklyIncome)} в неделю`;
  }

  if (monthlyIncomeField) {
    monthlyIncomeField.textContent = `${formatCurrency(monthlyIncome)} в месяц`;
  }
};

[ordersInput, rateInput, daysInput, bonusInput].forEach((input) => {
  input?.addEventListener('input', recalculateIncome);
});

recalculateIncome();

const applyForm = document.querySelector('.apply__form');

applyForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(applyForm);
  const name = formData.get('name');

  alert(`Спасибо, ${name || 'курьер'}! Мы свяжемся с вами в ближайшее время.`);
  applyForm.reset();
  recalculateIncome();
});

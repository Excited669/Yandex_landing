const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const scrollLinks = document.querySelectorAll('[data-scroll]');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('is-open');
  });
}

scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (navMenu?.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const earningsTabs = document.querySelectorAll('.earnings__tab');
const earningsFields = {
  shift: document.querySelector('[data-earnings-field="shift"]'),
  orders: document.querySelector('[data-earnings-field="orders"]'),
  orderPrice: document.querySelector('[data-earnings-field="orderPrice"]'),
  bonus: document.querySelector('[data-earnings-field="bonus"]'),
  month: document.querySelector('[data-earnings-field="month"]'),
};

const earningsData = {
  foot: {
    shift: 3200,
    orders: '12–16 заказов',
    orderPrice: 210,
    bonus: 'до 1 500 ₽ в неделю',
    month: 78000,
  },
  bike: {
    shift: 4600,
    orders: '16–22 заказа',
    orderPrice: 240,
    bonus: 'до 2 000 ₽ в неделю',
    month: 98000,
  },
  car: {
    shift: 6000,
    orders: '18–26 заказов',
    orderPrice: 280,
    bonus: 'до 3 500 ₽ в неделю',
    month: 128000,
  },
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);

const updateEarnings = (transport) => {
  const data = earningsData[transport];
  if (!data) return;

  if (earningsFields.shift) {
    earningsFields.shift.textContent = formatCurrency(data.shift);
  }
  if (earningsFields.orders) {
    earningsFields.orders.textContent = data.orders;
  }
  if (earningsFields.orderPrice) {
    earningsFields.orderPrice.textContent = `${formatCurrency(data.orderPrice)} за заказ`;
  }
  if (earningsFields.bonus) {
    earningsFields.bonus.textContent = data.bonus;
  }
  if (earningsFields.month) {
    earningsFields.month.textContent = formatCurrency(data.month);
  }
};

earningsTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const transport = tab.dataset.transport;
    if (!transport) return;

    earningsTabs.forEach((item) => {
      item.classList.toggle('is-active', item === tab);
      item.setAttribute('aria-selected', String(item === tab));
    });

    updateEarnings(transport);
  });
});

updateEarnings('foot');

const applyForm = document.querySelector('.apply__form');

applyForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(applyForm);
  const name = formData.get('name')?.toString().trim();

  alert(`Спасибо, ${name || 'курьер'}! Мы свяжемся с вами в ближайшее время.`);
  applyForm.reset();
});

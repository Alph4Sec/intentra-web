'use strict';

// Card toggle
document.querySelectorAll('.v-header').forEach(header => {
  const toggle = () => {
    const card = header.closest('.v-card');
    const open = card.classList.toggle('is-open');
    header.setAttribute('aria-expanded', String(open));
  };
  header.addEventListener('click', toggle);
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

// Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.v-card').forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && card.dataset.outcome !== f);
    });
  });
});

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 65);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.04 });
document.querySelectorAll('.v-card').forEach(c => obs.observe(c));

// Mobile burger
const burger = document.getElementById('navBurger');
if (burger) {
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    document.querySelector('.nav-links')?.classList.toggle('nav-open', !open);
  });
}

// Stat popups
(function () {
  const overlay = document.getElementById('tstat-overlay');

  const tstatMap = {
    'tstat-stolen': 'tpopup-stolen',
    'tstat-permit': 'tpopup-permit'
  };

  let currentPopup = null;

  function openPopup(popupId) {
    if (currentPopup) closePopup();
    const popup = document.getElementById(popupId);
    if (!popup) return;
    popup.classList.add('is-open');
    overlay.classList.add('is-open');
    currentPopup = popup;
  }

  function closePopup() {
    if (!currentPopup) return;
    currentPopup.classList.remove('is-open');
    overlay.classList.remove('is-open');
    currentPopup = null;
  }

  // Listeners en stats clickeables
  Object.entries(tstatMap).forEach(([btnId, popupId]) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentPopup && currentPopup.id === popupId) {
        closePopup();
      } else {
        openPopup(popupId);
      }
    });
  });

  // Cerrar con botón × dentro del popup
  document.querySelectorAll('.tstat-popup-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closePopup();
    });
  });

  // Cerrar al click en overlay
  overlay.addEventListener('click', closePopup);

  // Evitar que click dentro del popup lo cierre
  document.querySelectorAll('.tstat-popup').forEach(p => {
    p.addEventListener('click', e => e.stopPropagation());
  });

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePopup();
  });
})();

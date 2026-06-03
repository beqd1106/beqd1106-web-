/* PMI学習セット — スクロールアニメーション */
(function () {
  'use strict';

  const TARGETS = [
    '.chapter', '.key', '.callout', '.src', '.summary',
    '.kpi-table', '.area-grid', '.force-grid', '.adkar-flow',
    '.ratio-grid', '.timeline', '.fw-map', '.compare-2col',
    '.how-grid .how-card', '.curr-item', '.related-card',
    '.section-header', '.phase-label', '.case-cta',
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -36px 0px' }
  );

  function init() {
    let delay = 0;
    document.querySelectorAll(TARGETS.join(',')).forEach((el) => {
      el.classList.add('fade-up');
      el.style.transitionDelay = delay + 'ms';
      delay = 0; // stagger only within same parent
      observer.observe(el);
    });

    // stagger children of grid/list parents
    document.querySelectorAll(
      '.how-grid, .area-grid, .force-grid, .adkar-flow, .ratio-grid, .fw-map'
    ).forEach((parent) => {
      let d = 0;
      parent.querySelectorAll(':scope > *').forEach((child) => {
        child.classList.add('fade-up');
        child.style.transitionDelay = d + 'ms';
        d += 55;
        observer.observe(child);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

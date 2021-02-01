'use strict';

(() => {
  const container = document.querySelector(`.video__wrapper`);

  if (container) {
    const list = container.querySelector(`.video__list`);
    const items = container.querySelectorAll(`.video__item`);
    const prev = document.querySelector(`.video__control--prev`);
    const next = document.querySelector(`.video__control--next`);

    let currentShift = 1;
    let offset = 0;

    const shiftQuantity = Math.ceil(items.length / 2);

    const onNextClick = () => {
      offset += container.offsetWidth;
      list.style.transform = `translateX(-${offset}px)`;
      currentShift++;

      prev.removeAttribute(`disabled`);

      if (currentShift === shiftQuantity) {
        next.setAttribute(`disabled`, `true`);
      }
    };

    const onPrevClick = () => {
      offset -= container.offsetWidth;
      list.style.transform = `translateX(-${offset}px)`;
      currentShift--;

      next.removeAttribute(`disabled`);

      if (currentShift === 1) {
        prev.setAttribute(`disabled`, `true`);
      }
    };

    next.addEventListener(`click`, onNextClick);
    prev.addEventListener(`click`, onPrevClick);
  }
})();

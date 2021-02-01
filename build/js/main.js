'use strict';

(() => {
  const body = document.querySelector(`.page-body`);
  const mainNav = body.querySelector(`.main-nav`);
  const navToggle = body.querySelector(`.main-nav__toggle`);

  if (mainNav) {
    mainNav.classList.remove(`main-nav--nojs`);
    mainNav.classList.remove(`main-nav--opened`);

    navToggle.addEventListener(`click`, () => {
      mainNav.classList.toggle(`main-nav--opened`);
      body.classList.toggle(`page-body--main-nav-opened`);
    });
  }
})();

'use strict';

(() => {
  const CITIES = {
    [`Saint-Petersburg`]: `Санкт-Петербург`,
    [`Moscow`]: `Москва`,
  };

  const select = document.querySelector(`.select`);

  if (select) {
    const label = select.querySelector(`.select__label`);
    const inputs = select.querySelectorAll(`.select__input`);

    const onInputChange = (input) => {
      return () => {
        label.textContent = CITIES[input.value];
      };
    };

    inputs.forEach((input) => {
      input.addEventListener(`change`, onInputChange(input));
    });
  }
})();

'use strict';

(() => {
  const image = document.querySelector(`.page-main__image`);

  if (image && window.screen.width >= 768) {
    const container = document.querySelector(`.page-main`);
    const sliderTemplate = document.querySelector(`#slider`).content.querySelector(`.slider`);

    image.classList.add(`hidden`);

    const slider = sliderTemplate.cloneNode(true);
    container.prepend(slider);

    let slideIndex = 0;

    const showSlides = () => {
      const slides = slider.querySelectorAll(`.slider__slide`);

      if (slideIndex > slides.length - 1) {
        slideIndex = 0;
      }

      const prevSlideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;

      slides[prevSlideIndex].classList.remove(`slider__slide--current`);
      slides[slideIndex].classList.add(`slider__slide--current`);
      setTimeout(showSlides, 7000);
      slideIndex++;
    };

    showSlides();
  }
})();



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

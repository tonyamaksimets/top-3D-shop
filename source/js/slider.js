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



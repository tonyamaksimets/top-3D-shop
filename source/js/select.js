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

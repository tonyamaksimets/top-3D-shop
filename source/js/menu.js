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

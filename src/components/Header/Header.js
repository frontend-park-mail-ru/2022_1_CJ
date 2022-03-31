import { createComponent } from '../../core/models/Component/Component.js';

/**
 *
 * @param {Event} e
 */
const showSettings = (e) => {
  /**
   *
   * @param {Object} obj
   */
  function hideElement(obj) {
    obj.style.display = 'none';
  }

  /**
   *
   * @param {Object} obj
   */
  function showElement(obj) {
    obj.style.display = 'block';
  }

  let profileMenu = e.currentTarget.nextElementSibling;

  if (!profileMenu.style.display || profileMenu.style.display === 'none') {
    showElement(profileMenu);
  } else {
    hideElement(profileMenu);
  }
  // TODO: close on click to any outside area
};

const reducer = {
  onShow: () => {
    const profile = document.querySelector('.profile');
    profile.addEventListener('click', showSettings);

    let profileSettings = profile.nextElementSibling;

    document.addEventListener('click', (e) => {
      const withinBoundaries = e.composedPath().includes(profileSettings);
      const profileBoundaries = e.composedPath().includes(profile);
      if (!withinBoundaries && !profileBoundaries) {
        profileSettings.style.display = 'none'; // скрываем элемент т к клик был за его пределами
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.keyCode == 27) {
        // код клавиши Escape, но можно использовать e.key
        profileSettings.style.display = 'none';
      }
    });
  }
};

export const headerComponent = (template) => createComponent(template, reducer);

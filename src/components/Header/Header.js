import { createComponent } from '../../core/models/Component/Component.js';
import { changeDisplay, setStyleDisplayNone } from '../../test/baseFunction.js';

/**
 *
 * @param {Event} e
 */
const showSettings = (e) => {

  let profileMenu = e.currentTarget.nextElementSibling;
  changeDisplay(profileMenu, 'block');
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
        setStyleDisplayNone(profileSettings);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key == "Escape") {
        setStyleDisplayNone(profileSettings);
      }
    });
  }
};

export const headerComponent = (template) => createComponent(template, reducer);

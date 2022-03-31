import { createComponent } from '../../core/models/Component/Component.js';

/**
 *
 * @param {Event} e
 */
function changePage(e) {
  console.log(e.currentTarget);
  //TODO: change page
  // from current to selected
}

const reducer = {
  onShow: () => {
    const [profile, feed, messages, friends, communities] = document.querySelectorAll('.main-menu div');

    const changePageButtons = document.querySelectorAll('.main-menu div');
    [...changePageButtons].forEach((button) => {
      button.addEventListener('click', changePage);
    });
  }
};

export const menuComponent = (template) => createComponent(template, reducer);

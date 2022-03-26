import { createComponent } from '../Component/Component.js';

export const createView = (template, reducer = {}) => {
  const view = createComponent(template, reducer);

  view.show = (parent) => {
    parent.innerHTML = view.render();
    view.onShow();
  };

  return view;
};

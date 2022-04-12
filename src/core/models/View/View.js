import { store } from '../../../store/store.js';
import { createComponent } from '../Component/Component.js';

export const createView = (template, reducer = {}) => {
  const view = createComponent(template, reducer);

  view.show = (parent, context = {}) => {
    parent.innerHTML = view.render({ store: store.getState(), ...context });
    view.onShow();
  };

  return view;
};

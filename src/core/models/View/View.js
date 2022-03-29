import { store } from '../../../store/store.js';
import { createComponent } from '../Component/Component.js';

export const createView = (template, reducer = {}) => {
  const view = createComponent(template, reducer);

  view.show = (parent, context = store.getState()) => {
    parent.innerHTML = view.render(context);
    view.onShow();
  };

  return view;
};

import { createView } from '../../core/models/View/View.js';

const reducer = {
  onShow: () => {}
};

export const searchView = (template) => createView(template, reducer);

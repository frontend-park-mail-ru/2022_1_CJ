import { createView } from '../../core/models/View/View.js';

const reducer = {
  onShow: () => {
    
  }
};

export const friendsView = (template) => createView(template, reducer);

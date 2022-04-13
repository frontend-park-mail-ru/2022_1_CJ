import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const friendsMenuComponent = (template) => createComponent(template, reducer);

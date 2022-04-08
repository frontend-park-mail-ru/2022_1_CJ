import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const friendsComponent = (template) => createComponent(template, reducer);

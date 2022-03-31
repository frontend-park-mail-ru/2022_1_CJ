import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const dialogsComponent = (template) => createComponent(template, reducer);

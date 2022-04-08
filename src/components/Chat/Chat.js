import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const chatComponent = (template) => createComponent(template, reducer);

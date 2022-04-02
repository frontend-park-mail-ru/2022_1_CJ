import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const commentGroupComponent = (template) => createComponent(template, reducer);

import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const commentComponent = (template) => createComponent(template, reducer);

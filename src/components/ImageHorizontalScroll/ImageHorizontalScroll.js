import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const imageHorizontalScrollComponent = (template) => createComponent(template, reducer);

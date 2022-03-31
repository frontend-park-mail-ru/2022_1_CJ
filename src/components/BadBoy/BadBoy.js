import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const badBoyComponent = (template) => createComponent(template, reducer);

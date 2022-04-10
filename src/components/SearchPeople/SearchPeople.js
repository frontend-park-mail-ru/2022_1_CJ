import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const searchPeopleComponent = (template) => createComponent(template, reducer);

import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const profileSettingsView = (template) => createComponent(template, reducer);

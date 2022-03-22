import { ComponentsRegistry } from '../constants/components_registry.js';
import { TemplatesRegistry } from '../constants/templates_registry.js';
import { View } from '../models/View.js';
import { userAsyncActions, userStore } from '../modules/Stores/UserStore.js';

/**
 * Adds header component as subcomponent to the given view.
 * @param {View} view
 */
export const headerAdapter = (view) => {
  view.addComponent('Header', new ComponentsRegistry.HeaderComponent(TemplatesRegistry.Header));
}

export const userAdapter = () => {
  userStore.dispatch(userAsyncActions.getData);
}

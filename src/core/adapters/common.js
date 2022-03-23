import { ComponentsRegistry } from '../constants/components_registry.js';
import { ContextKey } from '../constants/constants.js';
import { TemplatesRegistry } from '../constants/templates_registry.js';
import { View } from '../models/View/View.js';
import { userAsyncActions, userStore } from '../modules/Stores/UserStore.js';

/**
 * Adds header component as subcomponent to the given view.
 * @param {View} view
 */
export const headerAdapter = (view) => {
  view.addComponent('Header', new ComponentsRegistry.HeaderComponent(TemplatesRegistry.Header));
}

/**
 * @param {View} view
 */
export const userAdapter = async (view) => {
  userStore.subscribe((state) => {
    view.setContextByKey(ContextKey.User, state.user);
    view.setContextByKey(ContextKey.IsAuthorized, state.isAuthorized);
  });
  await userStore.dispatch(userAsyncActions.getUserData);
}

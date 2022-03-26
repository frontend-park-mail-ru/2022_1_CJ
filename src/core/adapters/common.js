import { ComponentsRegistry } from '../../components/registry.js';
import { View } from '../models/View/View.js';

/**
 * Adds header component as subcomponent to the given view.
 * @param {View} view
 */
export const headerAdapter = (view) => {
  view.addComponent('Header', ComponentsRegistry.Header);
};

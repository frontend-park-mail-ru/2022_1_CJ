import { store } from '../../store/store.js';
import { Janitor } from '../modules/Janitor/Janitor.js';

export const renderComponent = (component, context = {}) => {
  setTimeout(() => {
    component.onShow(context);
  });
  Janitor.add(store.subscribe(component.onAction));
  return component.render(context);
};

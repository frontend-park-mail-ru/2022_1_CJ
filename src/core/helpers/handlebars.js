import { ComponentsRegistry } from '../../components/registry.js';
import { store } from '../../store/store.js';
import { Janitor } from '../modules/Janitor/Janitor.js';

Handlebars.registerHelper('component', (name, context) => {
  const component = ComponentsRegistry[name];
  setTimeout(() => {
    component.onShow(context);
  });
  Janitor.add(store.subscribe(component.onAction));
  return component.render(context);
});

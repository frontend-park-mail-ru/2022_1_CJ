import { ComponentsRegistry } from '../../components/registry.js';
import { store } from '../../store/Store.js';

Handlebars.registerHelper('component', (name, context) => {
  const component = ComponentsRegistry[name];
  setTimeout(() => {
    component.onShow(context);
  });
  store.subscribe(component.onAction);
  return component.render(context);
});

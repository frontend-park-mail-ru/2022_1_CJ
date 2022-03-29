import { ComponentsRegistry } from '../../components/registry.js';
import { store } from '../../store/Store.js';

Handlebars.registerHelper('component', (name, context) => {
  const component = ComponentsRegistry[name];
  setTimeout(() => {
    component.onShow(context);
  });
  store.subscribe(component.onAction); // TODO: think of how to unsubscribe this
  return component.render(context);
});

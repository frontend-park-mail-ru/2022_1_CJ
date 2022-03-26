import { ComponentsRegistry } from '../../components/registry.js';

Handlebars.registerHelper('component', (name, context) => {
  const component = ComponentsRegistry[name];
  setTimeout(() => {
    component.onShow();
  });
  return component.render(context);
});

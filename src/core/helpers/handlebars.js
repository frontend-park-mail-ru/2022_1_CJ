/* eslint-disable no-undef */
import { ComponentsRegistry } from '../../components/registry.js';
import { icons } from '../constants/icons.js';
import { renderComponent } from './component.js';

Handlebars.registerHelper('component', (name, context) => {
  const component = ComponentsRegistry[name];
  return renderComponent(component, context);
});

Handlebars.registerHelper('icon', (name) => {
  return icons[name];
});

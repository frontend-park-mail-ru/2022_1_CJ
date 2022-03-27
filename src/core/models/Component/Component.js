import { noop } from '../../constants/constants.js';
import { Context } from '../Context/Context.js';

/**
 * Reducer is an object containing methods for making components dynamic.
 * Available methods for reducer:
 * - onShow - called by right after the component is shown; currently is called by Handlebars' helper
 */
export const createComponent = (template, reducer = {}) => {
  const component = {};
  component.context = new Context();

  component.render = (context = component.context.get()) => {
    return template(context);
  };

  component.onShow = () => {
    (reducer.onShow || noop)();
  };

  component.onAction = (action) => {
    (reducer.onAction || noop)(action);
  };

  return component;
};

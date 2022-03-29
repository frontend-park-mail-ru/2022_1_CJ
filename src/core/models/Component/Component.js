import { noop } from '../../constants/constants.js';

/**
 * Reducer is an object containing methods for making components dynamic.
 * Available methods for reducer:
 * - onShow - called by right after the component is shown; currently is called by Handlebars' helper
 */
export const createComponent = (template, reducer = {}) => {
  const component = {};

  component.render = (context = {}) => {
    return template(context);
  };

  component.onShow = (context = {}) => {
    (reducer.onShow || noop)(context);
  };

  component.onAction = (action) => {
    (reducer.onAction || noop)(action);
  };

  return component;
};

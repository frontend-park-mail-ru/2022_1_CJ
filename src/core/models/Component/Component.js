import { noop } from '../../constants/constants.js';
import { Context } from '../Context/Context.js';

export const createComponent = (template, reducer = {}) => {
  const component = {};
  component.context = new Context();

  component.render = (context = component.context.get()) => {
    return template(context);
  };

  component.onShow = () => {
    (reducer.onShow || noop)();
  };

  return component;
};

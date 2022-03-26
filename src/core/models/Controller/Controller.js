export const createController = (reducer, enhancer = null) => {
  if (enhancer instanceof Function) {
    return enhancer(createController)(reducer);
  }

  const controller = {};

  controller.handle = (context) => {
    return reducer(context);
  };

  return controller;
};

/**
 * Returns so-called enhancer which creates controller with given middlewares.
 * Such solution ensures that a controller is decorated only once.
 * @param  {...Function} middlewares
 * @returns {Function} enhancer
 */
export const applyMiddlewares =
  (...middlewares) =>
  (createController) =>
  (reducer) => {
    const controller = createController(reducer);
    controller.handle = Object.values(middlewares).reduce(
      (handle, middleware) => (handle = middleware(handle)),
      controller.handle
    );
    return controller;
  };

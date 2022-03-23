export const loggerMiddleware = (store) => (next) => (action) => {
  console.groupCollapsed('store logger middleware');
  console.log('action', action);
  next(action);
  console.table(store.getState());
  console.groupEnd();
};

export const thunkMiddleware = (store) => (next) => async (action) => {
  if (action instanceof Function) {
    await action(next, store.getState());
  } else {
    return next(action);
  }
};

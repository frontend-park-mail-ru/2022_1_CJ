export const loggerMiddleware = (store) => (dispatch) => (action) => {
  console.groupCollapsed('store logger middleware');
  console.log('action', action);
  dispatch(action);
  console.log('state', store.getState());
  console.groupEnd();
}

export const thunkMiddleware = (store) => (dispatch) => (action) => {
  if (action instanceof Function) {
    return action(dispatch, store.getState());
  }
  return dispatch(action);
}

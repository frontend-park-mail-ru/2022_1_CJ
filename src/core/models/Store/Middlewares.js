export const loggerMiddleware = (store) => (dispatch) => (action) => {
  console.groupCollapsed('store logger middleware');
  console.log('action', action);
  dispatch(action);
  console.log('state', store.getState());
  console.groupEnd();
}

export const thunkMiddleware = (store) => (dispatch) => async (action) => {
  if (action instanceof Function) {
    await action(dispatch, store.getState());
  } else {
    return dispatch(action);
  }
}

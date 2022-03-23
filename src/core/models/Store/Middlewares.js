export const loggerMiddleware = (store) => (dispatch) => (action) => {
  console.group('store logger middleware');
  console.log('action', action);
  dispatch(action);
  console.table(store.getState());
  console.groupEnd();
};

export const thunkMiddleware = (store) => (dispatch) => async (action) => {
  if (action instanceof Function) {
    await action(dispatch, store.getState());
  } else {
    return dispatch(action);
  }
};

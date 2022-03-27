/**
 * @param {Function} reducer - responsible for processing actions.
 * @param {Object} initialState
 * @param {Function} enhancer - wrapper for decorating store, gained from applyMiddlewares.
 * @returns {Object} store
 */
export const createStore = (reducer, initialState, enhancer = null) => {
  if (enhancer instanceof Function) {
    return enhancer(createStore)(reducer, initialState);
  }

  const store = {};
  store.state = initialState;
  store.listeners = [];

  store.getState = () => store.state;

  // Returns callback to unsubscribe.
  store.subscribe = (listener) => {
    store.listeners.push(listener);
    return () => store.listeners.splice(store.listeners.indexOf(listener), 1);
  };

  store.unsubscribe = (listener) => {
    store.listeners.splice(store.listeners.indexOf(listener), 1);
  };

  store.on = (actionType, listener) => {
    const wrapper = (action) => {
      if (action.type === actionType) {
        listener(action);
      }
    };
    store.listeners(wrapper);
  };

  store.onOnce = (actionType, listener) => {
    const wrapper = (action) => {
      if (action.type === actionType) {
        listener(action);
        store.listeners.splice(store.listeners.indexOf(wrapper), 1);
      }
    };
    store.listeners.push(wrapper);
  };

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);
    store.listeners.forEach((listener) => listener(action));
  };

  return store;
};

export const combineReducers =
  (reducers) =>
  (state = {}, action) => {
    const nextState = {};
    Object.values(reducers).forEach((reducer) => {
      nextState = reducer(state, action);
    });
    return nextState;
  };

/**
 * Returns so-called enhancer which creates store with given middlewares.
 * Such solution ensures that a store is decorated only once.
 * @param  {...Function} middlewares
 * @returns {Function} enhancer
 */
export const applyMiddlewares =
  (...middlewares) =>
  (createStore) =>
  (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    store.dispatch = Object.values(middlewares).reduce(
      (dispatch, middleware) => middleware(store)(dispatch),
      store.dispatch
    );
    return store;
  };

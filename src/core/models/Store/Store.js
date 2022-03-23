export const createStore = (reducer, initialState, enhancer = null) => {
  if (enhancer instanceof Function) {
    return enhancer(createStore)(reducer, initialState);
  }

  const store = {};
  store.state = initialState;
  store.listeners = [];

  store.getState = () => store.state;

  store.subscribe = (listener) => {
    store.listeners.push(listener);
    return () => {
      store.listeners.splice(store.listeners.indexOf(listener), 1);
    };
  };

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);
    console.log('xxxxxxxxxxxxx');
    store.listeners.forEach((listener) => listener(store.state));
    console.log('yyyyyyyyy');
  };

  return store;
};

export const combineReducers = (reducers) => (state = {}, action) => {
  const nextState = {};
  Object.entries(reducers).forEach(([key, value]) => {
    nextState[key] = value(state[key], action);
  });
  return nextState;
};

/**
 * Returns so-called enhancer which creates store with given middlewares.
 * Such solution ensures that a store is decorated only once.
 * @param  {...Function} middlewares 
 * @returns {Function} enhancer
 */
export const applyMiddlewares = (...middlewares) => (createStore) => (reducer, initialState) => {
  const store = createStore(reducer, initialState);
  store.dispatch = Object.values(middlewares).reduce(
    (dispatch, factory) => dispatch = factory(store)(dispatch),
    store.dispatch
  );
  return store;
};

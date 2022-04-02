import { applyMiddlewares, createStore } from '../core/models/Store/Store.js';
import { loggerMiddleware, thunkMiddleware } from './middlewares/middlewares.js';
import { userActions, userInitialState, userThunks } from './models/user.js';

const storeInitialState = {
  ...userInitialState
};

export const actions = {
  user: userActions
};

export const thunks = {
  user: userThunks
};

const reducer = (state = storeInitialState, { type, payload }) => {
  if (type instanceof Function) {
    return type(state, payload);
  }
  return state;
};

export const store = createStore(reducer, storeInitialState, applyMiddlewares(loggerMiddleware, thunkMiddleware));

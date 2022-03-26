import { applyMiddlewares, createStore } from '../core/models/Store/Store.js';
import { UserAPI } from '../core/network/api/user.js';
import { loggerMiddleware, thunkMiddleware } from './middlewares/middlewares.js';
import { createAction } from '../core/models/Action/Action.js';
import { AuthAPI } from '../core/network/api/auth.js';

const getInitialState = () => {
  return {
    user: null
  };
};

const reducer = (state = getInitialState(), action) => {
  if (action.type in userActionsHandlers) {
    return userActionsHandlers[action.type](state, action.payload);
  }
  return state;
};

export const userStore = createStore(reducer, getInitialState(), applyMiddlewares(loggerMiddleware, thunkMiddleware));

export const userActions = {
  signupSuccess: 'signupSuccess',
  signupFailure: 'signupFailure',

  loginSuccess: 'loginSuccess',
  loginFailure: 'loginFailure',

  getUserDataSuccess: 'getUserDataSuccess',
  getUserDataFailure: 'getUserDataFailure'
};

const userActionsHandlers = {
  getUserDataSuccess: (state, payload) => {
    state.user = payload.user;
    return state;
  },
  getUserDataFailure: (state, payload) => {
    state.user = null;
    console.log(payload.err); // TODO: handle error
    return state;
  }
};

export const userThunks = {
  signup: (dto) => (next) => {
    AuthAPI.SignupUser(dto).then(
      () => next(createAction(userActions.signupSuccess)),
      (err) => next(createAction(userActions.signupFailure), { err })
    );
  },

  login: (dto) => (next) => {
    AuthAPI.LoginUser(dto).then(
      () => next(createAction(userActions.loginSuccess)),
      (err) => next(createAction(userActions.loginFailure), { err })
    );
  },

  getUserData: (next) => {
    UserAPI.GetUserData(null).then(
      (json) => next(createAction(userActions.getUserDataSuccess, { user: json.user })),
      (err) => next(createAction(userActions.getUserDataFailure, { err }))
    );
  },

  getFeedPosts: (next) => {
    UserAPI.GetUserFeedPosts().then((json) => next(createAction));
  }
};

import { applyMiddlewares, createAction, createStore } from '../core/models/Store/Store.js';
import { UserAPI } from '../core/network/api/user.js';
import { loggerMiddleware, thunkMiddleware } from '../core/models/Store/Middlewares.js';

const getInitialState = () => {
  return {
    user: {}
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
  getUserData: 'getUserData',
  getUserDataSuccess: 'getUserDataSuccess',
  getUserDataFailure: 'getUserDataFailure'
};

const userActionsHandlers = {
  getUserDataSuccess: (state, payload) => {
    state.user = payload.user;
    state.user.isAuthorized = true;
    return state;
  },
  getUserDataFailure: (state, payload) => {
    state.user.isAuthorized = false;
    console.log(payload.err); // TODO: handle error
    return state;
  }
};

export const userAsyncActions = {
  getUserData: async (dispatch) => {
    await UserAPI.GetUserData(null).then(
      (json) => dispatch(createAction(userActions.getUserDataSuccess, { user: json.user })),
      (err) => dispatch(createAction(userActions.getUserDataFailure, { err }))
    );
  }
};

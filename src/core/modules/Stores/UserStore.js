import { applyMiddlewares, createStore } from "../../models/Store/Store.js";
import { UserAPI } from "../../network/api/user.js";
import { loggerMiddleware, thunkMiddleware } from "../../models/Store/Middlewares.js";

const getInitialState = () => {
  return {
    user: null,
    isAuthorized: null,
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
  getUserDataFailure: 'getUserDataFailure',
}

const userActionsHandlers = {
  getUserDataSuccess: (state, payload) => {
    state.user = payload.user;
    state.isAuthorized = true;
    return state;
  },
  getUserDataFailure: (state, payload) => {
    state.isAuthorized = false;
    console.log(payload.err);
    return state;
  }
}

export const userAsyncActions = {
  getUserData: async (dispatch, state) => {
    if (state['user']) {
      return;
    }
    await UserAPI.GetUserData(null).then(
      (user) => dispatch({ type: userActions.getUserDataSuccess, payload: user }),
      (err) => dispatch({ type: userActions.getUserDataFailure, payload: { err } })
    );
  },
}

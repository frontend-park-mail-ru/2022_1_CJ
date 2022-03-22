import { applyMiddlewares, createStore } from "../../models/Store.js";
import { UserAPI } from "../../network/api/user.js";
import { loggerMiddleware, thunkMiddleware } from "../Middlewares.js";

const getInitialState = () => {
  return {
    user: null,
    isAuthorized: null,
  };
};

const reducer = (state = getInitialState(), action) => {
  if (action.type in userAsyncActions) {
    return userAsyncActions[action.type](state);
  }
  return state;
};

export const userStore = createStore(reducer, getInitialState(), applyMiddlewares(loggerMiddleware, thunkMiddleware));
userStore.subscribe(() => {
  // TODO:
});

export const userActions = {
  getUserData: 'getUserData',
  getUserDataSuccess: 'getUserDataSuccess',
  getUserDataFailure: 'getUserDataFailure',
}

export const userAsyncActions = {
  getData: (dispatch) => {
    dispatch({ type: userActions.getUserData });
    UserAPI.GetUserData().then(
      (user) => dispatch({ type: userActions.getUserDataSuccess, user }),
      (err) => dispatch({ type: userActions.getUserDataFailure, err }),
    );
  },
}

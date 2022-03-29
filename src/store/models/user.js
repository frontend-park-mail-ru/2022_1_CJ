import { UserAPI } from '../../core/network/api/user.js';
import { createAction } from '../../core/models/Action/Action.js';
import { AuthAPI } from '../../core/network/api/auth.js';

export const userInitialState = {
  user: null
};

export const userActions = {
  login: {
    success: 'loginSuccess',
    failure: 'loginFailure'
  },

  signup: {
    success: 'signupSuccess',
    failure: 'signupFailure'
  },

  getUserData: {
    success: 'getUserDataSuccess',
    failure: 'getUserDataFailure'
  },

  getFeedPosts: {
    success: 'getFeedPostsSuccess',
    failure: 'getFeedPostsFailure'
  }
};

export const userReducers = {
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
  signup: (dto) => (next) =>
    AuthAPI.SignupUser(dto).then(
      () => next(createAction(userActions.signup.success)),
      (err) => next(createAction(userActions.signup.failure), { err })
    ),

  login: (dto) => (next) =>
    AuthAPI.LoginUser(dto).then(
      () => next(createAction(userActions.login.success)),
      (err) => next(createAction(userActions.login.failure), { err })
    ),

  getUserData: (next) =>
    UserAPI.GetUserData(null).then(
      (json) => next(createAction(userActions.getUserData.success, { user: json.user })),
      (err) => next(createAction(userActions.getUserData.failure, { err }))
    ),

  getFeedPosts: (next) =>
    UserAPI.GetFeedPosts().then(
      (json) => next(createAction(userActions.getFeedPosts.success, { posts: json.posts })),
      (err) => next(createAction(userActions.getFeedPosts.failure, { err }))
    )
};

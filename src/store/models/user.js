import { UserAPI } from '../../core/network/api/user.js';
import { createAction } from '../../core/models/Action/Action.js';
import { AuthAPI } from '../../core/network/api/auth.js';

export const userInitialState = {
  user: null
};

export const userActions = {
  signup: {
    success: 'signupSuccess',
    failure: 'signupFailure'
  },

  login: {
    success: 'loginSuccess',
    failure: 'loginFailure'
  },

  logout: {
    success: (state) => {
      state.user = null;
      return state;
    },

    failure: 'logoutFailure'
  },

  getUserData: {
    success: (state, payload) => {
      state.user = payload.user;
      return state;
    },

    failure: (state, payload) => {
      state.user = null;
      console.log(payload.err); // TODO: handle error
      return state;
    }
  },

  getFeedPosts: {
    success: 'getFeedPostsSuccess',
    failure: 'getFeedPostsFailure'
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

  logout: (next) =>
    AuthAPI.LogoutUser().then(
      () => next(createAction(userActions.logout.success)),
      (err) => next(createAction(userActions.logout.failure), { err })
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

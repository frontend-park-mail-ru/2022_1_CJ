import { userAPI } from '../../core/network/api/user.js';
import { createAction } from '../../core/models/Action/Action.js';
import { authAPI } from '../../core/network/api/auth.js';
import { handleError } from '../../core/helpers/errors.js';

export const userInitialState = {
  user: null,
  feedPostIDs: null
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
      handleError(payload.err);
      return state;
    }
  },

  getFeedPosts: {
    success: 'getFeedPostsSuccess',
    failure: 'getFeedPostsFailure'
  },

  getUserPosts: {
    success: 'getUserPostsSuccess',
    failure: 'getUserPostsFailure'
  }
};

export const userThunks = {
  signup: (dto) => (next) =>
    authAPI.signupUser(dto).then(
      () => next(createAction(userActions.signup.success)),
      (err) => next(createAction(userActions.signup.failure, { err }))
    ),

  login: (dto) => (next) =>
    authAPI.loginUser(dto).then(
      () => next(createAction(userActions.login.success)),
      (err) => next(createAction(userActions.login.failure, { err }))
    ),

  logout: (next) =>
    authAPI.logoutUser().then(
      () => next(createAction(userActions.logout.success)),
      (err) => next(createAction(userActions.logout.failure, { err }))
    ),

  getUserData: (next) =>
    userAPI.getUserData(null).then(
      (json) => next(createAction(userActions.getUserData.success, { user: json.user })),
      (err) => next(createAction(userActions.getUserData.failure, { err }))
    ),

  getFeedPosts: (next) =>
    userAPI.getFeedPosts().then(
      (json) => next(createAction(userActions.getFeedPosts.success, json)),
      (err) => next(createAction(userActions.getFeedPosts.failure, { err }))
    ),

  getUserPosts: (next) =>
    userAPI.getUserPosts().then(
      (json) => next(createAction(userActions.getUserPosts.success, { posts: json.posts })),
      (err) => next(createAction(userActions.getUserPosts.failure, { err }))
    )
};

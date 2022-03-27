import { UserAPI } from '../core/network/api/user.js';
import { createAction } from '../core/models/Action/Action.js';
import { AuthAPI } from '../core/network/api/auth.js';

export const userInitialState = {
  user: null
};

export const userActions = {
  signupSuccess: 'signupSuccess',
  signupFailure: 'signupFailure',

  loginSuccess: 'loginSuccess',
  loginFailure: 'loginFailure',

  getUserDataSuccess: 'getUserDataSuccess',
  getUserDataFailure: 'getUserDataFailure',

  getFeedPostsSuccess: 'getFeedPostsSuccess',
  getFeedPostsFailure: 'getFeedPostsFailure'
};

export const userReducer = {
  getUserDataSuccess: (state, payload) => {
    state.user = payload.user;
    return state;
  },
  getUserDataFailure: (state, payload) => {
    state.user = null;
    console.log(payload.err); // TODO: handle error
    return state;
  },
  messagesUnreadIncrement: (state, payload) => {
    state.messagesUnread += 1;
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
    UserAPI.GetFeedPosts().then(
      (json) => next(createAction(userActions.getFeedPostsSuccess, { posts: json.posts })),
      (err) => next(createAction(userActions.getFeedPostsFailure, { err }))
    );
  }
};

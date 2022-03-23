import { userStore, userAsyncActions } from '../../modules/Stores/UserStore.js';

export const authMiddleware =
  (next) =>
  async (context = {}) => {
    userStore.subscribe((state) => {
      context.user = state.user;
      context.isAuthorized = state.isAuthorized;
    });
    await userStore.dispatch(userAsyncActions.getUserData);
    return next(context);
  };

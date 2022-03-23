import { userStore, userAsyncActions } from '../../modules/Stores/UserStore.js';

export const userMiddleware =
  (next) =>
  async (context = {}) => {
    userStore.subscribe((state) => {
      context.user = state.user;
    });
    await userStore.dispatch(userAsyncActions.getUserData);
    return next(context);
  };

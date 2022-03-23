import { userStore, userAsyncActions } from '../../modules/Stores/UserStore.js';

export const userMiddleware =
  (next) =>
  async (context = {}) => {
    const unsubscribe = userStore.subscribe((state) => {
      context.user = state.user;
    });
    await userStore.dispatch(userAsyncActions.getUserData);
    unsubscribe();
    return next(context);
  };

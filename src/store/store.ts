import { applyMiddlewares, createStore, StoreReducer } from "../core/models/store.js";
import { loggerMiddleware, thunkMiddleware } from "./middlewares/middlewares.js";
import { userActions, userInitialState, userThunks } from "./models/user.js";

const storeInitialState = {
	...userInitialState,
};

export const actions = {
	user: userActions,
};

export const thunks = {
	user: userThunks,
};

const reducer: StoreReducer = (state = storeInitialState, action) => {
	if (action instanceof Function) {
		return action(state);
	}
	return state;
};

export const store = createStore(reducer, storeInitialState, applyMiddlewares(loggerMiddleware, thunkMiddleware));

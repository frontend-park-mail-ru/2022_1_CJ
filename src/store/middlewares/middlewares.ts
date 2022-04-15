import { StoreMiddleware } from "../../core/models/store";

export const loggerMiddleware: StoreMiddleware = (store) => (next) => (action) => {
	console.groupCollapsed("store logger middleware");
	console.log("action", action);
	next(action);
	console.table(store.getState());
	console.groupEnd();
};

export const thunkMiddleware: StoreMiddleware = (store) => (next) => (action) => {
	action instanceof Function ? action(next, store.getState()) : next(action);
};

import { Action, Reaction } from "./action";

type Store = {
	getState(): object;

	dispatch(action: Action): void;
	subscribe(listener: Function): Function;
	unsubscribe(listener: Function): void;

	on(reaction: Reaction): void;
	once(...reactions: [Reaction]): void;
};

export type StoreReducer = (state: object, action: Action) => object;

export const createStore = (reducer: StoreReducer, initialState: object, enhancer?: Function): Store => {
	if (enhancer) {
		return enhancer(createStore)(reducer, initialState);
	}

	const self = {
		state: initialState,
		listeners: [] as Function[],
	};

	const getState = () => self.state;

	const dispatch = (action: Action) => {
		self.state = reducer(self.state, action);
		self.listeners.forEach((listener) => listener(action));
	};

	const subscribe = (listener: Function) => {
		self.listeners.push(listener);
		return () => self.listeners.splice(self.listeners.indexOf(listener), 1);
	};

	const unsubscribe = (listener: Function) => {
		self.listeners.splice(self.listeners.indexOf(listener), 1);
	};

	const on = (reaction: Reaction) => {
		const wrapper = (action: Action) => {
			if (action.type === reaction.type) {
				reaction.listener(action);
			}
		};
		self.listeners.push(wrapper);
	};

	const once = (...reactions: Reaction[]) => {
		const wrapper = (action: Action) => {
			for (const { type, listener } of reactions.values()) {
				if (action.type === type) {
					listener(action);
					self.listeners.splice(self.listeners.indexOf(wrapper), 1);
					break;
				}
			}
		};
		self.listeners.push(wrapper);
	};

	return {
		getState,
		dispatch,
		subscribe,
		unsubscribe,
		on,
		once,
	};
};

export type StoreMiddleware = (store: Store) => (next: Function) => (action: Action | Function) => void;

export const applyMiddlewares =
	(...middlewares: StoreMiddleware[]) =>
	(createStore: Function) =>
	(reducer: Function, initialState: object) => {
		const store = createStore(reducer, initialState);
		store.dispatch = Object.values(middlewares).reduce(
			(dispatch, middleware) => middleware(store)(dispatch),
			store.dispatch
		);
		return store;
	};

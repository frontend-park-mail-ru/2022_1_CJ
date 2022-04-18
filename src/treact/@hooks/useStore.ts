import { useState } from "./useState";

type StoreReducer = (get: Function, set: Function) => object;

const createEmitter = () => {
	const subscriptions = new Map();
	return {
		emit: (store: object) => subscriptions.forEach((listener) => listener(store)),
		subscribe: (listener: Function) => {
			const key = Symbol();
			subscriptions.set(key, listener);
			return () => subscriptions.delete(key);
		},
	};
};

export const createStore = (reducer: StoreReducer) => {
	let store = {};
	const emitter = createEmitter();

	const get = () => store;
	const set = (op: Function) => {
		store = op(store);
		emitter.emit(store);
	};
	store = reducer(get, set);

	const useStore = () => {
		const [localStore, setLocalStore] = useState(get());
		// useEffect(() => emitter.subscribe(setLocalStore), []);
		emitter.subscribe(setLocalStore);
		return localStore;
	};

	return useStore;
};

import { StateSetter, useState } from "./useState";

type StoreReducer<T> = () => T;

const createEmitter = <T>() => {
	const subscriptions = new Map();
	return {
		emit: (store: T) => subscriptions.forEach((listener) => listener(store)),
		subscribe: (listener: Function) => {
			const key = Symbol();
			subscriptions.set(key, listener);
			return () => subscriptions.delete(key);
		},
	};
};

export const createStore = <T>(reducer: StoreReducer<T>) => {
	let store = {} as T;
	const emitter = createEmitter();

	const setStore: StateSetter<T> = (action) => {
		if (action instanceof Function) {
			store = action(store);
		} else {
			store = action;
		}
		emitter.emit(store);
	};
	store = reducer();

	const useStore = (): [T, StateSetter<T>] => {
		const [localStore, setLocalStore] = useState(store);
		emitter.subscribe(setLocalStore);
		return [localStore, setStore];
	};

	return useStore;
};

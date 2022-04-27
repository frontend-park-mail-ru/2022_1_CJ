import { useEffect } from "./useEffect";
import { StateSetter, useState } from "./useState";

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

export const createStore = <T>(initialState: T) => {
	let store = initialState;
	const emitter = createEmitter();

	const setStore: StateSetter<T> = (action) => {
		store = action instanceof Function ? action(store) : action;
		emitter.emit(store);
	};

	const useStore = (): [T, StateSetter<T>] => {
		const [_, setLocalStore] = useState(store);
		useEffect(() => emitter.subscribe(setLocalStore), []);
		return [store, setStore];
	};

	return useStore;
};

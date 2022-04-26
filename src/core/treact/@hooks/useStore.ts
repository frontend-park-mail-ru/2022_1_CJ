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
		if (action instanceof Function) {
			store = action(store);
		} else {
			store = action;
		}
		emitter.emit(store);
	};

	// TODO: fix the ud behaviour, switch to returning localStore
	const useStore = (): [T, StateSetter<T>] => {
		const [_, setLocalStore] = useState(store);
		useEffect(() => emitter.subscribe(setLocalStore), []);
		return [store, setStore];
	};

	return useStore;
};

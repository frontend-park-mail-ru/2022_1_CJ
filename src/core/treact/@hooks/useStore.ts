import { useEffect } from "./useEffect";
import { StateSetter, useState } from "./useState";

type UseStoreFunction<T> = () => [T, StateSetter<T>];
type UpdateStoreFunction<T> = (update: Partial<T>) => void;

// TODO: use cleanup
const createEmitter = <T>() => {
	const subscriptions = new Map();
	return {
		emit: (store: T) => subscriptions.forEach((listener) => listener(store)),
		subscribe: (listener: (store: T) => void) => {
			const key = Symbol();
			subscriptions.set(key, listener);
			return () => subscriptions.delete(key);
		},
	};
};

// TODO: switch to update
export const createStore = <T>(initialState: T): [UseStoreFunction<T>, UpdateStoreFunction<T>] => {
	let store = initialState;
	const emitter = createEmitter();

	const setStore: StateSetter<T> = (action) => {
		store = action instanceof Function ? action(store) : action;
		emitter.emit(store);
	};

	const updateStore: UpdateStoreFunction<T> = (update) => {
		store = { ...store, ...update };
		emitter.emit(store);
	};

	const useStore: UseStoreFunction<T> = () => {
		const [localStore, setLocalStore] = useState(store);
		useEffect(() => emitter.subscribe(setLocalStore), []);
		return [localStore, setStore];
	};

	return [useStore, updateStore];
};

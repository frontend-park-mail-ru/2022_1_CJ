import { useEffect } from "./useEffect";
import { StateSetter, useState } from "./useState";

type UpdateStoreFunction<T> = (update: Partial<T>) => void;
type StoreModifier<T> = { set: StateSetter<T>; update: UpdateStoreFunction<T> };
type UseStoreFunction<T> = () => [T, StoreModifier<T>];

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

export const createStore = <T>(initialState: T): [UseStoreFunction<T>, StoreModifier<T>] => {
	let store = initialState;
	const emitter = createEmitter();

	const set: StateSetter<T> = (action) => {
		store = action instanceof Function ? action(store) : action;
		emitter.emit(store);
	};

	const update: UpdateStoreFunction<T> = (update) => {
		store = { ...store, ...update };
		emitter.emit(store);
	};

	const use: UseStoreFunction<T> = () => {
		const [localStore, setLocalStore] = useState(store);
		useEffect(() => emitter.subscribe(setLocalStore), []);
		return [localStore, { set, update }];
	};

	return [use, { set, update }];
};

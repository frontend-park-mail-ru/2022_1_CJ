import { State } from "../models";

export const isEqual = (a: object, b: object) => {
	if (Object.keys(a).length === Object.keys(b).length) {
		return Object.keys(a).every((key) => b.hasOwnProperty(key) && (a as any)[key] === (b as any)[key]);
	}
	return false;
};

export const getLastHook = () => {
	if (State.wipFiber.alternate && State.wipFiber.alternate.hooks) {
		return State.wipFiber.alternate.hooks[State.hookIndex];
	}
	return undefined;
};

import { State } from "../models";
import { getLastHook } from "./common";

export type SetStateAction<T> = ((prevState: T) => T) | T;
export type StateSetter<T> = (action: SetStateAction<T>) => void;

export const useState = <T>(initial: T): [T, StateSetter<T>] => {
	const lastHook = getLastHook();
	const hook = {
		state: lastHook ? lastHook.state : initial,
		queue: [] as any[],
	};

	const actions = lastHook ? lastHook.queue : [];
	actions.forEach((action: SetStateAction<T>) => {
		if (action instanceof Function) {
			hook.state = action(hook.state);
		} else {
			hook.state = action;
		}
	});

	const setState: StateSetter<T> = (action: SetStateAction<T>) => {
		hook.queue.push(action);
		State.wipRoot = {
			node: State.currentRoot.node,
			props: State.currentRoot.props,
			alternate: State.currentRoot,
		};
		State.nextUnitOfWork = State.wipRoot;
		State.deletions = [];
	};

	if (State.wipFiber && State.wipFiber.hooks) {
		State.wipFiber.hooks.push(hook);
		State.hookIndex++;
	}

	return [hook.state, setState];
};

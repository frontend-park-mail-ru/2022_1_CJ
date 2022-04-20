import { State } from "../models";
import { getLastHook } from "./common";

type stateSetter<T> = (prevState: T) => T;

export const useState = <T>(initial: T): [T, (op: stateSetter<T> | T) => void] => {
	const lastHook = getLastHook();
	const hook = {
		state: lastHook ? lastHook.state : initial,
		queue: [] as any[],
	};

	const actions = lastHook ? lastHook.queue : [];
	actions.forEach((action: stateSetter<T> | T) => {
		if (action instanceof Function) {
			hook.state = action(hook.state);
		} else {
			hook.state = action;
		}
	});

	const setState = (action: stateSetter<T> | T) => {
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

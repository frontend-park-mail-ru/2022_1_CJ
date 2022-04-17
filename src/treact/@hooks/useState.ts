import { State } from "../models";
import { getLastHook } from "./common";

export const useState = <T>(initial: T): [T, (action: (prevState: T) => T) => void] => {
	const lastHook = getLastHook();
	const hook = {
		state: lastHook ? lastHook.state : initial,
		queue: [] as any[],
	};

	const actions = lastHook ? lastHook.queue : [];
	actions.forEach((action: any) => {
		hook.state = action(hook.state);
	});

	const setState = (action: any) => {
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

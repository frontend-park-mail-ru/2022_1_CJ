import { State } from "src/core/treact/models";
import { getLastHook } from "src/core/treact/@hooks/common";

export type SetStateAction<T> = ((prevState: T) => T) | T;
export type StateSetter<T> = (action: SetStateAction<T>) => void;

export const useState = <T>(initial: T): [T, StateSetter<T>] => {
	const lastHook = getLastHook();
	const hook = {
		state: lastHook?.state || initial,
		queue: lastHook?.queue || [],
	};

	hook.queue.forEach((action: SetStateAction<T>) => {
		hook.state = action instanceof Function ? action(hook.state) : action;
	});

	const setState: StateSetter<T> = (action: SetStateAction<T>) => {
		hook.queue.push(action);
		if (State.currentRoot) {
			State.wipRoot = {
				node: State.currentRoot.node,
				props: State.currentRoot.props,
				alternate: State.currentRoot,
			};
			State.nextUnitOfWork = State.wipRoot;
			State.deletions = [];
		}
	};

	if (State.wipFiber?.hooks) {
		State.wipFiber.hooks.push(hook);
		State.hookIndex++;
	}

	return [hook.state, setState];
};

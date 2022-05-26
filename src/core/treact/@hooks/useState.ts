import { getLastHook } from "src/core/treact/@hooks/common";
import { State } from "src/core/treact/core/models";

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
		if (State.root) {
			State.wipRoot = {
				node: State.root.node,
				props: State.root.props,
				ancestor: State.root,
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

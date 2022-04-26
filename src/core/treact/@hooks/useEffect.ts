import { State } from "../models";
import { getLastHook, isEqual } from "./common";

export const useEffect = (callback: () => void, deps: any[]) => {
	const lastHook = getLastHook();
	const hook = {
		deps,
	};

	if (!lastHook || !isEqual(lastHook.deps, hook.deps)) {
		callback();
	}

	if (State.wipFiber?.hooks) {
		State.wipFiber.hooks.push(hook);
		State.hookIndex++;
	}
};

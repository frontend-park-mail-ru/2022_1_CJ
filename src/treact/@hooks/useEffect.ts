import { State } from "../models.js";
import { getLastHook, isEqual } from "./common.js";

export const useEffect = (callback: () => void, deps: any[]) => {
	const lastHook = getLastHook();
	const hook = {
		deps,
	};

	if (!lastHook) {
		callback();
	} else {
		if (!isEqual(lastHook.deps, hook.deps)) {
			callback();
		}
	}

	if (State.wipFiber.hooks) {
		State.wipFiber.hooks.push(hook);
		State.hookIndex++;
	}
};

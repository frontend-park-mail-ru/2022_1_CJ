import { State } from "../models";
import { getLastHook, isEqual } from "./common";

export const useEffect = (callback: () => void | (() => void), deps: any[]) => {
	const lastHook = getLastHook();
	const hook = {
		deps,
	};

	if (!lastHook || !isEqual(lastHook.deps, hook.deps)) {
		// Use setTimeout to prevent causing side effects before the first render.
		setTimeout(() => {
			const cleanup = callback();
			if (cleanup instanceof Function) {
				State.cleanups.push(cleanup);
			}
		});
	}

	if (State.wipFiber?.hooks) {
		State.wipFiber.hooks.push(hook);
		State.hookIndex++;
	}
};

import { getLastHook, isEqual } from "src/core/treact/@hooks/common";
import { State } from "src/core/treact/core/models";

export const useEffect = (callback: () => any, deps: any[]) => {
	const lastHook = getLastHook();
	const hook = {
		deps,
	};

	if (!lastHook || !isEqual(lastHook.deps, hook.deps) || State.pendingUpdate) {
		// Use window.setTimeout to prevent causing side effects before the first render.
		window.setTimeout(() => {
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

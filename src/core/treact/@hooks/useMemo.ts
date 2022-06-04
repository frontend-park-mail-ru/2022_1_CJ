import { getLastHook, isEqual } from "src/core/treact/@hooks/common";
import { State } from "src/core/treact/core/models";

export const useMemo = <T>(compute: () => T, deps: any[]): T => {
	const lastHook = getLastHook();
	const hook = {
		deps,
		value: null as any,
	};

	if (lastHook) {
		if (isEqual(lastHook.deps, hook.deps)) {
			hook.value = lastHook.value;
		} else {
			hook.value = compute();
		}
	} else {
		hook.value = compute();
	}

	if (State.wipFiber.hooks) {
		State.wipFiber.hooks.push(hook);
		State.hookIndex++;
	}

	return hook.value;
};

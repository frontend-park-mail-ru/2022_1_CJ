import { useMemo } from "./useMemo.js";

export const useCallback = <T>(callback: T, deps: any[]): T => {
	return useMemo(() => callback, deps);
};

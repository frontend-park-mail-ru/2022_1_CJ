import { useMemo } from "./useMemo";

export const useCallback = <T>(callback: T, deps: any[]): T => {
	return useMemo(() => callback, deps);
};

import { useMemo } from "src/core/treact/@hooks/useMemo";

export const useCallback = <T>(callback: T, deps: any[]): T => {
	return useMemo(() => callback, deps);
};

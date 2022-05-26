import { useState } from "src/core/treact/@hooks/useState";
import { State } from "src/core/treact/core/models";

export const useUpdate = () => {
	const [, setState] = useState(null);
	return () => {
		State.pendingUpdate = true;
		setState(null);
	};
};

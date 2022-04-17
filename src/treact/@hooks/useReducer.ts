import { Action } from "../models";
import { useState } from "./useState";

export const useReducer = <T>(reducer: Function, initialState: T): [T, Function] => {
	const [state, setState] = useState(initialState);

	const dispatch = (action: Action) => {
		setState(() => reducer(state, action));
	};

	return [state, dispatch];
};

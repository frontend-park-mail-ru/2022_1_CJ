import { useReducer } from "../treact/@hooks/useReducer.js";
import { Action } from "../treact/models.js";
import { treact } from "../treact/treact.js";

export function SignupForm() {
	const reducer = (state: { count: number }, action: Action) => {
		console.log(state, action);
		switch (action.type) {
			case "increment":
				return { count: state.count + 1 };
			case "decrement":
				return { count: state.count - 1 };
			default:
				return state;
		}
	};

	const initialState = { count: 0 };

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			Count: {(state as any).count}
			<button onclick={() => dispatch({ type: "decrement" })}>-</button>
			<button onclick={() => dispatch({ type: "increment" })}>+</button>
		</div>
	);
}

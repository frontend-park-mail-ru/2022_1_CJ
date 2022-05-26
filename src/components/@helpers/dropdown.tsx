import { Component, treact } from "@treact";

type State = "hidden" | "visible";

export const DropdownMenuComponent: Component = (props) => {
	const [state, setState] = treact.useState("hidden" as State);
	return (
		<span className="dropdown">
			<img
				onClick={() => setState(state === "hidden" ? "visible" : "hidden")}
				src="/static/icons/more.svg"
				className="icon"
				alt=""
			/>
			<span className={`dropdown-content border border-sm bg-white ${state}`} style="right: 0;">
				<div className="flex flex-c">{props.children}</div>
			</span>
		</span>
	);
};

import { Component, treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";

const handleClick = (to: string) => (event: MouseEvent) => {
	event.preventDefault();
	if (window.location.pathname !== to) {
		navigateTo(to);
	}
};

export const Link: Component<{ to: string }> = ({ to, children }) => {
	return (
		<span className="link d-block pointer" onClick={handleClick(to)}>
			{children}
		</span>
	);
};

export const Navigate: Component<{ to: string }> = ({ to, children }) => {
	return (
		<span className="d-block pointer no-decoration" onClick={handleClick(to)}>
			{children}
		</span>
	);
};

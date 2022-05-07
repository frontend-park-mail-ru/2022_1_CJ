import { treact } from "@treact";
import { navigateTo } from "./@helpers/router";
import { Component } from "src/core/treact/models";

export const Link: Component = ({ to, children }: { to: string; children: object }) => {
	const handleClick = (event: MouseEvent) => {
		event.preventDefault();
		if (window.location.pathname !== to) {
			navigateTo(to);
		}
	};

	return (
		<a className="link d-block" href={to} onClick={handleClick}>
			{children}
		</a>
	);
};

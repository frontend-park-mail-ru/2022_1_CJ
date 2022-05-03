import { treact } from "@treact";
import { navigateTo } from "./@helpers/router";
import { Component } from "./@types/component";

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

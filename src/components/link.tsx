import { treact } from "@treact";
import { useRouterStore } from "src/stores/router";
import { navigateTo } from "./@helpers/router";
import { Component } from "./@types/component";

export const Link: Component = ({ to, children }: { to: string; children: object }) => {
	const [routerStore] = useRouterStore();
	const handleClick = (event: MouseEvent) => {
		event.preventDefault();
		if (routerStore.path !== to) {
			navigateTo(to);
		}
	};

	return (
		<a className="link d-block" href={to} onClick={handleClick}>
			{children}
		</a>
	);
};

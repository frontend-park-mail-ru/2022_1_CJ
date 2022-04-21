import { treact } from "@treact";
import { router } from "src/core/modules/router";
import { useRouterStore } from "src/stores/router";
import { Component } from "./@types/component";

export const Link: Component = ({ to, children }: { to: string; children: object }) => {
	const [routerStore] = useRouterStore();
	const handleClick = (event: MouseEvent) => {
		event.preventDefault();
		if (routerStore.path !== to) {
			router.navigateTo(to);
		}
	};

	return (
		<a className="link" href={to} onClick={handleClick}>
			{children}
		</a>
	);
};

import { useRouterStore } from "src/stores/router";
import { Component } from "./@types/component";

export const Route: Component = ({ path, component }: { path: string; component: Component }) => {
	const [routerStore] = useRouterStore();
	if (routerStore.path !== path) {
		return null;
	}
	return component();
};

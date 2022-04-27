import { treact } from "@treact";
import { useRouterStore } from "src/stores/router";
import { Component } from "./@types/component";

export const Route: Component = ({ to, component }: { to: string; component: Component }) => {
	const [routerStore] = useRouterStore();
	return <>{routerStore.path === to ? component() : null}</>;
};

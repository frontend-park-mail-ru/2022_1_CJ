import { Component, treact } from "@treact";
import { useRouterStore } from "src/stores/router";

export const Route: Component<{ to: string; component: Component }> = ({ to, component }) => {
	const [routerStore] = useRouterStore();
	return <>{routerStore.route === to ? component({}) : null}</>;
};

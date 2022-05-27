import { Component, treact } from "@treact";
import { Routes } from "src/constants/routes";
import { useRouterStore } from "src/stores/router";

export const Route: Component = ({ to, component }: { to: keyof typeof Routes; component: Component }) => {
	const [routerStore] = useRouterStore();
	return <>{routerStore.route === to ? component() : null}</>;
};

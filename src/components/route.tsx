import { treact, Component, ModalComponent } from "@treact";
import { useRouterStore } from "src/stores/router";

export const Route: Component = ({ to, component }: { to: string; component: Component }) => {
	const [routerStore] = useRouterStore();
	return <>{routerStore.path === to ? component() : null}</>;
};

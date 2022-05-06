import { treact } from "@treact";
import { pathToRoute } from "src/components/@helpers/router";
import { useRouterStore } from "src/stores/router";
import { Component } from "./@types/component";

export const Router: Component = (props) => {
	const [_, modRouterStore] = useRouterStore();

	const routes = (props.routes as string[]) || [];
	const children = (props.children as object) || [];

	const route = () => {
		// Use setTimeout to defer update of routerStore, so that it reaches the subscribers.
		setTimeout(() => {
			modRouterStore.update({ path: pathToRoute(window.location.pathname, routes) });
		});
	};

	treact.useEffect(() => {
		window.addEventListener("popstate", route);
	}, []);

	return <>{children}</>;
};

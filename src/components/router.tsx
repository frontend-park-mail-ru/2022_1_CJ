import { treact } from "@treact";
import { useRouterStore } from "src/stores/router";
import { Component } from "./@types/component";

const parameterRegExp = /:(\w+)/g;
const solidStringPattern = "(.+)";
const escapedURLDelimiter = "\\/";

const pathToRegex = (path: string) =>
	new RegExp(`^${path.replaceAll("/", escapedURLDelimiter).replace(parameterRegExp, solidStringPattern)}$`);

const pathToRoute = (path: string, routes: string[]) => {
	return routes.find((route) => path.match(pathToRegex(route)) !== null) || "";
};

export const Router: Component = (props) => {
	const routes = (props.routes as string[]) || [];
	const children = (props.children as object) || [];
	const [routerStore, setRouterStore] = useRouterStore();

	const route = () => {
		// Use setTimeout to defer update of routerStore, so that it reaches the subscribers.
		setTimeout(() => {
			setRouterStore({ ...routerStore, path: pathToRoute(window.location.pathname, routes) });
		});
	};

	treact.useEffect(() => {
		route();
		window.addEventListener("popstate", route);
	}, []);

	return <>{children}</>;
};

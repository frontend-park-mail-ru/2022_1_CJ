import { treact } from "@treact";
import { useRouterStore } from "src/stores/router";
import { Component } from "./@types/component";

const parameterRegExp = /:(\w+)/g;
const solidStringPattern = "(.+)";
const escapedURLDelimiter = "\\/";

const pathToRegex = (path: string) =>
	new RegExp(`^${path.replaceAll("/", escapedURLDelimiter).replace(parameterRegExp, solidStringPattern)}$`);

export const pathToRoute = (path: string, routes: string[]) => {
	return routes.find((route) => path.match(pathToRegex(route)) !== null) || "";
};

export const getParams = (route: string, path: string = window.location.pathname) => {
	const fragments = path.split("/");
	const mapping = [] as [string, string][];
	route.split("/").forEach((fragment, index) => {
		if (fragment.startsWith(":")) {
			const key = fragment.slice(1);
			mapping.push([key, fragments[index]]);
		}
	});
	return Object.fromEntries(mapping);
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
		window.addEventListener("popstate", route);
	}, []);

	return <>{children}</>;
};

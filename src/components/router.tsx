import { treact } from "@treact";
import { useRouterStore } from "src/stores/router";
import { Component } from "./@types/component";

const parameterRegExp = /:(\w+)/g;
const solidStringPattern = "(.+)";
const escapedURLDelimiter = "\\/";

const pathToRegex = (path: string) =>
	new RegExp(`^${path.replaceAll("/", escapedURLDelimiter).replace(parameterRegExp, solidStringPattern)}$`);

export const Router: Component = (props) => {
	const routes = (props.routes as string[]) || [];
	const children = props.children || [];

	const [routerStore, setRouterStore] = useRouterStore();

	const route = () => {
		const path = routes.find((route) => window.location.pathname.match(pathToRegex(route)) !== null) || "";
		setRouterStore({ ...routerStore, path });
	};

	treact.useEffect(() => {
		route();
		window.addEventListener("popstate", route);
	}, []);

	return <>{children}</>;
};

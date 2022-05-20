const parameterRegExp = /(:\w+)/g;
const solidStringPattern = "([^\\/]+)";

// TODO: precompute this
const routeToRegex = (route: string) => {
	const regex = `^${route.replaceAll("/", "\\/").replace(parameterRegExp, solidStringPattern)}$`;
	return new RegExp(regex);
};

export const pathToRoute = (path: string, routes: string[]) => {
	return routes.find((route) => path.match(routeToRegex(route)) !== null) || "";
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

export const triggerRoute = () => {
	const event = new Event("popstate");
	window.dispatchEvent(event);
};

export const navigateTo = (to: string) => {
	window.history.pushState({}, "", to);
	triggerRoute();
};

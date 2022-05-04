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

const triggerRoute = () => {
	const event = new Event("popstate");
	window.dispatchEvent(event);
};

export const navigateTo = (to: string) => {
	window.history.pushState({}, "", to);
	triggerRoute();
};

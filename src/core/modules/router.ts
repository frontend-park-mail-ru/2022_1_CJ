import { treact } from "../../treact/treact.js";
import janitor from "./janitor.js";

interface router {
	run(): void;
	navigateTo(path: string): void;
	route(path: string, handler: Function): void;
}

const parameterRegExp = /:(\w+)/g;
const solidStringPattern = "(.+)";
const escapedURLDelimiter = "\\/";

const pathToRegex = (path: string) =>
	new RegExp(`^${path.replaceAll("/", escapedURLDelimiter).replace(parameterRegExp, solidStringPattern)}$`);

const getParams = (route: string) => {
	const fragments = window.location.pathname.split("/");
	const mapping = [] as [string, string][];
	route.split("/").forEach((fragment, index) => {
		if (fragment.includes(":")) {
			const key = fragment.slice(1);
			mapping.push([key, fragments[index]]);
		}
	});
	return Object.fromEntries(mapping);
};

export class Router implements router {
	#root: HTMLElement;
	#notFoundhandler: Function;
	#routes: { path: string; handler: Function }[] = [];

	constructor(root: HTMLElement, notFoundControler: Function) {
		this.#root = root;
		this.#notFoundhandler = notFoundControler;
	}

	run() {
		this.#route();
		window.onpopstate = this.#handlePopState.bind(this);
		document.body.onclick = this.#handleClick.bind(this);
	}

	navigateTo(path: string) {
		window.history.pushState(null, "", path);
		this.#route();
	}

	route(path: string, handler: Function) {
		this.#routes.push({ path, handler });
	}

	#route() {
		janitor.cleanup();
		const match = this.#routes.find((route) => window.location.pathname.match(pathToRegex(route.path)) !== null);
		if (match) {
			const params = getParams(match.path);
			treact.render(match.handler({ params }), this.#root);
		} else {
			treact.render(this.#notFoundhandler, this.#root);
		}
	}

	#handleClick(event: UIEvent) {
		if (event.target instanceof HTMLLinkElement) {
			if (event.target.matches("[data-link]")) {
				event.preventDefault();
				this.navigateTo(event.target.href);
			}
		}
	}

	#handlePopState() {
		this.#route();
	}
}

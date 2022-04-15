import { Controller } from "../models/controller.js";
import janitor from "./janitor.js";

interface router {
	run(): void;
	navigateTo(path: string): void;
	route(path: string, controller: Controller): void;
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
	#notFoundController: Controller;
	#routes: { path: string; controller: Controller }[] = [];

	constructor(root: HTMLElement, notFoundControler: Controller) {
		this.#root = root;
		this.#notFoundController = notFoundControler;
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

	route(path: string, controller: Controller) {
		this.#routes.push({ path, controller });
	}

	#route() {
		janitor.cleanup();
		const match = this.#routes.find((route) => window.location.pathname.match(pathToRegex(route.path)) !== null);
		if (match) {
			const params = getParams(match.path);
			match.controller.handle({ root: this.#root, params });
		} else {
			this.#notFoundController.handle({ root: this.#root });
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

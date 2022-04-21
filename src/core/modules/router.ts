import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { RouterStore, useRouterStore } from "src/stores/router";
import { StateSetter } from "../treact/@hooks/useState";

interface IRotuer {
	navigateTo(path: string): void;
}

const parameterRegExp = /:(\w+)/g;
const solidStringPattern = "(.+)";
const escapedURLDelimiter = "\\/";

const pathToRegex = (path: string) =>
	new RegExp(`^${path.replaceAll("/", escapedURLDelimiter).replace(parameterRegExp, solidStringPattern)}$`);

export const getParams = (route: string) => {
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

export class Router implements IRotuer {
	#root: HTMLElement;
	#notFoundhandler: Component;
	#routes: { path: string; handler: Component }[] = [];
	#setRouterStore: StateSetter<RouterStore>;

	constructor() {
		this.#setRouterStore = useRouterStore()[1];
		window.addEventListener("popstate", this.#handlePopState.bind(this));
	}

	setRoot(root: HTMLElement) {
		this.#root = root;
	}

	setNotFoundhandler(handler: Component) {
		this.#notFoundhandler = handler;
	}

	navigateTo(path: string) {
		if (path !== window.location.pathname) {
			window.history.pushState(null, "", path);
			this.#setRouterStore({ path });
		}
	}

	#route() {
		const match = this.#routes.find((route) => window.location.pathname.match(pathToRegex(route.path)) !== null);
		console.log(match);
		if (match) {
			this.#setRouterStore({ path: match.path });
		} else {
			treact.render(this.#notFoundhandler(), this.#root);
		}
	}

	#handlePopState() {
		this.#route();
	}
}

export const router = new Router();

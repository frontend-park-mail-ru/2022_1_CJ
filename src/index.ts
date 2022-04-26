import { treact } from "@treact";
import { App } from "./app";
import "./assets/styles/index.scss";

const root = document.getElementById("root") || document.body;

// TODO: pretty hacky
window.history.pushState = new Proxy(window.history.pushState, {
	apply: (target, thisArg, argArray) => {
		setTimeout(() => {
			const event = new Event("popstate");
			window.dispatchEvent(event);
		});
		return target.apply(thisArg, argArray);
	},
});

document.addEventListener("DOMContentLoaded", () => {
	treact.render(App(), root);
});

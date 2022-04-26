import { treact } from "@treact";
import { App } from "./app";
import "./assets/styles/index.scss";

const root = document.getElementById("root") || document.body;

// TODO: pretty hacky
window.history.pushState = new Proxy(window.history.pushState, {
	apply: (target, thisArg, argArray) => {
		setTimeout(() => {
			const myEvent = new Event("popstate");
			window.dispatchEvent(myEvent);
		});
		return target.apply(thisArg, argArray);
	},
});

document.addEventListener("DOMContentLoaded", () => {
	treact.render(App(), root);
});

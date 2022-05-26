import { treact } from "@treact";
import { App } from "src/app";
import { triggerRoute } from "src/components/@helpers/router";
import { useRouterStore } from "src/stores/router";
import "/src/assets/styles/index.scss";

const root = document.getElementById("root") || document.body;

document.addEventListener("DOMContentLoaded", () => {
	treact.render(App(), root);
});

window.onoffline = () => {
	const [, modRouterStore] = useRouterStore();
	modRouterStore.update({ state: "offline" });
	triggerRoute();
};

window.ononline = () => {
	const [, modRouterStore] = useRouterStore();
	modRouterStore.update({ state: "online" });
	triggerRoute();
};

window.onerror = (message: any, uri: string, lineNumber: number, columnNumber?: number): boolean => {
	console.log(`${message} - ${uri}:${lineNumber}:${columnNumber}`);
	return true;
};

import { treact } from "@treact";
import { App } from "./app";
import "./assets/styles/index.scss";

const root = document.getElementById("root") || document.body;

document.addEventListener("DOMContentLoaded", () => {
	treact.render(App(), root);
});

window.onerror = (message: any, uri: string, lineNumber: number, columnNumber?: number): boolean => {
	console.log(`${message} - ${uri}:${lineNumber}:${columnNumber}`);
	return true;
};

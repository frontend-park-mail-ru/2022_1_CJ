import { treact } from "@treact";
import { App } from "./app";
import "./assets/styles/index.scss";

const root = document.getElementById("root") || document.body;

document.addEventListener("DOMContentLoaded", () => {
	treact.render(App(), root);
});

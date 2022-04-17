import "./index.module.scss";
import { URL } from "./constants/constants";
import { Router } from "./core/modules/router";
import { NotFound } from "./views/notFound";
import { Signup } from "./views/signup";

const root = document.getElementById("root") || document.body;
const router = new Router(root, NotFound);

document.addEventListener("DOMContentLoaded", () => {
	router.route(URL.Signup, Signup);
	router.run();
});

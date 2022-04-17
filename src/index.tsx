import { URL } from "./constants/constants.js";
import { Router } from "./core/modules/router.js";
import { NotFound } from "./views/notFound.js";
import { Signup } from "./views/signup.js";

const root = document.getElementById("root") || document.body;
const router = new Router(root, NotFound);

document.addEventListener("DOMContentLoaded", () => {
	router.route(URL.Signup, Signup);
	router.run();
});

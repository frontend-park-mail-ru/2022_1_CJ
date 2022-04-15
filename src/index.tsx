import { URL } from "./constants/constants.js";
import { notFoundController } from "./controllers/notFound.js";
import { signupController } from "./controllers/signup.js";
import { Router } from "./core/modules/router.js";

const root = document.getElementById("root") || document.body;
const router = new Router(root, notFoundController);

document.addEventListener("DOMContentLoaded", () => {
	router.route(URL.Base, signupController);
	router.run();
});

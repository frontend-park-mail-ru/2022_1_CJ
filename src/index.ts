import { treact } from "@treact";
import { App } from "./app";
import "./assets/styles/index.scss";
import { router } from "./core/modules/router";
import { NotFound } from "./views/notFound";

const root = document.getElementById("root") || document.body;
router.setRoot(root);
router.setNotFoundhandler(NotFound);

document.addEventListener("DOMContentLoaded", () => {
	// router.route(URL.Signup, Signup);
	// router.route(URL.Login, Login);
	// router.route(URL.Feed, Feed);
	// router.run();
	treact.render(App(), root);
});

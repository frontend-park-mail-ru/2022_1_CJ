import Signup from "./views/SignupView.js";
import Login from "./views/LoginView.js";
import Router from "./libs/router.js";
import NotFound from "./views/NotFound.js";

const root = document.getElementById('root');
const router = new Router(root);

document.addEventListener("DOMContentLoaded", () => {
  router.setRoute("/signup", Signup);
  router.setRoute("/login", Login);
  router.setNotFoundHandler(NotFound);
  router.run();
});

import { signupFormComponent } from "../components/signupForm.js";
import { ControlerContext, createController } from "../core/models/controller.js";

const reducer = async (context: ControlerContext) => {
	context.root.innerHTML = signupFormComponent(context);
};

export const signupController = createController(reducer);

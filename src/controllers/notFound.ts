import { ControlerContext, createController } from "../core/models/controller.js";

const reducer = async (context: ControlerContext) => {
	console.log(context);
	console.log(window.location.pathname);
};

export const notFoundController = createController(reducer);

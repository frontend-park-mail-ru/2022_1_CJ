export interface Controller {
	handle(context: Object): void;
}

export interface ControlerContext {
	root: HTMLElement;
}

export const createController = (reducer: (context: ControlerContext) => void, enhancer?: Function) => {
	if (enhancer) {
		return enhancer(createController)(reducer);
	}

	const controller: Controller = {
		handle: (context: ControlerContext) => reducer(context),
	};

	return controller;
};

// /**
//  * Returns so-called enhancer which creates controller with given middlewares.
//  * Such solution ensures that a controller is decorated only once.
//  * @param  {...Function} middlewares
//  * @returns {Function} enhancer
//  */
// export const applyMiddlewares =
// 	(...middlewares) =>
// 	(createController) =>
// 	(reducer) => {
// 		const controller = createController(reducer);
// 		controller.handle = Object.values(middlewares).reduce(
// 			(handle, middleware) => (handle = middleware(handle)),
// 			controller.handle
// 		);
// 		return controller;
// 	};

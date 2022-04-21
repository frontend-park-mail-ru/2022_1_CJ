import { treact } from "@treact";

export type RouterStore = {
	path: string;
};

export const useRouterStore = treact.createStore((): RouterStore => {
	return {
		path: window.location.pathname,
	};
});

import { treact } from "@treact";

export type RouterStore = {
	path: string;
};

export const useRouterStore = treact.createStore({ path: window.location.pathname } as RouterStore);

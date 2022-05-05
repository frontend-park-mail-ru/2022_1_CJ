import { treact } from "@treact";
import { pathToRoute } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";

export type RouterStore = {
	path: string;
};

export const useRouterStore = treact.createStore({
	path: pathToRoute(window.location.pathname, Object.values(Routes)),
} as RouterStore);

import { treact } from "@treact";
import { pathToRoute } from "src/components/@helpers/router";
import { URL } from "src/constants/constants";

export type RouterStore = {
	path: string;
};

export const useRouterStore = treact.createStore({
	path: pathToRoute(window.location.pathname, Object.values(URL)),
} as RouterStore);

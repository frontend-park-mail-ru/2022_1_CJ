import { treact } from "@treact";
import { pathToRoute } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";

type RouterState = "online" | "offline";

export type RouterStore = {
	path: string;
	state: RouterState;
};

export const [useRouterStore] = treact.createStore({
	path: window.navigator.onLine ? pathToRoute(window.location.pathname, Object.values(Routes)) : Routes.Offline,
	state: window.navigator.onLine ? "online" : "offline",
} as RouterStore);

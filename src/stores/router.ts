import { treact } from "@treact";
import { navigateTo, pathToRoute } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";
import { fetchAPI } from "src/core/network/api/common";

type RouterState = "online" | "offline";

export type RouterStore = {
	route: string;
	state: RouterState;
};

const getInitialRoute = () => {
	if (window.location.pathname.startsWith("/api")) {
		fetchAPI.get(location.pathname.concat(window.location.search)).then(() => navigateTo(Routes.Base));
		return Routes.Base;
	}
	return window.navigator.onLine ? pathToRoute(window.location.pathname, Object.values(Routes)) : Routes.Offline;
};

export const [useRouterStore] = treact.createStore({
	route: getInitialRoute(),
	state: window.navigator.onLine ? "online" : "offline",
} as RouterStore);

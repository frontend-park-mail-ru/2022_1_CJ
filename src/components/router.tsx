import { Component, treact } from "@treact";
import { pathToRoute } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";
import { fetchAPI } from "src/core/network/api/common";
import { useAlertStore } from "src/stores/alert";
import { useRouterStore } from "src/stores/router";

export const route = () => {
	if (window.location.pathname.startsWith("/api")) {
		fetchAPI.get(location.pathname.concat(window.location.search));
		return;
	}

	const [, modAlertStore] = useAlertStore();
	const [routerStore, modRouterStore] = useRouterStore();
	if (routerStore.state === "online") {
		modAlertStore.set(undefined);
		modRouterStore.update({ route: pathToRoute(window.location.pathname, Object.values(Routes)) });
	} else if (routerStore.state === "offline") {
		modRouterStore.update({ route: Routes.Offline });
	}
};

export const Router: Component = (props) => {
	const children = (props.children as object) || [];
	treact.useEffect(() => {
		window.addEventListener("popstate", route);
	}, []);
	return <>{children}</>;
};

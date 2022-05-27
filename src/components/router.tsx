import { Component, treact } from "@treact";
import { navigateTo, pathToRoute } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";
import { fetchAPI } from "src/core/network/api/common";
import { useRouterStore } from "src/stores/router";

const route = () => {
	if (window.location.pathname.startsWith("/api")) {
		console.log("fetch", window.location.pathname.concat(window.location.search));
		fetchAPI.get(window.location.pathname.concat(window.location.search)).then(
			() => navigateTo(Routes.Base),
			() => navigateTo(Routes.Base)
		);
	}

	const [routerStore, modRouterStore] = useRouterStore();
	if (routerStore.state === "online") {
		// Use setTimeout to defer update of routerStore, so that it reaches the subscribers.
		setTimeout(() => {
			modRouterStore.update({ path: pathToRoute(window.location.pathname, Object.values(Routes)) });
		});
	} else if (routerStore.state === "offline") {
		modRouterStore.update({ path: Routes.Offline });
	}
};

export const Router: Component = (props) => {
	const children = (props.children as object) || [];
	treact.useEffect(() => {
		window.addEventListener("popstate", route);
	}, []);
	return <>{children}</>;
};

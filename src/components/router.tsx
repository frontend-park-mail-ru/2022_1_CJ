import { Component, treact } from "@treact";
import { pathToRoute } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";
import { useRouterStore } from "src/stores/router";

const route = () => {
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

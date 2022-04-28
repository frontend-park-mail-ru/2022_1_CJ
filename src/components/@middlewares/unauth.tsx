import { treact } from "@treact";
import { URL } from "src/constants/constants";
import { userAPI } from "src/core/network/api/user";
import { UserStatus, useUserStore } from "src/stores/user";
import { navigateTo } from "../@helpers/router";
import { Component } from "../@types/component";
import { Layout } from "../layout";
import { Loader } from "../loader";

export const UnauthMiddleware: Component = (props) => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		userStore.status = UserStatus.Pending;
		userAPI.getUserData().then(
			(response) => {
				setUserStore({ ...userStore, user: response.user, status: UserStatus.Authorized });
			},
			() => {
				setUserStore({ ...userStore, user: null, status: UserStatus.Unauthorized });
			}
		);
	}, []);

	if (userStore.status === UserStatus.Unauthorized) {
		return <Layout>{props.children}</Layout>;
	}

	if (userStore.status === UserStatus.Authorized) {
		navigateTo(URL.Feed);
		return null;
	}

	return <Loader />;
};

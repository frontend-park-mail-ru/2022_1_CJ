import { treact } from "@treact";
import { URL } from "src/constants/constants";
import { userAPI } from "src/core/network/api/user";
import { UserStatus, useUserStore } from "src/stores/user";
import { navigateTo } from "../@helpers/router";
import { Component } from "../@types/component";

export const AuthMiddleware: Component = (props) => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		if (userStore.status === UserStatus.Pending) {
			userAPI.getUserData().then(
				(response) => {
					setUserStore({ ...userStore, user: response.user, status: UserStatus.Authorized });
				},
				() => {
					setUserStore({ ...userStore, user: null, status: UserStatus.Unauthorized });
				}
			);
		}
	}, []);

	if (userStore.status === UserStatus.Authorized) {
		return <>{props.children}</>;
	}

	if (userStore.status === UserStatus.Unauthorized) {
		navigateTo(URL.Login);
	}

	return null;
};

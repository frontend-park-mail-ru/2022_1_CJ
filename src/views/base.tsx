import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/components/@types/component";
import { Routes } from "src/constants/routes";
import { userAPI } from "src/core/network/api/user";
import { UserStatus, useUserStore } from "src/stores/user";

export const Base: Component = () => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		userAPI.getUserData().then(
			(response) => {
				setUserStore({ ...userStore, user: response.user, status: UserStatus.Authorized });
			},
			() => {
				setUserStore({ ...userStore, user: null, status: UserStatus.Unauthorized });
			}
		);
	}, []);

	if (userStore.status !== UserStatus.Unset) {
		if (userStore.status === UserStatus.Authorized) {
			navigateTo(Routes.Feed);
		} else {
			navigateTo(Routes.Login);
		}
	}

	return null;
};

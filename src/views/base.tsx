import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/core/treact/models";
import { Routes } from "src/constants/routes";
import { userAPI } from "src/core/network/api/user";
import { UserStatus, useUserStore } from "src/stores/user";

export const Base: Component = () => {
	const [userStore, modUserStore] = useUserStore();

	treact.useEffect(() => {
		userAPI.getUserData().then(
			(response) => modUserStore.update({ user: response.user, status: UserStatus.Authorized }),
			() => modUserStore.update({ user: null, status: UserStatus.Unauthorized })
		);
	}, []);

	if (userStore.status === UserStatus.Authorized) {
		navigateTo(Routes.Feed);
	} else if (userStore.status === UserStatus.Unauthorized) {
		navigateTo(Routes.Login);
	}

	return null;
};

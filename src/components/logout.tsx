import { URL } from "src/constants/constants";
import { authAPi } from "src/core/network/api/auth";
import { UserStatus, useUserStore } from "src/stores/user";
import { navigateTo } from "./@helpers/router";
import { Component } from "./@types/component";

export const Logout: Component = () => {
	const [_, setUserStore] = useUserStore();
	authAPi.logoutUser().then(() => {
		setUserStore({ user: null, status: UserStatus.Unauthorized });
		navigateTo(URL.Login);
	});
	return null;
};

import { Routes } from "src/constants/routes";
import { authAPi } from "src/core/network/api/auth";
import { userStoreInitialState, useUserStore } from "src/stores/user";
import { navigateTo } from "./@helpers/router";
import { Component } from "./@types/component";

export const Logout: Component = () => {
	const [_, setUserStore] = useUserStore();
	authAPi.logoutUser().then(() => {
		setUserStore(userStoreInitialState);
		navigateTo(Routes.Login);
	});
	return null;
};

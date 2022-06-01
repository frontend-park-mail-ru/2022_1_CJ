import { Component } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";
import { logoutUser } from "src/core/network/api/auth/logoutUser";
import { userStoreInitialState, useUserStore } from "src/stores/user";

export const Logout: Component = () => {
	const [_, modUserStore] = useUserStore();
	logoutUser().then(() => {
		modUserStore.set(userStoreInitialState);
		navigateTo(Routes.Login);
	});
	return null;
};

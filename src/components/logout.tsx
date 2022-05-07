import { Routes } from "src/constants/routes";
import { authAPi } from "src/core/network/api/auth";
import { userStoreInitialState, useUserStore } from "src/stores/user";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/core/treact/models";

export const Logout: Component = () => {
	const [_, modUserStore] = useUserStore();
	authAPi.logoutUser().then(() => {
		modUserStore.set(userStoreInitialState);
		navigateTo(Routes.Login);
	});
	return null;
};

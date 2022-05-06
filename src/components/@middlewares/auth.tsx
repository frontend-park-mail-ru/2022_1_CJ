import { treact } from "@treact";
import { Routes } from "src/constants/routes";
import { userAPI } from "src/core/network/api/user";
import { UserStatus, useUserStore } from "src/stores/user";
import { navigateTo } from "../@helpers/router";
import { Component } from "../@types/component";
import { Spinner } from "../spinner";

export enum AuthMiddlewarePolicy {
	Authorized,
	Unauthorized,
}

export const AuthMiddleware: Component = (props) => {
	const [userStore, modUserStore] = useUserStore();
	const { children } = props;
	const policy = props.policy || AuthMiddlewarePolicy.Authorized;

	treact.useEffect(() => {
		userAPI.getUserData().then(
			(response) => modUserStore.update({ user: response.user, status: UserStatus.Authorized }),
			() => modUserStore.update({ user: null, status: UserStatus.Unauthorized })
		);
	}, []);

	if (userStore.status !== UserStatus.Unset) {
		const authorizedPolicy = policy === AuthMiddlewarePolicy.Authorized;
		const authorizedStatus = userStore.status === UserStatus.Authorized;
		const consensus = authorizedPolicy === authorizedStatus;

		if (consensus) {
			return <>{children}</>;
		}

		if (authorizedStatus) {
			navigateTo(Routes.Feed);
		} else {
			navigateTo(Routes.Login);
		}
	}

	return <Spinner />;
};

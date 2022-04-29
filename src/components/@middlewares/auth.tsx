import { treact } from "@treact";
import { URL } from "src/constants/constants";
import { userAPI } from "src/core/network/api/user";
import { UserStatus, useUserStore } from "src/stores/user";
import { navigateTo } from "../@helpers/router";
import { Component } from "../@types/component";

export enum AuthMiddlewarePolicy {
	Authorized,
	Unauthorized,
}

export const AuthMiddleware: Component = (props) => {
	const [userStore, setUserStore] = useUserStore();
	const { children } = props;
	const policy = props.policy || AuthMiddlewarePolicy.Authorized;

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
		const authorizedPolicy = policy === AuthMiddlewarePolicy.Authorized;
		const authorizedStatus = userStore.status === UserStatus.Authorized;
		const consensus = authorizedPolicy === authorizedStatus;

		if (consensus) {
			return <>{children}</>;
		}

		if (authorizedStatus) {
			navigateTo(URL.Feed);
		} else {
			navigateTo(URL.Login);
		}
	}

	return null;
};

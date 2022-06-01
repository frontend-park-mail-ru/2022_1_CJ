import { Component, treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Spinner } from "src/components/spinner";
import { Routes } from "src/constants/routes";
import { apiUserGetData } from "src/core/network/api/user/getData";
import { UserStatus, useUserStore } from "src/stores/user";

export enum AuthMiddlewarePolicy {
	Authorized,
	Unauthorized,
}

export const AuthMiddleware: Component<{ policy?: AuthMiddlewarePolicy }> = ({
	children,
	policy = AuthMiddlewarePolicy.Authorized,
}) => {
	const [userStore, modUserStore] = useUserStore();

	treact.useEffect(() => {
		apiUserGetData().then(
			(response) => modUserStore.update({ user: response.user, status: UserStatus.Authorized }),
			() => modUserStore.update({ user: undefined, status: UserStatus.Unauthorized })
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

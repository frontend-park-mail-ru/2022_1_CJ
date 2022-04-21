import { treact } from "@treact";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";
import { Component } from "../@types/component";

enum Status {
	Pending,
	Authorized,
	Unauthorized,
}

export const AuthMiddleware: Component = (props) => {
	const [_, setUserStore] = useUserStore();
	const [status, setStatus] = treact.useState(Status.Pending);

	treact.useEffect(() => {
		userAPI.getUserData().then(
			(response) => {
				setUserStore((state) => ({ ...state, user: response.user }));
				setStatus(Status.Authorized);
			},
			() => {
				setUserStore({ user: null });
				setStatus(Status.Unauthorized);
			}
		);
	});

	if (status === Status.Authorized) {
		return <>{props.children}</>;
	}
	return null;
};

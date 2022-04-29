import { treact } from "@treact";
import { URL, urlWithParameters } from "src/constants/constants";
import { useUserStore } from "src/stores/user";
import { Component } from "./@types/component";
import { Link } from "./link";

export const Menu: Component = () => {
	const [userStore] = useUserStore();
	return (
		<div className="flow" style="--flow-space: 0.5rem;">
			<Link to={urlWithParameters(URL.Profile, { user_id: userStore.user?.id })}>Profile</Link>
			<Link to={URL.Feed}>Feed</Link>
			<Link to={URL.Messenger}>Messenger</Link>
			<Link to={URL.Friends}>Friends</Link>
		</div>
	);
};

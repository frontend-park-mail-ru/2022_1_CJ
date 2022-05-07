import { treact } from "@treact";
import { Routes, withParameters } from "src/constants/routes";
import { useUserStore } from "src/stores/user";
import { Component } from "src/core/treact/models";
import { Link } from "src/components/link";

export const Menu: Component = () => {
	const [userStore] = useUserStore();
	return (
		<div className="flow" style="--flow-space: 0.5rem;">
			<Link to={withParameters(Routes.Profile, { user_id: userStore.user?.id })}>Profile</Link>
			<Link to={Routes.Feed}>Feed</Link>
			<Link to={Routes.Messenger}>Messenger</Link>
			<Link to={Routes.Friends}>Friends</Link>
			<Link to={Routes.Communities}>Communities</Link>
		</div>
	);
};

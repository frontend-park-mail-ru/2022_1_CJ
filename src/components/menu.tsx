import { Component, treact } from "@treact";
import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { useUserStore } from "src/stores/user";
import "/src/assets/styles/modules/menu.scss";

export const Menu: Component = () => {
	const [userStore] = useUserStore();
	return (
		<div className="menu">
			<Link to={withParameters(Routes.Profile, { user_id: userStore.user?.id })}>Profile</Link>
			<Link to={Routes.Feed}>Feed</Link>
			<Link to={Routes.Messenger}>Messenger</Link>
			<Link to={Routes.Friends}>Friends</Link>
			<Link to={Routes.Communities}>Communities</Link>
		</div>
	);
};

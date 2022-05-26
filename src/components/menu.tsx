import { Component, treact } from "@treact";
import { Navigate } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { useUserStore } from "src/stores/user";
import "/src/assets/styles/modules/menu.scss";

export const Menu: Component = () => {
	const [userStore] = useUserStore();
	return (
		<div className="menu items-stretch">
			<Navigate to={withParameters(Routes.Profile, { user_id: userStore.user?.id })}>
				<div className="menu-item btn btn-transparent" style="width: 100%;">
					<img src="/static/icons/profile.svg" className="icon" alt="" />
					Profile
				</div>
			</Navigate>
			<Navigate to={Routes.Feed}>
				<div className="menu-item btn btn-transparent" style="width: 100%;">
					<img src="/static/icons/feed.svg" className="icon" alt="" />
					Feed
				</div>
			</Navigate>
			<Navigate to={Routes.Messenger}>
				<div className="menu-item btn btn-transparent" style="width: 100%;">
					<img src="/static/icons/messages.svg" className="icon" alt="" />
					Messenger
				</div>
			</Navigate>
			<Navigate to={Routes.Friends}>
				<div className="menu-item btn btn-transparent" style="width: 100%;">
					<img src="/static/icons/friends.svg" className="icon" alt="" />
					Friends
				</div>
			</Navigate>
			<Navigate to={Routes.Communities}>
				<div className="menu-item btn btn-transparent" style="width: 100%;">
					<img src="/static/icons/communities.svg" className="icon" alt="" />
					Communities
				</div>
			</Navigate>
		</div>
	);
};

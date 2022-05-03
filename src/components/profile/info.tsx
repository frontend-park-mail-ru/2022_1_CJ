import { treact } from "@treact";
import { CurrentUserProfileInfo } from "src/components/profile/currentUserProfile";
import { ForeignUserProfileInfo } from "src/components/profile/foreignUserProfile";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";
import { Component } from "../@types/component";

export const ProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		const getFriends = () => {
			friendsAPI.getFriends().then((response) => {
				Promise.all([
					response.friend_ids.map((user_id) =>
						userAPI.getUserData({ user_id }).then((r) => userStore.friends.push(r.user))
					),
				]);
			});
		};

		const getIncomingFriendRequests = () => {
			friendsAPI.getIncomingFriendRequests().then((response) => {
				Promise.all([
					response.request_ids.map((user_id) =>
						userAPI.getUserData({ user_id }).then((r) => userStore.incomingRequests.push(r.user))
					),
				]);
			});
		};

		Promise.allSettled([getFriends(), getIncomingFriendRequests()]).then(() => setUserStore(userStore));
	}, []);

	if (userStore.user.id === user_id) {
		return <CurrentUserProfileInfo />;
	}

	return <ForeignUserProfileInfo user_id={user_id} />;
};

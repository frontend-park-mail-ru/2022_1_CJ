import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { CurrentUserProfileInfo } from "src/components/profile/currentUserProfile";
import { OtherUserProfileInfo } from "src/components/profile/otherUserProfile";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const ProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		const friends = [] as User[];
		const getFriends = async () => {
			const response = await friendsAPI.getFriends();
			const ids = response.friend_ids || [];
			await Promise.all(ids.map((user_id) => userAPI.getUserData({ user_id }).then((r) => friends.push(r.user))));
		};

		const incomingRequests = [] as User[];
		const getIncomingFriendRequests = async () => {
			const response = await friendsAPI.getIncomingFriendRequests();
			const ids = response.request_ids || [];
			await Promise.all(
				ids.map((user_id) => userAPI.getUserData({ user_id }).then((r) => incomingRequests.push(r.user)))
			);
		};

		const outcomingRequests = [] as User[];
		const getOutcomingFriendRequests = async () => {
			const response = await friendsAPI.getOutcomingFriendRequests();
			const ids = response.request_ids || [];
			await Promise.all(
				ids.map((user_id) => userAPI.getUserData({ user_id }).then((r) => outcomingRequests.push(r.user)))
			);
		};

		Promise.all([getFriends(), getIncomingFriendRequests(), getOutcomingFriendRequests()]).then(() =>
			setUserStore({ ...userStore, friends, incomingRequests })
		);
	}, []);

	if (userStore.user.id === user_id) {
		return <CurrentUserProfileInfo />;
	}

	return <OtherUserProfileInfo user_id={user_id} />;
};

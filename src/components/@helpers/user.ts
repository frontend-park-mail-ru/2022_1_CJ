import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const fetchUsers = (userIDs: string[]) => {
	const promises = userIDs.map((user_id) => userAPI.getUserData({ user_id }).then((response) => response.user));
	return Promise.all(promises);
};

export const updateFriendsState = () => {
	const [userStore, setUserStore] = useUserStore();
	Promise.all([
		friendsAPI.getFriends().then((response) => response.friend_ids || []),
		friendsAPI.getIncomingFriendRequests().then((response) => response.request_ids || []),
		friendsAPI.getOutcomingFriendRequests().then((response) => response.request_ids || []),
	]).then(([friends, incomingRequests, outcomingRequests]) => {
		setUserStore({ ...userStore, friends, incomingRequests, outcomingRequests });
	});
};

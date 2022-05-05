import { treact } from "@treact";
import { updateFriendsState } from "src/components/@helpers/user";
import { Component } from "src/components/@types/component";
import { friendsAPI } from "src/core/network/api/friends";
import { useUserStore } from "src/stores/user";

export const FriendButton: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();

	const addFriend = () => {
		friendsAPI.sendFriendRequest({ user_id }).then(updateFriendsState);
	};

	const acceptFriend = () => {
		friendsAPI.acceptFriendRequest({ user_id, is_accepted: true }).then(updateFriendsState);
	};

	const unfollow = () => {
		friendsAPI.acceptFriendRequest({ user_id, is_accepted: false }).then(updateFriendsState);
	};

	const unfriend = () => {
		friendsAPI.deleteFriend({ ex_friend_id: user_id }).then(updateFriendsState);
	};

	if (userStore.friends.includes(user_id)) {
		return (
			<button onClick={unfriend} className="btn btn-negative">
				Unfriend
			</button>
		);
	} else if (userStore.incomingRequests.includes(user_id)) {
		return (
			<button onClick={acceptFriend} className="btn btn-secondary">
				Accept friend
			</button>
		);
	} else if (userStore.outcomingRequests.includes(user_id)) {
		return (
			<button onClick={unfollow} className="btn btn-negative">
				Unfollow
			</button>
		);
	}

	return (
		<button onClick={addFriend} className="btn btn-secondary">
			Add friend
		</button>
	);
};

import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { friendsAPI } from "src/core/network/api/friends";
import { updateFriendsState, useUserStore } from "src/stores/user";

export const FriendButton: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();

	const addFriend = () => {
		friendsAPI.sendRequest({ to: user_id }).then(updateFriendsState);
	};

	const acceptFriend = () => {
		friendsAPI.acceptRequest({ from: user_id }).then(updateFriendsState);
	};

	const unfollow = () => {
		friendsAPI.revokeRequest({ to: user_id }).then(updateFriendsState);
	};

	const unfriend = () => {
		friendsAPI.deleteFriend({ friend_id: user_id }).then(updateFriendsState);
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

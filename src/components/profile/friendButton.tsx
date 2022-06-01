import { Component, treact } from "@treact";
import { apiFriendsAcceptRequest } from "src/core/network/api/friends/acceptRequest";
import { apiFriendsDeleteFriend } from "src/core/network/api/friends/delete";
import { apiFriendsRevokeRequest } from "src/core/network/api/friends/revokeRequest";
import { apiFriendsSendRequest } from "src/core/network/api/friends/sendRequest";
import { updateFriendsState, useUserStore } from "src/stores/user";

export const FriendButton: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();

	const addFriend = () => {
		apiFriendsSendRequest({ to: user_id }).then(updateFriendsState);
	};

	const acceptFriend = () => {
		apiFriendsAcceptRequest({ from: user_id }).then(updateFriendsState);
	};

	const unfollow = () => {
		apiFriendsRevokeRequest({ to: user_id }).then(updateFriendsState);
	};

	const unfriend = () => {
		apiFriendsDeleteFriend({ friend_id: user_id }).then(updateFriendsState);
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

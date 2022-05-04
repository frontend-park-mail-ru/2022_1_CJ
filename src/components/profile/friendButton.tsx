import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { friendsAPI } from "src/core/network/api/friends";
import { useUserStore } from "src/stores/user";

export const FriendButton: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();

	const addFriend = () => {
		friendsAPI.sendFriendRequest({ user_id });
	};

	const acceptFriend = () => {
		friendsAPI.acceptFriendRequest({ user_id, is_accepted: true });
	};

	const unfollow = () => {
		friendsAPI.acceptFriendRequest({ user_id, is_accepted: false });
	};

	const unfriend = () => {
		friendsAPI.deleteFriend({ ex_friend_id: user_id });
	};

	if (userStore.friends.some((user) => user.id === user_id)) {
		return (
			<button onClick={unfriend} className="btn btn-negative">
				Unfriend
			</button>
		);
	}

	if (userStore.incomingRequests.some((user) => user.id === user_id)) {
		return (
			<button onClick={acceptFriend} className="btn btn-secondary">
				Accept friend
			</button>
		);
	}

	if (userStore.outcomingRequests.some((user) => user.id === user_id)) {
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

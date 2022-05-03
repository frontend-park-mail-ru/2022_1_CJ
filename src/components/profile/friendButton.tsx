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

	if (userStore.friends.find((user) => user.id === user_id)) {
		return <p>You're friends</p>;
	}

	if (userStore.incomingRequests.find((user) => user.id === user_id)) {
		return (
			<button onClick={acceptFriend} className="btn btn-secondary">
				Accept friend
			</button>
		);
	}

	return (
		<button onClick={addFriend} className="btn btn-secondary">
			Add friend
		</button>
	);
};

import { treact } from "@treact";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";
import { Component } from "./@types/component";

export const ProfileInfo: Component = (props) => {
	const user_id = props.user_id as string;
	const [userStore] = useUserStore();
	const [user, setUser] = treact.useState(null as User);
	const [friendRequests, setFriendRequests] = treact.useState([]);
	const [friends, setFriends] = treact.useState([]);

	treact.useEffect(() => {
		userAPI.getUserData({ user_id }).then((response) => setUser(response.user));
		friendsAPI.getFriendRequests().then((response) => setFriendRequests(response.request_ids || []));
		friendsAPI.getFriends().then((response) => setFriends(response.friend_ids));
	}, [user_id]);

	const addFriend = () => {
		friendsAPI.sendFriendRequest({ user_id });
	};

	const acceptFriend = () => {
		friendsAPI.acceptFriendRequest({ user_id, is_accepted: true });
	};

	const friendButton = () => {
		if (userStore.user.id === user_id) {
			return null;
		}

		if (friends.includes(user_id)) {
			return <p>You're friends!</p>;
		}

		if (friendRequests.includes(user_id)) {
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

	const info = () => {
		if (!user) {
			return null;
		}
		return (
			<div className="flex flex-c">
				<p>{user.email}</p>
				<p>
					{user.name.first} {user.name.last}
				</p>
				{friendButton()}
			</div>
		);
	};

	return <div>{info()}</div>;
};

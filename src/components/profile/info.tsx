import { treact } from "@treact";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";
import { Component } from "../@types/component";

const UserProfileInfo = ({ user }: { user: User }) => {
	const [userStore] = useUserStore();

	return (
		<div className="flex flex-c">
			<p>{user.email}</p>
			<p>
				{user.name.first} {user.name.last}
			</p>
			<div className="flex flex-r">
				<p>Friends:</p>
				{userStore.friends.map((follower) => (
					<p>{follower}</p>
				))}
			</div>
			<div className="flex flex-r">
				<p>Followers:</p>
				{userStore.followers.map((follower) => (
					<p>{follower}</p>
				))}
			</div>
		</div>
	);
};

const CurrentUserProfileInfo: Component = () => {
	const [userStore] = useUserStore();
	return <UserProfileInfo user={userStore.user} />;
};

const OtherUserProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();
	const [user, setUser] = treact.useState(null as User);

	treact.useEffect(() => {
		userAPI.getUserData({ user_id }).then((response) => setUser(response.user));
	}, []);

	const addFriend = () => {
		friendsAPI.sendFriendRequest({ user_id });
	};

	const acceptFriend = () => {
		friendsAPI.acceptFriendRequest({ user_id, is_accepted: true });
	};

	const friendButton = () => {
		if (userStore.friends.includes(user_id)) {
			return <p>You're friends</p>;
		}

		if (userStore.followers.includes(user_id)) {
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

	if (user) {
		return (
			<div className="flex flex-c">
				<UserProfileInfo user={user} />
				{friendButton()}
			</div>
		);
	}

	return null;
};

export const ProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		friendsAPI
			.getFriendRequests()
			.then((response) => setUserStore({ ...userStore, followers: response.request_ids || [] }));
		friendsAPI.getFriends().then((response) => setUserStore({ ...userStore, friends: response.friend_ids || [] }));
	}, []);

	if (userStore.user.id === user_id) {
		return CurrentUserProfileInfo();
	}

	return OtherUserProfileInfo({ user_id });
};

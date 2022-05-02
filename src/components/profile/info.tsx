import { treact } from "@treact";
import { URL, urlWithParameters } from "src/constants/constants";
import { EventWithTarget } from "src/core/@types/event";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { messengerAPI } from "src/core/network/api/messenger";
import { postAPI } from "src/core/network/api/post";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";
import { Component } from "../@types/component";
import { Link } from "../link";

const CreatePostBlock: Component = () => {
	const [message, setMessage] = treact.useState("");

	const handleChange = (event: EventWithTarget<HTMLSpanElement>) => {
		setMessage(event.target.innerText);
	};

	const createPost = () => {
		postAPI.createPost({ message });
	};

	return (
		<div className="flex flex-c bg-white pd-8">
			<span onKeyUp={handleChange} contentEditable />
			<button onClick={createPost} className="btn btn-primary">
				Create post
			</button>
		</div>
	);
};

const UserProfileInfo: Component = ({ user }: { user: User }) => {
	const [show, setShow] = treact.useState(false);
	const showCreatePostBlock = () => {
		setShow(true);
	};
	return (
		<div className="flex flex-c">
			<p>
				{user.name.first} {user.name.last}
			</p>
			{!show && (
				<button onClick={showCreatePostBlock} className="btn btn-primary">
					Create post
				</button>
			)}
			{show && <CreatePostBlock />}
		</div>
	);
};

const CurrentUserProfileInfo: Component = () => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		let followers: string[];
		let friends: string[];
		Promise.allSettled([
			friendsAPI.getFriendRequests().then((response) => (followers = response.request_ids)),
			friendsAPI.getFriends().then((response) => (friends = response.friend_ids || [])),
		]).then(() => setUserStore({ ...userStore, followers, friends }));
	}, []);

	const map = (user_id: string) => {
		return <Link to={urlWithParameters(URL.Profile, { user_id })}>{user_id}</Link>;
	};

	return (
		<div className="flex flex-c">
			<UserProfileInfo user={userStore.user} />
			<div className="flex flex-r">
				<p>Friends:</p>
				{userStore.friends.map(map)}
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

export const FriendButton: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();

	const addFriend = () => {
		friendsAPI.sendFriendRequest({ user_id });
	};

	const acceptFriend = () => {
		friendsAPI.acceptFriendRequest({ user_id, is_accepted: true });
	};

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

const OtherUserProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore, setUserStore] = useUserStore();
	const [user, setUser] = treact.useState(null as User);

	treact.useEffect(() => {
		let followers: string[];
		let friends: string[];
		Promise.allSettled([
			friendsAPI.getFriendRequests().then((response) => (followers = response.request_ids)),
			friendsAPI.getFriends().then((response) => (friends = response.friend_ids || [])),
		]).then(() => setUserStore({ ...userStore, followers, friends }));

		userAPI.getUserData({ user_id }).then((response) => setUser(response.user));
	}, []);

	const writeMessage = () => {
		messengerAPI
			.createDialog({
				name: `${userStore.user.name.first}~${user.name.first}`,
				author_ids: [user.id],
			})
			.then((response) => console.log(response.dialog_id));
	};

	if (user) {
		return (
			<div className="flex flex-c">
				<UserProfileInfo user={user} />
				<FriendButton user_id={user_id} />
				<button onClick={writeMessage} className="btn btn-primary">
					Write message
				</button>
			</div>
		);
	}

	return null;
};

export const ProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();

	if (userStore.user.id === user_id) {
		return <CurrentUserProfileInfo />;
	}

	return <OtherUserProfileInfo user_id={user_id} />;
};

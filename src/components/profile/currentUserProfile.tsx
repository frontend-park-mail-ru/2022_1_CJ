import { treact } from "@treact";
import { UserProfileLink } from "src/components/@helpers/links";
import { Component } from "src/components/@types/component";
import { Link } from "src/components/link";
import { urlWithParameters } from "src/constants/constants";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

const CurrentUserProfileInfo: Component = () => {
	const [userStore, setUserStore] = useUserStore();

	treact.useEffect(() => {
		Promise.allSettled([
			friendsAPI.getIncomingFriendRequests().then((response) => (userStore.followers = response.request_ids || [])),
			friendsAPI.getFriends().then((response) => (friends = response.friend_ids || [])),
		]).then(() => setUserStore({ ...userStore, followers, friends }));

		const getIncomingFriendRequests = () => {
			friendsAPI.getIncomingFriendRequests().then((response) => {
				Promise.all([
					response.request_ids.map((user_id) => userAPI.getUserData({user_id}).then((r) => userStore.friends.push(r.user)))
				])
			});
		}

		Promise.allSettled([

		]);

	}, []);

	const map = (user_id: string) => {
		return <UserProfileLink user=() />;
	};

	return (
		<div className="flex flex-c">
			<UserProfileInfo user={userStore.user} />

			<CreatePost />

			<div className="flex flex-r">
				<p>Friends:</p>
				{userStore.friends.map(map)}
			</div>
			<div className="flex flex-r">
				<p>Followers:</p>
				{userStore.followers.map(map)}
			</div>
		</div>
	);
};

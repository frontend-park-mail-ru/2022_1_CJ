import { treact } from "@treact";
import { URL, urlWithParameters } from "src/constants/constants";
import { EventWithTarget } from "src/core/@types/event";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { Component } from "./@types/component";
import { Link } from "./link";

export const FriendsList: Component = () => {
	const [friends, setFriends] = treact.useState([] as User[]);
	const [searchResults, setSearchResults] = treact.useState([] as User[]);

	treact.useEffect(() => {
		friendsAPI.getFriends().then((response) => {
			response.friend_ids.forEach((user_id) => {
				userAPI.getUserData({ user_id }).then((r) => setFriends([...friends, r.user]));
			});
		});
	}, []);

	const searchUsers = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		if (event.key !== "Enter") {
			return;
		}

		const selector = event.target.value;
		if (selector.length > 0) {
			userAPI.searchUsers({ selector }).then((response) => {
				setSearchResults(response.users);
			});
		} else {
			setSearchResults([]);
		}
	};

	const map = (friend: User) => {
		const fullName = `${friend.name.first} ${friend.name.last}`;
		return <Link to={urlWithParameters(URL.Profile, { user_id: friend.id })}>{fullName}</Link>;
	};

	const list = () => {
		if (searchResults.length > 0) {
			return (
				<>
					<p>Search results:</p>
					{searchResults.map(map)}
				</>
			);
		} else if (friends.length > 0) {
			return (
				<>
					<p>Your friends:</p>
					{friends.map(map)}
				</>
			);
		}
		return <p>Empty list</p>;
	};

	return (
		<div className="flex flex-c">
			<div className="border-no-style border-4 bg-white">
				<input onKeyUp={searchUsers} className="border-no-style" type="text" placeholder="Search" />
			</div>
			<div className="flex flex-c">{list()}</div>
		</div>
	);
};

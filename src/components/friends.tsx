import { treact } from "@treact";
import { EventWithTarget } from "src/core/@types/event";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { Component } from "./@types/component";

export const FriendsList: Component = () => {
	const [friends, setFriends] = treact.useState([] as User[]);
	const [searchResults, setSearchResults] = treact.useState([] as User[]);

	treact.useEffect(() => {
		friendsAPI.getFriends().then((response) => {
			if (response.friend_ids) {
				response.friend_ids.forEach((user_id) => {
					userAPI.getUserData({ user_id }).then((response) => setFriends([...friends, response.user]));
				});
			}
		});
	}, []);

	const searchUsers = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		if (event.key !== "Enter") {
			return;
		}

		const selector = event.target.value;
		if (selector.length > 0) {
			userAPI.searchUsers({ selector }).then((response) => {
				console.log(response.users);
				setSearchResults(response.users);
			});
		} else {
			setSearchResults([]);
		}
	};

	const map = (friend: User) => <p>{`${friend.name.first} ${friend.name.last}`}</p>;

	const list = () => {
		if (searchResults.length > 0) {
			return searchResults.map(map);
		}
		return friends.length > 0 ? friends.map(map) : <p>Empty list</p>;
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

import { treact } from "@treact";
import { URL, urlWithParameters } from "src/constants/constants";
import { EventWithTarget } from "src/core/@types/event";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";
import { Component } from "./@types/component";
import { Link } from "./link";

const initialState = {
	friends: [] as User[],
	searchResults: [] as User[],
};

export const FriendsList: Component = () => {
	const [state, setState] = treact.useState(initialState);
	const { friends, searchResults } = state;

	treact.useEffect(() => {
		friendsAPI.getFriends().then((response) => {
			let fetchedFriends = [] as User[];
			if (response.friend_ids) {
				const promises = response.friend_ids.map((user_id) =>
					userAPI.getUserData({ user_id }).then((r) => fetchedFriends.push(r.user))
				);
				Promise.all(promises).then(() => setState({ ...state, friends: fetchedFriends }));
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
				setState({ ...state, searchResults: response.users || [] });
			});
		} else {
			setState({ ...state, searchResults: [] });
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

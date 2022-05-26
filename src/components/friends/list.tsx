import { Component, treact } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";
import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { User } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { updateFriendsState, useUserStore } from "src/stores/user";

type Option = "Friends" | "Incoming" | "Outgoing" | "Search results";

export const FriendsList: Component = () => {
	const [userStore] = useUserStore();
	const [users, setUsers] = treact.useState({
		friends: [] as User[],
		incomingRequests: [] as User[],
		outcomingRequests: [] as User[],
	});
	const [searchResults, setSearchResults] = treact.useState([] as User[]);
	const [option, setOption] = treact.useState("Friends" as Option);

	treact.useEffect(updateFriendsState, []);
	treact.useEffect(async () => {
		const [friends, incomingRequests, outcomingRequests] = await Promise.all([
			fetchUsers(userStore.friends),
			fetchUsers(userStore.incomingRequests),
			fetchUsers(userStore.outcomingRequests),
		]);
		setUsers({ friends, incomingRequests, outcomingRequests });
	}, [userStore]);

	const searchUsers = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		if (event.key === "Enter") {
			setOption("Search results");
			const selector = event.target.value;
			if (selector.length > 0) {
				userAPI.searchUsers({ selector }).then((response) => setSearchResults(response.users || []));
			} else {
				setSearchResults([]);
			}
		}
	};

	const map = (user: User) => (
		<Link to={withParameters(Routes.Profile, { user_id: user.id })}>
			<div className="flex flex-r items-center">
				<img className="avatar" src={user.image} alt="" />
				<p>
					{user.name.first} {user.name.last}
				</p>
			</div>
		</Link>
	);

	const show = (set: User[]) => {
		if (set?.length > 0) {
			return set.map(map);
		}
		return <p className="text-center text-light">Empty</p>;
	};

	const list = () => {
		switch (option) {
			case "Friends":
				return show(users.friends);
			case "Incoming":
				return show(users.incomingRequests);
			case "Outgoing":
				return show(users.outcomingRequests);
			case "Search results":
				return show(searchResults);
		}
	};

	const optionButton = (opt: Option, amount = 0) => {
		const classes = option === opt ? "btn btn-white" : "btn btn-transparent";
		return (
			<button onClick={() => setOption(opt)} className={classes}>
				{opt} {amount}
			</button>
		);
	};

	return (
		<div className="flex flex-c space-half">
			<input
				onKeyUp={searchUsers}
				className="border-no-style border-sm pd-2 bg-white"
				type="text"
				placeholder="Search"
			/>
			<div className="flex flex-r d-middle">
				{optionButton("Friends", userStore.friends.length)}
				{optionButton("Incoming", userStore.incomingRequests.length)}
				{optionButton("Outgoing", userStore.outcomingRequests.length)}
			</div>
			<div className="flex flex-c pd-4 border-sm bg-white overflow">{list()}</div>
		</div>
	);
};

import { treact } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";
import { Routes, withParameters } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { User } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { Component } from "src/core/treact/models";
import { Link } from "src/components/link";
import { updateFriendsState, useUserStore } from "src/stores/user";

type Option = "Friends" | "Incoming requests" | "Outcoming requests" | "Search results";

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

	const map = (user: User) => {
		const fullName = `${user.name.first} ${user.name.last}`;
		return (
			<Link to={withParameters(Routes.Profile, { user_id: user.id })}>
				<div className="flex flex-r items-center" style="width: fit-content;">
					<img className="icon d-middle" src={user.image} alt="" />
					<p>{fullName}</p>
				</div>
			</Link>
		);
	};

	const list = () => {
		switch (option) {
			case "Friends":
				return <>{users.friends.map(map)}</>;
			case "Incoming requests":
				return <>{users.incomingRequests.map(map)}</>;
			case "Outcoming requests":
				return <>{users.outcomingRequests.map(map)}</>;
			case "Search results":
				return <>{searchResults.map(map)}</>;
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
		<div className="flex flex-c">
			<input
				onKeyUp={searchUsers}
				className="border-no-style border-sm pd-2 bg-white"
				type="text"
				placeholder="Search"
			/>
			<div className="flex flex-r">
				{optionButton("Friends", userStore.friends.length)}
				{optionButton("Incoming requests", userStore.incomingRequests.length)}
				{optionButton("Outcoming requests", userStore.outcomingRequests.length)}
			</div>
			<div className="flex flex-c">{list()}</div>
		</div>
	);
};

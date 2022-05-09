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
	const [searchResults, setSearchResults] = treact.useState(null as User[]);
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
				setSearchResults(null);
			}
		}
	};

	const map = (friend: User) => {
		const fullName = `${friend.name.first} ${friend.name.last}`;
		return <Link to={withParameters(Routes.Profile, { user_id: friend.id })}>{fullName}</Link>;
	};

	const list = () => {
		switch (option) {
			case "Friends":
				return (
					<>
						Amount: {users.friends.length}
						{users.friends.map(map)}
					</>
				);
			case "Incoming requests":
				return (
					<>
						Amount: {users.incomingRequests.length}
						{users.incomingRequests.map(map)}
					</>
				);
			case "Outcoming requests":
				return (
					<>
						Amount: {users.outcomingRequests.length}
						{users.outcomingRequests.map(map)}
					</>
				);
			case "Search results":
				return <>{searchResults.map(map)}</>;
		}
	};

	const optionButton = (opt: Option) => {
		const classes = option === opt ? "btn btn-white" : "btn btn-transparent";
		return (
			<button onClick={() => setOption(opt)} className={classes}>
				{opt}
			</button>
		);
	};

	return (
		<div className="flex flex-c">
			<div className="border-no-style border-sm pd-2 bg-white">
				<input onKeyUp={searchUsers} className="border-no-style" type="text" placeholder="Search" />
			</div>
			<div className="flex flex-r">
				{optionButton("Friends")}
				{optionButton("Incoming requests")}
				{optionButton("Outcoming requests")}
			</div>
			<div className="flex flex-c">{list()}</div>
		</div>
	);
};

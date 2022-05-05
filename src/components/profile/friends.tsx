import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { User } from "src/core/@types/user";

export const ProfileFriendsList: Component = ({ friends }: { friends: User[] }) => {
	const map = (user: User) => {
		return (
			<Link to={withParameters(Routes.Profile, { user_id: user.id })}>
				<div className="flex flex-c">
					<img className="icon" src={`/${user.image}`} alt="" />
					{user.name.first}
				</div>
			</Link>
		);
	};
	return <div className="flex flex-w justify-center bg-white pd-8 border-sm">{friends.map(map)}</div>;
};

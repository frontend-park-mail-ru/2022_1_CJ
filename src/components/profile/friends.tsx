import { treact, Component, ModalComponent } from "@treact";

import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { User } from "src/core/@types/user";

export const ProfileFriendsList: Component = ({ friends }: { friends: User[] }) => {
	const map = (user: User) => {
		return (
			<Link to={withParameters(Routes.Profile, { user_id: user.id })}>
				<div>
					<img className="icon d-middle" src={user.image} alt="" />
					<p>{user.name.first}</p>
				</div>
			</Link>
		);
	};
	return <div className="flex flex-w justify-center bg-white pd-8 border-sm">{friends.map(map)}</div>;
};

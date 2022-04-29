import { treact } from "@treact";
import { User } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { Component } from "./@types/component";

export const ProfileInfo: Component = (props) => {
	const user_id = props.user_id as string;
	const [user, setUser] = treact.useState(null as User);

	treact.useEffect(() => {
		userAPI.getUserData({ user_id }).then((response) => setUser(response.user));
	}, [user_id]);

	const info = () => {
		if (!user) {
			return null;
		}
		return (
			<div className="flex flex-r">
				<p>{user.email}</p>
				<p>
					{user.name.first} {user.name.last}
				</p>
			</div>
		);
	};

	return <div>{info()}</div>;
};

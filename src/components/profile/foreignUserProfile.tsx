import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { FriendButton } from "src/components/profile/friendButton";
import { User } from "src/core/@types/user";
import { messengerAPI } from "src/core/network/api/messenger";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const ForeignUserProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();
	const [user, setUser] = treact.useState(null as User);

	treact.useEffect(() => {
		userAPI.getUserData({ user_id }).then((response) => setUser(response.user));
	}, []);

	const writeMessage = () => {
		messengerAPI
			.createDialog({
				name: `${userStore.user.name.first}~${user.name.first}`,
				author_ids: [user.id],
			})
			.then((response) => console.log(response.dialog_id));
	};

	if (user) {
		return (
			<div className="flex flex-c">
				<p>
					{userStore.user.name.first} {userStore.user.name.last}
				</p>

				<FriendButton user_id={user_id} />
				<button onClick={writeMessage} className="btn btn-primary">
					Write message
				</button>
			</div>
		);
	}

	return null;
};

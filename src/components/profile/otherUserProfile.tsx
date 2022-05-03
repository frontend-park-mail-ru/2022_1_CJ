import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/components/@types/component";
import { FriendButton } from "src/components/profile/friendButton";
import { URL, urlWithParameters } from "src/constants/constants";
import { User } from "src/core/@types/user";
import { messengerAPI } from "src/core/network/api/messenger";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const OtherUserProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();
	const [user, setUser] = treact.useState(null as User);

	treact.useEffect(() => {
		userAPI.getUserData({ user_id }).then((response) => setUser(response.user));
	}, []);

	const createDialog = () =>
		messengerAPI
			.createDialog({
				name: `${userStore.user.name.first}~${user.name.first}`,
				author_ids: [user.id],
			})
			.then((response) => response.dialog_id);

	const writeMessage = async () => {
		const response = await messengerAPI.getDialogIDByUserID({ user_id });
		const dialog_id = response ? response.dialog_id : await createDialog();
		navigateTo(urlWithParameters(URL.Dialog, { dialog_id }));
	};

	if (user) {
		return (
			<div className="flex flex-c">
				<p>
					{user.name.first} {user.name.last}
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

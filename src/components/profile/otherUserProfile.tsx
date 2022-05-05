import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/components/@types/component";
import { FriendButton } from "src/components/profile/friendButton";
import { Routes, withParameters } from "src/constants/routes";
import { UserProfile } from "src/core/@types/user";
import { messengerAPI } from "src/core/network/api/messenger";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const OtherUserProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();
	const [profile, setProfile] = treact.useState(null as UserProfile);

	treact.useEffect(() => {
		userAPI.getProfile({ user_id }).then((response) => setProfile(response.user_profile));
	}, []);

	const createDialog = () =>
		messengerAPI
			.createDialog({
				name: `${userStore.user.name.first}~${profile.name.first}`,
				author_ids: [profile.id],
			})
			.then((response) => response.dialog_id);

	const writeMessage = async () => {
		const response = await messengerAPI.getDialogIDByUserID({ user_id });
		const dialog_id = response ? response.dialog_id : await createDialog();
		navigateTo(withParameters(Routes.Dialog, { dialog_id }));
	};

	if (profile) {
		return (
			<div className="flex flex-c grow items-center items-stretch">
				<div className="flex flex-r bg-white pd-8 border-sm">
					<img className="profile-picture" src={`/${profile.avatar}`} alt="" />
					<div>
						<p>
							{profile.name.first} {profile.name.last}
						</p>
						<p>Location: {profile.location}</p>
					</div>
				</div>

				<div className="flex">
					<FriendButton user_id={user_id} />
					<button onClick={writeMessage} className="btn btn-primary">
						Write message
					</button>
				</div>
			</div>
		);
	}

	return null;
};

import { treact } from "@treact";
import { Component } from "src/core/treact/models";
import { FriendButton } from "src/components/profile/friendButton";
import { UserProfile } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { ProfileInformaiton } from "src/components/profile/profileInformation";
import { MessageButton } from "src/components/profile/messageButton";

export const OtherUserProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [profile, setProfile] = treact.useState(null as UserProfile);

	treact.useEffect(() => {
		userAPI.getProfile({ user_id }).then((response) => setProfile(response.user_profile));
	}, []);

	if (profile) {
		return (
			<div className="flex flex-c grow items-center items-stretch">
				<ProfileInformaiton profile={profile} />
				<div className="flex">
					<FriendButton user_id={user_id} />
					<MessageButton user_id={user_id} />
				</div>
			</div>
		);
	}

	return null;
};

import { Component, treact } from "@treact";
import { CurrentUserProfileInfo } from "src/components/profile/currentUserProfile";
import { OtherUserProfileInfo } from "src/components/profile/otherUserProfile";
import { updateFriendsState, useUserStore } from "src/stores/user";

export const ProfileInfo: Component<{ user_id: string }> = ({ user_id }) => {
	const [userStore] = useUserStore();

	treact.useEffect(updateFriendsState, []);

	if (userStore.user.id === user_id) {
		return <CurrentUserProfileInfo />;
	}

	return <OtherUserProfileInfo user_id={user_id} />;
};

import { treact } from "@treact";
import { updateFriendsState } from "src/components/@helpers/user";
import { Component } from "src/components/@types/component";
import { CurrentUserProfileInfo } from "src/components/profile/currentUserProfile";
import { OtherUserProfileInfo } from "src/components/profile/otherUserProfile";
import { useUserStore } from "src/stores/user";

export const ProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [userStore] = useUserStore();

	treact.useEffect(() => {
		updateFriendsState();
	}, []);

	if (userStore.user.id === user_id) {
		return <CurrentUserProfileInfo />;
	}

	return <OtherUserProfileInfo user_id={user_id} />;
};

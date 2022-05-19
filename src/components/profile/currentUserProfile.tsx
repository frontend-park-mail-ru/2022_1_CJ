import { treact, Component, ModalComponent } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";

import { ProfileFriendsList } from "src/components/profile/friends";
import { User, UserProfile } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";
import { ProfileInformaiton } from "src/components/profile/profileInformation";
import { CreatePost } from "src/components/posts/createPost";
import { ProfilePosts } from "src/components/profile/posts";

export const CurrentUserProfileInfo: Component = () => {
	const [userStore] = useUserStore();
	const [friends, setFriends] = treact.useState(null as User[]);
	const [profile, setProfile] = treact.useState(null as UserProfile);

	treact.useEffect(() => {
		userAPI.getProfile({ user_id: userStore.user.id }).then((response) => setProfile(response.user_profile));
		fetchUsers(userStore.friends).then((users) => {
			setFriends(users);
		});
	}, [userStore]);

	if (profile && friends) {
		return (
			<div className="flex flex-c grow items-center items-stretch">
				<ProfileInformaiton profile={profile} />
				<div className="flex flex-r">
					<div style="width: 15vw;" className="flex flex-c">
						<CreatePost />
						<ProfileFriendsList friends={friends} />
					</div>
					<ProfilePosts user_id={userStore.user.id} />
				</div>
			</div>
		);
	}

	return null;
};

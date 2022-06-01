import { Component, treact } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";
import { CreatePost } from "src/components/posts/createPost";
import { ProfileFriendsList } from "src/components/profile/friends";
import { ProfilePosts } from "src/components/profile/posts";
import { ProfileInformaitonComponent, ProfileInformation } from "src/components/profile/profileInformation";
import { Spinner } from "src/components/spinner";
import { User, UserProfile } from "src/core/@types/user";
import { apiUserGetProfile } from "src/core/network/api/user/getProfile";
import { useUserStore } from "src/stores/user";

export const CurrentUserProfileInfo: Component = () => {
	const [userStore] = useUserStore();
	const [friends, setFriends] = treact.useState<User[]>();
	const [profile, setProfile] = treact.useState<UserProfile>();

	treact.useEffect(() => {
		apiUserGetProfile({ user_id: userStore.user.id }).then((response) => setProfile(response.user_profile));
		fetchUsers(userStore.friends).then((users) => {
			setFriends(users);
		});
	}, [userStore]);

	if (!profile || !friends) {
		return <Spinner />;
	}

	const profileInformation: ProfileInformation = {
		...profile,
		AmountOfFriends: friends.length,
	};

	return (
		<div className="flex flex-c grow">
			<ProfileInformaitonComponent profileInformation={profileInformation} />
			<div className="flex flex-r justify-between">
				<div className="flex flex-c grow" style="max-width: 20vw;">
					<CreatePost />
					<ProfileFriendsList friends={friends} />
				</div>
				<ProfilePosts user_id={userStore.user.id} />
			</div>
		</div>
	);
};

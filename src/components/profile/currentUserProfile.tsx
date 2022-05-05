import { treact } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";
import { Component } from "src/components/@types/component";
import { CreatePost } from "src/components/profile/createPost";
import { ProfileFriendsList } from "src/components/profile/friends";
import { User, UserProfile } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const CurrentUserProfileInfo: Component = () => {
	const [userStore] = useUserStore();
	const [profile, setProfile] = treact.useState(null as UserProfile);
	const [friends, setFriends] = treact.useState(null as User[]);

	treact.useEffect(() => {
		userAPI.getProfile({ user_id: userStore.user.id }).then((response) => setProfile(response.user_profile));
		fetchUsers(userStore.friends).then(setFriends);
	}, []);

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

				<div className="flex flex-r">
					<div style="width: 15vw;" className="flex flex-c">
						<CreatePost />
						<ProfileFriendsList friends={friends} />
					</div>
				</div>
			</div>
		);
	}

	return null;
};

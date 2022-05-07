import { treact } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";
import { Component } from "src/core/treact/models";
import { CreatePost } from "src/components/profile/createPost";
import { ProfileFriendsList } from "src/components/profile/friends";
import { User, UserProfile } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

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
				<div className="flex flex-r bg-white pd-8 border-sm">
					<img className="profile-picture" src={profile.avatar} alt="" />
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

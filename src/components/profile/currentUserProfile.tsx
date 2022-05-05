import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { Link } from "src/components/link";
import { CreatePost } from "src/components/profile/createPost";
import { Routes, withParameters } from "src/constants/routes";
import { User, UserProfile } from "src/core/@types/user";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const CurrentUserProfileInfo: Component = () => {
	const [userStore] = useUserStore();
	const [profile, setProfile] = treact.useState(null as UserProfile);

	treact.useEffect(() => {
		userAPI.getProfile({ user_id: userStore.user.id }).then((response) => setProfile(response.user_profile));
	}, []);

	const map = (user: User) => {
		return <Link to={withParameters(Routes.Profile, { user_id: user.id })}>{user.name.first}</Link>;
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

				<div className="flex flex-r">
					<div style="width: 15vw;" className="flex flex-c">
						<CreatePost />
						<div className="flex flex-w justify-center bg-white pd-8 border-sm">{userStore.friends.map(map)}</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
};

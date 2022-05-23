import { Component, treact } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";
import { FriendButton } from "src/components/profile/friendButton";
import { ProfileFriendsList } from "src/components/profile/friends";
import { MessageButton } from "src/components/profile/messageButton";
import { ProfilePosts } from "src/components/profile/posts";
import { ProfileInformaitonComponent, ProfileInformation } from "src/components/profile/profileInformation";
import { User, UserProfile } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";
import { userAPI } from "src/core/network/api/user";

export const OtherUserProfileInfo: Component = ({ user_id }: { user_id: string }) => {
	const [profile, setProfile] = treact.useState(null as UserProfile);
	const [friends, setFriends] = treact.useState(null as User[]);

	treact.useEffect(async () => {
		userAPI.getProfile({ user_id }).then((response) => setProfile(response.user_profile));
		const friends = await friendsAPI.getFriends({ user_id }).then((response) => response.friend_ids || []);
		fetchUsers(friends).then(setFriends);
	}, []);

	if (profile && friends) {
		const profileInformation: ProfileInformation = {
			...profile,
			AmountOfFriends: friends.length,
		};

		return (
			<div className="flex flex-c grow items-center items-stretch">
				<ProfileInformaitonComponent profileInformation={profileInformation} />
				<div className="flex flex-r">
					<div style="width: fit-content;" className="flex flex-c items-center">
						<div className="flex flex-c items-center bg-white pd-4 border-sm" style="gap: 0.5rem;">
							<FriendButton user_id={user_id} />
							<MessageButton user_id={user_id} />
						</div>
						<ProfileFriendsList friends={friends} />
					</div>
					<ProfilePosts user_id={profile.id} />
				</div>
			</div>
		);
	}

	return null;
};

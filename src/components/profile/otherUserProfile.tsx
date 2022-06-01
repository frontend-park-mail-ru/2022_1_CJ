import { Component, treact } from "@treact";
import { fetchUsers } from "src/components/@helpers/user";
import { FriendButton } from "src/components/profile/friendButton";
import { ProfileFriendsList } from "src/components/profile/friends";
import { MessageButton } from "src/components/profile/messageButton";
import { ProfilePosts } from "src/components/profile/posts";
import { ProfileInformaitonComponent, ProfileInformation } from "src/components/profile/profileInformation";
import { User, UserProfile } from "src/core/@types/user";
import { apiFriendsGet } from "src/core/network/api/friends/get";
import { apiUserGetProfile } from "src/core/network/api/user/getProfile";

export const OtherUserProfileInfo: Component<{ user_id: string }> = ({ user_id }) => {
	const [profile, setProfile] = treact.useState<UserProfile>();
	const [friends, setFriends] = treact.useState<User[]>();

	treact.useEffect(async () => {
		apiUserGetProfile({ user_id }).then((response) => setProfile(response.user_profile));
		const friendIDs = await apiFriendsGet({ user_id }).then((response) => response.friend_ids || []);
		fetchUsers(friendIDs).then(setFriends);
	}, [user_id]);

	if (profile && friends) {
		const profileInformation: ProfileInformation = {
			...profile,
			AmountOfFriends: friends.length,
		};

		return (
			<div className="flex flex-c grow">
				<ProfileInformaitonComponent profileInformation={profileInformation} />
				<div className="flex flex-r justify-between">
					<div className="flex flex-c grow" style="max-width: 20vw;">
						<div className="flex flex-w justify-center bg-white pd-4 border-sm">
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

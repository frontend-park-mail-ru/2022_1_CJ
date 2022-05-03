import { treact } from "@treact";
import { UserProfileLink } from "src/components/@helpers/links";
import { Component } from "src/components/@types/component";
import { CreatePost } from "src/components/profile/createPost";
import { User } from "src/core/@types/user";
import { useUserStore } from "src/stores/user";

export const CurrentUserProfileInfo: Component = () => {
	const [userStore] = useUserStore();

	const map = (user: User) => {
		return <UserProfileLink user={user} />;
	};

	return (
		<div className="flex flex-c">
			<p>
				{userStore.user.name.first} {userStore.user.name.last}
			</p>

			<CreatePost />

			<div className="flex flex-r">
				<p>Friends:</p>
				{userStore.friends.map(map)}
			</div>

			<div className="flex flex-r">
				<p>Incoming requests:</p>
				{userStore.incomingRequests.map(map)}
			</div>
		</div>
	);
};

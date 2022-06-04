import { Component, treact } from "@treact";
import { UserProfile } from "src/core/@types/user";

export type ProfileInformation = UserProfile & {
	AmountOfFriends: number;
};

export const ProfileInformaitonComponent: Component<{
	profileInformation: ProfileInformation;
}> = ({ profileInformation }) => {
	return (
		<div className="flex flex-r bg-white pd-8 border-sm">
			<img className="profile-picture" src={profileInformation.avatar} alt="" />
			<div className="grow">
				<p className="fs-lg">
					{profileInformation.name.first} {profileInformation.name.last}
				</p>
				<hr />
				<span className="text-light">
					{profileInformation.location && <p>Location: {profileInformation.location}</p>}
					{profileInformation.birth_day && <p>Birthday: {profileInformation.birth_day}</p>}
					<p>Friends: {profileInformation.AmountOfFriends}</p>
				</span>
			</div>
		</div>
	);
};

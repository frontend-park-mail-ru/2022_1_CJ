import { treact, Component, ModalComponent } from "@treact";

import { UserProfile } from "src/core/@types/user";

export const ProfileInformaiton: Component = ({ profile }: { profile: UserProfile }) => {
	return (
		<div className="flex flex-r bg-white pd-8 border-sm">
			<img className="profile-picture" src={profile.avatar} alt="" />
			<div className="grow">
				<p className="fs-lg">
					{profile.name.first} {profile.name.last}
				</p>
				<hr />
				{profile.location && <p>Location: {profile.location}</p>}
				{profile.birth_day && <p>Birthday: {profile.birth_day}</p>}
			</div>
		</div>
	);
};

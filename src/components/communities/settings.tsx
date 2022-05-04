import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { Spinner } from "src/components/spinner";
import { Community } from "src/core/@types/community";
import { communitiesAPI } from "src/core/network/api/communities";

// TODO: update photo request fails
export const CommunitySettingsComponent: Component = ({ community_id }: { community_id: string }) => {
	const [community, setCommunity] = treact.useState(null as Community);

	const getCommunity = () =>
		communitiesAPI.getCommunity({ community_id }).then((response) => setCommunity(response.community));

	treact.useEffect(() => getCommunity(), []);

	const updatePhoto = () => {
		const input = document.getElementById("update-photo") as HTMLInputElement;
		const photo = input.files[0];
		const formData = new FormData();
		formData.append("photo", photo);
		communitiesAPI.updatePhoto({ data: formData, community_id }).then(() => getCommunity());
	};

	if (community) {
		return (
			<div className="flex flex-c items-center d-middle">
				<img className="icon" src={`/${community.image}`} alt="" style="height: 15rem;" />
				<input type="file" id="update-photo" accept=".jpg, .jpeg, .png" />
				<button onClick={updatePhoto} className="btn btn-transparent __disabled">
					Update photo
				</button>
			</div>
		);
	}

	return <Spinner />;
};

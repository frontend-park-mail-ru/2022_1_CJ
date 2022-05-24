import { Component, treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Spinner } from "src/components/spinner";
import { Routes } from "src/constants/routes";
import { FileSize } from "src/constants/size";
import { Community } from "src/core/@types/community";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";
import { EditCommunityRequest } from "src/core/network/dto/communities";
import { modAlertStore } from "src/stores/alert";
import { useUserStore } from "src/stores/user";

type profileSettings = {
	name?: string;
	info?: string;
};

export const CommunitySettingsComponent: Component = ({ community_id }: { community_id: string }) => {
	const [userStore, modUserStore] = useUserStore();
	const [image, setImage] = treact.useState("");
	const [community, setCommunity] = treact.useState(null as Community);

	treact.useEffect(() => {
		communitiesAPI.getCommunity({ community_id }).then((response) => {
			setCommunity(response.community);
			setImage(response.community.image);
		});
		communitiesAPI.getManagedCommunities({ user_id: userStore.user.id }).then((response) => {
			const managedCommunities = response.communities || [];
			modUserStore.update({ managedCommunities });
			if (!managedCommunities.some((cs) => cs.id === community_id)) {
				navigateTo(Routes.Communities);
			}
		});
	}, []);

	if (community) {
		const { handleSubmit, handleChange, data } = treact.useForm<profileSettings>({
			initialValues: {
				name: community.name,
				info: community.info,
			},
			onSubmit: async () => {
				if (community.image !== image && image.length > 0) {
					const input = document.getElementById("photo") as HTMLInputElement;
					const formData = new FormData();
					formData.append("photo", input.files[0]);
					await communitiesAPI.updatePhoto({ data: formData, community_id });
				}

				const dto: EditCommunityRequest = {
					...data,
					community_id,
				};

				communitiesAPI.editCommunity(dto).then(() => navigateTo(Routes.Communities));
			},
		});

		const updatePhoto = (event: EventWithTarget<HTMLInputElement>) => {
			if (event.target.files && event.target.files[0]) {
				const file = event.target.files[0];
				if (file.size > FileSize.MB) {
					modAlertStore.set({ message: "File is too large", level: "error" });
				} else {
					setImage(URL.createObjectURL(event.target.files[0]));
				}
			}
		};

		const deleteCommunity = () => {
			communitiesAPI.deleteCommunity({ community_id }).then(() => navigateTo(Routes.Communities));
		};

		const deleteButton = () => (
			<button onClick={deleteCommunity} className="btn btn-negative d-middle">
				Delete community
			</button>
		);

		return (
			<div className="flex flex-c d-middle">
				<div className="flex flex-c items-center bg-white pd-8 border-sm">
					<img className="avatar" src={image} alt="" style="height: 10rem;" />
					<label className="btn">
						<input onChange={updatePhoto} type="file" id="photo" accept=".jpg, .jpeg, .png" />
						Upload
					</label>
				</div>

				{deleteButton()}

				<form className="form flow border-sm" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
					<div>
						<span>
							<input
								type="text"
								className="input-field"
								placeholder="Name"
								value={data.name}
								onChange={handleChange("name")}
							/>
						</span>
					</div>

					<div>
						<span>
							<input
								type="text"
								className="input-field"
								placeholder="Information"
								value={data.info}
								onChange={handleChange("info")}
							/>
						</span>
					</div>

					<button className="btn btn-primary" type="submit">
						Save
					</button>
				</form>
			</div>
		);
	}

	return <Spinner />;
};

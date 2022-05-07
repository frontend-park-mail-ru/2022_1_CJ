import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/core/treact/models";
import { Routes, withParameters } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { userAPI } from "src/core/network/api/user";
import { EditUserProfileRequest } from "src/core/network/dto/user";
import { UserProfile } from "src/core/@types/user";
import { FileSize } from "src/constants/size";
import { modAlertStore } from "src/stores/alert";

type profileSettings = {
	firstname?: string;
	lastname?: string;
	phone?: string;
	location?: string;
	birth_day?: string;
};

export const ProfileSettingsBlock: Component = () => {
	const [image, setImage] = treact.useState("");
	const [profile, setProfile] = treact.useState(null as UserProfile);

	treact.useEffect(() => {
		userAPI.getProfile().then((response) => {
			setProfile(response.user_profile);
			setImage(response.user_profile.avatar);
		});
	}, []);

	if (!profile) {
		return null;
	}

	const { handleSubmit, handleChange, data } = treact.useForm<profileSettings>({
		initialValues: {
			firstname: profile.name.first,
			lastname: profile.name.last,
			phone: profile.phone,
			location: profile.location,
			birth_day: profile.birth_day,
		},
		onSubmit: async () => {
			if (profile.avatar !== image && image.length > 0) {
				const input = document.getElementById("photo") as HTMLInputElement;
				const formData = new FormData();
				formData.append("photo", input.files[0]);
				await userAPI.updatePhoto(formData);
			}

			const dto: EditUserProfileRequest = {
				name: { first: data.firstname, last: data.lastname },
				phone: data.phone,
				location: data.location,
				birth_day: data.birth_day,
			};

			userAPI.editProfile(dto).then(() => navigateTo(withParameters(Routes.Profile, { user_id: profile.id })));
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

	return (
		<div className="flex flex-c d-middle">
			<div className="flex flex-c items-center bg-white pd-8 border-sm">
				<img className="icon" src={image} alt="" style="height: 10rem;" />
				<label className="btn">
					<input onChange={updatePhoto} type="file" id="photo" accept=".jpg, .jpeg, .png" />
					Upload
				</label>
			</div>

			<form className="form flow border-sm" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
				<div className="flex flex-r">
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="First name"
							value={data.firstname}
							onChange={handleChange("firstname")}
						/>
					</span>
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="Last name"
							value={data.lastname}
							onChange={handleChange("lastname")}
						/>
					</span>
				</div>

				<div>
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="Phone"
							value={data.phone}
							onChange={handleChange("phone")}
						/>
					</span>
				</div>

				<div>
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="Location"
							value={data.location}
							onChange={handleChange("location")}
						/>
					</span>
				</div>

				<div>
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="Birthday"
							value={data.birth_day}
							onChange={handleChange("birth_day")}
						/>
					</span>
				</div>

				<button className="btn btn-primary" type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

import { Component, treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Routes, withParameters } from "src/constants/routes";
import { FileSize } from "src/constants/size";
import { EventWithTarget } from "src/core/@types/event";
import { UserProfile } from "src/core/@types/user";
import { apiUserEditProfile } from "src/core/network/api/user/editProfile";
import { apiUserGetProfile } from "src/core/network/api/user/getProfile";
import { apiUserUpdatePhoto } from "src/core/network/api/user/updatePhoto";
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
	const [profile, setProfile] = treact.useState<UserProfile>();

	treact.useEffect(() => {
		apiUserGetProfile().then((response) => {
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
				if (input.files) {
					const formData = new FormData();
					formData.append("photo", input.files[0]);
					await apiUserUpdatePhoto(formData);
				}
			}

			apiUserEditProfile({
				name: { first: data.firstname, last: data.lastname },
				phone: data.phone,
				location: data.location,
				birth_day: data.birth_day,
			}).then(() => navigateTo(withParameters(Routes.Profile, { user_id: profile.id })));
		},
	});

	const updateImage = (event: EventWithTarget<HTMLInputElement>) => {
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
				<img className="avatar" src={image} alt="" style="height: 10rem;" />
				<label className="btn">
					<input onChange={updateImage} type="file" id="photo" accept=".jpg, .jpeg, .png" />
					Upload
				</label>
			</div>

			<form className="form flex flex-c border-sm" style="gap: 1.5rem;" onSubmit={handleSubmit}>
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

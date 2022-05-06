import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/components/@types/component";
import { Routes } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { userAPI } from "src/core/network/api/user";
import { EditUserProfileRequest } from "src/core/network/dto/user";
import { useUserStore } from "src/stores/user";

type profileSettings = {
	firstname?: string;
	lastname?: string;
	phone?: string;
	location?: string;
	birth_day?: string;
};

export const ProfileSettingsBlock: Component = () => {
	const [userStore] = useUserStore();
	const [image, setImage] = treact.useState(userStore.user.image);

	const { handleSubmit, handleChange, data } = treact.useForm<profileSettings>({
		onSubmit: async () => {
			if (userStore.user.image !== image && image.length > 0) {
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

			userAPI.editProfile(dto).then(() => navigateTo(Routes.Feed));
		},
	});

	const updatePhoto = (event: EventWithTarget<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	};

	return (
		<div className="flex flex-c d-middle">
			<div className="flex flex-c items-center bg-white pd-8 border-sm">
				<img className="icon" src={`${image}`} alt="" style="height: 10rem;" />
				<label className="btn">
					<input onChange={updatePhoto} type="file" id="photo" accept=".jpg, .jpeg, .png" />
					Upload
				</label>
			</div>

			<form className="form flow border-sm" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
				<div className="form-field flex flex-r">
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

				<div className="form-field">
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

				<div className="form-field">
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

				<div className="form-field">
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

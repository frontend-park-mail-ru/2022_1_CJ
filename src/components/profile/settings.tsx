import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const ProfileSettingsBlock: Component = () => {
	const [userStore, setUserStore] = useUserStore();

	const updatePhoto = () => {
		const input = document.getElementById("update-photo") as HTMLInputElement;
		const photo = input.files[0];
		const formData = new FormData();
		formData.append("photo", photo);
		userAPI.updatePhoto(formData).then(() => {
			userAPI.getUserData().then((response) => setUserStore({ ...userStore, user: response.user }));
		});
	};

	return (
		<div className="flex flex-c items-center d-middle">
			<img className="icon" src={`/${userStore.user.image}`} alt="" style="height: 15rem;" />
			<input type="file" id="update-photo" accept=".jpg, .jpeg, .png" />
			<button onClick={updatePhoto} className="btn btn-transparent">
				Update photo
			</button>
		</div>
	);
};

import { fetchAPI } from "src/core/network/api/common";

type Response = {
	url: string;
};

export const apiUserUpdatePhoto = (data: FormData) => fetchAPI.postFormData<Response>("/api/user/update_photo", data);

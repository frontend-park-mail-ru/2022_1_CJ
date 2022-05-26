import { fetchAPI } from "src/core/network/api/common";

type UploadImageResponse = {
	url: string;
};

export const uploadImage = (data: FormData) => fetchAPI.postFormData<UploadImageResponse>("/api/static/upload", data);

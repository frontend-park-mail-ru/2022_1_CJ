import { fetchAPI } from "src/core/network/api/common";

type UploadFileResponse = {
	url: string;
};

export const uploadFile = (data: FormData) => fetchAPI.postFormData<UploadFileResponse>("/api/file/upload", data);

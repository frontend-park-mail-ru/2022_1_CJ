import { fetchAPI, withQuery } from "src/core/network/api/common";

type GetFileRequest = {
	url: string;
};

export const getfile = (dto: GetFileRequest) => fetchAPI.get(withQuery("/api/file/get", dto));

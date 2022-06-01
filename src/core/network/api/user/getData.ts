import { User } from "src/core/@types/user";
import { fetchAPI, withQuery } from "src/core/network/api/common";

export type Request = {
	user_id: string;
};

export type Response = {
	user: User;
};

export const apiUserGetData = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/user/get", dto));

import { User } from "src/core/@types/user";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	user_id: string;
};

type Response = {
	user: User;
};

export const apiUserGetData = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/user/get", dto));

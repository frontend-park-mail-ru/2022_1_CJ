import { User } from "src/core/@types/user";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	selector: string;
};

type Response = {
	users: User[];
};

export const apiUserSearch = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/user/search", dto));

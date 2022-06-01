import { UserProfile } from "src/core/@types/user";
import { fetchAPI, withQuery } from "src/core/network/api/common";

export type Request = {
	user_id: string;
};

export type Response = {
	user_profile: UserProfile;
};

export const apiUserGetProfile = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/user/profile", dto));

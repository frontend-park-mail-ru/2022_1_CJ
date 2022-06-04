import { UserProfile } from "src/core/@types/user";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	user_id: string;
};

type Response = {
	user_profile: UserProfile;
};

export const apiUserGetProfile = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/user/profile", dto));

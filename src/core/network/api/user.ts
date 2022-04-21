import { User } from "src/core/@types/user";
import { fetchAPI, withQuery } from "./common";

const userMethods = {
	getData: "/api/user/get",
	getFeedPosts: "/api/user/feed",
	getUserPosts: "/api/user/posts",
	updatePhoto: "/api/user/update_photo",
	searchUsers: "/api/user/search",
};

export type GetUserDataRequest = {
	user_id: string;
};

export type GetUserDataResponse = {
	user: User;
};

const getUserData = (dto?: GetUserDataRequest) =>
	fetchAPI.get<GetUserDataResponse>(withQuery(userMethods.getData, dto));

export const userAPI = {
	getUserData,
};

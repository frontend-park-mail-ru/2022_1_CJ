import { GetUserDataRequest, GetUserDataResponse } from "../dto/user";
import { fetchAPI, withQuery } from "./common";

const userMethods = {
	getData: "/api/user/get",
	getFeedPosts: "/api/user/feed",
	getUserPosts: "/api/user/posts",
	updatePhoto: "/api/user/update_photo",
	searchUsers: "/api/user/search",
};

const getUserData = (dto?: GetUserDataRequest) =>
	fetchAPI.get<GetUserDataResponse>(withQuery(userMethods.getData, dto));

export const userAPI = {
	getUserData,
};

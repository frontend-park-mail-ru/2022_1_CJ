import {
	GetUserDataRequest,
	GetUserDataResponse,
	GetUserFeedResponse,
	SearchUsersRequest,
	SearchUsersResponse,
} from "../dto/user";
import { fetchAPI, withQuery } from "./common";

const methods = {
	getData: "/api/user/get",
	getFeed: "/api/user/feed",
	getUserPosts: "/api/user/posts",
	updatePhoto: "/api/user/update_photo",
	searchUsers: "/api/user/search",
};

const getUserData = (dto?: GetUserDataRequest) => fetchAPI.get<GetUserDataResponse>(withQuery(methods.getData, dto));

const getFeed = () => fetchAPI.get<GetUserFeedResponse>(methods.getFeed);

const searchUsers = (dto: SearchUsersRequest) => fetchAPI.get<SearchUsersResponse>(withQuery(methods.searchUsers, dto));

export const userAPI = {
	getUserData,
	getFeed,
	searchUsers,
};

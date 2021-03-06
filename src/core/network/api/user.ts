import { fetchAPI, withQuery } from "src/core/network/api/common";
import {
	EditUserProfileRequest,
	EditUserProfileResponse,
	GetUserDataRequest,
	GetUserDataResponse,
	GetUserFeedResponse,
	GetUserPostsRequest,
	GetUserPostsResponse,
	GetUserProfileRequest,
	GetUserProfileResponse,
	SearchUsersRequest,
	SearchUsersResponse,
	UpdatePhotoResponse,
} from "src/core/network/dto/user";

const methods = {
	getData: "/api/user/get",
	getFeed: "/api/user/feed",
	getUserPosts: "/api/user/posts",
	updatePhoto: "/api/user/update_photo",
	searchUsers: "/api/user/search",
	getProfile: "/api/user/profile",
	editProfile: "/api/user/profile/edit",
};

const getUserData = (dto?: GetUserDataRequest) => fetchAPI.get<GetUserDataResponse>(withQuery(methods.getData, dto));

const getFeed = () => fetchAPI.get<GetUserFeedResponse>(methods.getFeed);

const getPosts = (dto: GetUserPostsRequest) => fetchAPI.get<GetUserPostsResponse>(withQuery(methods.getUserPosts, dto));

const searchUsers = (dto: SearchUsersRequest) => fetchAPI.get<SearchUsersResponse>(withQuery(methods.searchUsers, dto));

const getProfile = (dto?: GetUserProfileRequest) =>
	fetchAPI.get<GetUserProfileResponse>(withQuery(methods.getProfile, dto));

const editProfile = (dto: EditUserProfileRequest) => fetchAPI.post<EditUserProfileResponse>(methods.editProfile, dto);

const updatePhoto = (data: FormData) => fetchAPI.postFormData<UpdatePhotoResponse>(methods.updatePhoto, data);

export const userAPI = {
	getUserData,
	getFeed,
	getPosts,
	searchUsers,
	getProfile,
	editProfile,
	updatePhoto,
};

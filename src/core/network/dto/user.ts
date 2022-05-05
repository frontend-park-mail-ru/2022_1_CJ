import { PostWrapper } from "src/core/@types/post";
import { ProfileSettings, User, UserProfile } from "src/core/@types/user";
import { BasicResponse } from "src/core/network/dto/common";

export type GetUserDataRequest = {
	user_id: string;
};

export type GetUserDataResponse = {
	user: User;
};

export type GetUserFeedResponse = {
	posts: PostWrapper[];
};

export type SearchUsersRequest = {
	selector: string;
};

export type SearchUsersResponse = {
	users: User[];
};

export type GetUserProfileRequest = {
	user_id: string;
};

export type GetUserProfileResponse = {
	user_profile: UserProfile;
};

export type EditUserProfileRequest = ProfileSettings;

export type EditUserProfileResponse = BasicResponse;

export type UpdatePhotoResponse = {
	url: string;
};

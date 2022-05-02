import { PostWrapper } from "src/core/@types/post";
import { User } from "src/core/@types/user";

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

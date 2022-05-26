import { Likes } from "src/core/@types/likes";

export const PostAuthorType = {
	user: "User",
	community: "Community",
};

export type PostAuthor = {
	id: string;
	name: string;
	image: string;
	type: string;
};

export type Post = {
	id: string;
	author: PostAuthor;
	message: string;
	images: string[];
	attachments: string[];
	created_at: number;
	count_comments: number;
};

export type PostWrapper = {
	post: Post;
	likes: Likes;
};

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
};

export type Likes = {
	amount: number;
	my_like: boolean;
};

export type PostWrapper = {
	post: Post;
	likes: Likes;
};

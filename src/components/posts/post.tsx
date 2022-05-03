import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { PostAuthorComponent } from "src/components/posts/author";
import { PostLikeButton } from "src/components/posts/likeButton";
import { PostWrapper } from "src/core/@types/post";

export const Post: Component = ({ postWrapper }: { postWrapper: PostWrapper }) => {
	const { post } = postWrapper;
	return (
		<div className="flow bg-white pd-8 border-8">
			<PostAuthorComponent author={post.author} />
			<p> {post.message} </p>
			<PostLikeButton postWrapper={postWrapper} />
		</div>
	);
};

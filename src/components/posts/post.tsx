import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { PostAuthorComponent } from "src/components/posts/author";
import { PostWrapper } from "src/core/@types/post";

export const Post: Component = ({ postWrapper }: { postWrapper: PostWrapper }) => {
	const { post } = postWrapper;
	return (
		<div className="bg-white pd-8">
			<PostAuthorComponent author={post.author} />
			<span> {post.message} </span>
		</div>
	);
};

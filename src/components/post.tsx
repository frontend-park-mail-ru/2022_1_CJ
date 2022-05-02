import { treact } from "@treact";
import { PostWrapper } from "src/core/@types/post";
import { Component } from "./@types/component";

export const PostComponent: Component = ({ postWrapper }: { postWrapper: PostWrapper }) => {
	const { post } = postWrapper;
	return (
		<div className="bg-white pd-8">
			<div className="flex flex-r items-center">
				<img className="icon" src={`/${post.author.image}`} alt="" />
				<p className="text-light">{post.author.name}</p>
			</div>
			<span> {post.message} </span>
		</div>
	);
};

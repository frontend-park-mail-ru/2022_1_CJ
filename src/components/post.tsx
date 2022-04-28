import { treact } from "@treact";
import { Post } from "src/core/@types/post";
import { Component } from "./@types/component";

export const PostComponent: Component = ({ post }: { post: Post }) => {
	return (
		<div className="post bg-white">
			<div className="post__header flex flex-r items-center">
				<img className="icon profile-avatar" src={post.author.image} alt="" />
				<p className="text-light">
					{post.author.name.first} {post.author.name.last}
				</p>
			</div>
			<div className="message">{post.message}</div>
		</div>
	);
};

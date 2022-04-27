import { treact } from "@treact";
import { Post } from "src/core/@types/post";
import { Component } from "./@types/component";

export const PostComponent: Component = ({ post }: { post: Post }) => {
	return <p>{post.message}</p>;
};

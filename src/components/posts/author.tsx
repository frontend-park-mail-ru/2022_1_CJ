import { treact } from "@treact";
import { PostAuthorLink } from "src/components/@helpers/links";
import { Component } from "src/core/treact/models";
import { PostAuthor } from "src/core/@types/post";

export const PostAuthorComponent: Component = ({ author }: { author: PostAuthor }) => {
	return (
		<div className="flex flex-r items-center">
			<img className="icon" src={author.image} alt="" />
			<PostAuthorLink author={author} />
		</div>
	);
};

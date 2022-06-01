import { Component, treact } from "@treact";
import { DateFromTimestamp } from "src/components/@helpers/date";
import { PostAuthorLink } from "src/components/@helpers/links";
import { Navigate } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { Post } from "src/core/@types/post";

export const PostAuthorComponent: Component<{ post: Post }> = ({ post }) => {
	return (
		<div className="flex flex-r items-center">
			<img className="avatar" src={post.author.image} alt="" />
			<div className="flex flex-c no-gap">
				<PostAuthorLink author={post.author} />
				<Navigate to={withParameters(Routes.Post, { post_id: post.id })}>
					<DateFromTimestamp timestamp={post.created_at} />
				</Navigate>
			</div>
		</div>
	);
};

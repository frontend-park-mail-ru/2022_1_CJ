import { treact } from "@treact";
import { Component } from "src/core/treact/models";
import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { PostAuthor, PostAuthorType } from "src/core/@types/post";
import { User } from "src/core/@types/user";

export const UserProfileLink: Component = ({ user }: { user: User }) => (
	<Link to={withParameters(Routes.Profile, { user_id: user.id })}>
		{user.name.first} {user.name.last}
	</Link>
);

export const PostAuthorLink: Component = ({ author }: { author: PostAuthor }) => {
	if (author.type === PostAuthorType.user) {
		return <Link to={withParameters(Routes.Profile, { user_id: author.id })}>{author.name}</Link>;
	}
	return <Link to={withParameters(Routes.Community, { community_id: author.id })}>{author.name}</Link>;
};

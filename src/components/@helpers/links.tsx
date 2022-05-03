import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { Link } from "src/components/link";
import { URL, urlWithParameters } from "src/constants/constants";
import { PostAuthor, PostAuthorType } from "src/core/@types/post";
import { User } from "src/core/@types/user";

export const UserProfileLink: Component = ({ user }: { user: User }) => (
	<Link to={urlWithParameters(URL.Profile, { user_id: user.id })}>
		{user.name.first} {user.name.last}
	</Link>
);

export const PostAuthorLink: Component = ({ author }: { author: PostAuthor }) => {
	if (author.type === PostAuthorType.user) {
		return <Link to={urlWithParameters(URL.Profile, { user_id: author.id })}>{author.name}</Link>;
	}
	return <span>duck</span>; // TODO: link to community
};

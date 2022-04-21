import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Post } from "src/components/post";

export const Feed: Component = () => {
	return (
		<AuthMiddleware>
			<Post />
		</AuthMiddleware>
	);
};

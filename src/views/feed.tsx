import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { FeedPosts } from "src/components/feedPosts";

export const Feed: Component = () => {
	return (
		<AuthMiddleware>
			<FeedPosts />
		</AuthMiddleware>
	);
};

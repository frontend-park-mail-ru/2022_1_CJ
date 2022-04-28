import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { FeedPosts } from "src/components/feedPosts";
import { Layout } from "src/components/layout";

export const Feed: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<FeedPosts />
			</Layout>
		</AuthMiddleware>
	);
};

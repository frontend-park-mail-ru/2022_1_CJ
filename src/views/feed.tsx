import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { FeedPosts } from "src/components/posts/feed";

export const Feed: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<FeedPosts />
			</Layout>
		</AuthMiddleware>
	);
};

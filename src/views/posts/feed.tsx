import { treact, Component, ModalComponent } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";

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

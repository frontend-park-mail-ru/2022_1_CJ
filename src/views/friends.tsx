import { Component, treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { FriendsList } from "src/components/friends/list";
import { Layout } from "src/components/layout";

export const Friends: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<FriendsList />
			</Layout>
		</AuthMiddleware>
	);
};

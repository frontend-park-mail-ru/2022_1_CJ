import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/core/treact/models";
import { Layout } from "src/components/layout";
import { FriendsList } from "src/components/friends/list";

export const Friends: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<FriendsList />
			</Layout>
		</AuthMiddleware>
	);
};

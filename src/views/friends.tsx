import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/core/treact/models";
import { FriendsList } from "src/components/friendsList";
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

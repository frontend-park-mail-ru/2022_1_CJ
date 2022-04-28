import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { FriendsList } from "src/components/friends";
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

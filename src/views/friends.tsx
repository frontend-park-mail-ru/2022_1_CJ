import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { FriendsList } from "src/components/friends";
import { Layout } from "src/components/layout";
import { Menu } from "src/components/menu";

export const Friends: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Menu />
				<FriendsList />
			</Layout>
		</AuthMiddleware>
	);
};

import { treact, Component, ModalComponent } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";

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

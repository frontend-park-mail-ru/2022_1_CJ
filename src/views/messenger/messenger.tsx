import { Component, treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Layout } from "src/components/layout";
import { Dialogs } from "src/components/messenger/dialogs";

export const Messenger: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Dialogs />
			</Layout>
		</AuthMiddleware>
	);
};

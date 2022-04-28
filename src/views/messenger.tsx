import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Dialogs } from "src/components/dialogs";
import { Layout } from "src/components/layout";

export const Messenger: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Dialogs />
			</Layout>
		</AuthMiddleware>
	);
};
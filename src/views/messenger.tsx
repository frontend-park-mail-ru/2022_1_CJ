import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Dialogs } from "src/components/dialogs";
import { Layout } from "src/components/layout";
import { Menu } from "src/components/menu";

export const Messenger: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Menu />
				<Dialogs />
			</Layout>
		</AuthMiddleware>
	);
};

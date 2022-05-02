import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Dialogs } from "src/components/dialogs";
import { Layout } from "src/components/layout";
import { Menu } from "src/components/menu";
import { getParams } from "src/components/router";
import { URL } from "src/constants/constants";

export const Messenger: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Menu />
				<Dialogs {...getParams(URL.Messenger)} />
			</Layout>
		</AuthMiddleware>
	);
};

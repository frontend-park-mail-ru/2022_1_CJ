import { Component, treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Layout } from "src/components/layout";
import { Dialogs } from "src/components/messenger/dialogs";
import { Routes } from "src/constants/routes";

export const Messenger: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Dialogs {...getParams(Routes.Messenger)} />
			</Layout>
		</AuthMiddleware>
	);
};

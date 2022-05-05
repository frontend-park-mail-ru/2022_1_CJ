import { treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { DialogComponent } from "src/components/messenger/dialog";
import { Routes } from "src/constants/routes";

export const MessengerDialog: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<DialogComponent {...getParams(Routes.Dialog)} />
			</Layout>
		</AuthMiddleware>
	);
};

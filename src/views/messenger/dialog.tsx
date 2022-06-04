import { Component, treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Layout } from "src/components/layout";
import { DialogComponent } from "src/components/messenger/dialog";
import { Routes } from "src/constants/routes";

export const MessengerDialog: Component = () => {
	const { dialog_id } = getParams(Routes.Dialog);
	return (
		<AuthMiddleware>
			<Layout>
				<DialogComponent dialog_id={dialog_id} />
			</Layout>
		</AuthMiddleware>
	);
};

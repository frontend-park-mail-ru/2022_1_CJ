import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { Menu } from "src/components/menu";
import { Dialog } from "src/components/messenger/dialog";
import { getParams } from "src/components/router";
import { URL } from "src/constants/constants";

export const MessengerDialog: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Menu />
				<Dialog {...getParams(URL.Dialog)} />
			</Layout>
		</AuthMiddleware>
	);
};
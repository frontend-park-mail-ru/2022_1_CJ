import { treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";

import { Dialogs } from "src/components/messenger/dialogs";
import { URL } from "src/constants/constants";

export const Messenger: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Dialogs {...getParams(URL.Messenger)} />
			</Layout>
		</AuthMiddleware>
	);
};

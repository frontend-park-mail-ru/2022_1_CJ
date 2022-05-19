import { treact, Component, ModalComponent } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";

import { CommunitySettingsComponent } from "src/components/communities/settings";
import { Layout } from "src/components/layout";
import { Routes } from "src/constants/routes";

export const CommunitySettings: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<CommunitySettingsComponent {...getParams(Routes.Community)} />
			</Layout>
		</AuthMiddleware>
	);
};

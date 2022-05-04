import { treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { CommunitySettingsComponent } from "src/components/communities/settings";
import { Layout } from "src/components/layout";
import { URL } from "src/constants/constants";

export const CommunitySettings: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<CommunitySettingsComponent {...getParams(URL.Community)} />
			</Layout>
		</AuthMiddleware>
	);
};

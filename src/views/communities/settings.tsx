import { Component, treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { CommunitySettingsComponent } from "src/components/communities/settings";
import { Layout } from "src/components/layout";
import { Routes } from "src/constants/routes";

export const CommunitySettings: Component = () => {
	const community_id = getParams(Routes.CommunitySettings)["community_id"];
	return (
		<AuthMiddleware>
			<Layout>
				<CommunitySettingsComponent community_id={community_id} />
			</Layout>
		</AuthMiddleware>
	);
};

import { Component, treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { CommunityComponent } from "src/components/communities/community";
import { Layout } from "src/components/layout";
import { Routes } from "src/constants/routes";

export const Community: Component = () => {
	const community_id = getParams(Routes.Community)["community_id"];
	return (
		<AuthMiddleware>
			<Layout>
				<CommunityComponent community_id={community_id} />
			</Layout>
		</AuthMiddleware>
	);
};

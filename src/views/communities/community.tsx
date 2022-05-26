import { Component, treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { CommunityComponent } from "src/components/communities/community";
import { Layout } from "src/components/layout";
import { Routes } from "src/constants/routes";

export const Community: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<CommunityComponent {...getParams(Routes.Community)} />
			</Layout>
		</AuthMiddleware>
	);
};

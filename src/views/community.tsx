import { treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { CommunityComponent } from "src/components/communities/community";
import { Layout } from "src/components/layout";
import { URL } from "src/constants/constants";

export const Community: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<CommunityComponent {...getParams(URL.Community)} />
			</Layout>
		</AuthMiddleware>
	);
};

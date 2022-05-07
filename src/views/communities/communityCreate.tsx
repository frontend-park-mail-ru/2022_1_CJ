import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/core/treact/models";
import { CreateCommunity } from "src/components/communities/create";
import { Layout } from "src/components/layout";

export const CommunityCreate: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<CreateCommunity />
			</Layout>
		</AuthMiddleware>
	);
};

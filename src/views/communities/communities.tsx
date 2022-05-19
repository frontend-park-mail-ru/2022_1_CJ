import { treact, Component, ModalComponent } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";

import { CommunitiesList } from "src/components/communities/list";
import { Layout } from "src/components/layout";
import { Link } from "src/components/link";
import { Routes } from "src/constants/routes";

export const Communities: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<div className="flex flex-c">
					<Link to={Routes.CommunityCreate}>Create community</Link>
					<CommunitiesList />
				</div>
			</Layout>
		</AuthMiddleware>
	);
};

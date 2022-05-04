import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { CommunitiesList } from "src/components/communities/list";
import { Layout } from "src/components/layout";
import { Link } from "src/components/link";
import { URL } from "src/constants/constants";

export const Communities: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<div className="flex flex-c">
					<Link to={URL.CommunityCreate}>Create community</Link>
					<CommunitiesList />
				</div>
			</Layout>
		</AuthMiddleware>
	);
};

import { treact, Component, ModalComponent } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";

import { Layout } from "src/components/layout";
import { getParams } from "src/components/@helpers/router";
import { Routes } from "src/constants/routes";
import { PostPage } from "src/components/posts/postPage";

// TODO: add a better way to pass params
export const Post: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<PostPage {...getParams(Routes.Post)} />
			</Layout>
		</AuthMiddleware>
	);
};

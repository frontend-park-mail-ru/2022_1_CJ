import { Component, treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Layout } from "src/components/layout";
import { PostPage } from "src/components/posts/postPage";
import { Routes } from "src/constants/routes";

// TODO: add a better way to pass params
export const Post: Component = () => {
	const post_id = getParams(Routes.Post)["post_id"];
	return (
		<AuthMiddleware>
			<Layout>
				<PostPage post_id={post_id} />
			</Layout>
		</AuthMiddleware>
	);
};

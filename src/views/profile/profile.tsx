import { Component, treact } from "@treact";
import { getParams } from "src/components/@helpers/router";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Layout } from "src/components/layout";
import { ProfileInfo } from "src/components/profile/info";
import { Routes } from "src/constants/routes";

export const Profile: Component = () => {
	const user_id = getParams(Routes.Profile)["user_id"];
	return (
		<AuthMiddleware>
			<Layout>
				<ProfileInfo user_id={user_id} />
			</Layout>
		</AuthMiddleware>
	);
};

import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";

import { ProfileInfo } from "src/components/profile/info";
import { getParams } from "src/components/router";
import { URL } from "src/constants/constants";

export const Profile: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<ProfileInfo {...getParams(URL.Profile)} />
			</Layout>
		</AuthMiddleware>
	);
};

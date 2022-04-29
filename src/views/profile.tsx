import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { Menu } from "src/components/menu";
import { ProfileInfo } from "src/components/profileInfo";
import { getParams } from "src/components/router";
import { URL } from "src/constants/constants";

export const Profile: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Menu />
				<ProfileInfo {...getParams(URL.Profile)} />
			</Layout>
		</AuthMiddleware>
	);
};

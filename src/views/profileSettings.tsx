import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { Menu } from "src/components/menu";
import { ProfileSettingsBlock } from "src/components/profile/settings";

export const ProfileSettings: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<Menu />
				<ProfileSettingsBlock />
			</Layout>
		</AuthMiddleware>
	);
};

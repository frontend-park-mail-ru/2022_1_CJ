import { Component, treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Layout } from "src/components/layout";
import { ProfileSettingsBlock } from "src/components/profile/settings";

export const ProfileSettings: Component = () => {
	return (
		<AuthMiddleware>
			<Layout>
				<ProfileSettingsBlock />
			</Layout>
		</AuthMiddleware>
	);
};

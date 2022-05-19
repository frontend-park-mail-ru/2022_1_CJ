import { treact, Component, ModalComponent } from "@treact";
import { AuthMiddleware, AuthMiddlewarePolicy } from "src/components/@middlewares/auth";

import { Layout } from "src/components/layout";
import { LoginForm } from "src/components/auth/loginForm";

export const Login: Component = () => {
	return (
		<AuthMiddleware policy={AuthMiddlewarePolicy.Unauthorized}>
			<Layout>
				<LoginForm />
			</Layout>
		</AuthMiddleware>
	);
};

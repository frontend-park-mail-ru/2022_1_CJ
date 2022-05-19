import { treact, Component, ModalComponent } from "@treact";
import { AuthMiddleware, AuthMiddlewarePolicy } from "src/components/@middlewares/auth";

import { Layout } from "src/components/layout";
import { SignupForm } from "src/components/auth/signupForm";

export const Signup: Component = () => {
	return (
		<AuthMiddleware policy={AuthMiddlewarePolicy.Unauthorized}>
			<Layout>
				<SignupForm />
			</Layout>
		</AuthMiddleware>
	);
};

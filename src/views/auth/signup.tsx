import { Component, treact } from "@treact";
import { AuthMiddleware, AuthMiddlewarePolicy } from "src/components/@middlewares/auth";
import { SignupForm } from "src/components/auth/signupForm";
import { Layout } from "src/components/layout";

export const Signup: Component = () => {
	return (
		<AuthMiddleware policy={AuthMiddlewarePolicy.Unauthorized}>
			<Layout>
				<SignupForm />
			</Layout>
		</AuthMiddleware>
	);
};

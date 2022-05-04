import { treact } from "@treact";
import { AuthMiddleware, AuthMiddlewarePolicy } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { SignupForm } from "src/components/signupForm";

export const Signup: Component = () => {
	return (
		<AuthMiddleware policy={AuthMiddlewarePolicy.Unauthorized}>
			<Layout>
				<SignupForm />
			</Layout>
		</AuthMiddleware>
	);
};

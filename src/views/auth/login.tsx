import { Component, treact } from "@treact";
import { AuthMiddleware, AuthMiddlewarePolicy } from "src/components/@middlewares/auth";
import { LoginForm } from "src/components/auth/loginForm";
import { Layout } from "src/components/layout";

export const Login: Component = () => {
	return (
		<AuthMiddleware policy={AuthMiddlewarePolicy.Unauthorized}>
			<Layout>
				<LoginForm />
			</Layout>
		</AuthMiddleware>
	);
};

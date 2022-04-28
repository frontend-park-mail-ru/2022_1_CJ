import { treact } from "@treact";
import { UnauthMiddleware } from "src/components/@middlewares/unauth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { LoginForm } from "src/components/loginForm";

export const Login: Component = () => {
	return (
		<UnauthMiddleware>
			<Layout>
				<LoginForm />
			</Layout>
		</UnauthMiddleware>
	);
};

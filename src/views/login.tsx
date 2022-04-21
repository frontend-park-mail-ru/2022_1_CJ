import { treact } from "@treact";
import { UnauthMiddleware } from "src/components/@middlewares/unauth";
import { Component } from "src/components/@types/component";
import { LoginForm } from "src/components/loginForm";

export const Login: Component = () => {
	return (
		<UnauthMiddleware>
			<LoginForm />
		</UnauthMiddleware>
	);
};

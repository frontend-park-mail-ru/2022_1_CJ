import { treact } from "@treact";
import { UnauthMiddleware } from "src/components/@middlewares/unauth";
import { Component } from "src/components/@types/component";
import { Layout } from "src/components/layout";
import { SignupForm } from "src/components/signupForm";

export const Signup: Component = () => {
	return (
		<UnauthMiddleware>
			<Layout>
				<SignupForm />
			</Layout>
		</UnauthMiddleware>
	);
};

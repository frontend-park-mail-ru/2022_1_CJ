import { treact } from "@treact";
import { UnauthMiddleware } from "src/components/@middlewares/unauth";
import { Component } from "src/components/@types/component";
import { SignupForm } from "src/components/signupForm";

export const Signup: Component = () => {
	return (
		<UnauthMiddleware>
			<SignupForm />
		</UnauthMiddleware>
	);
};

import { Layout } from "../components/layout.js";
import { SignupForm } from "../components/signupForm.js";
import { treact } from "../treact/treact.js";

export function Signup() {
	return (
		<Layout>
			<SignupForm />
		</Layout>
	);
}

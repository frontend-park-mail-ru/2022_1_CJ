import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { ValidatorEmail, ValidatorRequired } from "src/components/@helpers/validators";
import { Composition } from "src/components/auth/composition";
import { Description } from "src/components/auth/description";
import { HelperError } from "src/components/helperError";
import { Link } from "src/components/link";
import { Routes } from "src/constants/routes";
import { capitalize } from "src/core/modules/error";
import { loginUser } from "src/core/network/api/auth/loginUser";

type loginForm = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	const [error, setError] = treact.useState("");
	const { handleSubmit, handleChange, data, errors } = treact.useForm<loginForm>({
		validators: {
			email: ValidatorEmail,
			password: ValidatorRequired,
		},
		onSubmit: () => {
			loginUser(data).then(
				() => navigateTo(Routes.Feed),
				(err) => setError(capitalize(err.message) || "Error")
			);
		},
	});

	return (
		<div className="flex flex-c grow items-center justify-between" style="gap: 2rem;">
			<span className="mt-4">
				<Description />
			</span>

			<div className="flex flex-c grow items-center no-gap">
				<form className="form flex flex-c border-sm" onSubmit={handleSubmit}>
					<div>
						<input type="text" className="input-field" placeholder="Email" onKeyUp={handleChange("email")} />
						{errors.email && <HelperError message={errors.email} />}
					</div>
					<div>
						<input
							id="password"
							type="password"
							className="input-field"
							placeholder="Password"
							onKeyUp={handleChange("password")}
						/>
						{errors.password && <HelperError message={errors.password} />}
						{error && <HelperError message={error} />}
					</div>

					<div className="flex flex-r items-center">
						<button className="btn btn-primary" type="submit">
							Sign in
						</button>
						<Link to={Routes.Signup}>Don't have an account?</Link>
					</div>
				</form>

				<script
					async
					src="https://telegram.org/js/telegram-widget.js?19"
					data-telegram-login="cj_oauth_bot"
					data-size="medium"
					data-radius="4"
					data-auth-url="/api/oauth/telegram"
				></script>
			</div>

			<Composition />
		</div>
	);
};

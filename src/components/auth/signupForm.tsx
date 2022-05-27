import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { ValidatorEmail, ValidatorRequired } from "src/components/@helpers/validators";
import { Description } from "src/components/auth/description";
import { HelperError } from "src/components/helperError";
import { Link } from "src/components/link";
import { Routes } from "src/constants/routes";
import { handleError } from "src/core/modules/error";
import { authAPi } from "src/core/network/api/auth";
import { SignupUserRequest } from "src/core/network/dto/auth";

type signupForm = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

export const SignupForm = () => {
	const { handleSubmit, handleChange, data, errors } = treact.useForm<signupForm>({
		validators: {
			firstname: ValidatorRequired,
			lastname: ValidatorRequired,
			email: ValidatorEmail,
			password: ValidatorRequired,
			passwordConfirmation: {
				isValid: (value) => {
					const input = document.getElementById("password") as HTMLInputElement;
					return input.value === value;
				},
				message: "Passwords mismatch",
			},
		},
		initialValues: {
			firstname: "testname",
			lastname: "testsurname",
			email: "test@test.com",
			password: "test",
			passwordConfirmation: "test",
		},
		onSubmit: () => {
			const dto: SignupUserRequest = {
				name: { first: data.firstname, last: data.lastname },
				email: data.email,
				password: data.password,
			};
			authAPi.signupUser(dto).then(
				() => navigateTo(Routes.Feed),
				(err) => handleError(err)
			);
		},
	});

	return (
		<div className="flex flex-c grow items-center justify-center">
			<form className="form flex flex-c border-sm" style="gap: 1.5rem;" onSubmit={handleSubmit}>
				<Description />
				<div className="flex flex-r">
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="First name"
							value={data.firstname}
							onChange={handleChange("firstname")}
						/>
						{errors.firstname && <HelperError message={errors.firstname} />}
					</span>
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="Last name"
							value={data.lastname}
							onChange={handleChange("lastname")}
						/>
						{errors.lastname && <HelperError message={errors.lastname} />}
					</span>
				</div>
				<div>
					<span>
						<input
							type="text"
							className="input-field"
							placeholder="Email"
							value={data.email}
							onChange={handleChange("email")}
						/>
						{errors.email && <HelperError message={errors.email} />}
					</span>
				</div>
				<div className="flex flex-c">
					<div className="flex flex-r">
						<span>
							<input
								id="password"
								type="password"
								className="input-field"
								placeholder="Password"
								value={data.password}
								onChange={handleChange("password")}
							/>
							{errors.password && <HelperError message={errors.password} />}
						</span>
						<span>
							<input
								type="password"
								className="input-field"
								placeholder="Confirm"
								value={data.passwordConfirmation}
								onChange={handleChange("passwordConfirmation")}
							/>
							{errors.passwordConfirmation && <HelperError message={errors.passwordConfirmation} />}
						</span>
					</div>
					<div className="helper helper-hint">Use 8 or more characters with a mix of letters, numbers & symbols</div>
				</div>
				<div className="flex flex-r items-center">
					<button className="btn btn-primary" type="submit">
						Sign up
					</button>
					<Link to={Routes.Login}>Already have an account?</Link>
				</div>
			</form>
			<script
				async
				src="https://telegram.org/js/telegram-widget.js?19"
				data-telegram-login="cj_oauth_bot"
				data-size="large"
				data-auth-url="senago.software/api/oauth/telegram"
			></script>
		</div>
	);
};

import { treact } from "@treact";
import { useForm } from "src/core/treact/@hooks/useForm";
import { HelperError } from "./helperError";
import { ValidatorEmail, ValidatorRequired } from "./@helpers/validators";
import { authAPi } from "src/core/network/api/auth";
import { Link } from "./link";
import { URL } from "src/constants/constants";
import { SignupUserRequest } from "src/core/network/dto/auth";

type signupForm = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

export const SignupForm = () => {
	const { handleSubmit, handleChange, data, errors } = useForm<signupForm>({
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
		onSubmit: () => {
			const dto: SignupUserRequest = {
				name: { first: data.firstname, last: data.lastname },
				email: data.email,
				password: data.password,
			};
			authAPi.signupUser(dto);
		},
	});

	return (
		<form className="form flow border-4" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
			<div className="form-field flex flex-r">
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
			<div className="form-field">
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
			<div className="form-field flex flex-c">
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
			<div className="grid grid-c items-center">
				<button className="btn btn-primary" type="submit">
					Sign up
				</button>
				<Link to={URL.Login}>Already have an account?</Link>
			</div>
		</form>
	);
};

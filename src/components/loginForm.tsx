import { treact } from "@treact";
import { useForm } from "src/core/treact/@hooks/useForm";
import { HelperError } from "./helperError";
import { ValidatorEmail, ValidatorRequired } from "./@helpers/validators";
import { authAPi, LoginUserRequest } from "src/core/network/api/auth";
import { router } from "src/core/modules/router";
import { URL } from "src/constants/constants";
import { handleError } from "src/core/modules/error";
import { Link } from "./link";

type loginForm = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	console.log("LOGGGGGGGGGGGGG");
	const { handleSubmit, handleChange, data, errors } = useForm<loginForm>({
		validators: {
			email: ValidatorEmail,
			password: ValidatorRequired,
		},
		onSubmit: () => {
			const dto: LoginUserRequest = {
				email: data.email,
				password: data.password,
			};
			authAPi.loginUser(dto).then(
				() => {
					router.navigateTo(URL.Feed);
				},
				(err) => {
					handleError(err);
				}
			);
		},
	});

	return (
		<form className="form flow border-4" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
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
			<div className="form-field">
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
			</div>
			<div className="grid grid-c items-center">
				<button className="btn btn-primary" type="submit">
					Sign in
				</button>
				<Link to={URL.Signup}>Don't have an account?</Link>
			</div>
		</form>
	);
};

import { treact } from "@treact";
import { HelperError } from "../helperError";
import { ValidatorEmail, ValidatorRequired } from "../@helpers/validators";
import { authAPi } from "src/core/network/api/auth";
import { Routes } from "src/constants/routes";
import { handleError } from "src/core/modules/error";
import { navigateTo } from "../@helpers/router";
import { Link } from "src/components/link";

type loginForm = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	const { handleSubmit, handleChange, data, errors } = treact.useForm<loginForm>({
		validators: {
			email: ValidatorEmail,
			password: ValidatorRequired,
		},
		initialValues: {
			email: "test@test.com",
			password: "test",
		},
		onSubmit: () => {
			authAPi.loginUser(data).then(
				() => navigateTo(Routes.Feed),
				(err) => handleError(err)
			);
		},
	});

	return (
		<form className="form flow border-sm" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
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
			<div>
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
			<div className="flex flex-r items-center">
				<button className="btn btn-primary" type="submit">
					Sign in
				</button>
				<Link to={Routes.Signup}>Don't have an account?</Link>
			</div>
		</form>
	);
};

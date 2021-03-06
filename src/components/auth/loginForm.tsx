import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { ValidatorEmail, ValidatorRequired } from "src/components/@helpers/validators";
import { Description } from "src/components/auth/description";
import { HelperError } from "src/components/helperError";
import { Link } from "src/components/link";
import { Routes } from "src/constants/routes";
import { handleError } from "src/core/modules/error";
import { authAPi } from "src/core/network/api/auth";

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
		<div className="flex grow items-center">
			<form className="form flex flex-c border-sm" style="gap: 1.5rem;" onSubmit={handleSubmit}>
				<Description />
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
		</div>
	);
};

import { treact } from "@treact";

export const LoginForm = () => {
	return (
		<form className="form flow border-4" style="--flow-space: 1.5rem;">
			<div className="form-field">
				<span>
					<input name="email" type="text" className="input-field" placeholder="Email" />
				</span>
			</div>
			<div className="form-field">
				<span>
					<input name="password" type="password" className="input-field" placeholder="Password" />
				</span>
			</div>
			<div className="grid grid-c items-center">
				<button className="btn btn-primary" type="submit">
					Sign in
				</button>
				<a className="link" href="/signup" data-link type="data-link">
					Don't have an account?
				</a>
			</div>
		</form>
	);
};

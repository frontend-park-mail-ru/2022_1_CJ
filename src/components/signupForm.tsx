import { treact } from "@treact";

export const SignupForm = () => {
	return (
		<form className="form flow border-4" style="--flow-space: 1.5rem;">
			<div className="form-field grid grid-c">
				<span>
					<input name="firstname" type="text" className="input-field" placeholder="First name" />
				</span>
				<span>
					<input name="lastname" type="text" className="input-field" placeholder="Second name" />
				</span>
			</div>
			<div className="form-field">
				<span>
					<input name="email" type="text" className="input-field" placeholder="Email" />
				</span>
			</div>
			<div className="form-field grid grid-r">
				<div className="grid grid-c">
					<span>
						<input name="password" type="password" className="input-field" placeholder="Password" />
					</span>
					<span>
						<input name="password" type="password" className="input-field" placeholder="Confirm" />
					</span>
				</div>
				<div className="helper helper-hint">Use 8 or more characters with a mix of letters, numbers & symbols</div>
			</div>
			<div className="grid grid-c items-center" style="padding-top: 3rem;">
				<button className="btn btn-primary" type="submit">
					Sign up
				</button>
				<a className="link" href="/login" type="data-link">
					Already have an account?
				</a>
			</div>
		</form>
	);
};

import { treact } from "@treact";

export function SignupForm() {
	return (
		<form id="form-signup" className="form flow border-4" style="--flow-space: 1.5rem;">
			<div className="form-field grid grid-c">
				<span>
					<input id="firstname" name="firstname" type="text" className="input-field" placeholder="First name" />
				</span>
				<span>
					<input id="lastname" name="lastname" type="text" className="input-field" placeholder="Second name" />
				</span>
			</div>
			<div className="form-field">
				<span>
					<input id="email" name="email" type="text" className="input-field" placeholder="Email" />
				</span>
			</div>
			<div className="form-field grid grid-r">
				<div className="grid grid-c">
					<span>
						<input id="password" name="password" type="password" className="input-field" placeholder="Password" />
					</span>
					<span>
						<input
							id="password-confirmation"
							name="password"
							type="password"
							className="input-field"
							placeholder="Confirm"
						/>
					</span>
				</div>
				<div className="helper helper-hint">Use 8 or more characters with a mix of letters, numbers & symbols</div>
			</div>
			<div id="form-actions" className="grid grid-c" style="padding-top: 3rem;">
				<button className="btn btn-primary" id="submit" type="submit">
					Sign up
				</button>
				<a className="link" href="/login" data-link>
					Want to sign in instead?
				</a>
			</div>
		</form>
	);
}

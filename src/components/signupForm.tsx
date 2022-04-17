import { treact } from "../treact/treact";

export function SignupForm() {
	return (
		<form id="form-signup" class="form flow border-4" style="--flow-space: 1.5rem;">
			<div class="form-field grid grid-c">
				<span>
					<input id="firstname" name="firstname" type="text" class="input-field" placeholder="First name" />
				</span>
				<span>
					<input id="lastname" name="lastname" type="text" class="input-field" placeholder="Second name" />
				</span>
			</div>
			<div class="form-field">
				<span>
					<input id="email" name="email" type="text" class="input-field" placeholder="Email" />
				</span>
			</div>
			<div class="form-field grid grid-r">
				<div class="grid grid-c">
					<span>
						<input id="password" name="password" type="password" class="input-field" placeholder="Password" />
					</span>
					<span>
						<input
							id="password-confirmation"
							name="password"
							type="password"
							class="input-field"
							placeholder="Confirm"
						/>
					</span>
				</div>
				<div class="helper helper-hint">Use 8 or more characters with a mix of letters, numbers & symbols</div>
			</div>
			<div id="form-actions" class="grid grid-c" style="padding-top: 3rem;">
				<button class="btn btn-primary" id="submit" type="submit">
					Sign up
				</button>
				<a class="link" href="/login" data-link>
					Want to sign in instead?
				</a>
			</div>
		</form>
	);
}

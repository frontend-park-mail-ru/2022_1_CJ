import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { ValidatorRequired } from "src/components/@helpers/validators";
import { Component } from "src/components/@types/component";
import { HelperError } from "src/components/helperError";
import { URL } from "src/constants/constants";
import { communitiesAPI } from "src/core/network/api/communities";
import { CreateCommunityRequest } from "src/core/network/dto/communities";

export const CreateCommunity: Component = () => {
	const { handleSubmit, handleChange, data, errors } = treact.useForm<CreateCommunityRequest>({
		validators: {
			name: ValidatorRequired,
			info: ValidatorRequired,
		},
		onSubmit: () => {
			communitiesAPI.createCommunity(data).then(() => navigateTo(URL.Communities));
		},
	});

	return (
		<form className="form flow border-4" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
			<div className="form-field">
				<span>
					<input
						type="text"
						className="input-field"
						placeholder="Name"
						value={data.name}
						onChange={handleChange("name")}
					/>
					{errors.name && <HelperError message={errors.name} />}
				</span>
			</div>
			<div className="form-field">
				<span>
					<input
						type="text"
						className="input-field"
						placeholder="Information"
						value={data.info}
						onChange={handleChange("info")}
					/>
					{errors.info && <HelperError message={errors.info} />}
				</span>
			</div>
			<div className="flex">
				<button className="btn btn-primary d-middle" type="submit">
					Create community
				</button>
			</div>
		</form>
	);
};

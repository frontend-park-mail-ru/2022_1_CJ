import { treact, Component, ModalComponent } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { ValidatorRequired } from "src/components/@helpers/validators";

import { HelperError } from "src/components/helperError";
import { Routes } from "src/constants/routes";
import { communitiesAPI } from "src/core/network/api/communities";
import { CreateCommunityRequest } from "src/core/network/dto/communities";

export const CreateCommunity: Component = () => {
	const { handleSubmit, handleChange, data, errors } = treact.useForm<CreateCommunityRequest>({
		validators: {
			name: ValidatorRequired,
			info: ValidatorRequired,
		},
		onSubmit: () => {
			communitiesAPI.createCommunity(data).then(() => navigateTo(Routes.Communities));
		},
	});

	return (
		<form className="form flow border-sm" style="--flow-space: 1.5rem;" onSubmit={handleSubmit}>
			<div>
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
			<div>
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

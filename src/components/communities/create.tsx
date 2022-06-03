import { Component, treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { ValidatorRequired } from "src/components/@helpers/validators";
import { HelperError } from "src/components/helperError";
import { Routes } from "src/constants/routes";
import { apiCommunitiesCreate, CreateCommunityRequest } from "src/core/network/api/communities/create";

export const CreateCommunity: Component = () => {
	const { handleSubmit, handleChange, data, errors } = treact.useForm<CreateCommunityRequest>({
		validators: {
			name: ValidatorRequired,
			info: ValidatorRequired,
		},
		onSubmit: () => {
			apiCommunitiesCreate(data).then(() => navigateTo(Routes.Communities));
		},
	});

	return (
		<form className="form flex flex-c border-sm" style="width: 100%; gap: 1.5rem;" onSubmit={handleSubmit}>
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
					<textarea
						className="input-field"
						placeholder="Information"
						rows="3"
						onKeyDown={handleChange("info")}
						style="resize: vertical;"
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

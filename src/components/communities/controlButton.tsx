import { Component, treact } from "@treact";
import { Spinner } from "src/components/spinner";
import { communitiesAPI } from "src/core/network/api/communities";

export const ControlButton: Component<{ community_id: string }> = ({ community_id }) => {
	const [communities, setCommunities] = treact.useState<string[]>();

	treact.useEffect(() => {
		communitiesAPI.list().then((response) => {
			const list = response.communities || [];
			setCommunities(list.map((cs) => cs.id));
		});
	}, [community_id]);

	const join = () => {
		communitiesAPI.join({ community_id }).then(() => setCommunities([...communities, community_id]));
	};

	const leave = () => {
		communitiesAPI.leave({ community_id }).then(() => setCommunities(communities.filter((id) => id !== community_id)));
	};

	const button = () => {
		if (!communities) {
			return <Spinner />;
		}

		if (communities.includes(community_id)) {
			return (
				<button onClick={leave} className="btn btn-negative">
					Leave
				</button>
			);
		}

		return (
			<button onClick={join} className="btn btn-primary">
				Join
			</button>
		);
	};

	return <div className="d-middle">{button()}</div>;
};

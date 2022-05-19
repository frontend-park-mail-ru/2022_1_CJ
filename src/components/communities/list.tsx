import { treact, Component, ModalComponent } from "@treact";

import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { CommunityShort } from "src/core/@types/community";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";

export const CommunitiesList: Component = () => {
	const [communities, setCommunities] = treact.useState(null as CommunityShort[]);
	const [searchResults, setSearchResults] = treact.useState([] as CommunityShort[]);

	treact.useEffect(() => {
		communitiesAPI.list().then((response) => setCommunities(response.communities || []));
	}, []);

	const searchCommunities = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		if (event.key !== "Enter") {
			return;
		}

		const selector = event.target.value;
		if (selector.length > 0) {
			communitiesAPI.searchCommunities({ selector }).then((response) => {
				setSearchResults(response.communities || []);
			});
		} else {
			setSearchResults([]);
		}
	};

	const map = (cs: CommunityShort) => (
		<Link to={withParameters(Routes.Community, { community_id: cs.id })}>{cs.name}</Link>
	);

	const listCommunities = () => (communities ? communities.map(map) : null);

	return (
		<div className="flex flex-c">
			<div className="border-no-style border-sm pd-2 bg-white">
				<input onKeyUp={searchCommunities} className="border-no-style" type="text" placeholder="Search" />
			</div>
			{searchResults.length > 0 && (
				<div className="flex flex-c">
					<p>Search results:</p>
					{searchResults.map(map)}
				</div>
			)}
			<div className="flex flex-c">{listCommunities()}</div>
		</div>
	);
};

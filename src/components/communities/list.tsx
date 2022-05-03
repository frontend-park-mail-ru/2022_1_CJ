import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { CommunityShort } from "src/core/@types/community";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";

export const CommunitiesList: Component = () => {
	const [searchResults, setSearchResults] = treact.useState([] as CommunityShort[]);

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

	const map = (cs: CommunityShort) => <div>{cs.name}</div>;

	return (
		<div className="flex flex-c">
			<div className="border-no-style border-4 pd-2 bg-white">
				<input onKeyUp={searchCommunities} className="border-no-style" type="text" placeholder="Search" />
			</div>
			<div className="flex flex-c">{searchResults.map(map)}</div>
		</div>
	);
};

import { Component, treact } from "@treact";
import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { CommunityShort } from "src/core/@types/community";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";

type Option = "Communities" | "Search results";

export const CommunitiesList: Component = () => {
	const [communities, setCommunities] = treact.useState([] as CommunityShort[]);
	const [searchResults, setSearchResults] = treact.useState([] as CommunityShort[]);
	const [option, setOption] = treact.useState("Communities" as Option);

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
				setOption("Search results");
			});
		} else {
			setOption("Communities");
		}
	};

	const map = (cs: CommunityShort) => (
		<Link to={withParameters(Routes.Community, { community_id: cs.id })}>
			<div className="flex flex-r items-center">
				<img className="avatar" src={cs.image} alt="" />
				{cs.name}
			</div>
		</Link>
	);

	const show = (set: CommunityShort[]) => {
		if (set?.length > 0) {
			return set.map(map);
		}
		return <p className="text-center text-light">Empty</p>;
	};

	const listCommunities = () => {
		switch (option) {
			case "Communities":
				return show(communities);
			case "Search results":
				return show(searchResults);
		}
	};

	return (
		<div className="flex flex-c">
			<div className=" border-no-style border-sm pd-2 bg-white">
				<input
					style="width: 100%;"
					onKeyUp={searchCommunities}
					className="border-no-style"
					type="text"
					placeholder="Search"
				/>
			</div>
			<div className="flex flex-c pd-4 border-sm bg-white overflow">{listCommunities()}</div>
		</div>
	);
};

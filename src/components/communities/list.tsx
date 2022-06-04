import { Component, treact } from "@treact";
import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { CommunityShort } from "src/core/@types/community";
import { EventWithTarget } from "src/core/@types/event";
import { apiCommunitiesList } from "src/core/network/api/communities/list";
import { apiCommunitiesSearch } from "src/core/network/api/communities/search";

type Option = "Communities" | "Search results";

export const CommunitiesList: Component = () => {
	const [communities, setCommunities] = treact.useState([] as CommunityShort[]);
	const [searchResults, setSearchResults] = treact.useState([] as CommunityShort[]);
	const [option, setOption] = treact.useState("Communities" as Option);

	treact.useEffect(() => {
		apiCommunitiesList().then((response) => setCommunities(response.communities || []));
	}, []);

	const searchCommunities = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		if (event.key !== "Enter") {
			return;
		}

		const selector = event.target.value;
		if (selector.length > 0) {
			apiCommunitiesSearch({ selector }).then((response) => {
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

	const show = (set: CommunityShort[], messageOnEmpty: string) => {
		if (set?.length > 0) {
			return set.map(map);
		}
		return <p className="text-center text-light">{messageOnEmpty}</p>;
	};

	const listCommunities = () => {
		switch (option) {
			case "Communities":
				return show(communities, "Yet no managed or followed communities");
			case "Search results":
				return show(searchResults, "No results");
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

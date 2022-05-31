import { Component, treact } from "@treact";
import { CommunityImageViewerComponent } from "src/components/@helpers/imageViewer";
import { Community } from "src/core/@types/community";

export const CommunityInformaitonComponent: Component = ({ community }: { community: Community }) => {
	return (
		<div className="flex flex-c bg-white pd-8 border-sm">
			<CommunityImageViewerComponent url={community.image} />
			<div className="grow">
				<p className="fs-lg">{community.name}</p>
				<hr />
				<span className="text-light">{community.info?.length > 0 && community.info}</span>
			</div>
		</div>
	);
};

import { Component, treact } from "@treact";
import "/src/assets/styles/modules/offline.scss";

export const Offline: Component = () => {
	return (
		<div className="offline flex grow items-center">
			<div className="d-middle bg-white pd-8 border-md text-primary bold" style="font-size: 5rem;">
				You're offline
			</div>
		</div>
	);
};

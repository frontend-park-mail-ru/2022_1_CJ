import { Component, treact } from "@treact";
import "/src/assets/styles/modules/offline.scss";

export const Offline: Component = () => {
	return (
		<div className="offline flex grow items-center">
			<div
				className="d-middle bg-white pd-8 border-md text-primary text-center bold"
				style="font-size: 3rem; width: clamp(15rem, 75%, 30rem);"
			>
				You're offline
			</div>
		</div>
	);
};

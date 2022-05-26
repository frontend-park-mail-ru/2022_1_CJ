import { EventWithTarget } from "src/core/@types/event";
import { useEffect } from "src/core/treact/@hooks/useEffect";

export const useClickOutside = (id: string, callback: () => void) => {
	const handleClick = (event: EventWithTarget<HTMLElement>) => {
		const ref = document.getElementById(id);
		if (ref && !ref.contains(event.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);
};

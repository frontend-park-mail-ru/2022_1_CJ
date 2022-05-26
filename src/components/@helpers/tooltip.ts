import { EventWithTarget } from "src/core/@types/event";

export const toggleTooltip = (event: EventWithTarget<HTMLSpanElement, MouseEvent>) => {
	if (event.target.hasAttribute("active")) {
		event.target.removeAttribute("active");
	} else {
		event.target.setAttribute("active", "");
	}
};

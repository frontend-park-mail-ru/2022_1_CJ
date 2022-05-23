import { Component, treact } from "@treact";
import { emojiSet } from "src/components/emoji/set";
import { EventWithTarget } from "src/core/@types/event";

export const EmojiPickerComponent: Component = ({ output }: { output: (emoji: string) => void }) => {
	const toggle = (event: EventWithTarget<HTMLSpanElement, MouseEvent>) => {
		if (event.target.hasAttribute("active")) {
			event.target.removeAttribute("active");
		} else {
			event.target.setAttribute("active", "");
		}
	};

	const mapEmojis = (set: string[]) => {
		return set.map((emoji) => (
			<p onClick={() => output(emoji)} className="d-middle">
				{emoji}
			</p>
		));
	};

	return (
		<button onClick={toggle} className="tooltip pointer flex items-center pd-4 bg-white border border-sm">
			🤗
			<span className="tooltip-content flex flex-w overflow pd-4 bg-white border-sm">{mapEmojis(emojiSet)}</span>
		</button>
	);
};

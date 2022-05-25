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
		<span onClick={toggle} className="tooltip flex items-center pd-4 bg-white border border-sm">
			🤗
			<span className="tooltip-content flex flex-w overflow pd-4 bg-white border-sm">{mapEmojis(emojiSet)}</span>
		</span>
	);
};

const stickers = [
	"/static/stickers/sticker_1.webp",
	"/static/stickers/sticker_2.png",
	"/static/stickers/sticker_3.webp",
	"/static/stickers/sticker_4.png",
	"/static/stickers/sticker_5.png",
	"/static/stickers/sticker_6.png",
];

export const StickerPickerComponent: Component = ({ output }: { output: (url: string) => void }) => {
	const toggle = (event: EventWithTarget<HTMLSpanElement, MouseEvent>) => {
		if (event.target.hasAttribute("active")) {
			event.target.removeAttribute("active");
		} else {
			event.target.setAttribute("active", "");
		}
	};

	const mapStickers = (set: string[]) => {
		return set.map((sticker) => (
			<img onClick={() => output(sticker)} className="icon d-middle" style="height: 5rem;" src={sticker} />
		));
	};

	return (
		<span onClick={toggle} className="tooltip flex items-center pd-4 bg-white border border-sm">
			👻
			<span className="tooltip-content flex flex-w overflow pd-4 bg-white border-sm">{mapStickers(stickers)}</span>
		</span>
	);
};

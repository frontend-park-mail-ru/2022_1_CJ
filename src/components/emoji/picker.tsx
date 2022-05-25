import { Component, treact } from "@treact";
import { toggleTooltip } from "src/components/@helpers/tooltip";
import { emojiSet, stickers } from "src/components/emoji/set";

type Type = "emoji" | "sticker";

export const PickerComponent: Component = ({
	appendToInput,
	sendSticker,
}: {
	appendToInput: (emoji: string) => void;
	sendSticker: (url: string) => void;
}) => {
	const [type, setType] = treact.useState("emoji" as Type);

	const list = () => {
		if (type === "emoji") {
			return emojiSet.map((emoji) => (
				<p onClick={() => appendToInput(emoji)} className="d-middle">
					{emoji}
				</p>
			));
		} else {
			return stickers.map((sticker) => (
				<img onClick={() => sendSticker(sticker)} className="icon d-middle" style="height: 5rem;" src={sticker} />
			));
		}
	};

	return (
		<span onClick={toggleTooltip} className="tooltip flex items-center pd-4 bg-white border border-sm">
			🤗
			<span className="tooltip-content flex flex-c pd-4 bg-white border-sm">
				<div className="flex flex-r d-middle">
					<span
						onClick={() => setType("emoji")}
						className={type === "emoji" ? "btn bg-primary-l" : "btn btn-transparent"}
					>
						🙂
					</span>
					<span
						onClick={() => setType("sticker")}
						className={type === "sticker" ? "btn bg-primary-l" : "btn btn-transparent"}
					>
						👻
					</span>
				</div>
				<div className="flex flex-w overflow">{list()}</div>
			</span>
		</span>
	);
};

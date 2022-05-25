import { Component, treact } from "@treact";
import { FileSize } from "src/constants/size";
import { EventWithTarget } from "src/core/@types/event";
import { modAlertStore } from "src/stores/alert";

export const MessageAttachmentComponent: Component = () => {
	const attach = (event: EventWithTarget<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			if (file.size > FileSize.MB) {
				modAlertStore.set({ message: "File is too large", level: "error" });
			} else {
				modAlertStore.set({ message: "File is attached", level: "info" });
			}
		}
	};

	return (
		<label className="flex items-center pd-4 bg-white border border-sm">
			<input onChange={attach} type="file" id="attachments" accept=".pdf" />
			📎
		</label>
	);
};

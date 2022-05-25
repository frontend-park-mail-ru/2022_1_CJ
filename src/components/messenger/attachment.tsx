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
				event.target.value = "";
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

export const MessageImageAttachmentComponent: Component = () => {
	const attach = (event: EventWithTarget<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (event.target.files.length > 10) {
				modAlertStore.set({ message: "Too many files (10 allowed)", level: "error" });
				event.target.value = "";
				return;
			}

			const size = Object.values(event.target.files)
				.map((file) => file.size)
				.reduce((sum, size) => sum + size, 0);

			if (size > 10 * FileSize.MB) {
				modAlertStore.set({ message: "Files are too large", level: "error" });
				event.target.value = "";
			} else {
				modAlertStore.set({ message: "Files are attached", level: "info" });
			}
		}
	};

	return (
		<label className="flex items-center pd-4 bg-white border border-sm">
			<input onChange={attach} type="file" id="images" accept=".jpg, .jpeg, .png" multiple />
			🖼️
		</label>
	);
};

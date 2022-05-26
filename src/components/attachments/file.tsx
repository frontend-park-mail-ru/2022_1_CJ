import { Component, treact } from "@treact";
import { FileSize } from "src/constants/size";
import { EventWithTarget } from "src/core/@types/event";
import { uploadFile } from "src/core/network/api/file/upload";
import { modAlertStore } from "src/stores/alert";

export const getFileAttachments = async () => {
	const attachments = document.getElementById("attachments") as HTMLInputElement;
	const files = [] as string[];
	for (const [, file] of Object.entries(attachments.files)) {
		const formData = new FormData();
		formData.append("file", file);
		const url = await uploadFile(formData).then((response) => response.url);
		files.push(url);
	}
	attachments.value = "";
	attachments.dispatchEvent(new Event("change"));
	return files;
};

export const FileAttachmentsComponent: Component = () => {
	const [count, setCount] = treact.useState(0);

	const attach = (event: EventWithTarget<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (event.target.files.length > 10) {
				modAlertStore.set({ message: "Too many files (10 allowed)", level: "error" });
				event.target.value = "";
				return;
			}

			if (Object.values(event.target.files).some((file) => file.size > FileSize.MB)) {
				modAlertStore.set({ message: "Files are too large", level: "error" });
				event.target.value = "";
				return;
			}

			modAlertStore.set({ message: "Files are attached", level: "info" });
			setCount(event.target.files.length);
		} else if (count !== 0) {
			setCount(0);
		}
	};

	return (
		<label id="attachment-label" className="flex items-center pd-4 bg-white border border-sm">
			<input onChange={attach} type="file" id="attachments" accept=".pdf" multiple />
			<span>
				📎
				<span className="text-light pd-2">{count}</span>
			</span>
		</label>
	);
};

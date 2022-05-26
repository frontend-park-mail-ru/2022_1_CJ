import { Component, treact } from "@treact";
import { ImageViewerComponent } from "src/components/@helpers/imageViewer";
import { FileSize } from "src/constants/size";
import { EventWithTarget } from "src/core/@types/event";
import { uploadImage } from "src/core/network/api/static/upload";
import { modAlertStore } from "src/stores/alert";

export const getImageAttachments = async () => {
	const attachments = document.getElementById("images") as HTMLInputElement;
	const images = [] as string[];
	for (const [, file] of Object.entries(attachments.files)) {
		const formData = new FormData();
		formData.append("image", file);
		const url = await uploadImage(formData).then((response) => response.url);
		images.push(url);
	}
	attachments.value = "";
	attachments.dispatchEvent(new Event("change"));
	return images;
};

export const showImageAttachments = (images: string[]) => {
	const list = images.map((image) => <ImageViewerComponent url={image} />);
	return <div className="flex flex-w">{list}</div>;
};

export const ImageAttachmentsComponent: Component = () => {
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
		<label className="flex items-center pd-4 bg-white border border-sm">
			<input onChange={attach} type="file" id="images" accept=".jpg, .jpeg, .png" multiple />
			<span>
				🖼️
				<span className="text-light">{count}</span>
			</span>
		</label>
	);
};

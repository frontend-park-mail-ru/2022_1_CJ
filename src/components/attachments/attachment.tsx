import { Component, treact } from "@treact";
import { toggleTooltip } from "src/components/@helpers/tooltip";
import { FileAttachmentsComponent } from "src/components/attachments/file";
import { ImageAttachmentsComponent } from "src/components/attachments/images";

export const AttachmentComponent: Component = () => {
	return (
		<span onClick={toggleTooltip} className="tooltip flex items-center pd-4 bg-white border border-sm">
			📎
			<span className="tooltip-content flex flex-w pd-4 bg-white border-sm justify-center">
				<ImageAttachmentsComponent />
				<FileAttachmentsComponent />
			</span>
		</span>
	);
};

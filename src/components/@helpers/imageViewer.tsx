import { Component, ModalComponent, treact } from "@treact";
import { CrossComponent } from "src/components/@helpers/cross";

const Modal: ModalComponent = (props) => {
	const hide = props.hide;
	const url = props.url as string;
	treact.useClickOutside("modal", hide);

	treact.useEffect(() => {
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				hide();
				window.removeEventListener("keydown", close);
			}
		};
		window.addEventListener("keydown", close);
	}, []);

	return (
		<div className="modal flex items-center">
			<div id="modal" className="flex flex-c items-center d-middle bg-white pd-8 border-sm" style="max-width: 90vmin;">
				<CrossComponent hide={hide} />
				<img style="max-width: 75vw; max-height: 75vh;" src={url} alt="" />
			</div>
		</div>
	);
};

export const ImageViewerComponent: Component = ({ url }: { url: string }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<img onClick={() => setShow(true)} style="max-width: 8rem;" className="border-sm d-middle" src={url} alt="" />
			{show && <Modal hide={hide} url={url} />}
		</>
	);
};

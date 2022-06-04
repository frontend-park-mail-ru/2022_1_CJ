import { Component, ModalComponent, treact } from "@treact";
import { CrossComponent } from "src/components/@helpers/cross";

const Modal: ModalComponent<{ url: string }> = ({ hide, url }) => {
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
			<div id="modal" className="flex flex-c no-gap items-center d-middle bg-white pd-8 border-sm">
				<CrossComponent hide={hide} />
				<img style="max-width: 75vw; max-height: 75vh;" className="border-sm" src={url} alt="" />
			</div>
		</div>
	);
};

export const ImageViewerComponent: Component<{ url: string }> = ({ url }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<img onClick={() => setShow(true)} className="image border-sm d-middle pointer" src={url} alt="" />
			{show && <Modal hide={hide} url={url} />}
		</>
	);
};

export const CommunityImageViewerComponent: Component<{ url: string }> = ({ url }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<img
				onClick={() => setShow(true)}
				style="background-size: cover; max-height: 8rem;"
				className="border-sm pointer"
				src={url}
				alt=""
			/>
			{show && <Modal hide={hide} url={url} />}
		</>
	);
};

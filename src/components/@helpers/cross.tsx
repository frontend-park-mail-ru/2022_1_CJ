import { ModalComponent, treact } from "@treact";

export const CrossComponent: ModalComponent = ({ hide }) => {
	return <img src="/static/icons/cross.svg" className="cross" onClick={hide} />;
};

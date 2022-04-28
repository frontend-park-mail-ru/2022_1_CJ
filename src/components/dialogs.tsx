import { treact } from "@treact";
import { Dialog } from "src/core/@types/dialog";
import { messengerAPI } from "src/core/network/api/messenger";
import { Component } from "./@types/component";

export const Dialogs: Component = () => {
	const [dialogs, setDialogs] = treact.useState([] as Dialog[]);
	treact.useEffect(() => {
		messengerAPI.getDialogs().then((response) => setDialogs(response.dialogs || []));
	}, []);
	const map = (dialog: Dialog) => <div>{dialog.name}</div>;
	return <div className="flex flex-c">{dialogs.map(map)}</div>;
};

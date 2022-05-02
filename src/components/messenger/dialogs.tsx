import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { Link } from "src/components/link";
import { URL, urlWithParameters } from "src/constants/constants";
import { Dialog } from "src/core/@types/dialog";
import { messengerAPI } from "src/core/network/api/messenger";

export const Dialogs: Component = () => {
	const [dialogs, setDialogs] = treact.useState([] as Dialog[]);
	treact.useEffect(() => {
		messengerAPI.getDialogs().then((response) => setDialogs(response.dialogs || []));
	}, []);
	const map = (dialog: Dialog) => (
		<Link to={urlWithParameters(URL.Dialog, { dialog_id: dialog.dialog_id })}>{dialog.name}</Link>
	);
	return (
		<div className="flex flex-c">
			<p>Dialogs:</p>
			{dialogs.map(map)}
		</div>
	);
};

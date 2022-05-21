import { Component, treact } from "@treact";
import { Link } from "src/components/link";
import { Routes, withParameters } from "src/constants/routes";
import { Dialog } from "src/core/@types/dialog";
import { messengerAPI } from "src/core/network/api/messenger";

export const Dialogs: Component = () => {
	const [dialogs, setDialogs] = treact.useState([] as Dialog[]);
	treact.useEffect(() => {
		messengerAPI.getDialogs().then((response) => setDialogs(response.dialogs || []));
	}, []);

	const map = (dialog: Dialog) => (
		<div className="bg-white border-sm pd-4">
			<Link to={withParameters(Routes.Dialog, { dialog_id: dialog.dialog_id })}>{dialog.name}</Link>
		</div>
	);

	return <div className="flex flex-c grow items-center">{dialogs.length > 0 ? dialogs.map(map) : "Yet no chats"}</div>;
};

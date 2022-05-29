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
		<div className="flex flex-r items-center bg-white border-sm pd-4">
			<img className="avatar" src={dialog.image} alt="" />
			<Link to={withParameters(Routes.Dialog, { dialog_id: dialog.dialog_id })}>{dialog.name}</Link>
		</div>
	);

	const showDialogs = (list: Dialog[]) => {
		if (list?.length > 0) {
			return (
				<div className="flex flex-c grow">
					<div className="bold">Dialogs</div>
					{list.map(map)}
				</div>
			);
		}
		return <p className="text-center text-light">Yet no chats</p>;
	};

	return showDialogs(dialogs);
};

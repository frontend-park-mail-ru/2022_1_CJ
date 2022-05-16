import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Routes, withParameters } from "src/constants/routes";
import { messengerAPI } from "src/core/network/api/messenger";

export const MessageButton = ({ user_id }: { user_id: string }) => {
	const createDialog = async () => {
		const response = await messengerAPI.createDialog({
			name: "dialog",
			author_ids: [user_id],
		});
		return response.dialog_id;
	};

	const writeMessage = async () => {
		const response = await messengerAPI.getDialogIDByUserID({ user_id });
		const dialog_id = response ? response.dialog_id : await createDialog();
		navigateTo(withParameters(Routes.Dialog, { dialog_id }));
	};

	return (
		<button onClick={writeMessage} className="btn btn-secondary">
			Write message
		</button>
	);
};

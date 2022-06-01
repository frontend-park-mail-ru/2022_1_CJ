import { Dialog } from "src/core/@types/dialog";
import { fetchAPI } from "src/core/network/api/common";

type Response = {
	dialogs: Dialog[];
};

export const apiMessengerGetDialogs = () => fetchAPI.get<Response>("/api/messenger/dialogs");

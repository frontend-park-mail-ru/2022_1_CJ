import { Dialog } from "src/core/@types/dialog";

export type CreateDialogRequest = {
	name: string;
	author_ids: string[];
};

export type CreateDialogResponse = {
	dialog_id: string;
};

export type GetDialogsResponse = {
	dialogs: Dialog[];
};

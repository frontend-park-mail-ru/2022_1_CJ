import { Dialog, Message } from "src/core/@types/dialog";

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

export type GetDialogRequest = {
	dialog_id: string;
};

export type GetDialogResponse = {
	dialog: Dialog;
	messages: Message[];
};

export type GetDialogIDByUserIDRequest = {
	user_id: string;
};

export type GetDialogIDByUserIDResponse = {
	dialog_id: string;
};

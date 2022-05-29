export type Dialog = {
	dialog_id: string;
	name: string;
	participants: string[];
	image: string;
};

export type Message = {
	author_id: string;
	body: string;
	created_at: number;
	attachments: string[];
	images: string[];
};

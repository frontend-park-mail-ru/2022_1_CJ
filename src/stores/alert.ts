import { treact } from "@treact";

type AlertLevel = "info" | "warn" | "error";

export type AlertStore = {
	message: string;
	level: AlertLevel;
};

export const [useAlertStore, modAlertStore] = treact.createStore<AlertStore>();

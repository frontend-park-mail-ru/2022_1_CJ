import { treact, Component, ModalComponent } from "@treact";

type AlertLevel = "info" | "warn" | "error";

export type AlertStore = {
	message: string;
	level: AlertLevel;
};

export const [useAlertStore, modAlertStore] = treact.createStore(null as AlertStore);

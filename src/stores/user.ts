import { treact } from "@treact";
import { User } from "src/core/@types/user";

export enum UserStatus {
	Unset,
	Authorized,
	Unauthorized,
}

export type UserStore = {
	user: User;
	status: UserStatus;
};

export const useUserStore = treact.createStore({ user: null, status: UserStatus.Unset } as UserStore);

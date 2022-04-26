import { treact } from "@treact";
import { User } from "src/core/@types/user";

export enum UserStatus {
	Pending,
	Authorized,
	Unauthorized,
}

export type UserStore = {
	user: User;
	status: UserStatus;
};

export const useUserStore = treact.createStore({ user: null, status: UserStatus.Pending } as UserStore);

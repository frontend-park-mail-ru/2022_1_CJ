import { treact } from "@treact";
import { User } from "src/core/@types/user";

export type UserStore = {
	user: User;
};

export const useUserStore = treact.createStore((): UserStore => {
	return {
		user: null,
	};
});

import { userAPI } from "src/core/network/api/user";

export const FetchUsers = (userIDs: string[]) => {
	const promises = userIDs.map((user_id) => userAPI.getUserData({ user_id }).then((response) => response.user));
	return Promise.all(promises);
};

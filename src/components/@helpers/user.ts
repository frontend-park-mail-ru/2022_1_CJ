import { userAPI } from "src/core/network/api/user";

export const fetchUsers = (userIDs: string[]) => {
	const promises = userIDs
		.filter((user_id) => user_id !== "")
		.map((user_id) => userAPI.getUserData({ user_id }).then((response) => response.user));
	return Promise.all(promises);
};

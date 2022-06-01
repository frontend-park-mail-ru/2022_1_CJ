import { apiUserGetData } from "src/core/network/api/user/getData";

export const fetchUsers = (userIDs: string[]) => {
	const promises = userIDs
		.filter((user_id) => user_id !== "")
		.map((user_id) => apiUserGetData({ user_id }).then((response) => response.user));
	return Promise.all(promises);
};

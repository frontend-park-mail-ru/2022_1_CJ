import { fetchAPI } from "src/core/network/api/common";

export const logoutUser = () => fetchAPI.delete("/api/auth/logout");

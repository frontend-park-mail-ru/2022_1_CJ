import { ProfileSettings } from "src/core/@types/user";
import { fetchAPI } from "src/core/network/api/common";

type Request = ProfileSettings;

export const apiUserEditProfile = (dto: Request) => fetchAPI.post("/api/user/profile/edit", dto);

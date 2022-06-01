import { ProfileSettings } from "src/core/@types/user";
import { fetchAPI } from "src/core/network/api/common";
import { BasicResponse } from "src/core/network/dto/common";

export type Request = ProfileSettings;

export type Response = BasicResponse;

export const apiUserEditProfile = (dto: Request) => fetchAPI.post<Response>("/api/user/profile/edit", dto);

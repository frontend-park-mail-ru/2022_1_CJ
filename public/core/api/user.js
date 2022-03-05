import EventBus, { AuthEvents, EventBusChannels } from "../modules/EventBus.js";
import { fetchAPI } from "./common.js";

const userMethods = {
  signup: "/user/signup",
  login: "/user/login",
};

const Signup = async (email, password) => {
  console.log(email, password);
  const body = JSON.stringify({ email, password });
  const response = await fetchAPI(userMethods.signup, "POST", body);
  if (!response.ok) {
    // TODO: implement me
    console.log("failed");
    return;
  }

  return response.json;
  // const json = await response.json();
  // EventBus.emit(EventBusChannels.Auth, AuthEvents.Signup, json)
}

export const UserAPI = {
  Signup,
}

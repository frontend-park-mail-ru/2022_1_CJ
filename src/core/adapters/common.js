import { ComponentsRegistry } from "../constants/components_registry";
import { ContextKey, HttpStatus } from "../constants/constants";
import { TemplatesRegistry } from "../constants/templates_registry";
import { View } from "../models/View";
import { UserAPI } from "../network/api/user";

/**
 * Adds header component as subcomponent to the given view.
 * @param {View} view 
 */
export function HeaderAdapter(view) {
  view.addComponent("header", new ComponentsRegistry.HeaderComponent(TemplatesRegistry.Header));
}

/**
 * Adds information about user.
 * @param {View} view 
 */
export function AuthAdapter(view) {
  const [json, err] = await UserAPI.GetUserData(null);
  if (err != null && err.code != HttpStatus.Unauthorized) {
    throw err;
  }

  if (json) {
    view.setContextByKey(ContextKey.User, json[ContextKey.User]);
    view.setContextByKey(ContextKey.IsAuthorized, json[ContextKey.IsAuthorized]);
  } else {
    view.setContextByKey(ContextKey.User, null);
    view.setContextByKey(ContextKey.IsAuthorized, false);
  }
}

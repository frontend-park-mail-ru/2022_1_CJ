import '../dist/components.js';

import { headerComponent } from './Header/Header.js';
import { loginFormComponent } from './LoginForm/LoginForm.js';
import { postComponent } from './Post/Post.js';
import { postGroupComponent } from './PostGroup/PostGroup.js';
import { signupFormComponent } from './SignupForm/SignupForm.js';
import { menuComponent } from './Menu/Menu.js';
import { profileInfoComponent } from './ProfileInfo/ProfileInfo.js';
import { profileMenuComponent } from './ProfileMenu/ProfileMenu.js';

export const ComponentsRegistry = {
  Header: headerComponent(Handlebars.templates.Header),
  SignupForm: signupFormComponent(Handlebars.templates.SignupForm),
  LoginForm: loginFormComponent(Handlebars.templates.LoginForm),
  Menu: menuComponent(Handlebars.templates.Menu),
  Post: postComponent(Handlebars.templates.Post),
  PostGroup: postGroupComponent(Handlebars.templates.PostGroup),
  ProfileInfo: profileInfoComponent(Handlebars.templates.ProfileInfo),
  ProfileMenu: profileMenuComponent(Handlebars.templates.ProfileMenu),
};

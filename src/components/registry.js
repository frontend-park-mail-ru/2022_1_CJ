/* eslint-disable no-undef */
import '../dist/components.js';

import { headerComponent } from './Header/Header.js';
import { signupFormComponent } from './SignupForm/SignupForm.js';
import { loginFormComponent } from './LoginForm/LoginForm.js';
import { postComponent } from './Post/Post.js';
import { imageHorizontalScrollComponent } from './ImageHorizontalScroll/ImageHorizontalScroll.js';
import { commentComponent } from './Comment/Comment.js';
import { postGroupComponent } from './PostGroup/PostGroup.js';
import { menuComponent } from './Menu/Menu.js';
import { profileInfoComponent } from './ProfileInfo/ProfileInfo.js';
import { profileMenuComponent } from './ProfileMenu/ProfileMenu.js';
import { profileSettingsComponent } from './ProfileSettings/ProfileSettings.js';
import { modalRepliesComponent } from './ModalReplies/ModalReplies.js';
import { dialogsComponent } from './Dialogs/Dialogs.js';
import { chatComponent } from './Chat/Chat.js'
import { friendsComponent } from './Friends/Friends.js'

export const ComponentsRegistry = {
  Header: headerComponent(Handlebars.templates.Header),
  SignupForm: signupFormComponent(Handlebars.templates.SignupForm),
  LoginForm: loginFormComponent(Handlebars.templates.LoginForm),
  Menu: menuComponent(Handlebars.templates.Menu),
  Post: postComponent(Handlebars.templates.Post),
  ImageHorizontalScroll: imageHorizontalScrollComponent(Handlebars.templates.ImageHorizontalScroll),
  Comment: commentComponent(Handlebars.templates.Comment),
  PostGroup: postGroupComponent(Handlebars.templates.PostGroup),
  ProfileInfo: profileInfoComponent(Handlebars.templates.ProfileInfo),
  ProfileMenu: profileMenuComponent(Handlebars.templates.ProfileMenu),
  ProfileSettings: profileSettingsComponent(Handlebars.templates.ProfileSettings),
  ModalReplies: modalRepliesComponent(Handlebars.templates.ModalReplies),
  Dialogs: dialogsComponent(Handlebars.templates.Dialogs),
  Chat: chatComponent(Handlebars.templates.Chat),
  Friends: friendsComponent(Handlebars.templates.Friends),
};

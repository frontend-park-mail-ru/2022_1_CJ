import '../dist/components.js';

import { HeaderComponent } from './Header/Header.js';
import { SignupFormComponent } from './SignupForm/SignupForm.js';
import { LoginFormComponent } from './LoginForm/LoginForm.js';
import { PostComponent } from './Post/Post.js';
import { PostAuthorComponent } from './PostAuthor/PostAuthor.js';

export const ComponentsRegistry = {
  Header: new HeaderComponent(Handlebars.templates.Header),
  SignupForm: new SignupFormComponent(Handlebars.templates.SignupForm),
  LoginForm: new LoginFormComponent(Handlebars.templates.LoginForm),
  Post: new PostComponent(Handlebars.templates.Post),
  PostAuthor: new PostAuthorComponent(Handlebars.templates.PostAuthor)
};

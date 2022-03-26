import '../../dist/components.js';

import { HeaderComponent } from '../../components/Header/Header.js';
import { SignupFormComponent } from '../../components/SignupForm/SignupForm.js';
import { LoginFormComponent } from '../../components/LoginForm/LoginForm.js';
import { PostComponent } from '../../components/Post/Post.js';
import { PostAuthorComponent } from '../../components/PostAuthor/PostAuthor.js';

export const ComponentsRegistry = {
  Header: new HeaderComponent(Handlebars.templates.Header),
  SignupForm: new SignupFormComponent(Handlebars.templates.SignupForm),
  LoginForm: new LoginFormComponent(Handlebars.templates.LoginForm),
  Post: new PostComponent(Handlebars.templates.Post),
  PostAuthor: new PostAuthorComponent(Handlebars.templates.PostAuthor)
};

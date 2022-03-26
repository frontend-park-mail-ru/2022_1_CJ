import { HeaderComponent } from '../../components/Header/Header.js';
import { SignupFormComponent } from '../../components/SignupForm/SignupForm.js';
import { LoginFormComponent } from '../../components/LoginForm/LoginForm.js';
import { PostComponent } from '../../components/Post/Post.js';
import { PostAuthorComponent } from '../../components/PostAuthor/PostAuthor.js';
import { TemplatesRegistry } from './templates_registry.js';

export const ComponentsRegistry = {
  Header: new HeaderComponent(TemplatesRegistry.Header),
  SignupForm: new SignupFormComponent(TemplatesRegistry.SignupForm),
  LoginForm: new LoginFormComponent(TemplatesRegistry.LoginForm),
  Post: new PostComponent(TemplatesRegistry.Post),
  PostAuthor: new PostAuthorComponent(TemplatesRegistry.PostAuthor)
};

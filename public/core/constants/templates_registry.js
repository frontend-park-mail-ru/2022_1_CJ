import '../../precompiled/Header.js';
import '../../precompiled/Signup.js';
import '../../precompiled/Login.js';
import '../../precompiled/Feed.js';
import '../../precompiled/PostSettings.js';
import '../../precompiled/NotFound.js';

export const TemplatesRegistry = {
  Header: Handlebars.templates.Header,
  // HeaderSettings: Handlebars.templates.HeaderSettings,

  Login: Handlebars.templates.Login,
  NotFound: Handlebars.templates.NotFound,
  Signup: Handlebars.templates.Signup,

  Feed: Handlebars.templates.Feed,
  PostSettings: Handlebars.templates.PostSettings,
};

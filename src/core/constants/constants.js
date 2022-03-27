export const URL = {
  Base: '/',
  Signup: '/signup',
  Login: '/login',
  Feed: '/feed',
  Logout: '/logout',
  Profile: '/profile',
  // not for production
  Test: '/test',
};

export const HttpStatus = {
  OK: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  Conflict: 409,
  InternalServerError: 500,
};

export const ContextKey = {
  User: 'user',
  IsAuthorized: 'isAuthorized',
};

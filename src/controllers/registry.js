import { baseController } from './Base.js';
import { signupController } from './Signup.js';
import { loginController } from './Login.js';
import { feedController } from './Feed.js';
import { profileController } from './Profile.js';
import { profileSettingsController } from './ProfileSettings.js';
import { messengerController } from './Messenger.js';
import { friendsController } from './Friends.js';
import { searchController } from './Search.js';
import { notFoundController } from './NotFound.js';
import { logoutController } from './Logout.js';

export const controllersRegistry = {
  base: baseController,
  signup: signupController,
  login: loginController,
  feed: feedController,
  profile: profileController,
  profileSettings: profileSettingsController,
  messenger: messengerController,
  friends: friendsController,
  search: searchController,
  notFound: notFoundController,
  logout: logoutController
};

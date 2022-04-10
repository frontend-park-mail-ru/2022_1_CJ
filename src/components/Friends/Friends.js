import { createComponent } from '../../core/models/Component/Component.js';
import { userAPI } from '../../core/network/api/user.js';
import { searchUsersDTO } from '../../core/network/dto/user.js';

const reprintUsers = (users) => {
  const container = document.getElementById('friends-container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  Object.values(users).forEach((user) => {
    const element = document.createElement('p');
    element.innerText = `${user.name.first} ${user.name.last} ${user.id}`;
    container.appendChild(element);
  });
};

const searchUsers = (e) => {
  const selector = e.target.value.trim();
  if (selector) {
    userAPI.searchUsers(searchUsersDTO(selector)).then((json) => reprintUsers(json.users));
  }
};

const reducer = {
  onShow: () => {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', searchUsers);
  }
};

export const friendsComponent = (template) => createComponent(template, reducer);

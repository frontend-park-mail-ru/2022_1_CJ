import './components/Header/Header.js'
import './components/Footer/Footer.js'
import './components/Footer/Footer.js'

const root = document.getElementById('root');
const { Header, Footer, Menu } = document.components;

const configApp = {
  menu: {
    href: '/menu',
    openMethod: menuPage,
  },
  signup: {
    href: '/sighup',
    text: 'Зарегистрироваться',
    openMethod: signupPage,
  },
  login: {
    href: '/login',
    text: 'Войти',
    openMethod: loginPage,
  },
  profile: {
    href: '/profile',
    text: 'Профиль',
    openMethod: profilePage,
  },
  about: {
    href: '/about',
    text: safe('<iframe src="https://example.com" onload="alert(1);"></iframe>')
  }
};

const render = () => {
  root.innerHTML += Header();
  root.innerHTML += Footer();
}

render();
const internal = document.getElementById('internal');

root.addEventListener('click', (e) => {
  internal.innerHTML = 'clicked';
});

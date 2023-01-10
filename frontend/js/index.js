import sportDataJSON from '/assets/sportData.json' assert { type: 'json' };
import { renderEventPage } from '/js/event.js';
import { renderAddPage } from '/js/add.js';
import { renderLoginPage } from '/js/login.js';
import { renderHomePage } from '/js/home.js';

export let user = { isLoggedIn: false };
export const sportData = sportDataJSON.data;
export const mainElement = document.getElementsByTagName('main')[0];

export const saveUserStateToLocalStorage = () => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const changeToLayout = privilige => {
  if (privilige === 'admin') {
    document.querySelector('style').innerHTML = `
  .adminComponent {display: inline}
  .loginLink {display: none}
  `;
  } else {
    document.querySelector('style').innerHTML = `
  .adminComponent {display: none}
  .loginLink {display: inline}
  `;
  }
};

export const login = () => {
  changeToLayout('admin');
  renderHomePage();
  user.isLoggedIn = true;
  saveUserStateToLocalStorage();
};

const logout = () => {
  changeToLayout('visitor');
  renderHomePage();
  user.isLoggedIn = false;
  saveUserStateToLocalStorage();
};

const scrollTop = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const checkLocalStorage = () => {
  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
  }
  if (user.isLoggedIn) changeToLayout('admin');
};

const checkHashThenNavigate = () => {
  checkLocalStorage();
  let hash = window.location.hash.substring(1);
  if (hash > 0 && hash <= sportData.length) {
    renderEventPage(hash);
  } else if (hash === 'add' && user.isLoggedIn) {
    renderAddPage();
  } else if (hash === 'add' && !user.isLoggedIn) {
    renderLoginPage();
  } else if (hash === 'login' && !user.isLoggedIn) {
    renderLoginPage();
  } else if (hash === 'logout') {
    logout();
  } else {
    renderHomePage();
  }
  scrollTop();
};

checkHashThenNavigate();
window.addEventListener('hashchange', checkHashThenNavigate);
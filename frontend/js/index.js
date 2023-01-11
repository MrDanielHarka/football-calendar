import { sportData } from './http.js';
import { renderEventPage } from './event.js';
import { renderAddPage } from './add.js';
import { renderLoginPage } from './login.js';
import { renderHomePage } from './home.js';
import { renderHeaderAndFooter } from './elements.js';

export let user = { isLoggedIn: false };
export const mainElement = document.getElementsByTagName('main')[0];

const saveUserStateToLocalStorage = () => {
  localStorage.setItem('user', JSON.stringify(user));
};

const changeToLayout = privilige => {
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

const renderSiteAndNavigate = () => {
  checkLocalStorage();
  renderHeaderAndFooter();
  let hash = window.location.hash.substring(1);
  console.log('Hash:', hash);
  console.log(sportData.length);
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

sportData ? renderSiteAndNavigate() : setTimeout(renderSiteAndNavigate, 300);
window.addEventListener('hashchange', renderSiteAndNavigate);

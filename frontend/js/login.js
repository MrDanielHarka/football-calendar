import { mainElement } from './index.js';
import { initiateLogin } from './http.js';

const submitLogin = e => {
  e.preventDefault();
  initiateLogin({
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value,
  });
};

export const renderLoginPage = () => {
  mainElement.innerHTML = `
  <form class="card login">
      <h1>Login</h1>
      <label for="username">Username</label>
      <br />
      <input type="text" id="username" minlength="3" required />
      <br /><br />
      <label for="password">Password</label>
      <br />
      <input type="password" id="password" minlength="5" required />
      <br />
      <span class="login-message"></span>
      <br />
      <button class="button button--green">Login</button>
    </form>
  `;

  document
    .querySelector('.login')
    .addEventListener('submit', e => submitLogin(e));
};

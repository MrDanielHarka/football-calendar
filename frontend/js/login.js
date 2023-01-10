import { login, mainElement } from '/js/index.js';

const submitLogin = e => {
  e.preventDefault();
  login();
};

export const renderLoginPage = () => {
  mainElement.innerHTML = `
  <form class="card login">
      <h1>Login</h1>
      <label for="username">Username</label>
      <br />
      <input type="username" id="username" required value="dani" />
      <br /><br />
      <label for="password">Password</label>
      <br />
      <input type="password" id="password" required value="Vienna<3" />
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

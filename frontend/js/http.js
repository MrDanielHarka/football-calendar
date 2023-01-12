import { login, mainElement } from './index.js';
import { renderHomePage } from './home.js';

const xhr = new XMLHttpRequest(),
  backendURL = 'https://gp0eij-3000.preview.csb.app';

xhr.onerror = () => serverErrorHandling();

export let sportData = 0;

const notifyUser = () => {
  mainElement.innerHTML = `
      <div class="card card--big">
        <h1>Server error! :(</h1>
        <p>The server can't be reached for some reason.</p>
        <p>Please refresh or try visiting at a later time.</p>
      </div>`;
};

const notifyDaniel = () => {
  const xhrDaniel = new XMLHttpRequest();
  xhrDaniel.open(
    'POST',
    'https://docs.google.com/forms/u/1/d/e/1FAIpQLScZCRD7ynRbuG-tkQT5FcicxK8Bii6impvbQTFCb-wLW1YVSA/formResponse'
  );
  xhrDaniel.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  );
  xhrDaniel.send(`entry.1799968402=Football Calendar server down!`);
};

const serverErrorHandling = () => {
  notifyUser();
  notifyDaniel();
};

export const loadData = () => {
  xhr.open('GET', `${backendURL}/load`);
  xhr.onload = () => {
    sportData = JSON.parse(xhr.responseText).data;
  };
  xhr.send();
};

export const saveData = () => {
  xhr.open('PUT', `${backendURL}/save`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {};
  xhr.send(JSON.stringify({ data: sportData }));
};

export const resetData = () => {
  sportData = 0;
  xhr.open('PUT', `${backendURL}/reset`);
  xhr.onload = () => {
    sportData = JSON.parse(xhr.responseText).data;
  };
  xhr.send();
  sportData ? renderHomePage() : setTimeout(renderHomePage, 50);
};

export const initiateLogin = loginData => {
  xhr.open('POST', `${backendURL}/login`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      login();
    } else if (xhr.status === 401) {
      document.querySelector('.login-message').textContent =
        'Wrong username or password!';
    }
  };
  xhr.send(JSON.stringify(loginData));
};

loadData();

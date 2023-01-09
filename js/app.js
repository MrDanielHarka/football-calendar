import sportDataJSON from '/assets/sportData.json' assert { type: 'json' };
import { renderHomePage } from '/js/home.js';
import { renderEventPage } from '/js/event.js';
import { renderAddPage } from '/js/add.js';

export const sportData = sportDataJSON.data;
export const mainElement = document.getElementsByTagName('main')[0];

const scrollTop = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const checkHashThenNavigate = () => {
  let hash = window.location.hash.substring(1);
  if (hash > 0 && hash <= sportData.length) {
    renderEventPage(hash);
  } else if (hash === 'add') {
    renderAddPage();
  } else {
    renderHomePage();
  }
  scrollTop();
};

checkHashThenNavigate();
window.addEventListener('hashchange', checkHashThenNavigate);

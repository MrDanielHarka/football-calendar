import { sportData, mainElement } from '/js/app.js';

export const renderAddPage = () => {
  window.location.hash = '#add';
  mainElement.textContent = 'Add page.';
};

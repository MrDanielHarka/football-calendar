import { sportData, mainElement } from '/js/app.js';

export const renderEventPage = eventId => {
  console.log(`Event details: ${eventId}`);
  mainElement.innerHTML = `
  Event details: ${eventId}
  `;
};

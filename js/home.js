import { sportData, mainElement } from '/js/app.js';
import { renderAddPage } from '/js/add.js';

const confirmationText = document.querySelector('.confirmationText');

const deleteConfirmationButton = document.querySelector(
  '.deleteConfirmationButton'
);

const resetConfirmationButton = document.querySelector(
  '.resetConfirmationButton'
);

const hideModal = () => {
  console.log('Modal closed.');
  document.getElementsByClassName('modal')[0].style.display = 'none';
  document.getElementsByClassName('modal-background')[0].style.display = 'none';
};

const deleteEvent = () => {
  const eventId = deleteConfirmationButton.getAttribute('data-delete');
  console.log(`Event #${eventId} is deleted.`);
  sportData.splice(eventId - 1, 1);
  console.log(sportData);
  hideModal();
  loadEvents();
};

const loadEvents = () => {
  const showModal = () => {
    document.querySelector('.modal-background').style.display = 'block';
    document.querySelector('.modal').style.display = 'flex';
  };

  const showDeleteConfirmation = e => {
    confirmationText.textContent =
      'Are you sure you would like to delete this event?';
    resetConfirmationButton.style.display = 'none';
    deleteConfirmationButton.style.display = 'inline-block';
    deleteConfirmationButton.setAttribute(
      'data-delete',
      e.target.getAttribute('data-delete')
    );
    console.log('Event deleting logic + confirmation modal here.');
    showModal();
  };

  let events = '',
    eventId = 0;

  events += `<div class="flex-container">`;
  for (const event of sportData) {
    eventId++;
    console.log(
      eventId,
      `${event.homeTeam != null ? event.homeTeam.abbreviation : 'N/A'} vs ${
        event.awayTeam != null ? event.awayTeam.abbreviation : 'N/A'
      }`
    );
    events += `
        <div class="event ${event.status}">
        <a href="#${eventId}" class="card shadow">
        ${eventId}
        <br>
          <span
            >${event.homeTeam != null ? event.homeTeam.abbreviation : 'N/A'} vs
            ${
              event.awayTeam != null ? event.awayTeam.abbreviation : 'N/A'
            }</span
          >
          <br />
          <span>Date: ${event.dateVenue}</span>
          <br />
          <span>Time: ${event.timeVenueUTC}</span>
          <br />
        </a>
        <button class="button button--red showDeleteConfirmation adminComponent" data-delete="${eventId}">Delete event</button>
      </div>
    `;
  }
  events += ` </div>`;

  document.getElementsByClassName('events')[0].innerHTML = events;

  document.querySelectorAll('.showDeleteConfirmation').forEach(element => {
    element.addEventListener('click', showDeleteConfirmation);
  });

  document
    .getElementsByClassName('addNewEvent')[0]
    .addEventListener('click', renderAddPage);
};

export const renderHomePage = () => {
  const resetEvents = () => {
    console.log('Event resetting logic + confirmation modal here.');
  };

  const filterEvents = () => {
    const events = document.querySelectorAll('.event');
    const scheduledEvents = document.querySelectorAll('.scheduled');
    const playedEvents = document.querySelectorAll('.played');

    if (selectElement.value === 'all') {
      events.forEach(event => (event.style.display = 'block'));
    } else if (selectElement.value === 'scheduled') {
      scheduledEvents.forEach(event => (event.style.display = 'block'));
      playedEvents.forEach(event => (event.style.display = 'none'));
    } else {
      playedEvents.forEach(event => (event.style.display = 'block'));
      scheduledEvents.forEach(event => (event.style.display = 'none'));
    }
  };

  mainElement.innerHTML = `

<p>This is a simple football calendar of the AFC Champions League.</p>
<button class="button button--green addNewEvent adminComponent">Add new event</button>
  <button class="button button--blue resetEvents adminComponent">Reset events</button>
  <br>
    <label for="events">Event status:</label>
    <select name="events" id="events" class="button">
      <option value="all">All</option>
      <option value="scheduled">Scheduled</option>
      <option value="played">Played</option>
    </select>
    <div class="events"></div>
`;

  const selectElement = document.getElementsByTagName('select')[0];
  selectElement.addEventListener('change', filterEvents);

  loadEvents();

  document
    .getElementsByClassName('resetEvents')[0]
    .addEventListener('click', resetEvents);
};

deleteConfirmationButton.addEventListener('click', () => deleteEvent());
document.querySelectorAll('.hideModal').forEach(element => {
  element.addEventListener('click', hideModal);
});

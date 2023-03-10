import { mainElement } from './index.js';
import { sportData, saveData, resetData } from './http.js';
import { renderAddPage } from './add.js';

const confirmationText = document.querySelector('.confirmationText');

const deleteConfirmationButton = document.querySelector(
  '.deleteConfirmationButton'
);

const resetConfirmationButton = document.querySelector(
  '.resetConfirmationButton'
);

const hideModal = () => {
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.modal-background').style.display = 'none';
};

const deleteEvent = () => {
  const eventId = deleteConfirmationButton.getAttribute('data-delete');
  sportData.splice(eventId - 1, 1);
  hideModal();
  loadEvents();
  saveData();
};

const resetEvents = () => {
  resetData();
  hideModal();
};

const loadEvents = () => {
  const selectElement = document.querySelector('select');
  selectElement.value = 'all';
  const showModal = () => {
    document.querySelector('.modal-background').style.display = 'block';
    document.querySelector('.modal').style.display = 'flex';
  };

  const showResetConfirmation = () => {
    confirmationText.textContent =
      'Are you sure you would like to reset the events?';
    deleteConfirmationButton.style.display = 'none';
    resetConfirmationButton.style.display = 'inline-block';
    showModal();
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
    showModal();
  };

  let events = sportData
    .map((event, index) => {
      return `
        <div class="event ${event.status}">
        <a href="#${index + 1}" class="card shadow" tabindex="0">
        <br>
        <img src="./assets/img.png" alt="Football Calendar" width="88" height="75" />
        <br>
          <span
            >${
              event.homeTeam != null && event.homeTeam.abbreviation !== null
                ? event.homeTeam.abbreviation
                : '???'
            } vs
            ${
              event.awayTeam != null && event.awayTeam.abbreviation !== null
                ? event.awayTeam.abbreviation
                : '???'
            }</span
          >
          <br />
          <span>Date: ${event.dateVenue}</span>
          <br />
          <span>Time: ${event.timeVenueUTC.slice(0, 5)} (UTC)</span>
          <br /><br />
        </a>
        <button class="button button--black showDeleteConfirmation adminComponent" data-delete="${
          index + 1
        }">Delete event</button>
      </div>
    `;
    })
    .join('');

  document
    .querySelector('.showResetConfirmation')
    .addEventListener('click', showResetConfirmation);

  document.querySelector('.event-wrapper').innerHTML = events;

  document.querySelectorAll('.showDeleteConfirmation').forEach(element => {
    element.addEventListener('click', showDeleteConfirmation);
  });

  document
    .getElementsByClassName('addNewEvent')[0]
    .addEventListener('click', renderAddPage);
};

export const renderHomePage = () => {
  if (sportData) {
    window.location.hash = '#';

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
<div class="adminComponent">
  <button class="button button--green addNewEvent">Add new event</button>
    <button class="button button--black showResetConfirmation">Reset events</button>
</div>
  <br>
    <label for="events">Event status:</label>
    <select name="events" id="events" class="button">
      <option value="all">All</option>
      <option value="scheduled">Scheduled</option>
      <option value="played">Played</option>
    </select>
    <div class="event-wrapper flex-container"></div>
`;

    const selectElement = document.querySelector('select');
    selectElement.addEventListener('change', filterEvents);

    loadEvents();
  } else {
    setTimeout(renderHomePage, 50);
  }
};

deleteConfirmationButton.addEventListener('click', deleteEvent);
resetConfirmationButton.addEventListener('click', resetEvents);

document.querySelectorAll('.hideModal').forEach(element => {
  element.addEventListener('click', hideModal);
});

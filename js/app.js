import sportDataJSON from '/assets/sportData.json' assert { type: 'json' };
let sportData = sportDataJSON.data;
const mainElement = document.getElementsByTagName('main')[0];

const loadEvents = () => {
  const showModal = () => {
    document.querySelector('.modal-background').style.display = 'block';
    document.querySelector('.modal').style.display = 'flex';
  };
  const hideModal = () => {
    console.log('Clicked.');
    document.getElementsByClassName('modal')[0].style.display = 'none';
    document.getElementsByClassName('modal-background')[0].style.display =
      'none';
  };
  const deleteEvent = eventId => console.log(`Event #${eventId} is deleted.`);

  const showDeleteConfirmation = e => {
    console.log('Event deleting logic + confirmation modal here.');
    const deletableEventId = e.target.getAttribute('data-delete');
    showModal();
    document
      .querySelector('.confirmationButton')
      .addEventListener('click', () => deleteEvent(deletableEventId));
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
        <a href="#${eventId}" class="background rounded shadow">
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

  document.querySelectorAll('.hideModal').forEach(element => {
    element.addEventListener('click', hideModal);
  });
};

const showHomePage = () => {
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
    .getElementsByClassName('addNewEvent')[0]
    .addEventListener('click', showAddPage);
  document
    .getElementsByClassName('resetEvents')[0]
    .addEventListener('click', resetEvents);
};

const showEventPage = eventId => {
  console.log(`Event details: ${eventId}`);
  mainElement.innerHTML = `
  Event details: ${eventId}
  `;
};

const showAddPage = () => {
  window.location.hash = '#add';
  mainElement.textContent = 'Add page.';
};

const checkHash = () => {
  let hash = window.location.hash.substring(1);
  if (hash > 0 && hash <= sportData.length) {
    showEventPage(hash);
  } else if (hash === 'add') {
    showAddPage();
  } else {
    showHomePage();
  }
};

checkHash();

window.addEventListener('hashchange', checkHash);

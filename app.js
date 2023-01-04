import sportDataJSON from './sportData.json' assert { type: 'json' };
let sportData = sportDataJSON.data;
const mainElement = document.getElementsByTagName('main')[0];

const showEvents = () => {
  let events = '',
    eventId = 0;

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
      <a href="#${eventId}" >
          <span>${
            event.homeTeam != null ? event.homeTeam.abbreviation : 'N/A'
          } vs ${
      event.awayTeam != null ? event.awayTeam.abbreviation : 'N/A'
    }</span>
    <br>
          <span>Date: ${event.dateVenue}</span>
          <br>
          <span>Time: ${event.timeVenueUTC}</span>
          <br>
          </a>
          <b style="color: red">Delete event</b>
          <br>
          <br>
    </div>
    `;
  }

  document.getElementsByClassName('events')[0].innerHTML = events;
};

const showHomePage = () => {
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

    <label for="events">Event status:</label>
    <select name="events" id="events">
      <option value="all">All</option>
      <option value="scheduled">Scheduled</option>
      <option value="played">Played</option>
    </select>

    <p style="color: green; font-weight: bold">Add new event</p>

    <div class="events"></div>
`;

  const selectElement = document.getElementsByTagName('select')[0];
  selectElement.addEventListener('change', filterEvents);

  showEvents();

  console.log('Home.');
};

const showEventPage = eventId => {
  console.log(`Event details: ${eventId}`);
  mainElement.innerHTML = `
  Event details: ${eventId}
  `;
};

const showAddPage = () => console.log('Add.');

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

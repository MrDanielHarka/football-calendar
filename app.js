import sportDataJSON from './sportData.json' assert { type: 'json' };
let sportData = sportDataJSON.data;

const showEvents = () => {
  let events = '',
    eventId = 0;

  for (const event of sportData) {
    eventId++;
    console.log(
      eventId,
      `${event.homeTeam != null ? event.homeTeam.abbreviation : '???'} vs ${
        event.awayTeam != null ? event.awayTeam.abbreviation : '???'
      }`
    );
    events += `
    <div class="event ${event.status}">
      <a href="#${eventId}" >
          <span>${
            event.homeTeam != null ? event.homeTeam.abbreviation : '???'
          } vs ${
      event.awayTeam != null ? event.awayTeam.abbreviation : '???'
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
  const main = document.getElementsByTagName('main')[0];
  main.innerHTML += `
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

  const select = document.getElementsByTagName('select')[0];

  showEvents();

  select.addEventListener('change', function () {
    const events = document.querySelectorAll('.event');
    const scheduledEvents = document.querySelectorAll('.scheduled');
    const playedEvents = document.querySelectorAll('.played');

    if (select.value === 'all') {
      events.forEach(event => (event.style.display = 'block'));
    } else if (select.value === 'scheduled') {
      scheduledEvents.forEach(event => (event.style.display = 'block'));
      playedEvents.forEach(event => (event.style.display = 'none'));
    } else {
      playedEvents.forEach(event => (event.style.display = 'block'));
      scheduledEvents.forEach(event => (event.style.display = 'none'));
    }
  });

  console.log('Home.');
};

const showAddPage = () => console.log('Add.');

const showEventDetailsPage = eventId => {
  console.log(`Event details: ${eventId}`);
};

const checkHash = () => {
  let hash = window.location.hash.substring(1);
  if (hash > 0 && hash <= sportData.length) {
    showEventDetailsPage(hash);
  } else if (hash === 'add') {
    showAddPage();
  } else {
    showHomePage();
  }
};

checkHash();

window.addEventListener('hashchange', function () {
  checkHash();
});

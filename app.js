import sportDataJSON from './sportData.json' assert { type: 'json' };
let sportData = sportDataJSON.data;
console.log(sportData);

const showEvents = () => {
  let events = '',
    eventId = 0;

  for (const event of sportData) {
    eventId++;
    console.log(eventId);
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

    <p style="color: green; font-weight: bold">Add new event</p>

    <div class="events"></div>
`;

  showEvents();

  console.log('Home.');
};

showHomePage();

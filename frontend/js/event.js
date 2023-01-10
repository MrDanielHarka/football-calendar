import { sportData, mainElement } from './index.js';

export const renderEventPage = eventId => {
  const event = sportData[parseInt(eventId) - 1];
  console.log(event);

  mainElement.innerHTML = `
  <div class="card card--big">
      <h1>
        ${
          event.homeTeam !== null && event.homeTeam.abbreviation !== null
            ? event.homeTeam.abbreviation
            : '???'
        } vs ${
    event.awayTeam !== null && event.awayTeam.abbreviation !== null
      ? event.awayTeam.abbreviation
      : '???'
  }
        <br />
        match details
      </h1>
      <p>
        This page is about the ${event.status} game between the following
        teams:
      </p>

      <p>
        <span class="teamname">${
          event.homeTeam !== null && event.homeTeam.name !== null
            ? event.homeTeam.name
            : 'Undecided'
        }</span>
        <br />
        vs
        <br />
      <span class="teamname">${
        event.awayTeam !== null && event.awayTeam.name !== null
          ? event.awayTeam.name
          : 'Undecided'
      }</span>
      </p>

      <p>
        The match is ${event.status} on ${
    event.dateVenue
  } at ${event.timeVenueUTC.slice(0, 5)} (UTC). The place is ${
    event.stadium !== null ? event.stadium : 'not known'
  }.
      </p>
    </div>
    <div class="flex-container">
      <div class="card info-wrapper">
        <h2>Home team info</h2>
        <div class="flex-container flex-container--small">
          <div>Name:</div>
          <div>${
            event.homeTeam !== null && event.homeTeam.name !== null
              ? event.homeTeam.name
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Official name:</div>
          <div>${
            event.homeTeam !== null && event.homeTeam.officialName !== null
              ? event.homeTeam.officialName
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Slug:</div>
          <div>${
            event.homeTeam !== null && event.homeTeam.slug !== null
              ? event.homeTeam.slug
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Abbreviation:</div>
          <div>${
            event.homeTeam !== null && event.homeTeam.abbreviation !== null
              ? event.homeTeam.abbreviation
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Team country code:</div>
          <div>${
            event.homeTeam !== null && event.homeTeam.teamCountryCode !== null
              ? event.homeTeam.teamCountryCode
              : 'Undecided'
          }</div>
        </div>
      </div>
      <div class="card info-wrapper">
        <h2>Away team info</h2>
        <div class="flex-container flex-container--small">
          <div>Name:</div>
          <div>${
            event.awayTeam !== null && event.awayTeam.name !== null
              ? event.awayTeam.name
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Official name:</div>
          <div>${
            event.awayTeam !== null && event.awayTeam.officialName !== null
              ? event.awayTeam.officialName
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Slug:</div>
          <div>${
            event.awayTeam !== null && event.awayTeam.slug !== null
              ? event.awayTeam.slug
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Abbreviation:</div>
          <div>${
            event.awayTeam !== null && event.awayTeam.abbreviation !== null
              ? event.awayTeam.abbreviation
              : 'Undecided'
          }</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Team country code:</div>
          <div>${
            event.awayTeam !== null && event.awayTeam.teamCountryCode !== null
              ? event.awayTeam.teamCountryCode
              : 'Undecided'
          }</div>
        </div>
      </div>
      <div class="card info-wrapper">
        <h2>Game info</h2>
        <div class="flex-container flex-container--small">
          <div>Season:</div>
          <div>${event.season}</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Stage:</div>
          <div>${event.stage.name}</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Ordering:</div>
          <div>${event.stage.ordering}</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Goals by ${
            event.homeTeam !== null && event.homeTeam.abbreviation !== null
              ? event.homeTeam.abbreviation
              : '???'
          } :</div>
          <div>${event.result.homeGoals}</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Goals by ${
            event.awayTeam !== null && event.awayTeam.abbreviation !== null
              ? event.awayTeam.abbreviation
              : '???'
          }:</div>
          <div>${event.result.awayGoals}</div>
        </div>
        <div class="flex-container flex-container--small">
          <div>Winner:</div>
          <div>${event.result.winner ?? 'Undecided'}</div>
        </div>

      <div>${event.result.message !== null ? '<br><b>Message</b>:' : ''}</div>
      <div class="message-text">${
        event.result.message !== null ? event.result.message : ''
      }</div>
      </div>
    </div>
    <aside class="card card--big">
      <h2>Summary</h2>
      <p>
        The game is ${event.status} on ${
    event.dateVenue
  } at ${event.timeVenueUTC.slice(0, 5)} (UTC) between
        ${
          event.homeTeam !== null && event.homeTeam.officialName !== null
            ? event.homeTeam.officialName
            : 'an undecided'
        } and ${
    event.awayTeam !== null && event.awayTeam.officialName !== null
      ? event.awayTeam.officialName
      : 'an undecided team'
  } in ${event.season}. The stage is
        ${event.stage.name.toLowerCase()} and the ordering is ${
    event.stage.ordering
  }. The place of the match is
${event.stadium !== null ? event.stadium : 'not known'}.
      </p>
    </aside>
  `;
};

import { mainElement } from './index.js';
import { sportData, saveData } from './http.js';

const addOptionalZero = number => {
  return ('0' + parseInt(number)).slice(-2);
};

const navigateToNewEvent = () => {
  window.location.hash = sportData.length;
};

const pushEventToSportData = () => {
  sportData.push({
    season: parseInt(document.querySelector('#season').value),
    status: document.querySelector('#status').value,
    timeVenueUTC: `${addOptionalZero(
      document.querySelector('#hour').value
    )}:${addOptionalZero(document.querySelector('#minute').value)}:00`,
    dateVenue: `${document.querySelector('#year').value}-${addOptionalZero(
      document.querySelector('#month').value
    )}-${addOptionalZero(document.querySelector('#day').value)}`,
    stadium:
      document.querySelector('#stadium').value === ''
        ? null
        : document.querySelector('#stadium').value,
    homeTeam: {
      name:
        document.querySelector('#homeName').value !== ''
          ? document.querySelector('#homeName').value === ''
          : null,
      officialName:
        document.querySelector('#homeOfficialName').value !== ''
          ? document.querySelector('#homeOfficialName').value
          : null,
      slug:
        document.querySelector('#homeSlug').value !== ''
          ? document.querySelector('#homeSlug').value
          : null,
      abbreviation:
        document.querySelector('#homeAbbreviation').value !== ''
          ? document.querySelector('#homeAbbreviation').value.toUpperCase()
          : null,
      teamCountryCode:
        document.querySelector('#homeTeamCountryCode').value !== ''
          ? document.querySelector('#homeTeamCountryCode').value.toUpperCase()
          : null,
      stagePosition:
        document.querySelector('#homeStagePosition').value !== ''
          ? document.querySelector('#homeStagePosition').value
          : null,
    },
    awayTeam: {
      name:
        document.querySelector('#awayName').value !== ''
          ? document.querySelector('#awayName').value === ''
          : null,
      officialName:
        document.querySelector('#awayOfficialName').value !== ''
          ? document.querySelector('#awayOfficialName').value
          : null,
      slug:
        document.querySelector('#awaySlug').value !== ''
          ? document.querySelector('#awaySlug').value
          : null,
      abbreviation:
        document.querySelector('#awayAbbreviation').value !== ''
          ? document.querySelector('#awayAbbreviation').value.toUpperCase()
          : null,
      teamCountryCode:
        document.querySelector('#awayTeamCountryCode').value !== ''
          ? document.querySelector('#awayTeamCountryCode').value.toUpperCase()
          : null,
      stagePosition:
        document.querySelector('#awayStagePosition').value !== ''
          ? document.querySelector('#awayStagePosition').value
          : null,
    },
    result: {
      homeGoals:
        document.querySelector('#homeGoals').value !== ''
          ? parseInt(document.querySelector('#homeGoals').value)
          : 0,
      awayGoals:
        document.querySelector('#awayGoals').value !== ''
          ? parseInt(document.querySelector('#awayGoals').value)
          : 0,
      winner:
        document.querySelector('#winner').value !== ''
          ? document.querySelector('#winner').value
          : null,
      message:
        document.querySelector('#message').value !== ''
          ? document.querySelector('#message').value
          : null,
      goals: [],
      yellowCards: [],
      secondYellowCards: [],
      directRedCards: [],
      scoreByPeriods: {
        firstHalf: {
          home: null,
          away: null,
        },
        secondHalf: {
          home: null,
          away: null,
        },
        thirdHalf: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
        extraTime: {
          home: null,
          away: null,
        },
      },
    },
    stage: {
      id: document.querySelector('#stageId').value.toUpperCase(),
      name: document.querySelector('#stageName').value.toUpperCase(),
      ordering: parseInt(document.querySelector('#ordering').value),
    },
    group: null,
    originCompetitionId: 'afc-champions-league',
    originCompetitionName: 'AFC Champions League',
  });
};

const addEvent = e => {
  e.preventDefault();
  pushEventToSportData();
  navigateToNewEvent();
  saveData();
};

export const renderAddPage = () => {
  window.location.hash = '#add';
  mainElement.innerHTML = `
   <h1>Add event</h1>
      <p>Fields marked with <span class="red-text">*</span> are mandatory.</p>

      <form class="add">
        <h2>General details</h2>

        <label for="season">Season <span class="red-text">*</span></label>
        <br />
        <input
          type="number"
          id="season"
          min="2020"
          max="2050"
          required
          value="2020"
        />
        <br /><br />
        <label for="status">Status <span class="red-text">*</span></label>
        <br />
        <select id="status" class="button">
          <option value="played">Played</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <br /><br />
        <span>Date <span class="red-text">*</span></span>
        <br />
        <input
          type="number"
          id="year"
          min="2020"
          max="2050"
          required
          value="2020"
        />
        -
        <input type="number" id="month" min="1" max="12" required value="10" />
        -
        <input type="number" id="day" min="1" max="31" required value="10" />
        <br /><br />
        <span>Time (UTC) <span class="red-text">*</span></span>
        <br />
        <input type="number" id="hour" min="0" max="23" required value="10" />
        :
        <input type="number" id="minute" min="0" max="59" required value="10" />
        <br /><br />
        <label for="stageId">Stage ID <span class="red-text">*</span></label>
        <br />
        <input type="text" id="stageId" required value="10" />
        <br /><br />
        <label for="stageName"
          >Stage name <span class="red-text">*</span></label
        >
        <br />
        <input type="text" id="stageName" required value="10" />
        <br /><br />
        <label for="ordering">Ordering <span class="red-text">*</span></label>
        <br />
        <input type="number" id="ordering" min="1" required value="10" />
        <br /><br />
        <label for="stadium">Stadium</label>
        <br />
        <input type="text" id="stadium" />
        <br /><br />

        <div class="flex-container">
          <div class="team">
            <h2>Home team info</h2>

            <label for="homeName">Name</label>
            <br />
            <input type="text" id="homeName" />
            <br /><br />
            <label for="homeOfficialName">Official name</label>
            <br />
            <input type="text" id="homeOfficialName" />
            <br /><br />
            <label for="homeSlug">Slug</label>
            <br />
            <input type="text" id="homeSlug" />
            <br /><br />
            <label for="homeAbbreviation">Abbreviation</label>
            <br />
            <input type="text" id="homeAbbreviation"  maxlength="3"/>
            <br /><br />
            <label for="homeTeamCountryCode">Team country code</label>
            <br />
            <input type="text" id="homeTeamCountryCode" maxlength="3"/>
            <br /><br />
            <label for="homeStagePosition">Stage position</label>
            <br />
            <input type="text" id="homeStagePosition" />
          </div>

          <div class="team">
            <h2>Away team info</h2>

            <label for="awayName">Name</label>
            <br />
            <input type="text" id="awayName" />
            <br /><br />
            <label for="awayOfficialName">Official name</label>
            <br />
            <input type="text" id="awayOfficialName" />
            <br /><br />
            <label for="awaySlug">Slug</label>
            <br />
            <input type="text" id="awaySlug" />
            <br /><br />
            <label for="awayAbbreviation">Abbreviation</label>
            <br />
            <input type="text" id="awayAbbreviation" maxlength="3" />
            <br /><br />
            <label for="awayTeamCountryCode">Team country code</label>
            <br />
            <input type="text" id="awayTeamCountryCode" maxlength="3" />
            <br /><br />
            <label for="awayStagePosition">Stage position</label>
            <br />
            <input type="text" id="awayStagePosition" />
          </div>
        </div>
        <h2>Result</h2>
        <label for="homeGoals">Home goals</label>
        <br />
        <input type="number" id="homeGoals" min="0" />
        <br /><br />
        <label for="awayGoals">Away goals</label>
        <br />
        <input type="number" id="awayGoals" min="0" />
        <br /><br />
        <label for="winner">Winner</label>
        <br />
        <input type="text" id="winner" />
        <br /><br />
        <label for="message">Message</label>
        <br />
        <textarea id="message" rows="4" cols="50"></textarea>
        <br /><br />

        <button class="button button--green">Add event</button>
      </form>
  `;
  document.querySelector('.add').addEventListener('submit', e => addEvent(e));
};

const renderHeader = () => {
  document.querySelector('header').innerHTML = `
    <div class="link-wrapper">
      <a href="#" class="flex-container" tabindex="0">
        <img
          src="./assets/img.png"
          alt="Football Calendar"
          width="29"
          height="25"
        />
        Football Calendar
      </a>
      <nav>
        <a href="#" tabindex="0" class="home-button">Home</a>
        <a href="#login" class="loginLink" tabindex="0">Login</a>
        <a href="#logout" class="adminComponent" tabindex="0">Logout</a>
      </nav>
    </div>
`;
};

const renderFooter = () => {
  document.querySelector('footer').innerHTML = `
  <div class="footer-content">
         Made by
      <a href="https://daniel.harka.com" target="_blank" tabindex="0"
        >daniel.harka.com</a
      >
      <br />
      <span>|</span>
      <a
        href="https://github.com/MrDanielHarka/football-calendar"
        target="_blank"
        rel="noreferrer noopener nofollow"
        tabindex="0"
        >Documentation</a
      >
      </div>
      `;
};

export const renderHeaderAndFooter = () => {
  renderHeader();
  renderFooter();
};

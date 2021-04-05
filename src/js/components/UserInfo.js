export default class UserInfo {
  constructor( { profileNameSelector, profileAboutSelector } ) {
    this._profileName = document.querySelector(`${profileNameSelector}`);
    this._profileAbout = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileAbout.textContent,
    }
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.job;
  }

}
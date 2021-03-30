export default class UserInfo {
  constructor( { profileNameSelector, profileAboutSelector } ) {
    this._profileName = document.querySelector(`${profileNameSelector}`);
    this._profileAbout = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    const profileData = {};

    profileData.name = this._profileName.textContent;
    profileData.about = this._profileAbout.textContent;

    return profileData;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
  }

}
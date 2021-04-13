export default class UserInfo {
  constructor( { profileNameSelector, profileAboutSelector, profileAvatarSelector } ) {
    this._profileName = document.querySelector(`${profileNameSelector}`);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileAbout.textContent,
    }
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
  }

  setAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

}
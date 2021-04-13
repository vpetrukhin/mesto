export default class Api {
  constructor({token, group}) {
    this._token = token;
    this._group = group;
  }

  // fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
  //     headers: {
  //       authorization: 'db03a97c-9ec5-4cd0-ab65-ee0272870f65'
  //     }
  //   })
  //   .then(res => res.json())
  //   .then((result) => {
  //     console.log(result);
  //   });

  getInfoUser() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`)
    });
  }

  //TODO: Загрузка карточек с сервера

  //TODO: Редактирование профиля

  //TODO: Добавление новой карточки

  //TODO: Отображение количества лайков

}
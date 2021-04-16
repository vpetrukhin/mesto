export default class Api {
  constructor({token, group}) {
    this._token = token;
    this._group = group;
  }

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
  };

  getCardInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/cards`, {
      headers: {
        authorization: `${this._token}`
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
  }

  changeUserInfo(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(res => res.ok
      ? res.json()
      : Promise.reject(`Ошибка ${res.status}`))
  }

  loadNewCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(res => res.ok
      ? res.json()
      : Promise.reject(`Ошибка ${res.status}`))
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
      }
    })
    .then(res => res.ok ? Promise.resolve('success') : Promise.reject(`Ошибка ${response.status}`))
  }

  //TODO: Отображение количества лайков

}
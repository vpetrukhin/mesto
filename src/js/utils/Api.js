export default class Api {
  constructor({token, group, url}) {
    this._token = token;
    this._group = group;
    this._url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInfoUser() {
    return fetch(`${this._url}${this._group}/users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    }).then(res => this._getResponseData(res));
  };

  getCardInfo() {
    return fetch(`${this._url}${this._group}/cards`, {
      headers: {
        authorization: `${this._token}`
      }
    }).then(res => this._getResponseData(res))
  }

  changeUserInfo(data) {
    return fetch(`${this._url}${this._group}/users/me`, {
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
    .then(res => this._getResponseData(res))
  }

  loadNewCard(data) {
    return fetch(`${this._url}${this._group}/cards`, {
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
    .then(res => this._getResponseData(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}${this._group}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
      }
    })
    .then(res => res.ok ? Promise.resolve('success') : Promise.reject(`Ошибка ${response.status}`))
  }

  setLike(cardId) {
    return fetch(`${this._url}${this._group}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`
      }
    })
    .then(res => this._getResponseData(res))
  }

  removeLike(cardId) {
    return fetch(`${this._url}${this._group}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      }
    })
    .then(res => this._getResponseData(res))
  }

  updateAvatar(link) {
    return fetch(`${this._url}${this._group}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
    .then(res => this._getResponseData(res))
  }

}
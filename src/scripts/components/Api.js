import {
    token,
    cohort
} from '../../scripts/utils/constants.js';
  

class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers;
    }

    _handleResponce(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    _fetch(url, method, body) {
        const bodyStr = body === null ? null : JSON.stringify(body);
        return fetch(
            `${this.baseUrl}/${url}`,
            {
                method: method,
                headers: this.headers,
                body: bodyStr
            }
        )
        .then(res => this._handleResponce(res))
        .catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
    }
  
    getInitialCards() {
        return this._fetch('cards', 'GET', null);
    }

    getUserData() {
        return this._fetch('users/me', 'GET', null);
    }

    updateUserData(userData) {
        return this._fetch('users/me', 'PATCH', userData);
    }

    updateLikeCard(cardId, doLike) {
        return this._fetch(`cards/${cardId}/likes`, doLike ? 'PUT': 'DELETE');
    }

    addCard(cardData) {
        return this._fetch('cards', 'POST', cardData);
    }

    deleteCard(cardId) {
        return this._fetch(`cards/${cardId}`, 'DELETE');
    }

    updateAvatar(avatarLink) {
        return this._fetch('users/me/avatar', 'PATCH', {avatar: avatarLink});
    }
}

export const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
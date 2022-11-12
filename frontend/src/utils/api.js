class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.authorization = headers.authorization;
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${this.authorization}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getProfileInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${this.authorization}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfileInformation(profileName, profileJob) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this.authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profileName,
        about: profileJob,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  createCards(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(index) {
    return fetch(`${this.baseUrl}/cards/${index}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this.authorization}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  favoriteCard(index) {
    return fetch(`${this.baseUrl}/cards/${index}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${this.authorization}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  unfavoriteCard(index) {
    return fetch(`${this.baseUrl}/cards/${index}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this.authorization}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfilePhoto(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this.authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  // outros métodos para trabalhar com a API
}

const api = new Api({
  //baseUrl: 'https://api.patricksouza.students.nomoredomainssbs.ru',
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: '',
  },
});

export default api;

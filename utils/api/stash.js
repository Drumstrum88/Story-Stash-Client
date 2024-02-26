import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getUserStashes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const getSingleUserStash = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createStash = (userId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateStash = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleUserStash = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve())
    .catch(reject);
});

export {
  getUserStashes, getSingleUserStash, updateStash, deleteSingleUserStash, createStash,
};

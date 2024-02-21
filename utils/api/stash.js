import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getUserStashes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/.json?orderBy="uid"&equalTo='${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUserStash = (userId, stashId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/${stashId}/.json?orderBy="user_id"&equalTo=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((stashData) => resolve(stashData))
    .catch(reject);
});

const createStash = (userId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...payload, user_id: userId }),
  })
    .then((response) => response.json())
    .then((createdStash) => resolve(createdStash))
    .catch(reject);
});

const updateSingleUserStash = (userId, stashId, updatedStashData) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/${stashId}/.json?orderBy="user_id"&equalTo=${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedStashData),
  })
    .then((response) => response.json())
    .then((updatedStash) => resolve(updatedStash))
    .catch(reject);
});

const deleteSingleUserStash = (userId, stashId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/${stashId}/.json?orderBy="user_id"&equalTo=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve())
    .catch(reject);
});

export {
  getUserStashes, getSingleUserStash, updateSingleUserStash, deleteSingleUserStash, createStash,
};

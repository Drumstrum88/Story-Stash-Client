import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getReviewsForBook = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${id}/reviews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBookReview = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createBookReview = (userId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: userId, ...payload }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBookReview = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${id}`, {
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

const deleteBookReview = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${id}`, {
    method: 'DELETE',
  })
    .then((resolve))
    .catch(reject);
});

export {
  getReviewsForBook, getSingleBookReview, createBookReview, updateBookReview, deleteBookReview,
};

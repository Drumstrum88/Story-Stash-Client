import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getBooks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBook = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addBook = (book) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBook = (updateData) => {
  const { id, ...rest } = updateData;
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rest),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
};

const deleteBook = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getBooks, getSingleBook, addBook, updateBook, deleteBook,
};

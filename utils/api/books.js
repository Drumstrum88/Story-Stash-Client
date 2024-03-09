import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getBooks = (query = '') => new Promise((resolve, reject) => {
  const url = query ? `${endpoint}/books/search/?query=${query}` : `${endpoint}/books`;

  fetch(url, {
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

const getSingleStashBook = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashbooks/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createStashBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashbooks`, {
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

const updateStashBook = (stashBookId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashbooks/${stashBookId}`, {
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

const deleteStashBook = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashbooks/${id}`, {
    method: 'DELETE',
  })
    .then((resolve))
    .catch(reject);
});

const getBooksForStash = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stashes/${id}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getBooksByGenre = (genreId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/list_filtered_by_genre/?genre=${genreId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getBooks, getSingleBook, addBook, updateBook, deleteBook, getSingleStashBook, createStashBook, updateStashBook, deleteStashBook, getBooksForStash, getBooksByGenre,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { createStashBook, getBooks, getBooksForStash } from '../../utils/api/books';
import { useAuth } from '../../utils/context/authContext';

const initialState = [];

const StashBookForm = ({
  show, handleCloseForm, handleAddBook, stash,
}) => {
  const [formInput, setFormInput] = useState(initialState);
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  const handleCheckboxChange = (bookId) => {
    setFormInput((prevInput) => {
      if (prevInput.includes(bookId)) {
        return prevInput.filter((id) => id !== bookId);
      }
      return [...prevInput, bookId];
    });
  };

  const handleAddBookToStash = async (e) => {
    e.preventDefault();
    const selectedBooks = formInput.map((bookId) => Number(bookId));

    if (stash?.id && user?.uid) {
      try {
        const payload = {
          stash: stash.id,
          user: user.id,
          books: selectedBooks.length > 1 ? selectedBooks : [selectedBooks[0]],
        };
        await createStashBook(payload);

        const updatedBooks = await getBooksForStash(stash.id);
        handleAddBook({ stash: stash.id, books: updatedBooks, user: user.id });
      } catch (error) {
        console.error('Problem adding books to this stash', error);
      }
    }

    setFormInput(initialState);
    handleCloseForm();
  };

  return (
    <Modal show={show} onHide={handleCloseForm}>
      <Modal.Body>
        <Form>
          {books && books.length > 0 ? (
            books.map((book) => (
              <Form.Group key={book.id}>
                <Form.Check
                  type="checkbox"
                  label={`${book.title}`}
                  onChange={() => handleCheckboxChange(book.id)}
                  checked={formInput.includes(book.id)}
                />
              </Form.Group>
            ))
          ) : (
            <h4>NO BOOKS ON THIS LIST YET!</h4>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseForm}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddBookToStash}>
          Add to Stash
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

StashBookForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
  handleAddBook: PropTypes.func.isRequired,
  stash: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
  }).isRequired,
};

export default StashBookForm;

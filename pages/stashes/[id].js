/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  createStashBook, deleteStashBook, getBooksForStash, getSingleBook, updateStashBook,
} from '../../utils/api/books';
import { getSingleUserStash } from '../../utils/api/stash';
import StashBookForm from '../../components/forms/stash_book_form';
import StashBookAccordion from '../../components/stash_book_card';
import { useAuth } from '../../utils/context/authContext';

const StashView = () => {
  const router = useRouter();
  const [stash, setStash] = useState({});
  const [change, setChange] = useState(true);
  const [stashBooks, setAllStashBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleUserStash(id).then((fetchedStash) => {
        setStash({ ...fetchedStash, books: fetchedStash.books || [] });
      });
      getBooksForStash(id).then((fetchedBooks) => {
        console.warn('API Response - Stash Books:', fetchedBooks);
        setAllStashBooks(fetchedBooks);
      })
        .catch((error) => {
          console.error('Error fetching stash books:', error);
        });
    }
  }, [id, change]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddBook = async ({ selectedBook }) => {
    try {
      if (selectedBook) {
        const payload = {
          stash: stash.id,
          user: user.id,
          book: [selectedBook.id],
          isRead: false,
        };
        await createStashBook(payload);
      }
    } catch (error) {
      console.error('Problem adding books to this stash', error);
    }
    setChange((prevState) => !prevState);
    handleCloseForm();
  };

  const handleDeleteStashBook = (bookId) => {
    if (window.confirm('Remove This Book from your Stash?')) {
      deleteStashBook(bookId).then(() => setChange((prevChange) => !prevChange));
    }
  };

  const handleMarkAsRead = async (stashBookId, bookId) => {
    try {
      if (!stashBookId) {
        console.error('StashBookId is undefined or null. Stopping execution.');
        return;
      }
      const stashBook = stashBooks.find((book) => book.id === stashBookId);

      if (!stashBook) {
        console.error('StashBook not found. Stopping execution.');
        return;
      }
      const bookDetails = await getSingleBook(bookId);

      const payload = {
        id: stashBookId,
        stash: stashBook.stash.id,
        book: bookDetails,
        isRead: !stashBook.isRead,
      };

      const response = await updateStashBook(stashBookId, payload);

      const updatedBooks = stash.books.map((book) => (book.id === stashBookId ? { ...book, ...response } : book));

      setStash({ ...stash, books: updatedBooks });
      setChange((prevChange) => !prevChange);
    } catch (error) {
      console.error('Problem marking book as read:', error);
    }
  };

  return (
    <div>
      <h2>{`${stash.title}`}</h2>
      <Button className="" onClick={handleShowForm}>
        Add Books
      </Button>

      {stashBooks.length > 0 ? (
        <StashBookAccordion
          stashBooks={stashBooks}
          onDeleteStashBook={handleDeleteStashBook}
          onMarkAsRead={(stashBookId, bookId) => handleMarkAsRead(stashBookId, bookId)}
          setChange={setChange}
        />
      ) : (
        <p>No books in this stash yet!</p>
      )}
      {stash.id && Object.keys(stash).length > 0 && (
        <StashBookForm
          show={showForm}
          handleCloseForm={handleCloseForm}
          handleAddBook={({ selectedBook }) => handleAddBook({ selectedBook })}
          stash={{
            ...stash,
            user: stash.user.id,
          }}
        />
      )}
    </div>
  );
};

export default StashView;

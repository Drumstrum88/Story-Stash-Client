import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getGenres } from '../../utils/api/genres';
import { addBook, updateBook } from '../../utils/api/books';

const initialState = {
  title: '',
  genre_id: 0,
  description: '',
  image: '',
};

const BookForm = ({ bookObj }) => {
  const [bookDetails, setBookDetails] = useState(initialState);
  const [genres, setGenres] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  console.warn('Book ID from router:', id);

  useEffect(() => {
    if (bookObj) {
      const obj = { ...bookObj };
      obj.genre = bookObj.genre;
      setBookDetails(obj);
    } else {
      setBookDetails(initialState);
    }
  }, [user.id, bookObj]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'genre') {
      const selectedGenre = genres.find((genre) => genre.id === parseInt(value, 10));
      setBookDetails((prevState) => ({
        ...prevState,
        genre_id: selectedGenre?.id || 0,
      }));
    } else {
      setBookDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      const update = {
        id: Number(id),
        title: bookDetails.title,
        genre_id: Number(bookDetails.genre_id),
        description: bookDetails.description,
        image: bookDetails.image,
      };
      updateBook(update, user.uid).then(() => {
        router.push('/');
      });
    } else {
      const newBook = {
        title: bookDetails.title,
        genre: Number(bookDetails.genre_id),
        description: bookDetails.description,
        image: bookDetails.image,
        uid: user.uid,
      };
      addBook(newBook, user.uid).then(() => router.push('/'));
      console.warn('Book details:', bookDetails);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <div className="book-details">
          <h3>Add Book</h3>

          <Form.Group className="mb-3" controlId="titleControl">
            <Form.Label sm="2">Book Title:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="title" type="string" value={bookDetails.title || ''} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bookDescription">
            <Form.Label sm="2">Book Description:</Form.Label>
            <Form.Control as="textarea" onChange={handleChange} sm="2" name="description" type="string" value={bookDetails.description || ''} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bookImage">
            <Form.Label sm="2">Image URL:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="image" type="string" value={bookDetails.image || ''} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="genreControl">
            <Form.Label sm="2">Genre</Form.Label>
            <Form.Select name="genre" onChange={handleChange} value={bookDetails.genre_id || ''} required>
              <option value="">Please Choose Genre</option>
              {genres?.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

      </div>
      <Button className="app-button" type="submit">Submit</Button>
    </Form>
  );
};

BookForm.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number,
    genre_id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

BookForm.defaultProps = {
  bookObj: null,
};

export default BookForm;

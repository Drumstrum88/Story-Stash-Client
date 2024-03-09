import { useEffect, useState } from 'react';
import { getGenres } from '../utils/api/genres';
import { getBooks, getBooksByGenre } from '../utils/api/books';
import BookCard from '../components/book_card';

function Home() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [change, setChange] = useState(true);

  useEffect(() => {
    getGenres().then(setGenres);
    getBooks().then(setBooks);
  }, [change]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    const fetchBooksPromise = genreId ? getBooksByGenre(genreId) : getBooks();
    fetchBooksPromise.then(setBooks);
  };
  return (
    <div>
      <h1>Story Stash</h1>
      {/* Dropdown for selecting genre */}
      <select
        id="genreSelect"
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.label}
          </option>
        ))}
      </select>

      {/* Display books */}
      <article>
        <div className="book-cards">
          {books.map((book) => (
            <section key={book.id}>
              <BookCard bookObj={book} onUpdate={setChange} />
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

export default Home;

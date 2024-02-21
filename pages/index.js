import { useEffect, useState } from 'react';
import { getBooks } from '../utils/api/books';
import BookCard from '../components/book_card';

function Home() {
  const [books, setBooks] = useState([]);
  // const [change, setChange] = useState(true);

  const getCommunityBooks = () => {
    getBooks().then(setBooks);
  };

  useEffect(() => {
    getCommunityBooks();
  }, []);

  return (
    <article><article className="books" />
      <h1>Books</h1>
      <div className="book-cards">
        {books.map((book) => (
          <section key={book.id}>
            <BookCard bookObj={book} onUpdate={getCommunityBooks} />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;

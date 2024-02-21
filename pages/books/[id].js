import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { XCircle, PencilFill } from 'react-bootstrap-icons';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteBook, getSingleBook } from '../../utils/api/books';

export default function ViewBook() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getSingleBook(id).then(setBook);
    }
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Delete this book')) {
      deleteBook(id).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title tag="h5">{book.title}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
        <Card.Text>
          <small className="text-muted">{book.genre?.label}</small>
        </Card.Text>
      </Card.Body>
      <Card.Img
        alt="Card image cap"
        src={book.image}
        style={{
          height: 400,
          width: 300,
        }}
        width="75%"
      />
      <Card.Footer>
        {book.user?.id === user.id ? (
          <>
            <Link passHref href="/">
              <PencilFill type="button" />
            </Link>
            <XCircle className="delete-book" type="button" onClick={handleDelete} />
          </>
        ) : (
          ''
        )}
      </Card.Footer>
    </Card>
  );
}

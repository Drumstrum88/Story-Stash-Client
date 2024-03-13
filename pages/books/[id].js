import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { XCircle, PencilFill } from 'react-bootstrap-icons';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteBook, getSingleBook } from '../../utils/api/books';
import ReviewAccordion from '../../components/reviewAccordion';
import ReviewModal from '../../components/forms/reviewform';
import { deleteBookReview, getReviewsForBook } from '../../utils/api/reviews';

export default function ViewBook() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [bookReviews, setBookReviews] = useState([]);
  const { user } = useAuth();
  const [change, setChange] = useState(true);

  useEffect(() => {
    if (id) {
      getSingleBook(id).then((bookData) => {
        setBook(bookData);
        getReviewsForBook(bookData.id)
          .then((reviewsData) => setBookReviews(reviewsData))
          .catch((error) => console.error('Error fetching reviews:', error));
      });
    }
  }, [id, change]);
  const handleDelete = () => {
    if (window.confirm('Delete this book')) {
      deleteBook(id).then(() => {
        router.push('/');
      });
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Delete Review?')) {
      deleteBookReview(reviewId);
      setChange((prevState) => !prevState);
    }
  };

  const handleOpenReviewModal = (review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedReview(null);
    setShowReviewModal(false);
  };

  return (
    <div>
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
            height: 250,
            width: 200,
            padding: 10,
          }}
          width="75%"
        />
        <Card.Footer>
          {book.user_id === user.id ? (
            <>
              <Link passHref href={`/books/edit/${book.id}`}>
                <PencilFill type="button" className="pencil" />
              </Link>
              <XCircle className="delete" type="button" onClick={handleDelete} />
            </>
          ) : (
            ''
          )}
          <Button variant="primary" onClick={() => handleOpenReviewModal(null)}>
            Leave a Review
          </Button>
        </Card.Footer>
      </Card>

      <ReviewAccordion
        reviews={bookReviews}
        onDeleteReview={(reviewId) => handleDeleteReview(reviewId)}
        onEditReview={(review) => handleOpenReviewModal(review)}
        currentUser={user}
        book={book}
        change={setChange}
      />

      <ReviewModal
        show={showReviewModal}
        handleClose={handleCloseReviewModal}
        reviewObj={selectedReview}
        book={book}
        setChange={setChange}
      />
    </div>
  );
}

import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function BookCard({ bookObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title tag="h5">{bookObj.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" tag="h6">
          {bookObj.genre.label}
        </Card.Subtitle>
      </Card.Body>
      <Card.Img className="book-image" src={bookObj.image} />
      <Card.Body>
        {/* <Card.Text>{bookObj.description}</Card.Text> */}
        <Card.Link href={`books/${bookObj.id}`}>Read More</Card.Link>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

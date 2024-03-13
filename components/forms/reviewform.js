import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { createBookReview, updateBookReview } from '../../utils/api/reviews';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  content: '',
};

const ReviewModal = ({
  show, handleClose, reviewObj, book, setChange,
}) => {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (reviewObj) {
      setFormInput(reviewObj);
    } else {
      setFormInput(initialState);
    }
  }, [reviewObj]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (reviewObj) {
      const payload = {
        id: reviewObj.id,
        content: formInput.content,
        book_id: reviewObj.book?.id,
        user_uid: user.uid,
      };
      updateBookReview(payload, reviewObj.id)
        .then(() => {
          handleClose();
          setChange((prevState) => !prevState);
        })
        .catch((error) => {
          console.error('Error updating review:', error);
        });
    } else {
      const payload = {
        content: formInput.content,
        book: book?.id,
      };
      createBookReview(user.uid, payload).then(() => {
        handleClose();
        setFormInput(initialState);
        setChange((prevState) => !prevState);
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="reviewContent">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={formInput.content}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddReview}>
          Add Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ReviewModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setChange: PropTypes.func.isRequired,
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      uid: PropTypes.string,
    }),
    content: PropTypes.string,
    book: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      user: PropTypes.number,
    }),
    date: PropTypes.string,
  }),
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    user: PropTypes.number,
  }),
};

ReviewModal.defaultProps = {
  reviewObj: null,
  book: null,
};

export default ReviewModal;

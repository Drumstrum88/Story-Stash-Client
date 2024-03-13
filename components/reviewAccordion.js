/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

const ReviewAccordion = ({
  reviews, onDeleteReview, onEditReview, currentUser,
}) => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => setActiveKey(key === activeKey ? null : key);

  const renderReview = (review) => {
    const isCurrentUserReview = currentUser && review.user.id === currentUser.id;

    return (
      <Card key={`review-${review.id}`}>
        <Card.Header onClick={() => handleToggle(`review-${review.id}`)}>
          <Card.Title>{review?.content}</Card.Title>
          {isCurrentUserReview && (
            <>
              <Button variant="danger" size="sm" onClick={() => onDeleteReview(review.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
              <Button variant="primary" size="sm" onClick={() => onEditReview(review)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </>
          )}
        </Card.Header>
      </Card>
    );
  };

  return (
    <Accordion activeKey={activeKey}>
      {reviews.map(renderReview)}
    </Accordion>
  );
};

ReviewAccordion.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  onDeleteReview: PropTypes.func.isRequired,
  onEditReview: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default ReviewAccordion;

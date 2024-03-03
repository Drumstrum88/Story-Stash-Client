import React, { useState } from 'react';
import { faTrashAlt, faCircle, faCheckCircle as faCheckCircleSolid } from '@fortawesome/free-regular-svg-icons';

import PropTypes from 'prop-types';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StashBookAccordion = ({
  stashBooks, onDeleteStashBook, onMarkAsRead,
}) => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => setActiveKey(key === activeKey ? null : key);

  const renderStashBook = (stashBook) => {
    const isReadIcon = stashBook.isRead ? faCheckCircleSolid : faCircle;
    const iconColor = stashBook.isRead ? 'green' : 'black';

    return (
      <Card key={`stashBook-${stashBook.id}`}>
        <Card.Header onClick={() => handleToggle(`stashBook-${stashBook.id}`)}>
          <Card.Title>{stashBook?.book?.title}</Card.Title>
          <Button variant="danger" size="sm" onClick={() => onDeleteStashBook(stashBook?.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
          <FontAwesomeIcon
            icon={isReadIcon}
            color={iconColor}
            size="lg"
            onClick={() => onMarkAsRead(stashBook.id, stashBook.book.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Space') {
                onMarkAsRead(stashBook.id, stashBook.book.id);
              }
            }}
          />
        </Card.Header>
      </Card>
    );
  };

  return (
    <Accordion activeKey={activeKey}>
      {stashBooks.map(renderStashBook)}
    </Accordion>
  );
};

StashBookAccordion.propTypes = {
  stashBooks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }),
  ).isRequired,
  onDeleteStashBook: PropTypes.func.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
};

export default StashBookAccordion;

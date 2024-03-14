import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getReadStashbooks } from '../../utils/api/books';

export default function Read() {
  const { user } = useAuth();
  const [readStashbooks, setReadStashbooks] = useState([]);
  const userId = user.id;

  const loadReadStashbooks = () => {
    getReadStashbooks(userId)
      .then((data) => {
        setReadStashbooks(data);
      })
      .catch((error) => {
        console.error('Error fetching read stashbooks:', error);
      });
  };

  useEffect(() => {
    loadReadStashbooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{`${user.first_name}'s finished books:`}</h1>
      <ListGroup>
        {Array.isArray(readStashbooks) && readStashbooks.map((stashbook) => (
          <ListGroup.Item key={stashbook.id}>
            <Card>
              <Card.Body>
                <Card.Title>{stashbook?.book?.title}</Card.Title>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

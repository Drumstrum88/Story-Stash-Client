/* eslint-disable @next/next/no-img-element */
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const StashCard = ({ stashObj }) => {
  console.warn('"StashObj:"', stashObj);
  console.warn('"Title:"', stashObj?.title);
  console.warn('"User:"', stashObj?.user);
  console.warn('"FirstName:"', stashObj?.user?.first_name);
  console.warn('"LastName:"', stashObj?.user?.last_name);

  return (
    <Card
      style={{
        width: '18rem',
      }}
    >
      <>
        <Card.Title tag="h5">
          {stashObj?.title}
        </Card.Title>
        <Card.Subtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {/* Display user information */}
          {`${stashObj?.user.first_name} ${stashObj?.user.last_name}`}
        </Card.Subtitle>
        <Card.Body>
          <Card.Link href={`stashes/${stashObj?.id}`}>Read More</Card.Link>
        </Card.Body>
      </>
    </Card>
  );
};

StashCard.propTypes = {
  stashObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

StashCard.defaultProps = {
  stashObj: null,
};

export default StashCard;

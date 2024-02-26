/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @next/next/no-img-element */
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { XCircle, PencilFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { deleteSingleUserStash } from '../utils/api/stash';
import { useAuth } from '../utils/context/authContext';

const StashCard = ({ stashObj, onUpdate }) => {
  const { user } = useAuth();
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this stash? This is irreversible')) {
      deleteSingleUserStash(stashObj.id).then(onUpdate);
    }
  };

  return (
    <Card
      style={{
        width: '18rem',
        padding: '10px',
        margin: '10px',
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
      <Card.Footer>
        {stashObj.user.id === user.id ? (
          <>
            <Link passHref href={`/stashes/edit/${stashObj.id}`}>
              <PencilFill type="button" className="pencil" />
            </Link>
            <XCircle className="delete" type="button" onClick={handleDelete} />
          </>
        ) : (
          ''
        )}
      </Card.Footer>
    </Card>
  );
};

StashCard.propTypes = {
  stashObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

StashCard.defaultProps = {
  stashObj: null,
};

export default StashCard;

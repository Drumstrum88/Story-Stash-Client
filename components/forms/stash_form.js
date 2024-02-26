/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createStash, updateStash } from '../../utils/api/stash';

const initialState = {
  title: '',
  user: 0,
};

const StashForm = ({ stashObj }) => {
  const [formInput, setFormInput] = useState(initialState);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (stashObj) {
      setFormInput(stashObj);
    }
  }, [stashObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stashObj) {
      const payload = {
        id: formInput.id,
        title: formInput.title,
        user: formInput.user.uid,
      };
      updateStash(payload).then(() => router.push('/stashes'));
    } else {
      const payload = {
        title: formInput.title,
        user: user.uid,
      };
      createStash(user.uid, payload).then(() => router.push('/stashes'));
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>{stashObj ? 'Update' : 'Create'} a Stash</h2>
      <Form.Group className="mb-3" controlId="formTitle">Title</Form.Group>
      <Form.Control name="title" value={formInput.title} onChange={handleChange} placeholder="Enter A TItle for your Stash" />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

StashForm.propTypes = {
  stashObj: PropTypes.shape({
    title: PropTypes.string,
  }),
};

StashForm.defaultProps = {
  stashObj: null,
};

export default StashForm;

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUserStash } from '../../../utils/api/stash';
import StashForm from '../../../components/forms/stash_form';

const EditStash = () => {
  const [stash, setStash] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUserStash(id).then(setStash);
  }, [id]);

  return (
    <StashForm stashObj={stash} />
  );
};

export default EditStash;

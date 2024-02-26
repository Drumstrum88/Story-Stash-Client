/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getUserStashes } from '../../utils/api/stash';
import { useAuth } from '../../utils/context/authContext';
import StashCard from '../../components/stash_card';

function UserStashes() {
  const [stashes, setStashes] = useState([]);
  const { user } = useAuth();

  const loadStashes = () => {
    getUserStashes(user.uid)
      .then((data) => {
        setStashes(data);
      })
      .catch((error) => {
        console.error('Error fetching stashes:', error);
      });
  };

  useEffect(() => {
    loadStashes();
  }, [user]);

  return (
    <div>
      <h2>{`${user.first_name}'s Stashes`}</h2>
      {stashes.map((stash) => (
        <section key={stash.id}>
          <StashCard stashObj={stash} onUpdate={loadStashes} />
        </section>
      ))}
    </div>
  );
}

export default UserStashes;

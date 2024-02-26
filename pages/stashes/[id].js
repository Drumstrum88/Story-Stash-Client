/* eslint-disable react/jsx-indent */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleUserStash } from '../../utils/api/stash';
import BookCard from '../../components/book_card';

const StashView = () => {
  const router = useRouter();
  const [stash, setStash] = useState({});
  const [change, setChange] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleUserStash(id).then(setStash);
    }
  }, [id, change]);

  return (
    <div>
      <h2>{`${stash.title}`}</h2>
      <Button className="">Add Books</Button>

      {stash.books?.map((obj) => (
        <><section key={obj.id}>
          <BookCard
            book={obj.book}
            stashObj={stash}
            setChange={setChange}
          />
          </section>
        </>
      ))}
    </div>
  );
};

export default StashView;

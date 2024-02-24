import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleBook } from '../../../utils/api/books';
import BookForm from '../../../components/forms/book_form';

const EditBookDetails = () => {
  const [bookDetails, setBookDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setBookDetails);
  }, [id]);

  return (
    <BookForm bookObj={bookDetails} />
  );
};

export default EditBookDetails;

import React from 'react';
import { useDispatch } from 'react-redux';

function BookListItem(props) {
  // create or initialize all hooks
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch({
      type: 'DELETE_BOOK',
      payload: props.book.id,
    });
  }

  return (
    <li>
      {props.book.title} by {props.book.author}{' '}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default BookListItem;

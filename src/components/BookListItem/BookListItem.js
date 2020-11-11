import React from 'react';

function BookListItem(props) {
  return (
    <li>
      {props.book.title} by {props.book.author}
    </li>
  );
}

export default BookListItem;

import React, { Component } from 'react';
import { connect } from 'react-redux';

// CUSTOM COMPONENTS
import BookListItem from '../BookListItem/BookListItem';

class BookList extends Component {
  render() {
    return (
      <section className="sectional">
        <h2>All Books</h2>
        <ul>
          {this.props.store.bookList.map((item, index) => (
            <BookListItem key={index} book={item} />
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  store,
});

export default connect(mapStateToProps)(BookList);

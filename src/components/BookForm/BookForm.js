import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookForm extends Component {
  state = {
    newBook: {
      title: '',
      author: '',
    },
  };

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      newBook: {
        ...this.state.newBook,
        [propertyName]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Adding book`, this.state.newBook);
    // TODO - axios request to server to add book
    this.saveNewBook(this.state.newBook);
  };

  saveNewBook(newBook) {
    axios
      .post('/books', newBook)
      .then((response) => {
        this.props.getCallback();
      })
      .catch((err) => {
        console.log(err);
        alert('Your book did not get saved, please try again.');
      });
  }

  render() {
    return (
      <section className="sectional">
        <h2>Add Book</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            placeholder="Title"
            value={this.state.newBook.title}
            onChange={this.handleChangeFor('title')}
          />
          <input
            required
            placeholder="Author"
            value={this.state.newBook.author}
            onChange={this.handleChangeFor('author')}
          />
          <button type="submit">Add Book</button>
        </form>
      </section>
    );
  }
}

export default connect()(BookForm);

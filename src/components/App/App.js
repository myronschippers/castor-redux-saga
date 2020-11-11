import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

// CUSTOM COMPONENTS
import Header from '../Header/Header';
import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';

class App extends Component {
  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    axios
      .get('/books')
      .then((response) => {
        // setState => dispatch
        this.props.dispatch({
          type: 'SET_BOOKS',
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
        // surface message to user
        alert('Something went terribly wrong.');
      });
  };

  render() {
    return (
      <div>
        <Header />
        <main className="container">
          <BookForm getCallback={this.getAllBooks} />
          <BookList />
        </main>
      </div>
    );
  }
}

export default connect()(App);

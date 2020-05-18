import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import CurrentReads from "./CurrentReads";
import WantedReads from "./WantedReads";
import ReadReads from "./ReadReads";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    readBooks: [],
    currentBooks: [],
    wantedBooks: [],
    query: "",
    searchedBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((allbooks) => {
      this.setState(() => ({
        readBooks: allbooks.filter((book) => book.shelf === "read"),
        currentBooks: allbooks.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantedBooks: allbooks.filter((book) => book.shelf === "wantToRead"),
      }));

      console.log("readbooks", this.state.readBooks);
      console.log("currentbooks", this.state.currentBooks);
      console.log("wantedbooks", this.state.wantedBooks);
    });
  }

  getUpdatedbooks() {
    BooksAPI.getAll().then((allbooks) => {
      this.setState(() => ({
        readBooks: allbooks.filter((book) => book.shelf === "read"),
        currentBooks: allbooks.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantedBooks: allbooks.filter((book) => book.shelf === "wantToRead"),
      }));
    });
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getUpdatedbooks();
    });
  };

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState(() => ({
        searchedBooks: typeof books === "object" ? books : [],
      }));

      console.log("sbooks", books);
    });
  };
  removeSearchBooks = () => {
    this.setState(() => ({
      searchedBooks: [],
    }));
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Book Reads App</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <CurrentReads
                    currentBooks={this.state.currentBooks}
                    onupdateShelf={this.updateShelf}
                  />
                  <WantedReads
                    wantedBooks={this.state.wantedBooks}
                    onupdateShelf={this.updateShelf}
                  />
                  <ReadReads
                    readBooks={this.state.readBooks}
                    onupdateShelf={this.updateShelf}
                  />
                </div>
              </div>
              <Link to="/search" className="open-search">
                <button>Add a book</button>
              </Link>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              onSearchBooks={this.searchBooks}
              sBooks={this.state.searchedBooks}
              squery={this.state.query}
              onupdateShelf={this.updateShelf}
              onremoveSearchBooks={this.removeSearchBooks}
              currentBooks={this.state.currentBooks}
              wantedBooks={this.state.wantedBooks}
              readBooks={this.state.readBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

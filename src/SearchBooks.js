import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchBooks extends Component {
  state = {
    query: "",
  };

  updateQuery = (q) => {
    this.setState(() => ({
      query: q.trim(),
    }));
  };

  render() {
    const {
      onSearchBooks,
      sBooks,
      onupdateShelf,
      onremoveSearchBooks,
      wantedBooks,
      readBooks,
      currentBooks,
    } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
            onClick={() => onremoveSearchBooks()}
          >
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              onChange={(event) => {
                onSearchBooks(event.target.value);
                this.updateQuery(event.target.value);
              }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {Object.keys(sBooks) === 0 && <ol className="books-grid" />}

          {sBooks.length >= 1 && (
            <ol className="books-grid">
              {sBooks.map((book) => (
                <li>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 192,
                          backgroundImage:
                            "url(" + book.imageLinks.thumbnail + ")",
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          onChange={(event) =>
                            onupdateShelf(book, event.target.value)
                          }
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>

                          {currentBooks.filter(
                            (cBook) => cBook.title === book.title
                          ).length > 0 ? (
                            <option selected value="currentlyReading">
                              Currently Reading
                            </option>
                          ) : (
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                          )}
                          {wantedBooks.filter(
                            (wBook) => wBook.title === book.title
                          ).length > 0 ? (
                            <option selected value="wantToRead">
                              Want to Read
                            </option>
                          ) : (
                            <option value="wantToRead">Want to Read</option>
                          )}

                          {readBooks.filter(
                            (rBook) => rBook.title === book.title
                          ).length > 0 ? (
                            <option selected value="read">
                              Read
                            </option>
                          ) : (
                            <option value="read">Read</option>
                          )}

                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;

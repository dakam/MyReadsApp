import React, { Component } from "react";
import BookChanger from "./BookChanger";
import { Link } from "react-router-dom";

class SearchBooks extends Component {
  state = {
    query: "",
  };

  updateQuery = (q) => {
    this.setState(() => ({
      query: q,
    }));
  };

  getBookShelf(book, currentBooks, wantedBooks, readBooks) {
    let bookShelf = "none";
    let ncurrent = currentBooks.filter((cBook) => cBook.id === book.id).length;
    let nwanted = wantedBooks.filter((wBook) => wBook.id === book.id).length;
    let nread = readBooks.filter((rBook) => rBook.id === book.id).length;

    if (ncurrent > 0) {
      bookShelf = "currentlyReading";
    } else if (nwanted > 0) {
      bookShelf = "wantToRead";
    } else if (nread > 0) {
      bookShelf = "read";
    }
    return bookShelf;
  }

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
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {typeof book.imageLinks === undefined && (
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 192,
                            backgroundImage: "url(../public/default_thumb.png)",
                          }}
                        />
                      )}
                      {book.imageLinks !== undefined &&
                      book.imageLinks.smallThumbnail !== undefined ? (
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 192,
                            backgroundImage:
                              "url(" + book.imageLinks.smallThumbnail + ")",
                          }}
                        />
                      ) : (
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 192,
                            backgroundImage: "url(../public/default_thumb.png)",
                          }}
                        />
                      )}

                      <BookChanger
                        onupdateShelfChanger={onupdateShelf}
                        thisbook={book}
                        selectedValue={this.getBookShelf(
                          book,
                          currentBooks,
                          wantedBooks,
                          readBooks
                        )}
                      />
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

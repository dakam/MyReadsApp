import React, { Component } from "react";
import BookChanger from "./BookChanger";
class WantedReads extends Component {
  render() {
    const { wantedBooks, onupdateShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          {wantedBooks.length === 0 && <ol className="books-grid" />}

          {wantedBooks.length >= 1 && (
            <ol className="books-grid">
              {wantedBooks.map((book) => (
                <li key={book.id}>
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
                      <BookChanger
                        onupdateShelfChanger={onupdateShelf}
                        thisbook={book}
                        selectedValue={"wantToRead"}
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

export default WantedReads;

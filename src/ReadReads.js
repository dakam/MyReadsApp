import React, { Component } from "react";
import BookChanger from "./BookChanger";
class ReadReads extends Component {
  render() {
    const { readBooks, onupdateShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read Books</h2>
        <div className="bookshelf-books">
          {readBooks.length === 0 && <ol className="books-grid" />}

          {readBooks.length >= 1 && (
            <ol className="books-grid">
              {readBooks.map((book) => (
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
                        selectedValue={"read"}
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

export default ReadReads;

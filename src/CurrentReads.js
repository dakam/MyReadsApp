import React, { Component } from "react";
import BookChanger from "./BookChanger";

class CurrentReads extends Component {
  render() {
    const { currentBooks, onupdateShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          {currentBooks.length === 0 && <ol className="books-grid" />}

          {currentBooks.length >= 1 && (
            <ol className="books-grid">
              {currentBooks.map((book) => (
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
                        selectedValue={"currentlyReading"}
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

export default CurrentReads;

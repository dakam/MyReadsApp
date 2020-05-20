import React, { Component } from "react";

class BookChanger extends Component {
  render() {
    const { onupdateShelfChanger, thisbook, selectedValue } = this.props;

    return (
      <div className="book-shelf-changer">
        <select
          value={selectedValue}
          onChange={(event) =>
            onupdateShelfChanger(thisbook, event.target.value)
          }
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading"> Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookChanger;

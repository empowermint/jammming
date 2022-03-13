import './SearchBar.css';

import React from 'react';

export class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A song, album, or artist" />
        <button className="SearchButton">Search</button>
      </div>
    )
  }
}
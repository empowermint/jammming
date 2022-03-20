import './SearchBar.css';

import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(e) {
    const searchTerm = e.target.value;
    this.setState({searchTerm: searchTerm});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A song, album, or artist" onChange={this.handleTermChange} />
        <button className="SearchButton" onClick={this.search}>Search</button>
      </div>
    )
  }
}
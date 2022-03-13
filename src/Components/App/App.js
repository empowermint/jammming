import './App.css';

import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';


export class App extends React.Component { // The template had this as 
  constructor(props) {
    super(props);
    this.state = { // Temporary hard-coded values
      searchResults: [
        {name: 'Baby I Love You', artist: 'Aretha Franklin', album: 'Aretha Arrives', id: '0'},
        {name: 'Natural Woman', artist: 'Aretha Franklin', album: 'Lady Soul', id: '1'},
        {name: 'Respect', artist: 'Aretha Franklin', album: 'Respect', id: '2'}
      ],
      playlistName: "Aretha Franklin Greatest Hits",
      playlistTracks: [
        {name: 'Baby I Love You', artist: 'Aretha Franklin', album: 'Aretha Arrives', id: '0'},
        {name: 'Natural Woman', artist: 'Aretha Franklin', album: 'Lady Soul', id: '1'},
        {name: 'Respect', artist: 'Aretha Franklin', album: 'Respect', id: '2'}
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1><div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
    </div>
    ); //tutorial says to pass this.props.searchResults, which seems wrong?
  }
}

export default App;

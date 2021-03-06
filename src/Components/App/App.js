import './App.css';

import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // Temporary hard-coded values
      searchResults: [
        {name: 'Baby I Love You', artist: 'Aretha Franklin', album: 'Aretha Arrives', id: '0'},
        {name: 'Natural Woman', artist: 'Aretha Franklin', album: 'Lady Soul', id: '1'},
        {name: 'Respect', artist: 'Aretha Franklin', album: 'Respect', id: '2', uri: '789'}
      ],
      playlistName: "Aretha Franklin Greatest Hits",
      playlistTracks: [
        {name: 'Baby I Love You', artist: 'Aretha Franklin', album: 'Aretha Arrives', id: '0', uri: '123'},
        {name: 'Natural Woman', artist: 'Aretha Franklin', album: 'Lady Soul', id: '1', uri: '456'}
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1><div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
    </div>
    ); //tutorial says to pass this.props.searchResults, which seems wrong?
  }

  addTrack(track) {
    const currentIDs = this.state.playlistTracks.map(track => track.id);
    if (currentIDs.includes(track.id)) return;
    this.state.playlistTracks.push(track);
    this.setState({
      playlistTracks: this.state.playlistTracks
    });
  }

  removeTrack(track) {
    const currentIDs = this.state.playlistTracks.map(track => track.id);
    const trackIndex = currentIDs.indexOf(track.id);
    this.state.playlistTracks.splice(trackIndex, 1);
    this.setState({
      playlistTracks: this.state.playlistTracks
    });
  }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search(searchTerm) {
    console.log(searchTerm);
  }
}

export default App;

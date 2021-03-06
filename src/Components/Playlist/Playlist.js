import './Playlist.css';

import React from "react";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
        <button onClick={this.props.onSave} className="Playlist-save">Save To Spotify</button>
      </div>
    )
  }
}
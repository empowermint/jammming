export const Spotify = {
  clientId: 'e07ad3983f784dffa4ee25476f4bd245',
  redirectUri: 'http://localhost:3000/',
  userAccessToken: '',
  headers: `Authorization: Bearer ${this.getAccessToken}`,
  userId: '',
  playlistId: '',

  getAccessToken() {
    if (this.userAccessToken) return this.userAccessToken;
    
    const url = window.location.href;
    this.userAccessToken = url.match(/access_token=([^&]*)/);
    const expirationTime = url.match(/expires_in=([^&]*)/);
    if (this.userAccessToken && expirationTime) {
      window.setTimeout(() => this.userAccessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectUri}`
    }
  },

  async search(searchTerm) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: this.headers});
      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse || jsonResponse === []) return [];
        return jsonResponse.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
      }
    } catch(error) {
      console.error(error);
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) return;

    try { // Saves the user's username
      const response = await fetch('https://api.spotify.com/v1/me', {headers: this.headers});
      if (response.ok) {
        const jsonResponse = await response.json();
        this.userId = jsonResponse.id;
      }
    } catch (error) {
      console.error(error);
    }

    try { // Creates a new playlist and saves its id
      const response = await fetch(`https://api.spotify.com/v1/users/${this.userId}/playlists`, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({
          name: playlistName
        })
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        this.playlistId = jsonResponse.id;
      }
    } catch (error) {
      console.error(error);
    }

    try { // Adds user's selected tracks to the new playlist
      const response = await fetch(`https://api.spotify.com/v1/users/${this.userId}/playlists/${this.playlistId}/tracks`, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({
          uris: JSON.stringify(trackURIs)
        })
      });
      if (response.ok) {
        console.log('Playlist successfully saved')
      }
    } catch (error) {
      console.error(error);
    }
    
  }
}

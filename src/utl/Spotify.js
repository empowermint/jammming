const Spotify = {
  clientId: 'e07ad3983f784dffa4ee25476f4bd245',
  redirectUri: 'http://localhost:3000/',
  userAccessToken: '',

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
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {headers: {Authorization: `Bearer ${this.getAccessToken}`}});
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
    
  }
}

export default Spotify;
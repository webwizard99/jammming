import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchResults: [],
          playlistName: 'playlistduh',
          playlistTracks: []
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
      }
    
      addTrack(track) {
        if (this.state.playlistTracks.find(function(savedTrack) {
                return (savedTrack.id === track.id);
            })) {
            return;
        } else {
            let tracks = this.state.playlistTracks;
            tracks.push(track);
            this.setState({
                playlistTracks: tracks
            });
        }

      }

      removeTrack(track) {
        let tracks = this.state.playlistTracks;
        
        tracks = tracks.filter(function(item){
            return (item.id !== track.id);
        });
        
        
        this.setState({
            playlistTracks: tracks
        });

        // const tTracklist = this.state.playlistTracks.
      }

      updatePlaylistName(name) {
        console.log(name);  
        this.setState({
              playlistName: name
          });
      }

      savePlaylist() {
          const trackURIs = this.state.playlistTracks
            .map(function(track){
                return track.uri;
            });

            console.dir(trackURIs);
            console.log(this.state.playlistName);
        
            Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
                this.setState({
                    playlistName: 'New Playlist',
                    playlistTracks: []
                });
            });
      }
    
      search(searchTerm) {
        Spotify.search(searchTerm).then(searchResults => {
            this.setState({
                searchResults: searchResults
            });
        });
        
      }

      render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                    <SearchResults 
                        onAdd={this.addTrack}
                        searchResults={this.state.searchResults}
                    />
                    <Playlist 
                        onNameChange={this.updatePlaylistName}
                        onRemove={this.removeTrack}
                        onSave={this.savePlaylist}
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                    />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(event) {
        this.props.onNameChange(event.value);
    }
    
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} defaultValue={'New Playlist'}/>
                <TrackList 
                    isRemoval={true}
                    onRemove={this.props.onRemove}
                    tracks={this.props.playlistTracks}
                />
                <a 
                    className="Playlist-save"
                    onClick={this.props.onSave}
                >SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;
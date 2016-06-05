import React from 'react';
import { Album } from './Album'

export const ResultsSection = React.createClass({
  propTypes: {
    artist: React.PropTypes.object,
    albums: React.PropTypes.array,
    topTracks: React.PropTypes.array
  },
  render () {
    const errorMessage = "Oops! This artist has no albums on Spotify!";
    if(this.props.artist && this.props.albums && this.props.topTracks) {
      return (
        <div className="result">
          <div className="label" id="result-info">{this.props.artist.name}</div>
          <div className="result-goodies" id="albums">
          {
            (this.props.albums.length > 0)?
              (this.props.albums.map((album) => {
                return (
                  <Album key={album.id} album={album} />
                )})) : (<p>{errorMessage}</p>)
          }
          </div>
          <div className="label">Top Tracks</div>
          <div className="result-goodies" id="top-tracks">
            <ol>
            {
              this.props.topTracks.map((track) => {
                return (<li key={track.id}>{track.name}</li>)
              })
            }
            </ol>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});

/*
*/

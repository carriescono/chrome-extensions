import React from 'react';

export const TopTracks = ({topTracks}) => {
    return (
      <div className="result-goodies" id="top-tracks">
        <div className="label">Top Tracks</div>
        <ol>
        {
          topTracks.map((track) => {
            return (<li key={track.id}>{track.name}</li>)
          })
        }
        </ol>
      </div>
    );
};

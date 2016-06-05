import React from 'react';

export const Album = ({album}) => {
    return (
      <div className="album-item">
        <img className="album-image" src={album.images[0].url} />
        <p>{album.name}</p>
      </div>
    );
};

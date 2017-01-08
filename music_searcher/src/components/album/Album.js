import React from 'react';
import './album.css';

export const Album = ({album, onAlbumClick}) => {
  const { name, images, id } = album;
  const shortName = (name.length > 30)? name.substr(0,30) + '...':name;

  const onClick = () => {
    onAlbumClick(id, album);
  }

  return (
    <div className="album-item" onClick={ onClick }>
      <img className="album-image" src={ images[0].url } />
      <p>{ shortName }</p>
    </div>
  );
};

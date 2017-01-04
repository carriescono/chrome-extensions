import React from 'react';

export const Album = ({album}) => {
  const { name, images } = album;
  const shortName = (name.length > 30)? name.substr(0,30) + '...':name;

  return (
    <div className="album-item">
      <img className="album-image" src={ images[0].url } />
      <p>{ shortName }</p>
    </div>
  );
};

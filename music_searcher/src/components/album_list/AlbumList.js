import React from 'react';
import { NO_ALBUM_ERROR } from '../error/ErrorMessage';
import { Album } from '../album/Album';

export const AlbumList = ({ artist, albums }) => {
    return (
      <div className="result-goodies" id="albums">
        <div className="label" id="result-info">{ artist.name }</div>
        <div className="albums">
          {
            (albums.length > 0)?
              (albums.map((album) => {
                return (
                  <Album key={ album.id } album={ album } />
                )})) : (<p className="error">{ NO_ALBUM_ERROR }</p>)
          }
        </div>
      </div>
    );
};

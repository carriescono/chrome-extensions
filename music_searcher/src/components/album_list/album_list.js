import React from 'react';
import { NO_ALBUM_ERROR } from '../error/error_message';
import { Album } from '../album/album';
import './album_list.css';

export const AlbumList = ({ artist, albums, onAlbumClick }) => {
    return (
      <div className="result-goodies" id="albums">
        <div className="label" id="result-info">{ artist.name }</div>
        <div className="albums">
          {
            (albums.length > 0)?
              (albums.map((album) => {
                return (
                  <Album key={ album.id } album={ album } onAlbumClick={ onAlbumClick } />
                )})) : (<p className="error">{ NO_ALBUM_ERROR }</p>)
          }
        </div>
      </div>
    );
};

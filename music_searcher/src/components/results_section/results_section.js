import React from 'react';
import { TopTracks } from '../top_tracks/top_tracks';
import { AlbumList } from '../album_list/album_list';
import './results_section.css';

export const ResultsSection = ({ artist, albums, topTracks, onAlbumClick }) => {
    if (artist && albums && topTracks) {
      return (
        <div className="result">
            <AlbumList
              albums={ albums }
              artist={ artist }
              onAlbumClick={ onAlbumClick } />
            <TopTracks topTracks={ topTracks } />
        </div>
      );
    } else {
      return (<div></div>);
    }
};

/*
*/

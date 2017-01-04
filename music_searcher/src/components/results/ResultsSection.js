import React from 'react';
import { TopTracks } from '../top_tracks/TopTracks';
import { AlbumList } from '../album_list/AlbumList';
import './results.css';

export const ResultsSection = ({ artist, albums, topTracks }) => {
    if (artist && albums && topTracks) {
      return (
        <div className="result">
            <AlbumList albums={ albums } artist={ artist } />
            <TopTracks topTracks={ topTracks } />
        </div>
      );
    } else {
      return (<div></div>);
    }
};

/*
*/

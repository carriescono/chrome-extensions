import React from 'react';

export const NO_ARTIST_FOUND = " Oops! Are you sure that's an artist?";
export const NO_ALBUM_ERROR = "Oops! This artist has no albums on Spotify!";

export const ErrorMessage = () => {
    return (
      <div id="result-error">
        &#3232;_&#3232;
        <span className="disclaimer">
          {NO_ARTIST_FOUND}
        </span>
      </div>
    );
};

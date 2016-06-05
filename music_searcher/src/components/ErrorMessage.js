import React from 'react';

export const ErrorMessage = () => {
  let text = " Oops! Are you sure that's an artist?";
    return (
      <div id="result-error">
        &#3232;_&#3232;
        <span className="disclaimer">
          {text}
        </span>
      </div>
    );
};

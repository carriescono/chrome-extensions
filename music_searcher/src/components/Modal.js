import React from 'react';

export const Modal = React.createClass({
  render () {
    return (
      <div id="album-modal">
  			<div id="modal-innards">
  				<span id="modal-close">x</span>
  				<div id="album-tracklist">
  					<h3></h3>
  					<ol id="track-listing">
  					</ol>
  				</div>
  			</div>
  		</div>
    );
  }
});

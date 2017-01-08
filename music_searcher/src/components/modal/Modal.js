import React from 'react';
import './modal.css';

export const Modal = ({album, tracks, closeModal}) => {
  const background = (tracks)? 'no-repeat center url('+album.images[0].url+')' : '';
  return (
    <div id="album-modal">
			<div id="modal-innards" style={{ background }}>
				<span id="modal-close" onClick={ closeModal }>x</span>
				<div id="album-tracklist">
					<h3>{ album.name }</h3>
					<ol id="track-listing">
            {tracks.map((data)=> {
              return (<li key={ data.id }>{ data.name }</li>)
            })}
					</ol>
				</div>
			</div>
		</div>
  );
}

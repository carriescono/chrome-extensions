import axios from 'axios';

export const search = (searchTerm, dispatch) => {
  axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=1`)
  .then(function (response) {
    if(response.data.artists.items.length > 0){
      const artist = response.data.artists.items[0];
      dispatch(searchOk(searchTerm, artist));
      dispatch(getAlbums(artist.id, dispatch));
      dispatch(getTopTracks(artist.id, dispatch));
    } else {
      dispatch(searchError(searchTerm, response));
    }
    return;
  })
  .catch(function (response) {
    dispatch(searchError({searchTerm, response}));
    return;
  });

  return { type: 'SEARCH.req', searchTerm }
}

export const searchError = (searchTerm, response) => ({ type: 'SEARCH.error', searchTerm });
export const searchOk = (searchTerm, artist) => ({ type: 'SEARCH.ok', searchTerm, artist });

export const change = (searchTerm) => ({ type: 'CHANGE', searchTerm });

export const getAlbums = (artistId, dispatch) => {
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?album_type=album&market=US&limit=5`)
  .then(function (response) {
    //if(response.data.items.length > 0){
      const albums = response.data.items.filter((e,i,a) => {
        const dupIndex = a.findIndex((e2,i2,a2) => {
          return e2.name.includes(e.name) || e.name.includes(e2.name);
        });
        return dupIndex < 0 || dupIndex >= i;
      });
      dispatch(getAlbumsOk(albums));
    //} else {
    //  dispatch(getAlbumsError(response));
    //}
    return;
  })
  .catch(function (response) {
    dispatch(getAlbumsError(response));
    return;
  });

  return { type: 'ALBUMS.req', artistId }
}

export const getAlbumsOk = (albums) => ({ type: 'ALBUMS.ok', albums });
export const getAlbumsError = (response) => ({ type: 'ALBUMS.error' });

export const getTopTracks = (artistId, dispatch) => {
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US&limit=5`)
  .then(function (response) {
    if(response.data.tracks.length > 0){
      const topTracks = response.data.tracks.filter((track, index)=> index < 5);
      dispatch(getTopTracksOk(topTracks));
    } else {
      dispatch(getTopTracksError(response));
    }
    return;
  })
  .catch(function (response) {
    dispatch(getTopTracksError(response));
    return;
  });

  return { type: 'ALBUMS.req', artistId }
}

export const getTopTracksOk = (topTracks) => ({ type: 'TOP.ok', topTracks });
export const getTopTracksError = (response) => ({ type: 'TOP.error' });

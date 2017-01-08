import axios from 'axios';


export const searchReq = 'SEARCH.req';
export const searchError = 'SEARCH.error';
export const searchOk = 'SEARCH.ok';
export const search = (searchTerm, dispatch) => {
  axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=1`)
  .then(function (response) {
    if(response.data.artists.items.length > 0){
      const artist = response.data.artists.items[0];
      dispatch({ type: searchOk, searchTerm, artist });
      dispatch(getAlbums(artist.id, dispatch));
      dispatch(getTopTracks(artist.id, dispatch));
    } else {
      dispatch({ type: searchError, searchTerm });
    }
    return;
  })
  .catch(function (response) {
    dispatch(searchError({searchTerm, response}));
    return;
  });

  return { type: searchReq, searchTerm }
}

export const changeReq = 'CHANGE';
export const change = (searchTerm) => ({ type: changeReq, searchTerm });

export const getAlbumsOk = 'ALBUMS.ok';
export const getAlbumsError = 'ALBUMS.error';
export const getAlbumsReq = 'ALBUMS.req';
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
      dispatch({ type: getAlbumsOk, albums });
    //} else {
    //  dispatch(getAlbumsError(response));
    //}
    return;
  })
  .catch(function (response) {
    dispatch({ type: getAlbumsError });
    return;
  });

  return { type: getAlbumsReq, artistId }
}

export const getTopTracksOk = 'TOP.ok';
export const getTopTracksError = 'TOP.error';
export const getTopTracksReq = 'TOP.req';
export const getTopTracks = (artistId, dispatch) => {
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US&limit=5`)
  .then(function (response) {
    if(response.data.tracks.length > 0){
      const topTracks = response.data.tracks.filter((track, index)=> index < 5);
      dispatch({ type: getTopTracksOk, topTracks });
    } else {
      dispatch({ type: getTopTracksError });
    }
    return;
  })
  .catch(function (response) {
    dispatch({ type: getTopTracksError });
    return;
  });

  return { type: getTopTracksReq, artistId }
}


export const getAlbumTracksOk = 'MODAL.ok';
export const getAlbumTracksError = 'MODAL.error';
export const getAlbumTracksReq = 'MODAL.req';
export const closeModal = 'MODAL.close'
export const getAlbumTracks = (albumId, album, dispatch) => {
  axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks?market=US`)
  .then(function (response) {
    if(response.data.items.length > 0){
      const tracks = response.data.items;
      dispatch({ type: getAlbumTracksOk, tracks, album });
    } else {
      dispatch({ type: getAlbumTracksError });
    }
    return;
  })
  .catch(function (response) {
    dispatch({ type: getAlbumTracksError });
    return;
  });

  return { type: getAlbumTracksReq, albumId }
}

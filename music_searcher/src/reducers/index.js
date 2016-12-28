import { search } from '../actions';
import { change } from '../actions';
import {
  searchReq,
  searchOk,
  searchError,
  changeReq,
  getAlbumsOk,
  getAlbumsError,
  getAlbumsReq,
  getTopTracksOk,
  getTopTracksError,
  getTopTracksReq
} from '../actions';

export const searchReducer = (state = {error: false}, action) => {
  switch (action.type) {
    case searchReq:
      return Object.assign({},
        state,
        {
          searchTerm: action.searchTerm,
          loading: true,
          error: false
        });
    case searchOk:
      return Object.assign({},
        state,
        {
          searchTerm: action.searchTerm,
          loading: false,
          artist: action.artist,
        });
    case searchError:
      console.log('Could not grab artist');
      return Object.assign({},
        state,
        {
          searchTerm: action.searchTerm,
          loading: false,
          error: true,
          artist: undefined
        });
    case changeReq:
      return Object.assign({},
        state,
        {searchTerm: action.searchTerm});
    case getAlbumsOk:
      return Object.assign({},
        state,
        {
          albums: action.albums,
        });
    case getAlbumsError:
    console.log('Could not grab albums');
      return Object.assign({},
        state,
        {
          error: true,
          artist: undefined,
          albums: undefined,
          top: undefined
        });
    case getTopTracksOk:
      return Object.assign({},
        state,
        {
          topTracks: action.topTracks,
        });
    case getTopTracksError:
      console.log('Could not grab top tracks');
      return Object.assign({},
        state,
        {
          error: true,
          artist: undefined,
          albums: undefined,
          topTracks: undefined
        });
    default:
      return state
  }
}

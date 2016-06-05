import { search } from '../actions';
import { change } from '../actions';

export const searchReducer = (state = {error: false}, action) => {
  switch (action.type) {
    case 'SEARCH.req':
      return Object.assign({},
        state,
        {
          searchTerm: action.searchTerm,
          loading: true,
          error: false
        });
    case 'SEARCH.ok':
      return Object.assign({},
        state,
        {
          searchTerm: action.searchTerm,
          loading: false,
          artist: action.artist,
        });
    case 'SEARCH.error':
      console.log('Could not grab artist');
      return Object.assign({},
        state,
        {
          searchTerm: action.searchTerm,
          loading: false,
          error: true,
          artist: undefined
        });
    case 'CHANGE':
      return Object.assign({},
        state,
        {searchTerm: action.searchTerm});
    case 'ALBUMS.ok':
      return Object.assign({},
        state,
        {
          albums: action.albums,
        });
    case 'ALBUMS.error':
    console.log('Could not grab albums');
      return Object.assign({},
        state,
        {
          error: true,
          artist: undefined,
          albums: undefined,
          top: undefined
        });
    case 'TOP.ok':
      return Object.assign({},
        state,
        {
          topTracks: action.topTracks,
        });
    case 'TOP.error':
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

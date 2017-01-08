import React from 'react';
import { connect } from 'react-redux';
import { SearcherForm } from '../searcher_form/searcher_form';
import { Modal } from '../modal/modal';
import { ErrorMessage } from '../error/error_message';
import { ResultsSection } from '../results_section/results_section';
import { search, change, getAlbumTracks, closeModal } from '../../actions'
import './base.css';

const mapStateToProps = (state) => {
  return Object.assign({}, state);
};

const mapDispatchToProps = (dispatch) => ({
  onSearch(text) {
    dispatch(search(text, dispatch));
  },
  onChange(text) {
    dispatch(change(text, dispatch));
  },
  onAlbumClick(albumId, name) {
    dispatch(getAlbumTracks(albumId, name, dispatch));
  },
  closeModal() {
    dispatch({ type: closeModal });
  }
});

const component = React.createClass({
  componentWillMount() {
    // console.log('Will Mount');
  },
  componentDidMount() {
    // console.log('Did Mount');
  },
  render () {
    const background = (this.props.artist)? 'no-repeat center url('+this.props.artist.images[0].url+')' : '';
    return (
      <div className="container" style={{background}}>
          {
            (this.props.modalOpen)?
            <Modal
              album={this.props.album}
              tracks={this.props.albumTracks}
              closeModal={this.props.closeModal} />:
              null
          }
          <SearcherForm
            onSearch={this.props.onSearch}
            onChange={this.props.onChange}
            searchTerm={this.props.searchTerm} />
          { (this.props.error)?
            <ErrorMessage />
          : <ResultsSection
              artist={this.props.artist}
              topTracks={this.props.topTracks}
              loading={this.props.loading}
              albums={this.props.albums}
              onAlbumClick={this.props.onAlbumClick} />}
      </div>
    );
  }
});

export const Container = connect(mapStateToProps, mapDispatchToProps)(component);

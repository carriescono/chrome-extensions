import React from 'react';
import { connect } from 'react-redux';
import { SearcherForm } from './SearcherForm';
import { Modal } from './Modal';
import { ErrorMessage } from './ErrorMessage';
import { ResultsSection } from './ResultsSection';
import { search, change } from '../actions'

const mapStateToProps = (state) => {
  // console.log('MapStateToProps', state);
  return Object.assign({}, state);
};

const mapDispatchToProps = (dispatch) => ({
  onSearch(text) {
    dispatch(search(text, dispatch));
  },
  onChange(text) {
    // console.log('Container on change', text);
    dispatch(change(text));
  }
});

const component = React.createClass({
  componentWillMount() {
    // console.log('Will Mount');
  },
  componentDidMount() {
    // console.log('Did Mount', this);
  },
  render () {
    // console.log('What props can we work with?', this.props);
    const background = (this.props.artist)? 'no-repeat center url('+this.props.artist.images[0].url+')' : '';
    return (
      <div className="container" style={{background}}>
          <Modal/>
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
              albums={this.props.albums} />}
      </div>
    );
  }
});

export const Container = connect(mapStateToProps, mapDispatchToProps)(component);

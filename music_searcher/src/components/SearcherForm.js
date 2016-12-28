import React from 'react';

export const SearcherForm = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func,
    searchTerm: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  handleClick (event) {
    this.props.onSearch(this.props.searchTerm);
  },

  handleChange (event) {
    this.props.onChange(event.target.value);
  },

  handleEnter (event) {
    if(event.key ==='Enter'){
      this.handleClick(event);
    }
  },

  render () {
    return (
      <div className="form">
        <input id="artist" type="text" placeholder="Enter an artist!" onChange={this.handleChange} onKeyPress={this.handleEnter}/>
        <button id="artist-search" className="btn-submit" onClick={this.handleClick}>Search!</button>
        <span className="disclaimer">Powered by <a href="https://www.spotify.com/">Spotify!</a></span>
      </div>
    );
  }
});

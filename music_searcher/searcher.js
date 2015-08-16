'use strict';

var createAlbumDiv = function(info){
	var $album = $(document.createElement('div')).addClass('album-item');
	var $albumText = $(document.createElement('p')).text(info.name);
	var $albumImg = $(document.createElement('img'))
		.addClass('album-image')
		.attr('src', info.images[0].url);

	$albumImg.appendTo($album);
	$albumText.appendTo($album);

	return $album;
};

var grabAlbums = function(id){
$.ajax({
        url: 'https://api.spotify.com/v1/artists/'+id+'/albums',
        data: {
        	'album_type' : 'album,single',
        	'market' : 'US',
        	'limit' : 10
        },
        success: function (response) {
        	var albums = response.items;

            for(var i=0; i<albums.length; i++){
            	createAlbumDiv(albums[i]).appendTo($('#albums'));;
            }

        }
    });
};

var grabTopTracks = function(id){
	$.ajax({
        url: 'https://api.spotify.com/v1/artists/'+id+'/top-tracks',
        data: {
        	'country': 'US',
        	'limit' : 5
        },
        success: function (response) {
        	var topTracks = response.tracks;

            var $trackList  = $(document.createElement('ol'));

            for(var i=0; i<Math.min(5,topTracks.length); i++){
            	var $track = $(document.createElement('li'));
            	$track.text(topTracks[i].name + ' ('+topTracks[i].album.name+')');
            	$track.appendTo($trackList);
            }

            $trackList.appendTo($('#top-tracks'));
        }
    });
};

var startSearch = function(query){
	//$('.result').text(query);

	$.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
        	'q' : query,
        	'type' : 'artist',
        	'limit' : 1
        },
        success: function (response) {
        	var artist = response.artists.items[0];

            $('#result-info').text(artist.name);

            var img = new Image();
            img.src = artist.images[0].url;
            img.setAttribute('class', 'disp-img');
            var $img = $(img);
            $img.appendTo($('#result-image'));

            grabAlbums(artist.id);
            grabTopTracks(artist.id);

            $('.result').css('display','block');

            $('body').css({
            	'background': 'url('+img.src+') no-repeat'
            });

        }
    });
}

var resetDisplay = function(){
	$('#result-image').text('');
	$('.result-goodies').text('');
};

document.addEventListener('DOMContentLoaded', function(){

	// Form submit
	$('#artist-search').click(function(){
		resetDisplay();

		var artist = $('#artist').val();

		startSearch(artist);
	});

	// Handles enter keypress
	$('#artist').on('keypress', function(){
		if(event.which === 13){
			$('#artist-search').focus();
			$('#artist-search').click();
		}
	});
});
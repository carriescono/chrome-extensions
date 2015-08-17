'use strict';

var grabTrackListing = function(id,title,image){
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/'+id+'/tracks',
        data: {
            'market' : 'US'
        },
        success: function (response) {
            var tracks = response.items;

            $('#album-tracklist h3').text('Track Listing for ' + title);
            $('#modal-innards').css('background','no-repeat center/100% url('+image+')');
            $('#album-tracklist ol').text('');
            for(var i=0;i<tracks.length;i++){
                var $track = $(document.createElement('li'));
                $track.text(tracks[i].name);
                $track.appendTo($('#album-tracklist ol'));
            }

        }
    });
};

var createAlbumDiv = function(info){
	var $album = $(document.createElement('div')).addClass('album-item');
	var $albumText = $(document.createElement('p')).text(info.name);
	var $albumImg = $(document.createElement('img'))
		.addClass('album-image')
		.attr('src', info.images[0].url);

	$albumImg.appendTo($album);
	$albumText.appendTo($album);
    $album.click(function(){
        grabTrackListing(info.id,info.name,info.images[0].url);
        $('#album-modal').css('display','block');
    });

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

            grabTopTracks(id);

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

            $('.result-goodies').slideToggle(500,function(){
                $('.label').css('display','block');
            });
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
            if (response.artists.items.length > 0){
                var artist = response.artists.items[0];
    
                $('#result-info').text(artist.name);
    
                var img = new Image();
                img.src = artist.images[0].url;
                img.setAttribute('class', 'disp-img');
                var $img = $(img);
                $img.appendTo($('#result-image'));
                $('.result').css('display','block');
    
                grabAlbums(artist.id);
    
                $('body').css({
                    'background': 'no-repeat center/100% url('+img.src+')'
                });
            } else {
                $('body').css({
                    'background': 'none'
                });
                $('#result-error').css('display', 'block');
                $('.result-goodies').slideToggle();
            }
        }
    });
}

var resetDisplay = function(){
	//$('#result-image').text('');
    $('#result-error').css('display', 'none');
    $('.result').css('display','none');
    $('.label').css('display','none');
	$('.result-goodies').text('');
    $('.result-goodies').slideToggle();
};

var modalClose = function(){
    $('#album-modal').css('display', 'none');
};

document.addEventListener('DOMContentLoaded', function(){
    $('#modal-close').click(modalClose);


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
"use strict";
var player;
var interval;
var players;
var supported;
var website;

var $ = window.jQuery;

supported = false;

players = {
    "mixcloud": mixcloud,
    "pandora": pandora,
    "play.google.com": play,
    "open.spotify.com": spotify,
    "soundcloud": soundcloud,
    "tunein": tunein,
    "youtube": youtube,
    "deezer": deezer,
    "app.plex.tv": plex,
    'hypem': hypem,
    'bandcamp': bandcamp
};

function mixcloud() {
    var artist, song, songTitle;
    var wp = "Mixcloud";

    if ($(document).find('a[ng-bind="player.currentCloudcast.title"]').text() === undefined || $(document).find('a[ng-bind="player.currentCloudcast.title"]').text() === null) {
        songTitle = 'Paused';
    } else {
        artist = $(document).find('a[ng-bind="player.currentCloudcast.owner"]').text();
        song = $(document).find('a[ng-bind="player.currentCloudcast.title"]').text();
        songTitle = artist + ' - ' + song;
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

function pandora() {
    var artist, song, songTitle;
    var wp = "Pandora";

    if ($('div.App').length) { //Checks if Pandora is the new player
        if ($(document).find('.nowPlayingTopInfo__current__trackName').text() === undefined || $(document).find('.nowPlayingTopInfo__current__trackName').text() === null) {
            songTitle = 'Paused';
        } else {
            artist = $(document).find('.nowPlayingTopInfo__current__artistName').text();
            song = $(document).find('.nowPlayingTopInfo__current__trackName').text();
            songTitle = artist + ' - ' + song;
        }

    } else {
        if ($(document).find('.playerBarSong').text() === undefined || $(document).find('.playerBarSong').text() === null) {
            songTitle = 'Paused';
        } else {
            artist = $(document).find('.playerBarArtist').text();
            song = $(document).find('.playerBarSong').text();
            songTitle = artist + ' - ' + song;
        }
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

function play() {
    var artist, song, songTitle;
    var wp = "Google Play";

    if ($(document).find('#player-artist').text() === undefined || $(document).find('#player-artist').text() === null) {
        songTitle = 'Paused';
    } else {
        artist = $(document).find('#player-artist').text();
        song = $(document).find('#currently-playing-title').text();
        songTitle = artist + " - " + song;
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

function spotify() {
    var songSelector, artist, song, songTitle;
    var wp = "Spotify";

    var isPlaying = $('.player-controls__buttons').find('.spoticon-pause-16').length ? true : false;
    if (isPlaying) {
        songSelector = $('.now-playing').find('.track-info');
        artist = songSelector.find('.track-info__artists').find('a').text();
        song = songSelector.find('.track-info__name').find('a').text();
        songTitle = artist + ' - ' + song;
    } else {
        songTitle = 'Paused'
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

function soundcloud() {
    var songTitle;
    var wp = "Soundcloud";
    console.log(songTitle = $(document).find('.playbackSoundBadge__titleContextContainer > div > a > span:nth-child(2)')[0]);
    console.log(songTitle = $($(document).find('.playbackSoundBadge__titleContextContainer > div > a > span:nth-child(2)')[0]).text());
    if (typeof ($($(document).find('.playbackSoundBadge__titleContextContainer > div > a > span:nth-child(2)')[0]).text()) === 'undefined' || $($(document).find('.playbackSoundBadge__titleContextContainer > div > a > span:nth-child(2)')[0]).text() === null) {
        songTitle = 'Paused';
    } else {
        songTitle = $($(document).find('.playbackSoundBadge__titleContextContainer > div > a > span:nth-child(2)')[0]).text();
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

// Can't grab artist from tunein, it is placed together
function tunein() {
    var songTitle;
    var wp = "tunein";
    if ($(document).find('#tuner > div > div > div.display > div.line1._navigateNowPlaying').text() === undefined || $(document).find('#tuner > div > div > div.display > div.line1._navigateNowPlaying').text() === null) {
        songTitle = 'Paused';
    } else {
        songTitle = $(document).find('#tuner > div > div > div.display > div.line1._navigateNowPlaying').text();
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

// unfortunately there is no good way to determine an 'artist'
function youtube() {
    var songTitle;
    var wp = "YouTube";

    if ($(document).find('.title.ytd-video-primary-info-renderer > *').text() === undefined || $(document).find('.title.ytd-video-primary-info-renderer > *').text() === null) {
        songTitle = 'Paused';
    } else {
        songTitle = $(document).find('.title.ytd-video-primary-info-renderer > *').text().trim();
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

function deezer() {
    var artist, song, songTitle;
    var wp = "Deezer";

    if ($(document).find('.player-track-title').text() === undefined || $(document).find('.player-track-title').text() === null) {
        songTitle = 'Paused';
    } else {
        artist = $(document).find('.player-track-artist').text();
        song = $(document).find('.player-track-title').text();
        songTitle = artist.substr(3) + " - " + song;
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

function plex() {
    var artist, song, songTitle;
    var wp = 'Plex'

    if (typeof($(document).find('.grandparent-title-container > button').text()) === 'undefined') {
        songTitle = '';
    } else if ($(document).find('.mini-controls-right > div:nth-child(3) > button.pause-btn.btn-link.btn-link-lg').hasClass('hidden')) {
        songTitle = 'Paused';
    } else {
        artist = $(document).find('.grandparent-title-container > button').text();
        song = $(document).find('.title-container > button').text();
        songTitle = artist + ' - ' + song;
    }

    return {
        song: songTitle,
        webPlayer: wp
    };
}

function hypem() {
    var songSelector, songTitle;
    var wp = "Hype Machine";
    
    var isPlaying = $('#playerPlay').hasClass('pause');
    if (isPlaying) {
        songTitle = $('#player-nowplaying').children().slice(0,3).text();
    } else {
        songTitle = 'Paused';
    }

    return {
        song: songTitle,
        webPlayer: wp
    }
}

function bandcamp() {
    var songTitle, artist, song;
    var wp = "Bandcamp"
    
    var isPlaying = $('div.playbutton').hasClass('playing');
    if (isPlaying) {
        artist = $('p.detail-artist > a').text();
        song = $('span.title').text();
        songTitle = artist + ' - ' + song;
    } else {
        songTitle = 'Paused';
    }

    return {
        song: songTitle,
        webPlayer: wp
    }
}

// sets the song variable, send it to localhost and makes the 
// appropriate changes to the html object(s)
// TODO: add the html shit
function setSong() {
    var song = player();
    if (song.song !== '') {
        $('.NowPlayingBody').text(song.song);
        sendToBackground(song.webPlayer, song.song);
    } else {
        $('.NowPlayingBody').text("No song playing");
    }
}

function init() {
    if ($('.NowPlayingContainer').length > 0) {
        return;
    }
    addHTML();
    var s = checkSupport();
    if (s) {
        setSong();
        $('.NowPlayingSupported').text(website.replace("www.", "") + ' is supported!').css('color', 'green');
        $('.NowPlayingButton').click(function () {
            if ($('.NowPlayingButton').text() === 'Start') {
                $('.NowPlayingButton').text('Stop');
                start();
            } else if ($('.NowPlayingButton').text() === 'Stop') {
                $('.NowPlayingButton').text('Start');
                stop();
            }
        });
    } else {
        $('.NowPlayingSupported').text(website.replace("www.", "")).append(' <a href="https://github.com/pendo324/OBS-Now-Playing">is not supported.</a>').css('color', 'red');
    }
}

function start() {
    setSong();
    interval = setInterval(setSong, 2000);
    $(".NowPlayingButton").css("background-color", "#F44336");
}

function stop() {
    if (interval !== null) {
        clearInterval(interval);
        $(".NowPlayingButton").css("background-color", "#008CBA");
    }
}

function checkSupport() {
    website = window.location.host;

    for (var p in players) {
        if (website.indexOf(p) > -1) { //website.includes(p), works in Chrome/Opera and Firefox 40
            player = players[p];
            supported = true;
        }
    }
    return supported;
}

function addHTML() {
    var html = "<div class=NowPlayingContainer><style>.NowPlayingContainer{all:unset;text-align:left;background-color:#343434;border:2px solid #3c3c3c;border-radius:4px;color:#f5f5f5;position:fixed;bottom:50px;right:30px;width:300px;min-height:100px;z-index:10000;}.NowPlayingHeader{margin:10px;line-height:18px;font-family:arial;font-size:16px}.NowPlayingBody{margin-top:15px;margin-bottom:10px;margin-left:10px;line-height:16px;font-family:arial;font-size:14px}.NowPlayingSupported{margin-left:70px;margin-top:-20px;line-height:16px;font-family:arial;font-size:14px}.NowPlayingSupported a:link{color:#09F}.NowPlayingSupported a:visited{color: #CC0099;}.NowPlayingButton{all:unset;background-color:#008CBA;margin-left:10px;line-height:16px;font-family:arial;font-size:14px;color:#FFFFFF;padding:5px 10px;border-radius:4px;cursor:pointer;}.NowPlayingButton:hover{background-color:#00BFED}</style><div class=NowPlayingHeader>Essential Now Playing</div><button class=NowPlayingButton>Start</button><div class=NowPlayingSupported></div><div class=NowPlayingBody>No song playing.</div></div>";
    $('body').append(html);
}

function sendToBackground(player, song) {
    var data = {
        'player': player,
        'song': song
    };

    chrome.runtime.sendMessage(data);
}

init();
